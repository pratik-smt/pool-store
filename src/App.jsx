import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Authentication/Login';
import ForgetPassword from './Components/Authentication/ForgetPassword';
import ChangePassword from './Components/Authentication/ChangePassword';
import ResetSuccess from './Components/Authentication/ResetSuccess';
import Profile from './Components/AdminProfile/Profile';
import WhatsNew from './Components/WhatsNew/WhatsNew';
import AddNewPost from './Components/WhatsNew/AddNewPost';
import Sidebar from './Components/Layouts/Sidebar';
import OnboardingScreen from './Components/Onboarding/OnboardingScreen';
import Products from './Components/ManageProducts/Products';
import ManageOrders from './Components/ManageOrders/ManageOrders';
import CustomerDatabase from './Components/Customer/CustomerDatabase';
import ChatScreen from './Components/Chat/ChatScreen';
import AddOnbordingScreen from './Components/Onboarding/AddOnbordingScreen';

function App() {

  const user = useSelector((state) => state.authReducer.authData)

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />

            {/* Auth Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/reset-success' element={<ResetSuccess />} />

            {/* SideBar Routes */}
            <Route path='/whats-new' element={<WhatsNew />} />
            <Route path='/add-new-post' element={<AddNewPost />} />

            <Route path='/onboarding-screen' element={<OnboardingScreen />} />
            <Route path='/add-onboarding-screen' element={<AddOnbordingScreen />} />

            <Route path='/customer-database' element={<CustomerDatabase />} />
            <Route path='/manage-products' element={<Products />} />
            <Route path='/manage-orders' element={<ManageOrders />} />
            <Route path='/chat' element={<ChatScreen />} />

            {/* User Routes */}
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
