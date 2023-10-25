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
import HomepageBanner from './Components/HomepageBanners/HomepageBanner';
import Products from './Components/ManageProducts/Products';
import ManageOrders from './Components/ManageOrders/ManageOrders';
import CustomerDatabase from './Components/CustomerDatabase/CustomerDatabase';

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

            <Route path='/hompage-banner' element={<HomepageBanner />} />
            <Route path='/customer-database' element={<CustomerDatabase />} />
            <Route path='/manage-products' element={<Products />} />
            <Route path='/manage-orders' element={<ManageOrders />} />
            <Route path='/chat' element={<div>Hello</div>} />

            {/* User Routes */}
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
