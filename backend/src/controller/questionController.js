import pool from '../database/db.js';
import { shuffle } from '../utils/index.js';

export const addQuestion = async (req, res) => {
  const { description } = req.body;
  const testId = req.params.testId;

  try {
    const result = await pool.query('INSERT INTO questions(description, test_id) VALUES ($1, $2) RETURNING *;', [description, testId]);

    res.status(201).json({message: 'Question have been added', result: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};

export const viewQuestion = async (req, res) => {
  const testId = req.params.testId;
  try {
    const result = await pool.query('SELECT * FROM questions WHERE test_id = $1 ORDER BY question_id;', [testId]);
    res.status(201).json({message: 'These are all the questions', result: result.rows});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};

export const shuffleQuestion = async (req, res) => {
  const testId = req.params.testId;
  try {
    const result = await pool.query('SELECT * FROM questions WHERE test_id = $1;', [testId]);
    const randomize = shuffle(result.rows);
    res.status(201).json({message: 'These are all the questions', result: randomize});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};

export const editQuestion = async (req, res) => {
  const { description } = req.body;
  const questionId = req.params.questionId;

  try {
    const result = await pool.query('UPDATE questions SET description = $1 WHERE question_id = $2 RETURNING *;', [description, questionId]);

    res.status(200).json({message: 'Question has been updated', question: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};

export const deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const result = await pool.query('DELETE FROM questions WHERE question_id = $1 RETURNING *;', [questionId]);

    res.status(200).json({message: 'Question has been deleted', question: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};