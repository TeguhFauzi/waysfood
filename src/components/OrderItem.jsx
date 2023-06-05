import { FaMinus, FaPlus, FaTrash, FaTrashAlt } from 'react-icons/fa';
import geprekBensuPics from '/img/geprek-bensu.png';
import { useMutation } from 'react-query';
import { API } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrderItem = (props) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const handleOnRemove = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set('status', 'cancel');

      const response = await API.patch(`/cart/${props.id}`, formData);
      console.log(response);
      navigate('/order');
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <div className="flex justify-between pt-3">
        <div className="flex gap-x-3">
          <div className="w-36">
            <img src={props.image ? props.image : geprekBensuPics} alt="" className="object-cover w-full" />
          </div>
          <div className="flex flex-col justify-around">
            <p className="text-xl font-bold">{props.name}</p>
            <div>
              <p>{props.price}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around items-end">
          <p className="bg-yellow-300 px-2 py-1 rounded-md text-zinc-800">{props.qty}x Item</p>
          <button className="bg-red-700 px-2 py-1 rounded-md text-white" type="button" title="remove" onClick={(e) => handleOnRemove.mutate(e)}>
            Remove
          </button>
        </div>
      </div>
      <div className="mt-3 h-0.5 w-full bg-zinc-800"></div>
    </>
  );
};

export default OrderItem;
