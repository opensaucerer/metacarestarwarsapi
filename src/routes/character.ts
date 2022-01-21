import express, { Router } from 'express';

const chrouter = Router();

import * as character from '../controllers/character';

chrouter.get('/characters/:movieId', character.characters);

export default chrouter;
