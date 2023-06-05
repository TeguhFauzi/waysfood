import React, { useContext, useEffect, useState } from 'react';
import profPics from '/img/profile.png';
import OrderHistoryItem from '../components/OrderHistoryItem';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../api/Api';

const Profile = () => {
  const [userState] = useContext(UserContext);
  const [userHistory, setUserHistory] = useState(null);
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery('userCached', async () => {
    const response = await API.get(`/user/${userState?.user.id}`);
    return response.data.data;
  });

  const { data: history, isLoading: historyLoading } = useQuery('historyCached', async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });

  console.log(history);
  console.log(userState);

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  useEffect(() => {
    let userHistory = history?.filter((histor) => (userState.user.role === 'customer' ? histor.CustomerID === userState.user.id : histor.PartnerID === userState.user.id));
    setUserHistory(userHistory);
  }, [history]);

  return (
    <>
      {isLoading && <div className="pt-20">Loading...</div>}
      {user && (
        <React.Fragment>
          <div className="px-44 container mx-auto flex justify-between pt-36">
            <div className="w-3/5">
              <h2 className="text-3xl font-bold mb-3">{userState.user.role === 'partner' ? 'Partner Profile' : 'My Profile'}</h2>
              <div className="flex gap-x-3">
                <div>
                  <img src={user.image_url ? user.image_url : profPics} alt="" className="mb-3 w-56 h-72 object-cover" />
                  <div className="font-sans">
                    <button onClick={() => navigate(userState.user.role === 'partner' ? '/partner-profile-update' : '/customer-profile-update')} className="bg-zinc-800 font-bold text-white py-2 w-full rounded-md">
                      Update Profile
                    </button>
                  </div>
                </div>
                <div className="font-sans">
                  <div>
                    <h3 className="font-bold text-zinc-700">{userState.user.role === 'partner' ? 'Partner Name' : 'FullName'}</h3>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-700">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-700">Phone</h3>
                    <p>{user.phone_number}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/5">
              <h2 className="text-3xl font-bold mb-3">History Transaction</h2>
              {console.log(userHistory)}
              <div>{userHistory && userHistory.map((histor) => <OrderHistoryItem title={userState.user.name} date={new Date(histor.CreatedAt).toDateString()} totalPrice={rupiah(histor.TotalPrice)} status={histor.Status} />)}</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Profile;
