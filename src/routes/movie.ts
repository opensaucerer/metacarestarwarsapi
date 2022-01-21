import express, { Router } from 'express';

const mrouter = Router();

import * as movie from '../controllers/movie';

mrouter.get('/movies', movie.movies);

export default mrouter;
