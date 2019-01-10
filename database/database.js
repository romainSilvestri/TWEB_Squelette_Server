const mongoose = require('mongoose');

const dbURI = 'mongodb://user1:user1@twebte2-shard-00-00-liqhx.mongodb.net:27017,twebte2-shard-00-01-liqhx.mongodb.net:27017,twebte2-shard-00-02-liqhx.mongodb.net:27017/test?ssl=true&replicaSet=TWEBTE2-shard-0&authSource=admin&retryWrites=true';

const options = {
  useNewUrlParser: true,
  dbName: 'TE',
};

mongoose.connect(dbURI, options);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };
