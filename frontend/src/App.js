import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import CreateTour from './pages/CreateTour';

function App() {
  return (  
    <BrowserRouter>
      <div>
        <Header />
        <ToastContainer />
        <div style={{marginTop: '5rem'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreateTour />} />
            <Route path='/edit-tour:id' element={<CreateTour />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
