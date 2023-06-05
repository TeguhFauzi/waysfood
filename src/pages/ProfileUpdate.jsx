import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { API } from '../api/Api';
import { useMutation, useQuery } from 'react-query';
import { AlertError, AlertSuccess } from '../components/alertcollection/AlertCollection';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = (props) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [userState, userDispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery('userCached', async () => {
    const response = await API.get(`/user/${userState.user.id}`);
    return response.data.data;
  });

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phone_number,
    address: user.address,
    imageUrl: '',
  });

  const { email, name, phoneNumber, address } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log(form);

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('image', form.imageUrl[0], form.imageUrl[0].name);
      formData.set('name', form.name);
      formData.set('email', form.email);
      formData.set('password', form.password);
      formData.set('address', form.address);
      formData.set('phone_number', form.phoneNumber);

      const response = await API.patch(`/user/${userState.user.id}`, formData, config);

      console.log('update success : ', response);
      navigate('/');
      setMessage(<AlertSuccess message="Update Profile Success" />);
    } catch (err) {
      setMessage(<AlertError message="Failed to update!" />);
      console.log('update failed : ', err);
    }
  });

  return (
    <React.Fragment>
      <div className="px-44 pt-36">
        <h2 className="text-3xl font-bold mb-3">{props.title}</h2>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="mb-4 flex gap-x-3">
            <input type="text" onChange={handleOnChange} value={name} name="name" className="w-4/5 bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Full Name" />
            <input type="file" onChange={handleOnChange} name="imageUrl" className="w-1/5 bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" />
          </div>
          <div className="mb-4">
            <input type="text" onChange={handleOnChange} value={email} name="email" placeholder="Email" className="w-full bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" />
          </div>
          <div className="mb-4">
            <input type="text" onChange={handleOnChange} value={phoneNumber} name="phoneNumber" placeholder="PhoneNumber" className="w-full bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" />
          </div>
          <div className="mb-4 flex gap-x-3">
            <input type="text" onChange={handleOnChange} value={address} name="address" placeholder="Location" className="w-full bg-zinc-300 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" />
          </div>

          <div className="text-end">
            <button className="w-1/5 bg-zinc-800 font-bold py-1 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
