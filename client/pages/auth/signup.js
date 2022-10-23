// route: /auth/signup
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const checkError = (field) => {
    return errors.find((error) => error.field === field);
  };

  const renderError = (field) => {
    const error = errors.find((error) => error.field === field);
    return (
      <div className="alert alert-danger">
        <em>{error.message}</em>
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="form-control"
        />
        {checkError('email') && renderError('email')}
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
        {checkError('password') && renderError('password')}
      </div>

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
