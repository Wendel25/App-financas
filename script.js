const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransaction = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransaction : []

const remove = ID => {
    transactions = transactions.filter(transaction => 
    transaction.id !== ID);
    updateLocalStorage();
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span> ${operator} R$ ${amountWithoutOperator}</span>
        <button  style="background-color:#6c5fadbb; color:white; border:none;
        font-weight: 900; border-radius:50%; padding-bottom: 3px; cursor:pointer"
        onClick="remove(${transaction.id})">x</button>
    `
    transactionsUl.append(li); 
}

const updateBalanceValues = () => {
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);
    
    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);
    
    const expense = Math.abs( transactionAmounts.filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)) 
        .toFixed(2);

    balanceDisplay.textContent= `R$ ${total}`
    incomeDisplay.textContent= `R$ ${income}`
    expenseDisplay.textContent= `R$ ${expense}`
} 

const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener('submit', event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if (inputTransactionName === ' '|| transactionAmount ==='') {
        alert("preencha todos os campos!");
        return
    }

    const transaction =  {
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    };

    transactions.push(transaction);
    init();
    updateLocalStorage();

    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
   
});

const inputName = document.querySelector('.blockCaracter');

inputName.addEventListener("keypress", function(e) {

    const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if(keyCode > 47 && keyCode < 58) {
        e.preventDefault();
    }
});