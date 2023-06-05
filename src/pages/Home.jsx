import React, { useContext, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SmallRestoList from '../components/SmallRestoList';
import BigRestoList from '../components/BigRestoList';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../api/Api';

const Home = () => {
  const [restos, setRestos] = useState(null);
  const [userState, userDispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const { data: users, isLoading } = useQuery('userProfileCached', async () => {
    const response = await API.get(`/users`);
    return response.data.data;
  });

  useEffect(() => {
    if (userState.user.role === 'partner') {
      navigate(`/menu/${userState.user.id}`);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      users && setRestos(users?.filter((user) => user.role === 'partner'));
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      <Hero />
      <SmallRestoList />
      <BigRestoList data={restos} loading={isLoading} landing={true} listTitle={'Restaurant Near You'} className={'py-10'} />
    </React.Fragment>
  );
};

export default Home;
