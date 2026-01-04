import pool from '../database/db.js';

export const addQuestion = async (req, res) => {
  const { question, test_name } = req.body;

  try {
    const result = await pool.query('INSERT INTO questions (question, test_name) VALUES ($1, $2) RETURNING *;', [question, test_name]);

    res.status(201).json({message: 'Created a new question', test: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.json(500).json({error: 'Server disconnected'});
  }
};

export const viewQuestion = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM questions;');

    const randomize = shuffled(result.rows);

    res.status(200).json(randomize);
  } catch (error) {
    console.log(error);
    res.json(500).json({error: 'Server disconnected'});
  }
};

export const editQuestion = async (req, res) => {
  const { question } = req.body;
  const questionId = req.params.questionId;

  try {
    const result = await pool.query('UPDATE questions SET question = $1 WHERE question_id = $2 RETURNING *;', [question, questionId]);

    res.status(201).json({message: 'Updated a new test', test: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.json(500).json({error: 'Server disconnected'});
  }
};

export const deleteQuestion = async (req, res) => {
  const questionId = req.params.testId;

  try {
    const result = await pool.query('DELETE FROM questions WHERE question_id = $1 RETURNING *;', [questionId]);

    res.status(201).json({message: 'Deleted a test', test: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.json(500).json({error: 'Server disconnected'});
  }
};

function shuffled(array) {
  return array.map(row => ({row, Sort: Math.random()}))
              .sort((a, b) => a.Sort - b.Sort)
              .map(obj => obj.row);
}