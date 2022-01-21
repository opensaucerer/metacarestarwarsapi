import { Application, NextFunction, Request, Response } from 'express';
import { Keyable } from '../utilities/interface';
import Comment from '../models/comment';
import handler from '../utilities/message';
const swapi = require('swapi-node');

// movies endpoint
const movies = async (req: Request, res: Response) => {
  try {
    let result: Keyable = await swapi.films();

    let films: Array<Keyable> = [];
    for (let i = 0; i < result.results.length; i++) {
      let movie: Keyable = result.results[i];
      try {
        let comments: Array<Keyable> = await Comment.findAll({
          where: {
            movieId: movie.episode_id,
          },
        });

        films.push({
          title: movie.title,
          movieId: movie.episode_id,
          releaseDate: movie.release_date,
          openingCrawl: movie.opening_crawl,
          commentCount: comments.length,
        });
      } catch (error: any) {
        res.status(500).json({
          status: false,
          error: handler.getMessage('UNKNOWN_ERROR'),
        });
        return;
      }
    }

    res.status(200).json({
      status: true,
      message: handler.getMessage('MOVIE_QUERY_SUCCESS'),
      data: films,
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

export { movies };
