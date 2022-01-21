import express, { Router } from 'express';

const brouter = Router();

import * as base from '../controllers/base';

brouter.get('/', base.base);

export default brouter;
