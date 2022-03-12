/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { AuthContextProvider } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <div>{children}</div>);
  return (

    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />

        <title>CoolClear</title>
      </Head>
      <SnackbarProvider>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </SnackbarProvider>

    </>
  );
}

export default MyApp;
