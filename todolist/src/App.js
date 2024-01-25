import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Todo from './Pages/todo/Todo';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/todo/:id' element={<ProtectedRoute><Todo/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
