import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
  console.log(currentUser);

  return currentUser ? (
    <div>
      <h1>You are signed in</h1>
    </div>
  ) : (
    <div>
      <h1>
        You are <strong>not</strong> signed in
      </h1>
    </div>
  );
};

Index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default Index;
