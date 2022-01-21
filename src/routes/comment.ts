import express, { Router } from 'express';

const corouter = Router();

import * as comment from '../controllers/comment';

corouter.post('/comment', comment.comment);
corouter.get('/comments/:movieId', comment.comments);

export default corouter;
