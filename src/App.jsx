import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import ModalContainers from './components/ModalContainers';
import Menus from './pages/Menus';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import AddProduct from './pages/AddProduct';
import TransactionTable from './pages/TransactionTable';
import { UserContext } from './context/UserContext';
import { API, setAuthToken } from './api/Api';
import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from './components/PrivateRoute';
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from './pages/Home';
import OwnerMenus from './pages/OwnerMenus';

const App = () => {
  let navigate = useNavigate();
  const [userState, userDispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (userState.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      userDispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log('check user failed : ', error);
      userDispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false);
    }
  };
  return isLoading ? null : (
    <React.Fragment>
      <ModalContainers />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteLogin />}>
          <Route path="/profile" element={<Profile />} />
          <Route element={<PrivateRouteUser />}>
            <Route path="/order" element={<Cart />} />
            <Route path="/customer-profile-update" element={<ProfileUpdate title={'Update Customer Profile'} />} />
            <Route path="/menu/:id" element={<Menus />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/owner-menu" element={<OwnerMenus />} />
            <Route path="/partner-profile-update" element={<ProfileUpdate title={'Update Partner Profile'} />} />
            <Route path="/product-add" element={<AddProduct />} />
            <Route path="/transaction-table" element={<TransactionTable />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
