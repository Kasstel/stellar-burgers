import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUserAsync } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserAsync({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
