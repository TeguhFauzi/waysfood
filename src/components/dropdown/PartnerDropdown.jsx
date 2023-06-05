import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsFillTriangleFill } from 'react-icons/bs';
import { useContext } from 'react';
import { DropdownContext } from '../../context/DropdownContext';
import { IoFastFoodOutline } from 'react-icons/io5';
import { UserContext } from '../../context/UserContext';

const PartnerDropdown = () => {
  const [dropdownState, dropdownDispatch] = useContext(DropdownContext);
  const [userState, userDispatch] = useContext(UserContext);
  return (
    <>
      <div className="absolute right-3 text-white mt-2 z-[10000]">
        <BsFillTriangleFill />
      </div>
      <div onMouseLeave={() => dropdownDispatch({ type: 'CLOSE_DROPDOWN' })} className="w-44 font-sans absolute bg-white mt-5 right-0 rounded-md shadow-lg z-[10000]">
        <Link to={'/profile'} className="pl-4 py-2 flex items-center gap-x-3 ">
          <FaUser />
          <span className="font-semibold">Profile Partner</span>
        </Link>
        <Link to={'/product-add'} className="pl-4 py-2 flex items-center gap-x-3 ">
          <IoFastFoodOutline />
          <span className="font-semibold">Add Product</span>
        </Link>
        <Link to={`/owner-menu`} className="pl-4 py-2 flex items-center gap-x-3 ">
          <IoFastFoodOutline />
          <span className="font-semibold">My Menu</span>
        </Link>
        <hr />
        <button onClick={() => userDispatch({ type: 'LOGOUT' })} className="pl-4 py-2 flex items-center gap-x-3 ">
          <FaSignOutAlt className="text-red-700" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </>
  );
};

export default PartnerDropdown;
