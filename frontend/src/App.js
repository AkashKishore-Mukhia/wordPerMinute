import { Toaster } from 'react-hot-toast'
import Main from './components/main'

function App() {
  return (
    <>
      <Toaster
      toastOptions={{
        style: {
          fontFamily: 'system-ui',
        }
      }} />
      <Main />
    </>
  );
}

export default App;
