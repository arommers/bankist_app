'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements)
{
  containerMovements.innerHTML = '';
  
  movements.forEach(function(mov, i,)
  {
    const type = mov > 0 ? 'deposit' : 'withdrawal'; 
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}


const calcDisplayBalance = function(movements)
{
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
}

const calcDisplaySummary = function(movements)
{
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${income}€`;
  
  const out = movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(deposit => deposit > 0)
    .map(deposit => deposit * 1.2 / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
}

calcDisplaySummary(account1.movements);

const createdUserNames = function(accs)
{
  accs.forEach(function(acc)
  {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });
};

createdUserNames(accounts);

let currentAccount;

btnLogin.addEventListener('click', function(e)
{
  // prevent form from submitting
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value))
  {
    // display ui and welcome message
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // display movements
    displayMovements(currentAccount.movements);

    //display balance
    calcDisplayBalance(currentAccount.movements);

    // display summary
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, mov] of movements.entries())
// {
//   if (mov > 0)
//     console.log(`Movement ${i + 1} You deposited ${mov}`);
//   else
//     console.log(`Movement ${i + 1} You withdrew ${Math.abs(mov)}`);
// }

// console.log(`---- FOR EACH ----`)

// movements.forEach(function(mov, i, arr)
// {
//   if (mov > 0)
//     console.log(`Movement ${i + 1} You deposited ${mov}`);
//   else
//     console.log(`Movement ${i + 1} You withdrew ${Math.abs(mov)}`);
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map)
// {
//   console.log(`${key}:  ${value}`);
// });

// const currenciesSet = new Set(['USD', 'GBP', 'EUR', 'USD', 'EUR']);

// currenciesSet.forEach(function(value, key, set)
// {
//   console.log(`${key}: ${value}`);
// });

