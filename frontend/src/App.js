import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (  
    <BrowserRouter>
      <div>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
