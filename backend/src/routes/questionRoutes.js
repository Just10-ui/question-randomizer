import { Router } from 'express';
import { addQuestion, shuffleQuestion, viewQuestion } from '../controller/questionController.js';

const questionRoutes = Router();

questionRoutes.get('/:testId', viewQuestion);
questionRoutes.get('/:testId/shuffle', shuffleQuestion);
questionRoutes.post('/add/:testId', addQuestion);

export default questionRoutes;