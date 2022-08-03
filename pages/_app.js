import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from 'context/auth';
import NextNProgress from 'nextjs-progressbar';
import { ModalContainer } from 'hooks/useModal';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NextNProgress color="#7E57FF" height={5} />
      <ModalContainer>
        <Component {...pageProps} />
      </ModalContainer>
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;
