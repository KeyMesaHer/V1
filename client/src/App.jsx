import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UsersContext' // Importa el UserProvider
import ProtectedRoute from './ProtectedRoute'
import AdminPage from './pages/AdminPage'
import UsersPage from './pages/UsersPage'
import RegisterUserPage from './pages/RegisterUserPage'
import Addinformation from './pages/AddInformation'
import EditUserPage from './pages/EditUserPage'
import { TrainingProvider } from './context/TrainingsContext'
import TrainingsPage from './pages/TrainingsPage'


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <TrainingProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />            
            <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/register' element={<RegisterUserPage/>}/>
              <Route path='/user/trainings/:id' element={<Addinformation/>}/>
              <Route path="/user/:id" element={<EditUserPage />} />
              <Route path="/trainings" element={<TrainingsPage />} />
              </Route>
          </Routes>
        </BrowserRouter>
        </TrainingProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
