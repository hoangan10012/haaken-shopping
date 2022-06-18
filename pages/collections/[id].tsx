import React, { useContext, useEffect, useState } from "react";
import { Product } from '../../models/product.model'
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from '../../styles/details.module.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAuth } from '../../context/AuthContext';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { child, get, ref, set } from "firebase/database";
import Navbar from '../../components/navbar'
import { ModalSigninSignup } from "../../components/ModalSigninSignup";
import { route } from "next/dist/server/router";
import Radio from '@mui/material/Radio';
import Breadcum from "../../components/Breadcum";



export interface DetailsProps {
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 0
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function Details({ proProps }: any) {
  const RadioButton = ({ value, handleActiveSize, actived }: any) => {
    return (
      <Button >
        <Radio onChange={handleChangesize}
          value={value}
          onClick={() => handleActiveSize(value)} />
        {value}
      </Button>

    );
  };
  const handleChangesize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState('');
  const product = JSON.parse(proProps);
  console.log('day la data json', product)
  const router = useRouter();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [valueSize, setValueSize] = useState(null);
  const { user, login } = useAuth();
  const handleActiveSize = (size: any) => {
    setValueSize(size);
  };
  const SIZE = ["S", "M", "L"];
  // const handleAddToCart = () => {
  //   if (valueSize == null) {
  //     toast.error("Vui lòng chọn size");
  //   } else if (user) {
  //     const accountList = ref(database, `account/${user.uid}`);
  //     child(accountList, user?.uid);
  //     const productIndex = user.carts?.findIndex(
  //       (cart: any) => cart?.productId == product.id
  //     );
  //     let updateUser = null;
  //     if (productIndex != undefined && productIndex != -1) {
  //       const product = user.carts[productIndex];
  //       let productSize = product?.size || [];
  //       const indexSize = productSize.findIndex(
  //         (subSize: any) => subSize.name === valueSize
  //       );
  //       if (indexSize != -1) {
  //         const size = productSize[indexSize];
  //         productSize[indexSize] = { ...size, quantity: size.quantity + 1 };
  //       } else {
  //         productSize = [...productSize, { name: valueSize, quantity: 1 }];
  //       }
  //       user.carts[productIndex] = { ...product, size: productSize };
  //       updateUser = { ...user };
  //       //cu~
  //       // updateUser = {
  //       //   ...user,
  //       //   carts: (user?.carts || []).concat([
  //       //     { productId: id, size: [{ name: valueSize, quantity: 1 }] },
  //       //   ]),
  //       // };
  //     } else {
  //       updateUser = {
  //         ...user,
  //         carts: (user?.carts || []).concat([
  //           { productId: product.id, size: [{ name: valueSize, quantity: 1 }] },
  //         ]),
  //       };
  //     }
  //     try {
  //       set(accountList, updateUser);
  //       login(updateUser);
  //       toast.success("Thêm thành công", { position: "top-center" });
  //     } catch (error) {
  //       toast.error("Thêm không thành công", { position: "top-center" });
  //     }
  //   } else {
  //     router.push(`/signin/?url=collections/${product.id}`);
  //   }
  // };

  // let Product;
  // const handleAddToCart = ( product:any)=>{
  //   if(user.uid == null){
  //     Product = product;
  //     Product['qty']=1;
  //     Product['TotalProductPrice']=Product.qty*Product.price;
  //   }
  //   else{
  //     router.push('/login');
  //   }
  // }

  const GetUserUid = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      if (user) {
        setUid(user.uid);
      }
    }, [])
    return uid;
  }
  const uid = GetUserUid();

  const handleAddToCart = async () => {
    if (uid !== null) {
      if (valueSize !== null) {
        product['username'] = user.email;
        product['qty'] = 1;
        product['size'] = valueSize;
        product['TotalProductPrice'] = product.qty * product.Price;
        // Add a new document with a generated id
        const newCartRef = doc(collection(db, "cart " + uid));
        // later...
        await setDoc(newCartRef, product);
        router.push('/cart')
      } else {
        alert('please choose size')
      }

    }
    else {
      router.push('/login');

    }
  }
  return (
    <div>
      <Breadcum hasEndLink={product?.Name} />
      <main className={styles.main}>
        <h1>Details</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid className={styles.imagepro} item xs={4}>
              <Item sx={{ height: '679px' }}>
                <Card sx={{ maxWidth: 566 }}>
                  <CardMedia
                    component="img"
                    height="662"
                    image={product.imgURL}
                  />
                </Card>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item className={styles.details}>
                <h2 style={{ color: 'black',fontSize:50 }}>{product.Name}</h2>
                <div style={{fontSize:17,width: 'fit-content',textAlign: 'initial',margin:'auto'}}>
                <p><b  style={{ color: 'black' }}>Brand : </b> {product.Brand}</p>
                <p><b  style={{ color: 'black' }}>Category : </b>{product.Category}</p>
                <p><b  style={{ color: 'black' }}>Price : </b>{product.Price}$</p>
                </div>
                <span style={{fontSize: 17}} >Select Size</span>
                <div >
                  {SIZE.map((item, index) => (
                    <RadioButton
                      required
                      key={index}
                      value={item}
                      handleActiveSize={handleActiveSize}
                      actived={valueSize}
                    />
                  ))}
                </div>
                <Button onClick={handleAddToCart} variant="contained">Add to Cart</Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <div style={{ marginTop: '5%', marginBottom: '5%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="DESCRIPTION" value="1" />
                <Tab label="ADDITIONAL INFORMATION" value="2" />
                <Tab label="REVIEWS (0)" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <p>Alienum pha edrum tor quatos nec eu, vis detraxit periculis ex, nihil ex petendi in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidun vix at, vel pertinax sen sibus id, error epicurei mea et. Mea facilisis urban itas mo deratius id. Vis ei ratio ibus de fini ebas, eu qui purto zril laoreet. Ex error om nium in terpreta ris pro, alia illum ea vim. Lorem ipsum dolor sit amet, te ridens gloriatur tem poribus qui, per enim veritus pro batus ad. uo eu etiam exerci.</p>
            </TabPanel>
            <TabPanel value="2">
              <table>
                <tbody>
                  <tr>
                    <th style={{ textAlign: 'inherit' }} >WEIGHT:</th>
                    <td>1kg</td>
                  </tr>
                  <tr>
                    <th>DIMENSION:</th>
                    <td>23 x 25 x 21 cm</td>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
            <TabPanel value="3">
              <h2>REVIEWS</h2>
              <p>There are no reviews yet.</p>
              <h3>BE THE FIRST TO REVIEW CRIMSON</h3>
              <p>Your email address will not be published. Required fields are marked.</p>
              <p>Your Rating *</p>
              <p>
                <StarBorderIcon></StarBorderIcon>
                <StarBorderIcon></StarBorderIcon>
                <StarBorderIcon></StarBorderIcon>
                <StarBorderIcon></StarBorderIcon>
                <StarBorderIcon></StarBorderIcon>
              </p>
              <p>
                <TextField
                  sx={{ width: 1300 }}
                  id="outlined-number"
                  label="Your review *"
                />
              </p>
              <TextField id="standard-basic" label="Your name" variant="standard" /> <br />
              <TextField id="standard-basic" label="Your Email" variant="standard" />
              <p><Checkbox {...label} /> Save my name, email, and website in this browser for the next time I comment.</p>
              <Button variant="outlined">SUBMIT</Button>
            </TabPanel>
          </TabContext>
        </div>

      </main>
    </div>
  );
}
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  return {
    props: {
      proProps: JSON.stringify(docSnap.data()) || null
    }
  }
  
}

export const getStaticPaths = async () => {
  try{
    const snapshot = await getDocs(collection(db, 'products'));
    const paths = snapshot.docs.map(doc => {
      return {
        params: { id: doc.id.toString() }
      }
    })
    return {
      paths,
      fallback: false
    }
  }catch(err){
    throw err;
  }
 
}
