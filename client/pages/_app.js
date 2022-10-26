// custom app wrapper to include boostrap globally
// see here for more details: https://nextjs.org/docs/basic-features/built-in-css-support
import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';

const _App = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>Hi, {currentUser.email}</h1>
      <Component {...pageProps} />
    </div>
  );
};

_App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  // to call getInitialProps in child pages
  let pageProps = {};
  // check if there are getIntialProps
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  // this is passed to _App's pageProps
  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default _App;
