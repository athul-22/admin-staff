import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Select, MenuItem, Typography, TextField, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, IconButton, Card, CardContent, Grid, FormControl, InputLabel } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

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

function SidebarMenu() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [selectedStatus, setSelectedStatuses] = useState({});

  // NEW USER STATES
  const [newname, setnewName] = useState('');
  const [newemail, setnewEmail] = useState('');
  const [newpassword, setnewPassword] = useState('');
  const [newtype, setnewType] = useState('staff');

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
    // Access localStorage values
    const userTypeFromStorage = localStorage.getItem('userType');
    const nameFromStorage = localStorage.getItem('name');
    const emailFromStorage = localStorage.getItem('email');

    // Update state with localStorage values
    if (userTypeFromStorage) setUserType(userTypeFromStorage);
    if (nameFromStorage) setName(nameFromStorage);
    if (emailFromStorage) setEmail(emailFromStorage);
  }, []);

  const handleChange = async (event, notification) => {
    const newStatus = event.target.value;
    setSelectedStatuses(prevState => ({
      ...prevState,
      [notification.id]: newStatus
    }));
    try {
      const response = await fetch(`http://localhost:3001/updatenotification/${notification.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tick: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update notification status');
      }
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  useEffect(() => {
    setInitialSelectedStatuses();
  }, [notifications]);

  const setInitialSelectedStatuses = () => {
    const initialStatuses = {};
    notifications.forEach(notification => {
      initialStatuses[notification.id] = notification.tick;
    });
    setSelectedStatuses(initialStatuses);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newname,
          email: newemail,
          password: newpassword,
          type: newtype,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully:', data);
      } else {
        console.error('Failed to create user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


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

          <ListItem
            button
            component={Link}

            onClick={() => setSelectedSection('add')}
          >
            <ListItemIcon>
              <GroupAddOutlinedIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <StyledListItemText primary="Add Staff" />
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
                        <TableCell>
                          <Select
                            value={selectedStatus[notification.id] || ''}
                            onChange={(event) => handleChange(event, notification)}
                            style={{ color: selectedStatus[notification.id] === 'p' ? 'grey' : selectedStatus[notification.id] === 'r' ? 'red' : 'green' }}
                          >
                            <MenuItem value="p">Pending</MenuItem>
                            <MenuItem value="a">Approve</MenuItem>
                            <MenuItem value="r">Reject</MenuItem>
                          </Select>

                        </TableCell>
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
            <p>This is the settings content.</p>
          </div>
        )}
        {selectedSection === 'add' && (
          <div>
            {/* Settings Content */}
            <h2>User manager</h2>
            <form>
              <TextField
                label="Name"
                value={newname}
                onChange={(e) => setnewName(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Email"
                value={newemail}
                onChange={(e) => setnewEmail(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '10px' }}
              />
              <TextField
                type="password"
                label="Password"
                value={newpassword}
                onChange={(e) => setnewPassword(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '10px' }}
              />
              <FormControl fullWidth required style={{ marginBottom: '10px', marginTop: '10px' }}>

                <InputLabel id="user-type-label">User Type</InputLabel>
                <br />
                <Select
                  labelId="user-type-label"
                  value={newtype}
                  onChange={(e) => setnewType(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="staff">Staff</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" type="submit" onClick={handleSubmit} style={{ backgroundColor: 'black', color: 'white' }}>
                Submit
              </Button>
            </form>
            <br />
            <div>
              <h2>Existing Users</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>


        )}
      </div>
    </div>
  );
}

export default SidebarMenu;