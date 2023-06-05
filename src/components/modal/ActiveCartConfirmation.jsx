import { useContext, useEffect, useState } from 'react';
import { DropdownContext } from '../../context/DropdownContext';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../api/Api';
import { UserContext } from '../../context/UserContext';

const ActiveCartConfirmation = () => {
  const [modalState, modalDispatch] = useContext(DropdownContext);
  const [userState, userDispatch] = useContext(UserContext);
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

  console.log(pendingOrder && pendingOrder);

  const handleOnRemove = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set('status', 'cancel');

      const rowIds = pendingOrder.map((ord) => ord.ID); // list of row ids to update
      for (const id of rowIds) {
        const response = await API.patch(`/cart/${id}`, formData);
        console.log(response);
      }
      alert('Cancel Order!');
      modalDispatch({ type: 'CLOSE_PENORDER_NOTICE' });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="absolute">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-40" onClick={() => modalDispatch({ type: 'CLOSE_PENORDER_NOTICE' })}></div>
      <div className="fixed z-50 ">
        <div className="fixed mt-44 ml-[36rem] w-1/4 z-50 bg-white p-5 rounded-md font-sans">
          {/* {message && message} */}
          <h2 className="font-bold text-3xl text-yellow-300">Notice!</h2>
          <p className="py-2 font-bold">Cancel your previous order and change restaurant ?</p>
          <p></p>
          <div className="flex gap-x-3">
            <button className="w-4/5 bg-green-600 text-white rounded-md py-1" onClick={(e) => handleOnRemove.mutate(e)}>
              Change Resto
            </button>
            <button className="w-1/5 bg-red-600 text-white rounded-md py-1" onClick={() => modalDispatch({ type: 'CLOSE_PENORDER_NOTICE' })}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveCartConfirmation;
