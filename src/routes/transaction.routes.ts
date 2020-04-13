import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const resposta = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };
    return response.json(resposta);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;

    return response.json(
      createTransactionService.execute({ title, value, type }),
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
