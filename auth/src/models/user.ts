import mongoose from 'mongoose';

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

export { User };
