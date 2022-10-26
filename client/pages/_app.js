// custom app wrapper to include boostrap globally
// see here for more details: https://nextjs.org/docs/basic-features/built-in-css-support
import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';

const _App = ({ Component, pageProps }) => {
  return (
    <div>
      <h1>Header</h1>
      <Component {...pageProps} />
    </div>
  );
};

_App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default _App;
