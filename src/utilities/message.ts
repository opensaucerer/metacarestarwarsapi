import { Keyable } from './interface';

class Message {
  messages: Keyable;

  constructor() {
    this.messages = {
      UNKNOWN_ERROR: 'An unknown error occurred',
      MOVIE_QUERY_SUCCESS: 'Successfully retrieved all movies',
      COMMENT_QUERY_SUCCESS: 'Successfully retrieved all comments',
      CHARACTER_QUERY_SUCCESS: 'Successfully retrieved all characters',
      MISSING_MOVIE_ID: 'Movie ID is required',
      COMMENT_LENGTH_ERROR: 'Comment must be between 2 and 500 characters',
      COMMENT_REQUIRED: 'Comment is required',
      COMMENT_CREATE_SUCESS: 'Successfully created comment',
      INVALID_SORT_NAME: 'You can only sort by name ASC or DESC',
    };
  }

  getMessage(key: string): string {
    return this.messages[key];
  }
}

export default new Message();
