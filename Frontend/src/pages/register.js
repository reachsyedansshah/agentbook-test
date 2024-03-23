import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/register', form);
      console.log("response ", response)
      setErrorMessage(null)
     
      router.push('/login');
    } catch (error) {
      setErrorMessage(`${error.response.status} ${error.message}`)
     
    }
  };

  const pushToRegister = async (e) =>{
    e.preventDefault();
    router.push('/login');
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
            <h6 style={{color: "red"}}>{errorMessage}</h6>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
          >
           
           Register
          </Button>
          <p>Already have an Account? <a style={{ color: "blue" }} onClick={e=>pushToRegister(e)}> Login now</a></p>
    
        </form>
      </Container>
      <Footer />
    </>
  );
}
