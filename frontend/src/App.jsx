import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { useSelector } from 'react-redux';
import ProtectedPage from './components/ProtectedPage';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/protected' element={<ProtectedPage /> }/>
          <Route path='/user/dashboard' element={<UserDashboard />}/>
          {/* <Route path='/dashboard' element={<Dashboard />} />
          {isLoggedIn && role === 'admin' && (
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
          )}
          {isLoggedIn && role === 'user' && (
            <Route path='/user/dashboard' element={<UserDashboard />} />
          )}
          <Route path='/logout' element={<Logout />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

