import { useQuery } from 'react-query';
import BigRestoListItem from './BigRestoListItem';
import { API } from '../api/Api';
import { useEffect, useState } from 'react';

const BigRestoList = (props) => {
  return (
    <>
      {props.loading && <div>Loading...</div>}
      {props.data && (
        <div className={`${props.className}`}>
          <div className="container mx-auto px-44">
            <h2 className="px-2 text-3xl font-bold">{props.listTitle}</h2>
            <div className="flex flex-wrap">
              {props.data.length <= 0 ? (
                <div className="w-full font-sans text-3xl text-center font-bold text-yellow-400">
                  <p>This Restaurant Doesn't have any menu yet!</p>
                </div>
              ) : (
                props.data.map((resto) => (
                  <BigRestoListItem
                    key={resto.id ? resto.id : resto.ID}
                    id={resto.id ? resto.id : resto.ID}
                    image={resto.image_url ? resto.image_url : resto.ImageURL}
                    name={resto.name ? resto.name : resto.Name}
                    distance={'0,6 Km'}
                    landing={props.landing}
                    price={resto.Price == '0' ? 'Free' : resto.Price}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BigRestoList;
