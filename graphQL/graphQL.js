const { buildSchema } = require('graphql');
const { UserModel } = require('../database/database');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type User {
    id: String!
    username: String!
    password: String!
  }

  type Query {
    getUser(userId: String!) : User
    createUser(username: String!, password: String!): User
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  createUser: ({ username, password }) => new Promise((resolve) => {
    const newUser = new UserModel({ username, password });
    UserModel.findOne({ username }, { password: 0 }).then((data) => {
      if (data === null) {
        newUser.save()
          .then(() => {
            newUser.password = null;
            resolve(newUser);
          })
          .catch((err) => {
            resolve(err);
          });
      } else {
        resolve(null);
      }
    });
  }),
  getUser: ({ userId }) => new Promise((resolve) => {
    UserModel.findOne({ _id: userId }, { password: 0 })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(err);
      });
  }),
};

module.exports = { schema, root };
