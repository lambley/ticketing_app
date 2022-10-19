import mongoose from 'mongoose';
import { Password } from '../helpers/password';

// User model interface - for User attributes
// interface for user model - all instances must have these fields
interface UserAttrs {
  email: string;
  password: string;
}

// User model interface - for User properties
// extending mongoose.Model and including build method - for TS interface
// interface describing functions for User Collection
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// User Document interface
// interface for describing a single User's properties
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// mongoDB User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// passowrd hashing before saving User password
// function rather than arrow function - so that 'this' in the below referes to the User document and not this User file
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    // hash current User document password and save hash to database
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// refactor buildUser as statics
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// compile User model and export
// add interfaces for UserDoc and UserModel
// UserDoc adds attributes for the model
// UserModel adds return type for the model
// see mongoose.model definition for more info
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// build a new User like this
// const user = User.build({
//   email: 'test@test.com',
//   password: 'pass',
// });

export { User };
