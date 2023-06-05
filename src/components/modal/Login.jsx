import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../api/Api';
import { AlertError, AlertSuccess } from '../alertcollection/AlertCollection';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [userState, userDispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post('/login', form);
      console.log(response);

      console.log('login success', response);

      // send data to useContext
      userDispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      authDispatch({
        type: 'CLOSE_AUTH_MODAL',
      });

      setAuthToken(response.data.data.token);

      // status check
      if (response.data.data.role === 'partner') {
        navigate('/transactions-table');
      } else {
        navigate('/');
      }

      setMessage(<AlertSuccess message="Login Success" />);
    } catch (err) {
      setMessage(<AlertError message="Failed To Login" />);
    }
  });

  return (
    <div className="absolute">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-40" onClick={() => authDispatch({ type: 'CLOSE_AUTH_MODAL' })}></div>
      <div className="fixed z-50 ">
        <div className="fixed mt-44 ml-[36rem] w-1/4 z-50 bg-white p-5 rounded-md font-sans">
          {message && message}
          <h2 className="font-bold text-3xl text-yellow-300">Login</h2>
          <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="mt-5 mb-3">
              <input onChange={handleOnChange} value={email} type="text" name="email" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input onChange={handleOnChange} value={password} type="password" name="password" className="w-full bg-zinc-300 p-2 rounded-md ring-2 ring-zinc-400 focus:outline-none focus:ring-zinc-800" placeholder="Password" />
            </div>

            <div className="mb-3">
              <button className="w-full bg-zinc-800 text-white py-2 rounded-md">Login</button>
            </div>

            <div>
              <p>
                Don't have an account? Click{' '}
                <span className="font-semibold text-sky-500 cursor-pointer" onClick={() => authDispatch({ type: 'OPEN_REGISTER_MODAL' })}>
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

export default Login;
