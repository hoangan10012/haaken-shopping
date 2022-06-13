import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import { Button } from '@mui/material';
import Link from 'next/link'


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
            console.log(err)
        }
    }
    return (
        <div>
            <main className={styles.main}>

                <div className={styles.form}>
                    <form style={{ display: 'grid' }}>
                        <h1>Login</h1>
                        <label >Email:</label>
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
                        <label >Password:</label>
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
                        <Button onClick={handleLogin}>LOGIN</Button>
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
