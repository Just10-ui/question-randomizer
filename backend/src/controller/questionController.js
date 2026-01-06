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
    const result = await pool.query('SELECT * FROM questions WHERE test_id = $1;', [testId]);
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