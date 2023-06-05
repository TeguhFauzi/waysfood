import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './modal/Login';
import Register from './modal/Register';
import MapContainer from './modal/MapContainer';
import ActiveCartConfirmation from './modal/ActiveCartConfirmation';
import { DropdownContext } from '../context/DropdownContext';

const ModalContainers = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [modalState, modalDispatch] = useContext(DropdownContext);
  return (
    <>
      {/* Login Modal */}
      {authState.isLogin && <Login />}
      {/* Register Modal */}
      {authState.isRegister && <Register />}
      {/* Confirmation Pen Order */}
      {modalState.isPenOrder && <ActiveCartConfirmation />}
    </>
  );
};

export default ModalContainers;
