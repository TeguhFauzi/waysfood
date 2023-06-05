import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../components/alertcollection/AlertCollection';
import { UserContext } from '../context/UserContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const [userState, userDispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    PartnerID: userState.user.id,
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('image', form.imageUrl[0], form.imageUrl[0].name);
      formData.set('name', form.name);
      formData.set('description', form.description);
      formData.set('price', form.price);
      formData.set('partner_id', form.PartnerID);

      const response = await API.post('/product', formData, config);
      console.log('add product success', response);
      setMessage(<AlertSuccess message="Success add product" />);
      navigate('/');
    } catch (err) {
      e.preventDefault();
      console.log('add product failed', err);
      setMessage(<AlertError message="Failed to add product" />);
    }
  });

  return (
    <React.Fragment>
      <div className="px-44 pt-36">
        <h2 className="text-3xl font-bold mb-3">Add Product</h2>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="mb-4 flex gap-x-3">
            <input type="text" onChange={handleOnChange} value={form.name} name="name" className="w-4/5 bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Title" />
            <input type="file" onChange={handleOnChange} name="imageUrl" className="w-1/5 bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800  " />
          </div>
          <div className="mb-4">
            <input type="text" onChange={handleOnChange} value={form.price} name="price" placeholder="Price" className="w-full bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" />
          </div>
          <div className="text-end">
            <button className="w-1/5 bg-zinc-800 font-bold py-1 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
