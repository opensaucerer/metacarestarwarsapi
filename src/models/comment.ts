import { DataTypes } from 'sequelize';
import db from '../databases/starwars';

const Comment = db.define(
  'comment',
  {
    publicIP: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 500],
      },
    },
  },
  {
    // Other model options go here
  }
);

// Comment.sync().then(() => {
//   // Table created  successfully
//   console.log('Comment table created successfully');
// });

export default Comment;
