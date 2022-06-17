import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import { Button } from '@mui/material';
import Link from 'next/link'
import Breadcum from '../components/Breadcum';


export interface LoginProps {
}

export default function Login(props: LoginProps) {
    const { user, login } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
        role: ''
    })
    const router = useRouter()
    const handleLogin = async (e: any) => {
        e.preventDefault()
        console.log(user)
        try {
            await login(data.email, data.password)
            router.push('/').then(() => { router.reload() })
        } catch (err) {
            alert('Sai thong tin dang nhap')
            console.log(err)
        }
    }
    return (
        <div>
            <Breadcum/>
            <main className={styles.main}>
                <div className={styles.form}>
                <h1>Login</h1>
                    <form onSubmit={handleLogin} style={{ display: 'grid' }}>
                        <label>Email:</label>
                        <TextField
                            placeholder='Email'
                            type="Email"
                            required
                            onChange={(e: any) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                            value={data.email}
                            style={{paddingBottom:'5%',paddingTop:'5%'}} 
                        />
                        <label >Password:</label>
                        <TextField
                            placeholder='Password'
                            type="password"
                            required
                            onChange={(e: any) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })
                            }
                            value={data.password}
                            style={{paddingBottom:'5%',paddingTop:'5%'}}
                           
                        />
                        <Button type='submit'  variant="contained">LOGIN</Button>
                        <div style={{ display: 'flex' }}>
                            <p>Not a member ?</p>
                            <Button><Link href='/register' >Register</Link></Button>
                        </div>

                    </form>
                </div>


            </main>
        </div>
    );
}
