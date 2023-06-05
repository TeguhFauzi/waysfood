import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useMutation } from 'react-query';
import { API } from '../../api/Api';
import { AlertError, AlertSuccess } from '../alertcollection/AlertCollection';

const Register = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  const { email, password, name, phoneNumber, address, role } = form;

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log(form);

      const formData = new FormData();
      formData.set('name', form.name);
      formData.set('email', form.email);
      formData.set('password', form.password);
      formData.set('address', form.address);
      formData.set('phone_number', form.phoneNumber);
      formData.set('role', form.role);

      const response = await API.post('/register', formData);

      console.log('register success : ', response);
      setMessage(<AlertSuccess message="Register Success" />);
    } catch (err) {
      setMessage(<AlertError message="Failed to register!" />);
      console.log('register failed : ', err);
    }
  });

  return (
    <div className="absolute">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-40" onClick={() => authDispatch({ type: 'CLOSE_AUTH_MODAL' })}></div>
      <div className="fixed z-50 ">
        <div className="fixed mt-32 ml-[36rem] w-1/4 z-50 bg-white p-5 rounded-md font-sans">
          {message && message}
          <h2 className="font-bold text-3xl text-yellow-300">Register</h2>
          <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="mt-5 mb-3">
              <input onChange={handleOnChange} value={name} type="text" name="name" id="" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Name" />
            </div>
            <div className="mb-3">
              <input onChange={handleOnChange} value={email} type="text" name="email" id="" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input onChange={handleOnChange} value={password} type="text" name="password" id="" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Password" />
            </div>
            <div className="mb-3">
              <input onChange={handleOnChange} value={address} type="text" name="address" id="" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Address" />
            </div>
            <div className="mb-3">
              <input onChange={handleOnChange} value={phoneNumber} type="text" name="phoneNumber" id="" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Phone" />
            </div>
            <div className="mb-3">
              <select onChange={handleOnChange} name="role" id="role" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800">
                <option value="default" className="hidden">
                  as Customer
                </option>
                <option value="customer">Customer</option>
                <option value="partner">Partner</option>
              </select>
            </div>

            <div className="mb-3">
              <button className="w-full bg-zinc-800 text-white py-2 rounded-md">Register</button>
            </div>

            <div>
              <p>
                Already have an account? Click{' '}
                <span className="font-semibold text-sky-500 cursor-pointer" onClick={() => authDispatch({ type: 'OPEN_LOGIN_MODAL' })}>
                  Here!
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
