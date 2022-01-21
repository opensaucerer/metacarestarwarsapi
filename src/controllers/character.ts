import { Application, NextFunction, Request, Response } from 'express';
import { Keyable } from '../utilities/interface';
import Comment from '../models/comment';
import handler from '../utilities/message';
import { Sort } from '../utilities/sort';
const swapi = require('swapi-node');

// get characters
const characters = async (req: Request, res: Response) => {
  try {
    let movieId: number = Number(req.params.movieId);

    let { name, gender, height, filter }: any = req.query;

    if (!movieId) {
      res.status(400).json({
        status: false,
        error: handler.getMessage('MISSING_MOVIE_ID'),
      });
      return;
    }

    let films: Keyable = await swapi.films();
    let film = films.results.find(
      (film: Keyable) => film.episode_id === movieId
    );

    let characters: Array<Keyable> = [];

    for (let i = 0; i < film.characters.length; i++) {
      let character: Keyable = await swapi.get(film.characters[i]);
      characters.push(character);
    }

    // sorting
    var final: Array<Keyable>;

    final = name ? Sort.name(characters, name) : characters;
    final = height ? Sort.height(characters, height) : final;
    final = gender ? Sort.gender(characters, gender) : final;

    // filtering
    final = filter ? Sort.filter(final, filter) : final;

    let totalMatch: number = final.length;
    let totalHeight: number = final.reduce(
      (total: number, character: Keyable) => {
        return total + Number(character.height);
      },
      0
    );

    res.status(200).json({
      status: true,
      message: handler.getMessage('CHARACTER_QUERY_SUCCESS'),
      data: {
        characters: final,
        totalMatch,
        totalHeight: {
          cm: totalHeight,
          ft: Math.floor(totalHeight / 30.48),
          inches: Math.floor(totalHeight / 2.54),
        },
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

export { characters };
