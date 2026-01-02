import pool from '../database/db.js';

export const addTest = async (req, res) => {
  const { test_name } = req.body;

  try {
    const result = await pool.query('INSERT INTO test(test_name) VALUES ($1) RETURNING *;', [test_name]);

    res.status(201).json({message: 'Created a new test', test: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.json(500).json({error: 'Server disconnected'});
  }
};

export const viewTest = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test;');

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.json(500).json({error: 'Server disconnected'});
  }
};