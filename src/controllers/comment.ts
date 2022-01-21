import { Application, NextFunction, Request, Response } from 'express';
import { Keyable } from '../utilities/interface';
import Comment from '../models/comment';
import handler from '../utilities/message';
import { Model } from 'sequelize';
const swapi = require('swapi-node');

// publish commment
const comment = async (req: Request, res: Response) => {
  try {
    let movieId: number = Number(req.body.movieId);
    let comment: string = req.body.comment;

    if (!movieId) {
      res.status(400).json({
        status: false,
        error: handler.getMessage('MISSING_MOVIE_ID'),
      });
      return;
    }
    if (!comment) {
      res.status(400).json({
        status: false,
        error: handler.getMessage('COMMENT_REQUIRED'),
      });
      return;
    }

    if (comment.length < 2 || comment.length > 500) {
      res.status(400).json({
        status: false,
        error: handler.getMessage('COMMENT_LENGTH_ERROR'),
      });
      return;
    }

    let newComment: Keyable = await Comment.create({
      publicIP: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      movieId: movieId,
      comment: comment,
    });

    res.status(201).json({
      status: true,
      message: handler.getMessage('COMMENT_CREATE_SUCESS'),
      data: {
        publicIP: newComment.publicIP,
        movieId: newComment.movieId,
        comment: newComment.comment,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt,
      },
    });
    return;
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      status: false,
      error: handler.getMessage('UNKNOWN_ERROR'),
    });
    return;
  }
};

// get comments
const comments = async (req: Request, res: Response) => {
  try {
    let movieId: number = Number(req.params.movieId);

    if (!movieId) {
      res.status(400).json({
        status: false,
        error: handler.getMessage('MISSING_MOVIE_ID'),
      });
      return;
    }

    let comments: Array<Keyable> = await Comment.findAll({
      where: {
        movieId: movieId,
      },
      attributes: {
        exclude: ['id'],
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      status: true,
      message: handler.getMessage('COMMENT_QUERY_SUCCESS'),
      data: comments,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: handler.getMessage('UNKNOWN_ERROR'),
    });
    return;
  }
};

export { comment, comments };
