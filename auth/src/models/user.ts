import mongoose from 'mongoose';

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
// refactor buildUser as statics
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// compile User model and export
// add interfaces for UserDoc and UserModel
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// build a new User like this
// const user = User.build({
//   email: 'test@test.com',
//   password: 'pass',
// });

export { User };
