import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

Index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default Index;
