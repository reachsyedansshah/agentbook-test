import { useState, useEffect } from 'react';
import API from '../utils/axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AvatarUpload from '../components/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import getCookie from '../utils/cookie';

export default function Profile() {
    const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('token');
        if (!token) {
          router.push('/login');
        }
      }, [router]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get('/user/profile');
                console.log(response.data)
                setProfile({
                    name: response.data.user.name, email: response.data.user.email, avatar: response.data?.user?.avatar
                })

            } catch (error) {
                console.log(error)
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await API.put('/user/profile', profile);
            console.log(response.data);
            setProfile({
                name: response.data.user.name, email: response.data.user.email, avatar: response.data?.user?.avatar
            })

        } catch (error) {
            console.log(error)
        }
    };

    const handleAvatarUpload = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            const response = await API.post('/user/avatar', formData);
            setProfile({ ...profile, avatar: response.data.avatarUrl });
        } catch (error) {
            console.log(error)
        }
    };

    const handleBackClick = () => {
        router.push('/');
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="sm">
                <Button startIcon={<ArrowBackIcon />} onClick={handleBackClick}>
                    Back to Home
                </Button>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <AvatarUpload onUpload={handleAvatarUpload} />
                <TextField
                    fullWidth
                    label="Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    margin="normal"
                />
                <Button onClick={handleUpdateProfile} variant="contained" color="primary">
                    Update Profile
                </Button>
            </Container>
            <Footer />
        </>
    );
}
