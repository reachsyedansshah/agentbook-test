import { Container, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function ProfileActivity(props) {

    const {statistics} = props;
    return (
      <>
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>

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
      </>
  
    );
  }