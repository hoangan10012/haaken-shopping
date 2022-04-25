import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import styles from '../styles/navbar.module.css';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export interface Navbar {
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 540,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Navbar(props: Navbar) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (

    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }} >
      <Grid container className={styles.container}>
        <Grid item xs className={styles.item}>
          <img width="95" height="56" src="https://haaken.qodeinteractive.com/wp-content/uploads/2021/04/h1-logo-1.png" alt='' />
        </Grid>
        <Grid item xs className={styles.item}>
          <ul className={styles.list}>
            <li className={styles.listitem}>
              <Link href="/">
                <a>HOME</a>
              </Link>
            </li>
            <li className={styles.listitem}>PAGES</li>
            <li className={styles.listitem}>SHOP</li>
            <li className={styles.listitem}>PORTFOLIO</li>
            <li className={styles.listitem}>BLOG</li>
          </ul>
        </Grid>
        <Grid item xs className={styles.item} style={{ textAlign: 'end' }}>
          <Button onClick={handleOpen} className={styles.icon}><PersonIcon ></PersonIcon></Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" >
                    <Tab label="Login" value="1" />
                    <Tab label="Register" value="2" />
                    <Tab label="Reset pass" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <form action="" style={{ display: 'grid' }}>
                    <TextField
                      placeholder='Email'
                      type="Email"
                      autoComplete="current-password"
                    />
                    <TextField
                      placeholder='Password'
                      type="password"
                      autoComplete="current-password"
                    />
                    <div style={{ display: 'flex' }}>
                      <Checkbox {...label} />
                      <p>Remember me</p>
                    </div>
                    <p>Lost Your password</p>
                    <Button>LOGIN</Button>
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  <form action="" style={{ display: 'grid' }}>
                    <TextField
                      placeholder='Email'
                      type="Email"
                      autoComplete="current-password"
                    />
                    <TextField
                      placeholder='Password'
                      type="password"
                      autoComplete="current-password"
                    />
                    <TextField
                      placeholder='Repeat Password'
                      type="re-password"
                      autoComplete="current-password"
                    />
                    <Button>REGISTER</Button>
                  </form>
                </TabPanel>
                <TabPanel value="3">
                  <form action="" style={{ display: 'grid' }}>
                    <p>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                    <TextField
                      placeholder='Email'
                      type="email"
                      autoComplete="current-password"
                    />
                    <Button>RESET PASSWORD</Button>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </Modal>
          <Button className={styles.icon}> <SearchIcon ></SearchIcon></Button>
          <Button className={styles.icon}> <ShoppingBagIcon ></ShoppingBagIcon></Button>
          <Button className={styles.icon}> <MenuIcon ></MenuIcon></Button>




        </Grid>
      </Grid>
    </AppBar>
  );
}
