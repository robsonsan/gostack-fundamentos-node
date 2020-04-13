import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (accumulatedIncome, transaction) =>
          accumulatedIncome + transaction.value,
        0,
      );

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (accumulatedOutcome, transaction) =>
          accumulatedOutcome + transaction.value,
        0,
      );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === 'outcome') {
      const balance = this.getBalance();
      if (balance.total < transaction.value) {
        throw new Error('Valor de retirada maior do que o saldo');
      }
    }

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
