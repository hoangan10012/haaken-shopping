import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 

export const ModalSigninSignup = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };
      const router = useRouter()
  const { user, login, signup, logout } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
    role:''
  })

  const handleLogin = async (e: any) => {
    e.preventDefault()

    console.log(user)
    try {
      await login(data.email, data.password)
      router.reload()
       
    } catch (err) {
      console.log(err)
    }
  }
  const handleSignup = async (e: any) => {
    e.preventDefault()
    try {
      const res = await signup(data.email, data.password);
      await setDoc(doc(db, "user " + res.user.uid , res.user.uid), {
        ...data
      })
    } catch (err) {
      console.log(err)
    }

    console.log("user day la data", data)
  }
  // console.log("user user user now", user)


  return (
    <div>
        <Box sx={style}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="Login" value="1" />
                        <Tab label="Register" value="2" />
                        <Tab label="Reset pass" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel id='signin' value="1">
                      <form action="" style={{ display: 'grid' }}>
                        <TextField
                          placeholder='Email'
                          type="Email"
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              email: e.target.value,
                            })
                          }
                          value={data.email}
                        />
                        <TextField
                          placeholder='Password'
                          type="password"
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              password: e.target.value,
                            })
                          }
                          value={data.password}
                        />
                        <div style={{ display: 'flex' }}>
                          <Checkbox {...label} />
                          <p>Remember me</p>
                        </div>
                        <p>Lost Your password</p>
                        <Button onClick={handleLogin}>LOGIN</Button>
                      </form>
                    </TabPanel>
                    <TabPanel id='signup' value="2">
                      <form action="" style={{ display: 'grid' }}>
                        <TextField
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              email: e.target.value,
                            })
                          }
                          value={data.email}
                          placeholder='Email'
                          type="Email"

                        />
                        <TextField
                          placeholder='Password'
                          type="password"
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              password: e.target.value,
                            })
                          }
                          value={data.password}
                        />
                        <Button onClick={handleSignup}>REGISTER</Button>
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
    </div>
  )
}
