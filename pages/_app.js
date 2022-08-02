import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from 'context';
import useProviderAuth from 'hooks/useAuthProvider';

function MyApp({ Component, pageProps }) {
  const auth = useProviderAuth();
  return (
    <AuthContext.Provider value={auth}>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default MyApp;
