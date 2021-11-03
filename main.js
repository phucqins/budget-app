const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let ENTRY__DATA = [];

const nextBtn = $("#next-button");
const prevBtn = $("#prev-button");
const cancelBtn = $(".data-modal__board__button__cancel");
const submitBtn = $(".data-modal__board__button__confirm");
const popupCloseBtn = $(".popup-modal__board__button__close");
const selectors = $$(".main__category__selector__child");
const dataModal = $(".data-modal");
const popupModal = $(".popup-modal");
const inputTitle = $(".data-modal__board__input__title");
const inputAmount = $(".data-modal__board__input__amount");
const inputDes = $(".data-modal__board__input__description");
const selectorHeadings = $$(".main__category__selector__child h1");
const list = $$(".list");
const expenseList = $("#expense.list");
const incomeBoard = $(".main__dash-board__income");
const expenseBoard = $(".main__dash-board__expenses");
const modalBoardTitle = $(".data-modal__board__title");
const popUpBoard = $(".popup-modal__board__container");

const incomeBoardTotal = $(".main__dash-board__income__heading__number");
const expenseBoardTotal = $(".main__dash-board__expenses__heading__number");
const balanceDisplay = $(".main__screen__box__display");

const popUpNext = $(".popup-modal__board__button__next");
const popUpPrev = $(".popup-modal__board__button__prev");

let income = 0;
let outcome = 0;
let balance = 0;

//handle selectors

selectors.forEach((e, i) => {
  e.addEventListener("click", () => {
    dataModal.classList.add("active");
    modalBoardTitle.innerHTML = `Create new: <span>${selectorHeadings[i].innerHTML}</span>`;
  });
});

//handle selectors end

// scroll handle

const scrollHandle = (direction) => {
  let selectorContainer = $(".main__category__selector");
  scrollCompleted = 0;
  let scrollVar = setInterval(function () {
    if (direction == "left") {
      selectorContainer.scrollLeft -= 10;
    } else {
      selectorContainer.scrollLeft += 10;
    }
    scrollCompleted += 10;
    if (scrollCompleted >= 100) {
      window.clearInterval(scrollVar);
    }
  }, 15);
};

nextBtn.addEventListener("click", () => {
  scrollHandle("right");
});

prevBtn.addEventListener("click", () => {
  scrollHandle("left");
});

// scroll handle end

//modal-btn handle

const handleClose = () => {
  popupModal.classList.remove("active");
};

popupCloseBtn.addEventListener("click", () => {
  handleClose();
  dashBoards = [];
  clearElement([popUpBoard]);
});

const openPopup = () => {
  popupModal.classList.add("active");
};

const handleCancel = () => {
  dataModal.classList.remove("active");
};

const clearInput = () => {
  inputTitle.value = "";
  inputAmount.value = "";
  inputDes.value = "";
};

let id = -1;
const handleSubmit = () => {
  const modalBoardTitleText = $(".data-modal__board__title span").innerHTML;
  const dashBoardIncome = $(".main__dash-board__income");
  const dashBoardExpenses = $(".main__dash-board__expenses");

  const dashboardIncomeTitleText = $$(
    ".main__dash-board__income__container-description__title span"
  );
  const dashboardExpensesTitleText = $$(
    ".main__dash-board__expenses__container-description__title span"
  );
  const dashboardIncomeNumber = $$(
    ".main__dash-board__income__container-description__number span"
  );
  const dashboardExpensesNumber = $$(
    ".main__dash-board__expenses__container-description__number span"
  );

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "Jan",
    "Febr",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateObj = new Date();

  let day = days[dateObj.getDay()];
  let date = dateObj.getDate();
  let month = months[dateObj.getMonth()];
  let year = dateObj.getUTCFullYear();

  const newdate = `${day} ${date} ${month} ${year}`;

  if (!inputTitle.value || !inputAmount.value) {
    return alert("You have to add the Amount and Title");
  }
  const inputRadioChecked = document.querySelector(
    'input[name="radio-button"]:checked'
  ).value;

  if (inputRadioChecked === "income") {
    let income = {
      id: id++,
      category: modalBoardTitleText,
      type: "income",
      title: inputTitle.value,
      des: inputDes.value,
      amount: parseFloat(inputAmount.value),
      day: renderDate(newdate),
    };

    if (
      ENTRY__DATA.some(
        (e) => e.category === modalBoardTitleText && e.type === "income"
      )
    ) {
      console.log("da co");
    } else {
      renderNewDashBoard(
        modalBoardTitleText,
        id,
        "income",
        dashBoardIncome,
        renderImg(modalBoardTitleText),
        renderTitle(inputRadioChecked, modalBoardTitleText),
        renderAmount("income", parseFloat(inputAmount.value)),
        renderDate(newdate)
      );
    }

    let text = [];
    dashboardIncomeTitleText.forEach((e) => text.push(e.innerHTML));
    let index = text.findIndex((e) => e == modalBoardTitleText);

    ENTRY__DATA.push(income);
    const salary = ENTRY__DATA.filter(
      (e) => e.category == "salary" && e.type == "income"
    );
    const shopping = ENTRY__DATA.filter(
      (e) => e.category == "shopping" && e.type == "income"
    );
    const other = ENTRY__DATA.filter(
      (e) => e.category == "other" && e.type == "income"
    );
    const cooking = ENTRY__DATA.filter(
      (e) => e.category == "cooking" && e.type == "income"
    );
    const friend = ENTRY__DATA.filter(
      (e) => e.category == "friend" && e.type == "income"
    );
    const invoice = ENTRY__DATA.filter(
      (e) => e.category == "invoice" && e.type == "income"
    );
    const gift = ENTRY__DATA.filter(
      (e) => e.category == "gift" && e.type == "income"
    );

    const salaryAmount = caculateAmount(salary);
    const shoppingAmount = caculateAmount(shopping);
    const otherAmount = caculateAmount(other);
    const cookingAmount = caculateAmount(cooking);
    const friendAmount = caculateAmount(friend);
    const invoiceAmount = caculateAmount(invoice);
    const giftAmount = caculateAmount(gift);
    if (dashboardIncomeNumber[index]) {
      switch (modalBoardTitleText) {
        case "salary":
          dashboardIncomeNumber[index].innerHTML = `$ ${salaryAmount}`;
          break;
        case "shopping":
          dashboardIncomeNumber[index].innerHTML = `$ ${shoppingAmount}`;

          break;
        case "other":
          dashboardIncomeNumber[index].innerHTML = `$ ${otherAmount}`;

          break;
        case "cooking":
          dashboardIncomeNumber[index].innerHTML = `$ ${cookingAmount}`;

          break;
        case "friend":
          dashboardIncomeNumber[index].innerHTML = `$ ${friendAmount}`;

          break;
        case "invoice":
          dashboardIncomeNumber[index].innerHTML = `$ ${invoiceAmount}`;

          break;
        case "gift":
          dashboardIncomeNumber[index].innerHTML = `$ ${giftAmount}`;

          break;
      }
    }
  } else if (inputRadioChecked === "expenses") {
    let expense = {
      id: id++,
      category: modalBoardTitleText,
      type: "expenses",
      title: inputTitle.value,
      des: inputDes.value,
      amount: parseFloat(inputAmount.value),
      day: renderDate(newdate),
    };
    if (
      ENTRY__DATA.some(
        (e) => e.category === modalBoardTitleText && e.type === "expenses"
      )
    ) {
      console.log("da co");
    } else {
      renderNewDashBoard(
        modalBoardTitleText,
        id,
        "expenses",
        dashBoardExpenses,
        renderImg(modalBoardTitleText),
        renderTitle(inputRadioChecked, modalBoardTitleText),
        renderAmount("expenses", parseFloat(inputAmount.value)),
        renderDate(newdate)
      );
    }
    ENTRY__DATA.push(expense);
    let text = [];
    dashboardExpensesTitleText.forEach((e) => text.push(e.innerHTML));
    let index = text.findIndex((e) => e == modalBoardTitleText);

    const salary = ENTRY__DATA.filter(
      (e) => e.category == "salary" && e.type == "expenses"
    );
    const shopping = ENTRY__DATA.filter(
      (e) => e.category == "shopping" && e.type == "expenses"
    );
    const other = ENTRY__DATA.filter(
      (e) => e.category == "other" && e.type == "expenses"
    );
    const cooking = ENTRY__DATA.filter(
      (e) => e.category == "cooking" && e.type == "expenses"
    );
    const friend = ENTRY__DATA.filter(
      (e) => e.category == "friend" && e.type == "expenses"
    );
    const invoice = ENTRY__DATA.filter(
      (e) => e.category == "invoice" && e.type == "expenses"
    );
    const gift = ENTRY__DATA.filter(
      (e) => e.category == "gift" && e.type == "expenses"
    );
    const salaryAmount = caculateAmount(salary);
    const shoppingAmount = caculateAmount(shopping);
    const otherAmount = caculateAmount(other);
    const cookingAmount = caculateAmount(cooking);
    const friendAmount = caculateAmount(friend);
    const invoiceAmount = caculateAmount(invoice);
    const giftAmount = caculateAmount(gift);
    if (dashboardExpensesNumber[index]) {
      switch (modalBoardTitleText) {
        case "salary":
          dashboardExpensesNumber[index].innerHTML = `-$ ${salaryAmount}`;
          break;
        case "shopping":
          dashboardExpensesNumber[index].innerHTML = `-$ ${shoppingAmount}`;

          break;
        case "other":
          dashboardExpensesNumber[index].innerHTML = `-$ ${otherAmount}`;

          break;
        case "cooking":
          dashboardExpensesNumber[index].innerHTML = `-$ ${cookingAmount}`;

          break;
        case "friend":
          dashboardExpensesNumber[index].innerHTML = `-$ ${friendAmount}`;

          break;
        case "invoice":
          dashboardExpensesNumber[index].innerHTML = `-$ ${invoiceAmount}`;

          break;
        case "gift":
          dashboardExpensesNumber[index].innerHTML = `-$ ${giftAmount}`;

          break;
      }
    }
  }

  const popupTitle = $(".popup-modal__board__header__title");
  const popupNumber = $(".popup-modal__board__header__number");
  let dashBoards = $$("#dash-board");
  const dashBoardTitles = $$("#dash-board-title");
  const dashBoardNumbers = $$("#dash-board-number");

  if (
    (popupTitle, popupNumber, dashBoards, dashBoardTitles, dashBoardNumbers)
  ) {
    dashBoards.forEach((e, index) => {
      e.addEventListener("click", () => {
        openPopup();
        const popupModalData = [];
        let page = 0;
        const salaryIncome = ENTRY__DATA.filter(
          (e) => e.category == "salary" && e.type == "income"
        );
        const shoppingIncome = ENTRY__DATA.filter(
          (e) => e.category == "shopping" && e.type == "income"
        );
        const otherIncome = ENTRY__DATA.filter(
          (e) => e.category == "other" && e.type == "income"
        );
        const cookingIncome = ENTRY__DATA.filter(
          (e) => e.category == "cooking" && e.type == "income"
        );
        const friendIncome = ENTRY__DATA.filter(
          (e) => e.category == "friend" && e.type == "income"
        );
        const invoiceIncome = ENTRY__DATA.filter(
          (e) => e.category == "invoice" && e.type == "income"
        );
        const giftIncome = ENTRY__DATA.filter(
          (e) => e.category == "gift" && e.type == "income"
        );
        const salaryExpenses = ENTRY__DATA.filter(
          (e) => e.category == "salary" && e.type == "expenses"
        );
        const shoppingExpenses = ENTRY__DATA.filter(
          (e) => e.category == "shopping" && e.type == "expenses"
        );
        const otherExpenses = ENTRY__DATA.filter(
          (e) => e.category == "other" && e.type == "expenses"
        );
        const cookingExpenses = ENTRY__DATA.filter(
          (e) => e.category == "cooking" && e.type == "expenses"
        );
        const friendExpenses = ENTRY__DATA.filter(
          (e) => e.category == "friend" && e.type == "expenses"
        );
        const invoiceExpenses = ENTRY__DATA.filter(
          (e) => e.category == "invoice" && e.type == "expenses"
        );
        const giftExpenses = ENTRY__DATA.filter(
          (e) => e.category == "gift" && e.type == "expenses"
        );
        const data = [
          salaryIncome,
          shoppingIncome,
          otherIncome,
          cookingIncome,
          friendIncome,
          invoiceIncome,
          giftIncome,
          salaryExpenses,
          shoppingExpenses,
          otherExpenses,
          cookingExpenses,
          friendExpenses,
          invoiceExpenses,
          giftExpenses,
        ];
        popupTitle.innerHTML = `${dashBoardTitles[index].innerHTML}`;
        popupNumber.innerHTML = `${dashBoardNumbers[index].innerHTML}`;
        clearElement([popUpBoard]);
        renderPopupContainer(popupTitle.innerHTML, data, popupModalData);
        for (let i = 0; i < page + 3; i++) {
          const position = "beforeend";
          if (i < popupModalData.length) {
            popUpBoard.insertAdjacentHTML(position, popupModalData[i]);
          }
        }

        popUpNext.disabled = true;
        popUpPrev.disabled = true;

        if (popupModalData.length > 3) {
          popUpNext.disabled = false;
        }

        popUpNext.addEventListener("click", () => {
          let maxPage = Math.ceil(popupModalData.length / 3) * 3;
          if (popupModalData.length % 3 == 0) {
            page == popupModalData.length - 3
              ? (page = popupModalData.length - 3)
              : (page += 3);
            popUpBoard.innerHTML = "";
            for (let i = page; i < page + 3; i++) {
              const position = "beforeend";
              if (
                i < popupModalData.length &&
                typeof popupModalData[i] == "string"
              ) {
                popUpBoard.insertAdjacentHTML(position, popupModalData[i]);
              }
            }

            if (page == popupModalData.length - 3) {
              popUpNext.disabled = true;
            }
          } else {
            page == maxPage - 3 ? (page = maxPage - 3) : (page += 3);
            popUpBoard.innerHTML = "";
            for (let i = page; i < page + 3; i++) {
              const position = "beforeend";
              if (i < maxPage && typeof popupModalData[i] == "string") {
                popUpBoard.insertAdjacentHTML(position, popupModalData[i]);
              }
            }
            if (page == maxPage - 3 || page <= 3) {
              popUpNext.disabled = true;
            }
          }
          popUpPrev.disabled = false;
        });
        popUpPrev.addEventListener("click", () => {
          popUpNext.disabled = false;
          page == 0 ? (page = 0) : (page -= 3);
          popUpBoard.innerHTML = "";
          for (let i = page; i < page + 3; i++) {
            const position = "beforeend";
            if (typeof popupModalData[i] == "string") {
              popUpBoard.insertAdjacentHTML(position, popupModalData[i]);
            }
          }

          if (page == 0) {
            popUpPrev.disabled = true;
          }
        });
      });
    });
  }

  updateUI();
  clearInput([inputTitle, inputAmount]);
  handleCancel();
};

const renderPopupContainer = (dashBoardTitle, data, popupModalData) => {
  if (dashBoardTitle.includes("<span>salary</span> Income")) {
    data[0].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>shopping</span> Income")) {
    data[1].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>other</span> Income")) {
    data[2].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>cooking</span> Income")) {
    data[3].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>friend</span> Income")) {
    data[4].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>invoice</span> Income")) {
    data[5].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>gift</span> Income")) {
    data[6].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>salary</span> Expenses")) {
    data[7].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>shopping</span> Expenses")) {
    data[8].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>other</span> Expenses")) {
    data[9].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>cooking</span> Expenses")) {
    data[10].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>friend</span> Expenses")) {
    data[11].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else if (dashBoardTitle.includes("<span>invoice</span> Expenses")) {
    data[12].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  } else {
    data[13].forEach((e, i) => {
      renderPopup(
        e.type,
        e.title,
        e.des,
        e.category,
        e.day,
        e.amount,
        e.id,
        popupModalData
      );
    });
  }
};

const renderPopup = (
  type,
  title,
  des,
  category,
  day,
  amount,
  id,
  popupModalData
) => {
  const entry = `<li value='${id}' title='${title}' type='${type}' category='${category}' amount='${amount}' class="popup-modal__board__container-li ${type}">
        <div>
        <img src="./assets/images/calendar.png" />  
        </div>
        <div class="popup-modal__board__container-li__content">
        <div class="popup-modal__board__container-li__content__title">${title}: <span>${
    type == "expenses" ? "-$" : "$"
  }${amount}</span></div>
        <div class="popup-modal__board__container-li__content__description">${des}</div>
        <p>${day}</p>
        </div>
        <div style='flex-grow:1; text-align:end'>
        <button onclick="deletePopup(this)"  id='popup-delete'><i class="fas fa-trash-alt"></i></button>
        </div>
        </li>`;

  popupModalData.push(entry);
};

const caculateAmount = (arr) => {
  let sum = 0;
  for (i = 0; i < arr.length; i++) {
    sum += arr[i].amount;
  }
  return sum;
};

//   renderPopupContainer(popupTitle.innerHTML, salaryIncome);

const renderNewDashBoard = (
  category,
  id,
  type,
  element,
  fn1,
  fn2,
  fn3,
  fn4
) => {
  element.insertAdjacentHTML(
    "beforeend",
    `<div class='a${id}' type='${type}' category='${category}' id='dashboard-container'>
    <div  id="dash-board" class="main__dash-board__${
      type == "income" ? "income" : "expenses"
    }__container">
    <div class="main__dash-board__${
      type == "income" ? "income" : "expenses"
    }__container__img"><img ${fn1} alt="" /></div>
    <div class="main__dash-board__${
      type == "income" ? "income" : "expenses"
    }__container-description">
        <div id="dash-board-title" class="main__dash-board__${
          type == "income" ? "income" : "expenses"
        }__container-description__title">${fn2}</div>
        <div type='${type}' category-number='${category}' id="dash-board-number" class="main__dash-board__${
      type == "income" ? "income" : "expenses"
    }__container-description__number">${fn3}</div>
        <div class="main__dash-board__${
          type == "income" ? "income" : "expenses"
        }__container-description__time">${fn4}</div>
    </div>
    </div>
    <button id='delete' onclick="deleteDashBoard(this)"><i class="fas fa-trash-alt"></i></button>
    `
  );
};

const deleteDashBoard = (ele) => {
  ele.parentNode.remove();
  const category = ele.parentNode.getAttribute("category");
  const type = ele.parentNode.getAttribute("type");
  const newData = ENTRY__DATA.filter((e) => {
    return !(e.category == category && e.type == type);
  });
  ENTRY__DATA = newData;
  updateUI();
};

const deletePopup = (ele) => {
  ele.parentNode.remove();
  const category = ele.parentNode.getAttribute("category");
  const type = ele.parentNode.getAttribute("type");
  const amount = ele.parentNode.getAttribute("amount");
  const title = ele.parentNode.getAttribute("title");
  const id = ele.parentNode.getAttribute("value");

  const newData = ENTRY__DATA.filter((e) => {
    return !(
      e.category === category &&
      e.type === type &&
      e.amount == amount &&
      e.title === title &&
      e.id == id
    );
  });
  ENTRY__DATA = newData;

  elementData = ENTRY__DATA.filter((e) => {
    return e.category === category && e.type === type;
  });

  if ($(`div[type='${type}'][category-number='${category}']`)) {
    $(`div[type='${type}'][category-number='${category}']`).innerHTML = `${
      type == "expenses" ? "-$" : "$"
    }${caculateAmount(elementData)}`;
  }

  if (elementData.length == 0) {
    $(`div[type='${type}'][category='${category}']`).remove();
    handleClose();
  }

  console.log(ENTRY__DATA);
  updateUI();
};

const renderImg = (innerText) => {
  switch (innerText) {
    case "salary":
      return `src="./assets/images/salary.png"`;

    case "cooking":
      return 'src="./assets/images/cooking.png" alt=""';

    case "invoice":
      return 'src="./assets/images/invoice.png" alt=""';

    case "friend":
      return 'src="./assets/images/friend.png" alt=""';

    case "gift":
      return 'src="./assets/images/gift.png" alt=""';

    case "other":
      return 'src="./assets/images/other.png" alt=""';

    default:
      return 'src="./assets/images/shopping.png" alt=""';
  }
};

const renderTitle = (condition, modalTitle) => {
  let title = `<span>${modalTitle}</span> ${
    condition === "income" ? "Income" : "Expenses"
  }`;
  return title;
};

const renderAmount = (type, amount) => {
  let number = `<span>${type == "expenses" ? "-$" : "$"}${amount} </span>`;
  return number;
};

const renderDate = (date) => {
  let dayInString = `Create at: ${date}`;
  return dayInString;
};

submitBtn.addEventListener("click", () => {
  handleSubmit();
});

cancelBtn.addEventListener("click", () => {
  handleCancel();
});

//modal-btn handle end

// caculate total
const caculateTotal = (type, ENTRY__DATA) => {
  let sum = 0;
  ENTRY__DATA.forEach((entry) => {
    if (type == entry.type) {
      sum += entry.amount;
    }
  });
  return sum;
};

const caculateBalance = (income, outcome) => {
  return income - outcome;
};

// caculate total end

const clearElement = (elements) => {
  elements.forEach((e) => {
    e.innerHTML = "";
  });
};

const updateUI = () => {
  income = caculateTotal("income", ENTRY__DATA);
  outcome = caculateTotal("expenses", ENTRY__DATA);
  balance = caculateBalance(income, outcome);

  let sign = income >= outcome ? "$" : "-$";

  balanceDisplay.innerHTML = `${sign}${Math.abs(balance)}`;

  incomeBoardTotal.innerHTML = `<h3>$${income}</h3>`;
  expenseBoardTotal.innerHTML = `<h3>$${outcome}</h3>`;

  console.log(ENTRY__DATA);
};
