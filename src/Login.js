import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel, Checkbox } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [name , setName] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a data object to send to the backend
        const data = {
            email: email,
            password: password
        };

        fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Parse response JSON
        .then(data => {
            // Set user type in state
            setUserType(data.type);

            localStorage.setItem('userType', data.type);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            console.log(data.type, data.name, data.email);

            // Redirect based on user type
            if (data.type === 'admin') {
                window.location.href = '/admin'; // Redirect to admin page
            } else if (data.type === 'staff') {
                window.location.href = '/staff'; // Redirect to staff page
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    const paperStyle = { padding: 20, height: '40vh', width: 380, margin: "100px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Email' placeholder='Enter Email' variant="outlined" fullWidth required style={{ marginBottom: '20px' }} value={email} onChange={handleEmailChange} />
                    <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required value={password} onChange={handlePasswordChange} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
