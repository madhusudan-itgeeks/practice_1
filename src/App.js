
import './App.css';
import Routing from './routing/Routing';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
<Routing/>
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>

    
    </div>
  );
}

export default App;
