import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/fepi/auth/login' element={<LoginPage/>}/>
          <Route path='/fepi/auth/register' element={<RegisterPage/>}/>
          <Route path='/fepi/profile' element={<ProfilePage/>}/>
          <Route path='/fepi/users' element={<UsersPage/>}/>
          {/* <Route path='/fepi/create-user' element={<UserFormPage/>}/>
          <Route path='/fepi/users/:id' element={<UserFormPage/>}/> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;