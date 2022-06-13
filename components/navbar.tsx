import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import styles from '../styles/navbar.module.css';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UploadIcon from '@mui/icons-material/Upload';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
export interface Navbar {
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter()
  const { user, logout } = useAuth()

  console.log("user user user now", user)

  //state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  //getting cart products
  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "cart " + user.uid),
        (snapShot) => {
          const qty = snapShot.docs.length;
          setTotalProducts(qty);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }, [user])
  console.log("day la totalProducts", totalProducts)

  //getusercb
  const [urole, setUrole] = useState([]);
  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "user " + user.uid),
        (snapShot) => {
          let list = [] as any;
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setUrole(list);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }, [user])
  console.log('urole', urole);
  const role = urole.map((rolee: any) => {
    return rolee.role;
  })
  console.log('role ne ', role);

  const [search,setSearch]=useState("");
  const handleSubmit = (e:any)=>{
    e.preventDefault();
    router.push(`/search?name=${search}`)
    setSearch("");
  }

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
            <li className={styles.listitem}>
              {/* <Link href="/about">
                <a>ABOUT</a>
              </Link> */}
              <form onSubmit={handleSubmit} >
              <Search >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e)=>setSearch(e.target.value)}
                  value={search}
                />
              </Search>
              </form>
             
            </li>
            <li className={styles.listitem}>
              <Link href="/collections">
                <a>COLLECTIONS</a>
              </Link>
            </li>
           
          </ul>
        </Grid>
        <Grid item xs className={styles.item} style={{ textAlign: 'end', display: 'contents' }}>
          {user && role.length > 0 &&
            <>
              {/* <Link href='/upload'>
            <Button>Upload</Button>
            </Link>
            <Link href='/customers'>
            <Button>Customers</Button>
            </Link>
            <Link href='/order'>
            <Button>Pending</Button>  
            </Link>  */}
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState: any) => (
                  <div >
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      Admin
                    </Button>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      
                    >
                      <div style={{display: 'grid'}}>
                      <Link href='/upload'>
                        <Button>Upload</Button>
                      </Link>
                      <Link href='/customers'>
                        <Button>Customers</Button>
                      </Link>
                      <Link href='/order'>
                        <Button>Pending</Button>
                      </Link>
                      </div>
                      

                    </Popover>
                  </div>
                )}
              </PopupState>
            </>
          }
          {user ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Link href='/history'>
                  <Button>purchase history</Button>
                </Link>
                <Link href="/cart">
                  <Button className={styles.icon} >
                    <StyledBadge badgeContent={totalProducts} color="primary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </Button>
                </Link >
                <p>{user.email}</p>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    logout()
                    handleClose()
                  }}>Logout</MenuItem>
                </Menu>
              </div>

            </>
          ) : (
            <>
              <Link href='/login'>
                <Button className={styles.icon}>

                  <PersonIcon ></PersonIcon>

                </Button>
              </Link>


              <Button className={styles.icon}> <SearchIcon ></SearchIcon></Button>
            </>
          )}
        </Grid>
      </Grid>

    </AppBar>
  );
}
