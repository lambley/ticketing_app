// route: /auth/signup
import { useState } from 'react';
import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    doRequest();
  };

  const checkError = (field) => {
    if (errors !== null) {
      return errors.find((error) => error.field === field);
    }
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
