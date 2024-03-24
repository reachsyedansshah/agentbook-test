import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      
      Cookies.set('token', response.data.token, { expires: 7 });
      setErrorMessage(null)
     
      router.push('/');
    } catch (error) {
      console.log(error.message, error.response?.status)
      setErrorMessage(`${error.response?.status || 500} ${error.message}`)
    }
  };

  const pushToRegister = async (e) =>{
    e.preventDefault();
    router.push('/register');
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
         
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <h6 style={{color: "red"}}>{errorMessage}</h6>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
          >
            Login
          </Button>
          <p>Dont have an Account? <a style={{ color: "blue" }} onClick={e=>pushToRegister(e)}>Create new Account</a></p>
        </form>
      </Container>
      <Footer />
    </>
  );
}
