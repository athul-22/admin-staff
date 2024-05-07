/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, IconButton, Card, CardContent, Grid } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import NotificationStateCircle from './NotificationStateCircle';


const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    margin: '10px',
    borderRadius: '20px',
    padding: '10px',
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: '#fff',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: '#4d4d4d',
}));

function Staff() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')



  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem('userType');
    const nameFromStorage = localStorage.getItem('name');
    const emailFromStorage = localStorage.getItem('email');

    if (userTypeFromStorage) setUserType(userTypeFromStorage);
    if (nameFromStorage) setName(nameFromStorage);
    if (emailFromStorage) setEmail(emailFromStorage);
  }, []);

  // NOTIFICATIONS ANALYSIS TO DISPLAY ON DASHBOARD
  // const notification_length = notifications.length;
  // const notification_approved_length = notifications.filter(notification => notification.tick === 'a').length
  // const notification_not_approved_length = notifications.filter(notification => notification.tick === 'r').length
  // const notification_pending_approval_length = notifications.filter(notification => notification.tick === 'p').length


  const currentUser = localStorage.getItem('name');

const notification_length = notifications.length;
const notification_approved_length = notifications.filter(notification => {
  return notification.tick === 'a' && notification.name === currentUser;
}).length;
const notification_not_approved_length = notifications.filter(notification => {
  return notification.tick === 'r' && notification.name === currentUser;
}).length;
const notification_pending_approval_length = notifications.filter(notification => {
  return notification.tick === 'p' && notification.name === currentUser;
}).length;


  useEffect(() => {
    handleGetNotifications()
  }, []);
  // TABLE ODD ROW COLOUR CHANGE 
  const renderRowColor = (index) => {
    return index % 2 === 0 ? 'white' : '#f2f2f2';
  };


  const handleGetNotifications = async () => {
    try {
      fetch('http://localhost:3001/getnotifications')
        .then(response => response.json())
        .then(data => setNotifications(data))
        .catch(error => console.error('Error fetching notifications:', error));
    } catch (error) {
      console.log(error)
    }
  }

  const newNotification = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  

      const handleSubmit = async () => {
        try {
          const response = await fetch('http://localhost:3001/addnotification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: message,
              name: name,
              title: title,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Notification added successfully:', data);
            handleGetNotifications()
            setIsDrawerOpen(false);
          } else {
            console.error('Failed to add notification:', response.statusText);

          }
        } catch (error) {
          console.error('Error adding notification:', error);

        }
      }




      return (
        <div style={{ display: 'flex' }}>
          <StyledDrawer variant="permanent" anchor="left">
            <List>
              {/* Dashboard Section */}
              <ListItem
                button
                component={Link}

                onClick={() => setSelectedSection('dashboard')}
              >
                <ListItemIcon>
                  <DashboardIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <StyledListItemText primary="Dashboard" />
              </ListItem>

              {/* Inbox Section */}
              <StyledDivider />
              <ListItem
                button
                component={Link}

                onClick={() => setSelectedSection('inbox')}
              >
                <ListItemIcon>
                  <InboxIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <StyledListItemText primary="Inbox" />
              </ListItem>

              {/* Settings Section */}
              <StyledDivider />
              <ListItem
                button
                component={Link}

                onClick={() => setSelectedSection('settings')}
              >
                <ListItemIcon>
                  <SettingsIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <StyledListItemText primary="Settings" />
              </ListItem>
            </List>
          </StyledDrawer>

          {/* Content Area */}
          <div style={{ flex: 1, marginLeft: '150px', marginTop: '50px', marginRight: '20px' }}>
            {selectedSection === 'dashboard' && (
              <div>
                {/* Dashboard Content */}
                <h2>👋 Welcome {name}</h2>
                <p style={{ color: 'grey', fontSize: '20px' }}>Overview</p>
                <Grid container spacing={2} >
                  <Grid item xs={12} sm={3} >
                    <Card variant="outlined" sx={{ backgroundColor: '#2196F3' }} style={{ borderRadius: '12px' }}>
                      <CardContent>
                        <Typography variant="h5" color="white" gutterBottom>
                          Total Notifications
                        </Typography>
                        <Typography variant="h4" color="white">
                          {notification_length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Card variant="outlined" sx={{ backgroundColor: '#4CAF50' }} style={{ borderRadius: '12px' }}>
                      <CardContent>
                        <Typography variant="h5" color="white" gutterBottom>
                          Total Approvals
                        </Typography>
                        <Typography variant="h4" color="white">
                          {notification_approved_length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Card variant="outlined" sx={{ backgroundColor: '#F44336' }} style={{ borderRadius: '12px' }}>
                      <CardContent>
                        <Typography variant="h5" color="white" gutterBottom>
                          Total Rejections
                        </Typography>
                        <Typography variant="h4" color="white">
                          {notification_not_approved_length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Card variant="outlined" sx={{ backgroundColor: 'silver' }} style={{ borderRadius: '12px' }}>
                      <CardContent>
                        <Typography variant="h5" color="white" gutterBottom>
                          Pending Approval
                        </Typography>
                        <Typography variant="h4" color="white">
                          {notification_pending_approval_length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

              </div>
            )}

            {selectedSection === 'inbox' && (
              <div>
                <Button variant="contained" style={{ backgroundColor: 'black' }} endIcon={<SendIcon />} onClick={newNotification}>
                  New Notification
                </Button>
                <div>
                  <h2>Inbox</h2>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
                          <TableCell style={{ color: 'white' }}>Status</TableCell>
                          <TableCell style={{ color: 'white' }}>Title</TableCell>
                          <TableCell style={{ color: 'white' }}>Name</TableCell>
                          <TableCell style={{ color: 'white' }}>Message</TableCell>
                          <TableCell style={{ color: 'white' }}>ID</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {notifications.map((notification, index) => (
                          <TableRow key={notification.id} style={{ backgroundColor: renderRowColor(index) }}>
                            <NotificationStateCircle tick={notification.tick} />
                            <TableCell>{notification.title}</TableCell>
                            <TableCell>{notification.name}</TableCell>
                            <TableCell>{notification.message}</TableCell>
                            <TableCell>{notification.id}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>

            )}
            {selectedSection === 'settings' && (
              <div>
                {/* Settings Content */}
                <h2>Settings</h2>
                <p></p>
              </div>
            )}
          </div>
          {/* Drawer */}
          <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
            <div style={{ height: '90vh' }}>
              <div style={{ margin: '20px', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2>New Notification</h2>
                  <IconButton onClick={closeDrawer} style={{ color: 'red' }}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <TextField label="Name" value={name} disabled fullWidth />
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth style={{ marginTop: '20px' }} />
                <TextField label="Message" multiline rows={10} value={message} onChange={(e) => setMessage(e.target.value)} fullWidth style={{ marginTop: '20px' }} />
                <Button variant="contained" style={{ backgroundColor: 'black', color: 'white', marginTop: '20px', width: '300px' }} onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </Drawer>

        </div>
      );
  }

  export default Staff;