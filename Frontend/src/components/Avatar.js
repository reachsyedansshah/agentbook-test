import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AvatarUpload = ({ onUpload }) => {
  const [avatar, setAvatar] = React.useState('');

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setAvatar(URL.createObjectURL(img));
      onUpload(img); // This should be a function prop for uploading the image
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Avatar alt="User Avatar" src={avatar} sx={{ width: 56, height: 56 }} />
      <label htmlFor="avatar-upload">
        <input
          accept="image/*"
          id="avatar-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </Stack>
  );
};

export default AvatarUpload;
