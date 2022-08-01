import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}

export default MyApp;
