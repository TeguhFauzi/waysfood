import React, { useContext, useEffect, useState } from 'react';
import BigRestoList from '../components/BigRestoList';
import { UserContext } from '../context/UserContext';
import { useQuery } from 'react-query';
import { API } from '../api/Api';
import { useParams } from 'react-router-dom';

const OwnerMenus = () => {
  const [prods, setProds] = useState(null);
  const [userState, _] = useContext(UserContext);
  let id = userState.user.id;

  const { data: products, isLoading } = useQuery('productsCached', async () => {
    const response = await API.get(`/products`);
    return response.data.data;
  });
  // console.log(products?.filter((product) => product.PartnerID === Number(id)));

  useEffect(() => {
    if (!isLoading) {
      products && setProds(products?.filter((product) => product.PartnerID === Number(id)));
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      <BigRestoList data={prods} loading={isLoading} orderBtn={true} listTitle={userState.user.role === 'partner' ? `${userState.user.name}, menus` : `Geprek Bensu, Menus`} className={'pt-36'} />
    </React.Fragment>
  );
};

export default OwnerMenus;
