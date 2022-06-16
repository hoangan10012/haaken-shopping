import React, { useState } from 'react'
import styles from '../styles/register.module.css'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import { Button } from '@mui/material';
import Link from 'next/link'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Breadcum from '../components/Breadcum';

export interface RegisterProps {
}

export default function Register(props: RegisterProps) {
    const router = useRouter()
    const { signup,logout } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const handleSignup = async (e: any) => {
        e.preventDefault()
        try {
            const res = await signup(data.email, data.password);
            await setDoc(doc(db, "users " , res.user.uid), {
                ...data
            })
            router.push('/login')
        } catch (err) {
            console.log(err)
        }

        console.log("user day la data", data)
    }

    return (
        <div>
            <Breadcum/>
            <main className={styles.main}>
                <div className={styles.form}>
                    <form onSubmit={handleSignup} style={{ display: 'grid' }}>
                        <h1>Register</h1>
                        <label>Email:</label>
                        <TextField
                            onChange={(e: any) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                            value={data.email}
                            required
                            placeholder='Email'
                            type="Email"
                            style={{paddingBottom:'5%',paddingTop:'5%'}}
                        />
                         <label>Password:</label>
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
                        <Button  type='submit'  variant="contained">REGISTER</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
