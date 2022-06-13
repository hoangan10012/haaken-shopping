import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';

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

export const CashOnDeli = ({ totalPrice, totalQty, cartProducts,qty }: any) => {
    console.log('day laaaaaaaaa cart prodycttt' ,cartProducts);
    console.log('day laaaaaaaaa quan tyy' ,qty);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [cartPrice] = useState(totalPrice);
    const [cartQty] = useState(totalQty);

    const { user } = useAuth();
    const route = useRouter();
    const handleCashOnDelivery = async (e: any) => {
        e.preventDefault();
        console.log(phone, address, cartPrice, cartQty)
        const uid = user.uid;
        console.log('user datatatata', user.email);
        await addDoc(collection(db, "Buyer-Personal-Info"), {
            Email: user.email,
            Phone:phone,
            Address:address,
            CartPrice:cartPrice,
            CartQty:cartQty, 
            timeStamp: serverTimestamp()    
          });
          const cartData =await getDocs(collection(db, "cart "+uid ));
          for(var snap of cartData.docs){
              const data= snap.data();
              data.id = snap.id;
              data['Phone']=phone;
              data['Address']=address;
              data['CartPrice']=cartPrice;
              data['CartQty']=cartQty;
              data['timeStamp']=serverTimestamp()
              await addDoc(collection(db, "Buyer-Cart "+uid), {
              data,  
              });
              await addDoc(collection(db, "processing"), {
               data
              });
              await deleteDoc(doc(db, "cart "+uid, snap.id));
          }
          route.push('/collections');
    }
    return  (
        <div>
            <Box sx={style}>
                <form onSubmit={handleCashOnDelivery} >
                    <input type="text" placeholder='Cell no'
                        required onChange={(e: any) => setPhone(e.target.value)} value={phone}
                    />
                    <br />
                    <input type="text" placeholder='Address'
                        required onChange={(e: any) => setAddress(e.target.value)} value={address}
                    />
                    <br />
                    <br />
                    <label >Total Quantity</label>
                    <input type="text" readOnly required value={cartQty} />
                    <br />
                    <label >Total Price</label>
                    <input type="text" readOnly required value={cartPrice} />
                    <br />
                    <Button type='submit' >Submit</Button>
                </form>
            </Box>
        </div>
     
    )
}
