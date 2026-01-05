import cors from 'cors';
import express from 'express';

export const parseJson = express.json();
export const crossOrig = cors({origin: 'http://localhost:5500'});