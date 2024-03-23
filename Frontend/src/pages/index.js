import Header from '../components/Header';
import Footer from '../components/Footer';
import API from '../utils/axios';
import { Container, Typography } from '@mui/material';
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import getCookie from '../utils/cookie';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [statistics, setStatistics] = React.useState([]);

  React.useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push('/login');
    }

    // ... fetch data
  }, [router]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/analytics/statistics');
        console.log("data", response.data);
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
        
        <Typography variant="h5" component="h1">
          Your profile analytics:
        </Typography>

        <Timeline position="alternate">
          {statistics.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="text.secondary">
                {item.timestamp}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index < statistics.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>{item.path}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
      <Footer />
    </>

  );
}