"use strict";

// ----------------------- DOM Data Message -----------------------------\\
const incomeSection = document.querySelector(".income");
const expenseSection = document.querySelector(".expense");

// -----------------------  Data Validation Function -----------------------------\\

// Validate description fields
const validateIncome = function () {
  let isValid = true;
  const incomeFields = document.querySelectorAll("[data-income-source]");
  const incomeFieldErrors = document.querySelectorAll(
    "[data-error-income-source]"
  );
  const incomeAmounts = document.querySelectorAll("[data-income-amount]");
  const incomeAmountErrors = document.querySelectorAll(
    "[data-error-income-amount]"
  );

  // Loop through each income field
  incomeFields.forEach((field, index) => {
    // Get corresponding error element
    const errorElement = incomeFieldErrors[index];

    if (field.value.trim() === "") {
      errorElement.innerText = "Income source is required";
      field.classList.add("error-message");
      isValid = false;
    } else {
      errorElement.innerText = "";
      field.classList.remove("error-message");
    }
  });

  incomeAmounts.forEach((amount, index) => {
    const errorElement = incomeAmountErrors[index];

    if (amount.value === 0) {
      errorElement.innerText = "Please enter a valid number";
      amount.classList.add("error-message");
      isValid = false;
    } else {
      errorElement.innerText = "";
      amount.classList.remove("error-message");
    }

    if (amount.value < 0) {
      errorElement.innerText = "Please enter a positive number";
      amount.classList.add("error-message");
      isValid = false;
    } else {
      errorElement.innerText = "";
      amount.classList.remove("error-message");
    }

    if (amount.value === "") {
      errorElement.innerText = "Please enter a number";
      amount.classList.add("error-message");
      isValid = false;
    } else {
      errorElement.innerText = "";
      amount.classList.remove("error-message");
    }
  });

  return isValid;
};

const validateExpenses = function () {
  const expenseFields = document.querySelectorAll("[data-expense-source]");
  const expenseFieldErrors = document.querySelectorAll(
    "[data-error-expense-source]"
  );
  const expenseAmounts = document.querySelectorAll("[data-expense-amount]");
  const expenseAmountErrors = document.querySelectorAll(
    "[data-error-expense-amount]"
  );

  let isValid = true;
  // Similar validation for expenses
  expenseFields.forEach((field, index) => {
    const errorElement = expenseFieldErrors[index];

    if (field.value.trim() === "") {
      errorElement.innerText = "Expense source is required";
      field.classList.add("error-message");
      isValid = false;
    } else {
      errorElement.innerText = "";
      field.classList.remove("error-message");
    }
  });

  expenseAmounts.forEach((amount, index) => {
    const errorElement = expenseAmountErrors[index];

    if (amount.value === "") {
      errorElement.innerText = "Please enter a valid number";
      amount.classList.add("error-message");
      isValid = false;
    } else if (amount.value < 0) {
      errorElement.innerText = "Please enter a positive number";
      amount.classList.add("error-message");
      isValid = false;
    } else {
      errorElement.innerText = "";
      amount.classList.remove("error-message");
    }
  });

  return isValid;
};

// ------------------------------------------- Refactored OOP -----------------------------------------------\\

class SectionToggle {
  constructor(sectionType) {
    // keeps the variable we pass in
    this.sectionType = sectionType;
    // maximum amount of inputs
    this.maxSections = 8;
    // grabs either income or expense section
    this.section = document.querySelector(`.${sectionType}`);
    this.init();
  }

  init() {
    // Handle add buttons
    const addButtons = document.querySelectorAll(
      `[data-add-${this.sectionType}]`
    );
    addButtons.forEach((btn) => {
      btn.addEventListener("click", () => this.addSection());
    });
  }

  addSection() {
    const currentSections = document.querySelectorAll(
      `.${this.sectionType}__section`
    );
    // refrains user from adding more than 8 sections
    if (currentSections.length >= this.maxSections) return;

    // creates number to be passed into function to change form id and name attribute in html
    const addNum = currentSections.length + 1;

    // uses template literals to dynamically add new sections
    const newField = this.createSectionHTML(addNum);

    const newDiv = document.createElement("div");
    // ensures styling gets applied to new div

    newDiv.classList.add(`${this.sectionType}__section`);

    newDiv.innerHTML = newField;
    this.section.append(newDiv);

    // Attach event listeners to the new buttons
    newDiv
      .querySelector(`[data-add-${this.sectionType}]`)
      .addEventListener("click", () => this.addSection());
    newDiv
      .querySelector(`[data-subtract-${this.sectionType}]`)
      .addEventListener("click", (e) => this.removeSection(e));
  }

  removeSection(e) {
    // now to remove sections, follow previous logic
    const currentSections = document.querySelectorAll(
      `.${this.sectionType}__section`
    );
    // won't run if there already is a section. HTML takes care of this anyways but better safe than sorry
    if (currentSections.length === 1) return;

    const section = e.target.closest(`.${this.sectionType}__section`);
    if (section) {
      section.remove();
    }
  }

  createSectionHTML(num) {
    // Inner html, for every new div, str literal helps with keeping the form intact, counts by 1 and changes name, ID, and for label
    if (this.sectionType === "income") {
      return `
        <label for="source--${num}" class="income__label">Description</label>
        <input
          data-income-source
          type="text"
          class="income__source"
          placeholder="Freelance, Side Gig, Salary"
          id="source--${num}"
          name="source--${num}"
        />
        <p class="error" data-error-income-source></p>

        <label for="income--${num}" class="income__label">Amount</label>
        <input
          data-income-amount
          type="number"
          step="0.01"
          pattern='^\d*(\.\d{0,2})?$'
          class="income__amount"
          placeholder="$0.00"
          id="income--${num}"
          name="income--${num}"
        />
        <p class="error" data-error-income-amount></p>

        <button type="button" class="btn btn--add" data-add-income>+</button>
        <button type="button" class="btn btn--subtract" data-subtract-income>-</button>
      `;
    } else if (this.sectionType === "expense") {
      return `
        <label for="exp-source--${num}" class="expense__label">Description</label>
        <input
          data-expense-source
          type="text"
          class="expense__source"
          placeholder="Groceries, Utilities, Rent"
          id="exp-source--${num}"
          name="exp-source--${num}"
        />
        <p class="error" data-error-expense-source></p>

        <label for="expense--${num}" class="expense__label">Amount</label>
        <input
          data-expense-amount
          type="number"
          step="0.01"
          pattern='^\d*(\.\d{0,2})?$'
          class="expense__amount"
          placeholder="$0.00"
          id="expense--${num}"
          name="expense--${num}"
        />
        <p class="error" data-error-expense-amount></p>

        <button type="button" class="btn btn--add" data-add-expense>+</button>
        <button type="button" class="btn btn--subtract" data-subtract-expense>-</button>
      `;
    }
  }
}

// creating instances for income and expense sections
const incomeManager = new SectionToggle("income");
const expenseManager = new SectionToggle("expense");

// // ----------------------- Adding/Removing Inputs Old Code -----------------------------\\

// const addNewIncomeBtn = document.querySelectorAll("[data-add-income]");

// // ------------------------------- Add/Remove Inputs to Income Function ------------------------------\\

// const appendIncomeInput = function () {
//   const currentSections = document.querySelectorAll(".income__section");

//   if (currentSections.length >= 8) return;

//   let addNum = currentSections.length + 1;
//   let newField = `
//               <label for="source--${addNum}" class="income__label">
//                 Description</label
//               >

//               <input
//                 data-income-source
//                 type="text"
//                 class="income__source"
//                 placeholder="Freelance, Side Gig, Salary"
//                 id="source--${addNum}"
//                 name="source--${addNum}"
//               />
//             <p class="error" data-error-income-source></p>

//               <label for="income--${addNum}" class="income__label">Amount</label>
//               <input
//                 data-income-amount
//                 type="number"
//                 step="0.01"
//                 pattern='^\d*(\.\d{0,2})?$'
//                 class="income__amount"
//                 placeholder="$0.00"
//                 id="income--${addNum}"
//                 name="income--${addNum}"
//               />
//             <p class="error" data-error-income-amount ></p>

//               <button type="button" class="btn btn--add" data-add-income>
//                 +
//               </button>
//               <button type="button" class="btn btn--subtract" data-subtract-income>
//                 -
//               </button>`;
//   const newDiv = document.createElement("div");
//   newDiv.classList.add("income__section");
//   newDiv.innerHTML = newField;
//   incomeSection.append(newDiv);
//   newDiv
//     .querySelector("[data-add-income]")
//     .addEventListener("click", appendIncomeInput);
//   newDiv
//     .querySelector("[data-subtract-income]")
//     .addEventListener("click", removeIncomeInput);
// };

// const removeIncomeInput = function (e) {
//   const currentSections = document.querySelectorAll(".income__section");
//   if (currentSections.length === 1) return;
//   const section = e.target.closest(".income__section");
//   if (section) {
//     section.remove();
//   }
// };

// // ------------------------------- Add Income Inputs Handler ------------------------------\\

// addNewIncomeBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     appendIncomeInput();
//   });
// });

// // ----------------------- Adding/Removing Inputs to Income Section DOM -----------------------------\\
// const addNewExpenseBtn = document.querySelectorAll("[data-add-expense]");

// // expense and income section declared at top of Doc

// // ------------------------------- Add/Remove Inputs to Income Function ------------------------------\\

// const appendExpenseInput = function () {
//   const currentSections = document.querySelectorAll(".expense__section");

//   if (currentSections.length >= 8) return;

//   let addNum = currentSections.length + 1;
//   let newField = `
//     <label for="exp-source--${addNum}" class="expense__label">Description</label>
//     <input
//       data-expense-source
//       type="text"
//       class="expense__source"
//       placeholder="Groceries, Utilities, Rent"
//       id="exp-source--${addNum}"
//       name="exp-source--${addNum}"
//     />
//     <p class="error" data-error-expense-source></p>

//     <label for="expense--${addNum}" class="expense__label">Amount</label>
//     <input
//       data-expense-amount
//       type="number"
//       step="0.01"
//       pattern='^\d*(\.\d{0,2})?$'
//       class="expense__amount"
//       placeholder="$0.00"
//       id="expense--${addNum}"
//       name="expense--${addNum}"
//     />
//     <p class="error" data-error-expense-amount></p>

//     <button type="button" class="btn btn--add" data-add-expense>
//       +
//     </button>
//     <button type="button" class="btn btn--subtract" data-subtract-expense>
//       -
//     </button>
//   `;
//   const newDiv = document.createElement("div");
//   newDiv.classList.add("expense__section");
//   newDiv.innerHTML = newField;
//   expenseSection.append(newDiv);

//   newDiv
//     .querySelector("[data-add-expense]")
//     .addEventListener("click", appendExpenseInput);
//   newDiv
//     .querySelector("[data-subtract-expense]")
//     .addEventListener("click", removeExpenseInput);
// };

// const removeExpenseInput = function (e) {
//   const currentSections = document.querySelectorAll(".expense__section");
//   if (currentSections.length === 1) return;
//   const section = e.target.closest(".expense__section");
//   if (section) {
//     section.remove();
//   }
// };

// // ------------------------------- Add/Remove Inputs to Income Function ------------------------------\\

// addNewExpenseBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     appendExpenseInput();
//   });
// });

// ------------------------------------------- Calculate Income DOM -----------------------------------------------\\

// Looking for our Form and its Submission
const formSubmit = document.querySelector("#form");

// Finding the Summary Section so we can append our message
const summarySection = document.querySelector("[data-summary]");

// ------------------------------------------- Calculate Income Function -----------------------------------------------\\

// storing Income in JS object
const getIncomeInputValues = function () {
  const incomeName = document.querySelectorAll("[data-income-source]");
  const incomeAmount = document.querySelectorAll("[data-income-amount]");

  // I have to initialize an empty object to then be able to add Key/Value Pairs in said object
  const incomeDeclared = {};
  const incomeSourceTypes = {};

  // accessing the for Dollar Amount of Income
  incomeAmount.forEach((input) => {
    incomeDeclared[input.name] = parseFloat(input.value);
    console.log(incomeDeclared);
  });

  // Accessing the income source input
  incomeName.forEach((input) => {
    incomeSourceTypes[input.name] = input.value.trim();
    console.log(incomeSourceTypes);
  });
  // return an object that can organize all our income amounts and sources
  return { sources: incomeSourceTypes, amounts: incomeDeclared };
};

// ------------------------------------------- Calculate Expense Function -----------------------------------------------\\

const getExpenseInputValues = function () {
  const expenseName = document.querySelectorAll("[data-expense-source]");
  const expenseAmount = document.querySelectorAll("[data-expense-amount]");

  // Same logic as income input
  const expenseDeclared = {};
  const expenseSourceTypes = {};

  expenseAmount.forEach((input) => {
    expenseDeclared[input.name] = parseFloat(input.value) || 0;
  });

  expenseName.forEach((input) => {
    expenseSourceTypes[input.name] = input.value.trim();
  });

  return { sources: expenseSourceTypes, amounts: expenseDeclared };
};

// ------------------------------------------- Calculate Budget DOM -----------------------------------------------\\

const calcTotal = function (objectParam) {
  // reduce is an array method, and since Object.values returns an array,
  // I'm able to cleanly calculate through the object.
  // Reduce takes a callback function as a parameter, then an initial starting value
  return Object.values(objectParam).reduce((total, amount) => {
    return total + amount;
  }, 0);
};

function calculate() {
  // grabs the objects created in our previous functions
  const totalIncomeObj = getIncomeInputValues();
  const totalExpenseObj = getExpenseInputValues();

  // calls back to our function that grabs a total amount for both income and expense objects.
  // .amounts refers to the object we previously made in both getExpenseValues and getIncomeValues
  let totalIncome = calcTotal(totalIncomeObj.amounts);
  let totalExpense = calcTotal(totalExpenseObj.amounts);

  let biWeekly = totalIncome / 2;
  let finalTotal = totalIncome - totalExpense;
  let dailyExpense = totalExpense / 30;

  return displayResults(
    finalTotal.toFixed(2),
    biWeekly.toFixed(2),
    dailyExpense.toFixed(2)
  );
}

function displayResults(finalAmount, biWeekly, dailyExpense) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("summary");
  const budgetURL =
    "https://www.ramseysolutions.com/dave-ramsey-7-baby-steps?gad_source=1&gad_campaignid=197939186&gbraid=0AAAAAD_Z1jz6vxT9Z6xILcDXGWnxPsucx&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGC59FrFrAhb9_czg74mc9UBNhoo_7SJtVd9AG5CidxcZiogSrBJo9RoC_IoQAvD_BwE";
  const investURL =
    "https://www.nerdwallet.com/m/investing/compare-online-brokers-for-ira-nwam?utm_source=goog&utm_medium=cpc&utm_campaign=in_mktg_paid_2025_ira&utm_term=ira%20account&utm_content=ta&gad_source=1&gad_campaignid=22393064308&gbraid=0AAAAADfKLw0RjLRS3QSFX2kRywRK4mA1J&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGC6Wzuo0qhMQfQl8ctBL5koz-SAckxvTLXW7WYBqGbz3-2veSg5wNhoC2tgQAvD_BwE";
  const sideURL =
    "https://www.shopify.com/blog/side-hustle?term=&adid=732992717445&campaignid=19683492884&utm_medium=cpc&utm_source=google&gad_source=1&gad_campaignid=19683492884&gbraid=0AAAAADp4t0q2MPOdk2QCv6xj-4e437DKd&gclid=CjwKCAjw49vEBhAVEiwADnMbbDdTcPj330yBASUjBwa4zCq0pcln7sWbWMAez1MXGu-NsJefNei1dxoCL94QAvD_BwE&cmadid=516586854;cmadvertiserid=10730501;cmcampaignid=26990768;cmplacementid=324494812;cmcreativeid=163722649;cmsiteid=5500011";
  if (finalAmount <= 0) {
    newDiv.innerHTML = `<h3 class="summary__h3">Your Budget at a Glance</h3>
            <p class="summary__para">Your Bi-weekly Income is:${biWeekly}</p>
            <p class="summary__para">You are: $${finalAmount} over budget!</p>
            <p class="summary__para">
              Sorry, here are some resources: <a class="summary__anchor" href="${budgetURL}"> Getting out of Debt, Buidling Wealth </a>
            </p>
            <p class="summary__para">On average, this month you spent $${dailyExpense} per day!</p>
            <button type="reset" class="btn budget__reset" data-reset>
              Reset
            </button>
`;
  } else {
    newDiv.innerHTML = `<h3 class="summary__h3">Your Budget at a Glance</h3>
            <p class="summary__para">Your Bi-weekly Income is: $${biWeekly}</p>
            <p class="summary__para">You are: $${finalAmount} under budget!</p>
            <p class="summary__para">
              Congrats, here are some resources: <a class="summary__anchor" href="${investURL}"> Invest and Build Wealth</a>
            </p>
            <p class="summary__para">On average, this month you spent $${dailyExpense} per day!</p>
            <button type="reset" class="btn budget__reset" data-reset>
              Reset
            </button>
`;
  }

  summarySection.append(newDiv);
}

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear any existing summary results
  const existingSummary = summarySection.querySelector(".summary");
  if (existingSummary) {
    existingSummary.remove();
  }

  const isIncomeValid = validateIncome();
  const isExpenseValid = validateExpenses();

  // Only calculate if both validations pass
  if (isIncomeValid && isExpenseValid) {
    calculate();
  }
});
