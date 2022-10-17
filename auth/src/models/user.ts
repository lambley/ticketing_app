import mongoose from 'mongoose';

// User model interface - for User attributes
interface UserAttrs {
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

// compile User model and export
const User = mongoose.model('User', userSchema);

// function involve TypeScript in User creation - TS will check attrs
// use this function to create new User instances, instead of creating new instances the mongoose way
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
