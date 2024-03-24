import Header from '../components/Header';
import Footer from '../components/Footer';
import API from '../utils/axios';
import { Container, Typography } from '@mui/material';
import * as React from 'react';
import getCookie from '../utils/cookie';
import { useRouter } from 'next/router';
import ProfileActivity from './profileActivity';

export default function Home() {
  const router = useRouter();
  const [statistics, setStatistics] = React.useState([]);

  React.useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/analytics/statistics');
         setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to AGENT BOOK
        </Typography>
        <Typography variant="subtitle1">
          Your go-to platform for user management and analytics.
        </Typography>
      </Container>
      <ProfileActivity statistics={statistics}/>
      <Footer />
    </>

  );
}