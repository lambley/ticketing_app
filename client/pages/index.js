import axios from 'axios';

const Index = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

Index.getInitialProps = async ({ req }) => {
  // check if there is a window (browser) object, we are on the browser. If not, on the server
  if (typeof window === 'undefined') {
    // server-side - need to use Cross namespace naming
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      // either hardcode the host or send req.headers
      {
        headers: {
          Host: 'ticketing.dev',
        },
      }
    );

    return data;
  } else {
    // client-side - can use an empty base url
    const { data } = await axios.get('/api/users/currentuser');

    // { currentUser: {} || null }
    return data;
  }
};

export default Index;
