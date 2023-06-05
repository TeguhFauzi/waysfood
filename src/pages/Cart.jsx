import { useContext, useEffect, useState } from 'react';
import OrderItem from '../components/OrderItem';
import { useMutation, useQuery } from 'react-query';
import { API } from '../api/Api';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [pendingOrder, setPendingOrder] = useState(null);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivFee, setDelivFee] = useState(0);
  const [userState, userDispatch] = useContext(UserContext);
  const [delivLocation, setDelivLocation] = useState(null);
  const [partnerID, setPartnerID] = useState(null);
  const navigate = useNavigate();

  const { data: carts, isLoading } = useQuery('cartsIncCached', async () => {
    const response = await API.get(`/carts`);
    return response.data.data;
  });

  useEffect(() => {
    carts && setPendingOrder(carts.filter((cart) => cart.Status === 'pending' && cart.CustomerID == userState.user.id));
  }, [isLoading]);

  useEffect(() => {
    const sum = pendingOrder && pendingOrder.reduce((total, ord) => total + ord.Quantity, 0);
    setQty(sum);
  }, [pendingOrder]);

  useEffect(() => {
    const totalPrice = pendingOrder && pendingOrder.reduce((total, ord) => total + ord.Quantity * ord.Product.Price, 0);
    setTotalPrice(totalPrice);
  }, [pendingOrder]);

  useEffect(() => {
    const fee = Math.floor(Math.random() * 100000);
    setDelivFee(fee);
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  useEffect(() => {
    pendingOrder && pendingOrder.map((ord) => setPartnerID(ord.Product.PartnerID));
  }, [pendingOrder]);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    //change this according to your client-key
    const myMidtransClientKey = import.meta.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const data = {
        seller_id: userState.user.id,
        partner_id: partnerID,
        location: delivLocation,
        total_price: e.price,
      };

      console.log(data);

      const body = JSON.stringify(data);

      const response = await API.post('/transaction', body, config);
      if (response.status === 200) {
        const formData = new FormData();
        formData.set('status', 'success');

        const rowIds = pendingOrder.map((ord) => ord.ID); // list of row ids to update
        for (const id of rowIds) {
          const response = await API.patch(`/cart/${id}`, formData);
          console.log(response);
        }
      } else {
        alert('transaction failed');
      }

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate('/');
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate('/');
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate('/');
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.log('transaction failed : ', error);
    }
  });

  return (
    <div className="container mx-auto pt-36 lg:px-44 ">
      <h2 className="text-3xl font-bold">Review Order</h2>
      <div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-zinc-800">Delivery Location</h3>
          <div className="flex gap-x-3">
            <input value={delivLocation} onChange={(e) => setDelivLocation(e.target.value)} type="text" name="location" className="w-full p-2 rounded-md" placeholder="Delivery Location" />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-zinc-800 mb-1">Review Your Order</h3>
          <div className="flex gap-x-5">
            <div className="w-3/5">
              <div className="h-0.5 w-full bg-zinc-800">
                {pendingOrder && pendingOrder.map((order, idx) => <OrderItem key={idx} id={order.ID} name={order.Product.Name} price={rupiah(order.Product.Price)} image={order.Product.ImageURL} qty={order.Quantity} />)}
              </div>
            </div>
            <div className="w-2/5">
              <div className="h-0.5 w-full bg-zinc-800">
                <div className="flex justify-between mb-2 pt-3">
                  <p>Subtotal</p>
                  <p>{rupiah(totalPrice)}</p>
                </div>
                <div className="flex justify-between mb-2 mt-2">
                  <p>Qty</p>
                  <p>{qty}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Delivery Fee</p>
                  <p>{rupiah(delivFee)}</p>
                </div>
                <div className="mt-3 h-0.5 w-full bg-zinc-800"></div>
                <div className="flex justify-between mb-3">
                  <p>Total</p>
                  <p>{rupiah(delivFee + totalPrice)}</p>
                </div>
                <div className="text-end">
                  <button type="button" onClick={() => handleBuy.mutate({ price: delivFee + totalPrice })} className="w-2/3 py-1 bg-zinc-800 text-white rounded-md">
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
