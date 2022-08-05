
// A retailer offers a rewards program to its customers awarding points based on each recorded purchase as follows:

// For every dollar spent over $50 on the transaction, the customer receives one point.

// In addition, for every dollar spent over $100, the customer receives another point.

// Ex: for a $120 purchase, the customer receives

// (120 - 50) x 1 + (120 - 100) x 1 = 90 points

// Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.


function calcRewards(purchasePrice) {
    if (purchasePrice >=50 && purchasePrice < 100) {
        return purchasePrice-50;
    } else if (purchasePrice >100){
        return (2*(purchasePrice-100) + 50);
    }
    return 0;
}

class Transaction {
    constructor(purchasePrice) {
        this.purchasePrice = purchasePrice;
        this.rewards = calcRewards(purchasePrice);
        this.transactionDate = new Date();
    }
}

class TransactionList {
    constructor() {
        this.list = [];
    }

    getLast3Months() {
        var today = new Date();
        const threeOldDate = today.setMonth(today.getMonth() - 3);
        let filteredList = this.list.filter(trans => trans.transactionDate > threeOldDate);
        return filteredList.sort((a,b) => b.transactionDate - a.transactionDate);
    }

    getAllTransactions() {
        return this.list.sort((a,b) => b.transactionDate-a.transactionDate);
    }

    addNewTransaction(purchasePrice) {
        const transaction = new Transaction(purchasePrice);
        this.list.push(transaction);
    }

    getTotalRewardsPoints() {
        return this.list.length ? this.list.reduce((acc,key)=>key.rewards+acc, 0) : 0;
    }

    rewardPointsPerMonth() {
        let last3MonthRewards = [];
        for(let i=0; i<3; i++) {
            let filteredList = this.list.filter(trans => trans.transactionDate.getMonth() == (new Date).getMonth() - i );
            last3MonthRewards[i] = filteredList.reduce((acc,key)=>key.rewards+acc,0);
        }
        return last3MonthRewards;
    }
}

let myTransactionList = new TransactionList();
myTransactionList.addNewTransaction(368);
myTransactionList.addNewTransaction(16);
myTransactionList.addNewTransaction(78);
myTransactionList.addNewTransaction(250);
myTransactionList.addNewTransaction(170);
let arr = myTransactionList.getAllTransactions();