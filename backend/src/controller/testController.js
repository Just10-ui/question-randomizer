import pool from '../database/db.js';

export const viewTest = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test;');

    res.status(200).json({message: 'This is all the test', test: result.rows});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};

export const addTest = async (req, res) => {
  const { testName } = req.body;

  try {
    const result = await pool.query('INSERT INTO test(test_name) VALUES ($1) RETURNING *;', [testName]);

    res.status(201).json({message: 'Test successfully created', test: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server can\'t be reached'});
  }
};