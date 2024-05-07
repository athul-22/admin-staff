import React from 'react';
import { styled } from '@mui/material/styles';

const Circle = styled('div')(({ theme, tick }) => ({
  width: '25px',
  height: '25px',
  marginTop:'20px',
  borderRadius: '50%',
  marginLeft:'20px',
  backgroundColor: tick === 'p' ? 'grey' : tick === 'r' ? 'red' : tick === 'a' ? 'green' : 'transparent',
}));

const NotificationStateCircle = ({ tick }) => {
  return <Circle tick={tick} />;
};

export default NotificationStateCircle;
