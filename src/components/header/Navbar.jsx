import { useContext, useEffect, useState } from 'react';
import navBrandIcon from '/nav-Icon.svg';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import profilePic from '/img/profile.png';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { DropdownContext } from '../../context/DropdownContext';
import CustomerDropdown from '../dropdown/CustomerDropdown';
import PartnerDropdown from '../dropdown/PartnerDropdown';
import { useQuery } from 'react-query';
import { API } from '../../api/Api';

const Navbar = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [userState, userDispatch] = useContext(UserContext);
  const [dropdownState, dropdownDispatch] = useContext(DropdownContext);
  const [pendingOrder, setPendingOrder] = useState(null);
  const {
    data: carts,
    isLoading,
    isRefetching,
  } = useQuery('cartsIncCached', async () => {
    const response = await API.get(`/carts`);
    return response.data.data;
  });

  useEffect(() => {
    if (!isLoading || isRefetching) {
      carts && setPendingOrder(carts.filter((cart) => cart.Status == 'pending' && cart.CustomerID == userState.user.id));
    }
  }, [isLoading, carts, isRefetching]);

  return (
    <nav className="bg-yellow-300 fixed left-0 right-0">
      <div className="px-8 container mx-auto flex justify-between items-center py-4">
        <Link to={'/'}>
          <img src={navBrandIcon} alt="" />
        </Link>
        <div>
          {/*  if there is no current user login */}
          {!userState.isLogin && (
            <div className="buttons flex gap-x-5 font-bold">
              <button className="bg-zinc-800 ring-4 ring-zinc-800 text-white px-8 py-1 rounded-md hover:bg-zinc-900 hover:ring-zinc-900" onClick={() => authDispatch({ type: 'OPEN_REGISTER_MODAL' })}>
                Register
              </button>
              <button className="bg-transparent ring-4 ring-zinc-800 text-zinc-800 px-8 py-1 rounded-md hover:bg-zinc-800 hover:ring-zinc-800 hover:text-white" onClick={() => authDispatch({ type: 'OPEN_LOGIN_MODAL' })}>
                Login
              </button>
            </div>
          )}

          {/* if there is current user is login */}
          {userState.isLogin && (
            <div className="relative">
              <div className="flex gap-x-3">
                <button className="relative">
                  {userState.user.role == 'partner' || pendingOrder?.length <= 0 ? null : (
                    <div className="absolute -right-2 top-0 bg-red-500 text-white w-5 h-5 rounded-full">
                      <p>{pendingOrder?.length}</p>
                    </div>
                  )}
                  {userState.user.role === 'partner' ? null : (
                    <Link to={'/order'}>
                      <AiOutlineShoppingCart size={32} />
                    </Link>
                  )}
                </button>
                <img onMouseEnter={() => dropdownDispatch({ type: 'OPEN_DROPDOWN' })} className="w-10 h-10 rounded-full cursor-pointer" src={userState.user.image_url ? userState.user.image_url : profilePic} alt="Rounded avatar" />
              </div>

              {/* Customer Dropdown */}
              {userState.user.role == 'customer' && dropdownState.isCustomer && <CustomerDropdown />}
              {/* Partner Dropdown */}
              {userState.user.role == 'partner' && dropdownState.isPartner && <PartnerDropdown />}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
