import { Keyable } from './interface';

let Sort = {
  name: function (characters: Array<Keyable>, order: string): Array<Keyable> {
    if (order === 'ASC') {
      characters = characters.sort((a: Keyable, b: Keyable) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return characters;
    } else {
      characters = characters.sort((a: Keyable, b: Keyable) => {
        if (b.name > a.name) {
          return 1;
        }
        if (b.name < a.name) {
          return -1;
        }
        return 0;
      });
      return characters;
    }
  },

  height: function (characters: Array<Keyable>, order: string): Array<Keyable> {
    if (order === 'ASC') {
      characters = characters.sort((a: Keyable, b: Keyable) => {
        return Number(a.height) - Number(b.height);
      });
      return characters;
    } else {
      characters = characters.sort((a: Keyable, b: Keyable) => {
        return Number(b.height) - Number(a.height);
      });
      return characters;
    }
  },

  gender: function (characters: Array<Keyable>, order: string): Array<Keyable> {
    if (order === 'ASC') {
      characters = characters.sort((a: Keyable, b: Keyable) => {
        if (a.gender > b.gender) {
          return 1;
        }
        if (a.gender < b.gender) {
          return -1;
        }
        return 0;
      });
      return characters;
    } else {
      characters = characters.sort((a: Keyable, b: Keyable) => {
        if (b.gender > a.gender) {
          return 1;
        }
        if (b.gender < a.gender) {
          return -1;
        }
        return 0;
      });
      return characters;
    }
  },

  filter: function (characters: Array<Keyable>, by: string): Array<Keyable> {
    if (by === 'FEMALE') {
      return characters.filter((character) => {
        return character.gender === 'female';
      });
    } else {
      return characters.filter((character) => {
        return character.gender === 'male';
      });
    }
  },
};

export { Sort };
