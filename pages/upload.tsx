import React, { useState, useEffect, useRef } from 'react';
import { collection, doc, setDoc, addDoc, serverTimestamp, onSnapshot, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import styles from '../styles/upload.module.css'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Listproduct } from '../components/Listproduct';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


export interface UploadProps {
}


export default function Upload(props: UploadProps) {
  const [file, setFile] = useState({
    name: ""
  }) as any;
  const [data, setData] = useState({
    imgURL: '',
    Name: '',
  })

  const [per, setPerc] = useState(null) as any;
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, `Products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, imgURL: downloadURL }))
            setpreviewUrl(downloadURL)
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);


  const handleInput = async (e: any) => {
    const id = e.target.id;
    console.log("id handleinput", id);
    const value = e.target.value;
    console.log("value handleinput", value);
    setData({ ...data, [id]: value });

  }


  console.log('day la data ta ta ta', data);
  const handleAdd = async (e: any) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "products"), {
        imgURL: previewUrl,
        Name: Name,
        Brand: Brand,
        Category: Category,
        Price: Price,
        // ...data,
        timeStamp: serverTimestamp()
      })
    } catch (err) {
      console.log(err)
    }
  }

  //getting current user function
  const { user } = useAuth();
  //state of cart products
  const [products, setProducts] = useState([]);

  const route = useRouter();
  //getting cart product from fb and updating the state
  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "products"),
        (snapShot) => {
          let list = [] as any;
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setProducts(list);
          setData(list);

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      route.push('/login')
    }
  }, [route, user])
  console.log('day la data test', data);
  console.log('day la products', products);

  const [previewUrl, setpreviewUrl] = useState<any | null>(null);
  console.log('previewurl', previewUrl)
  const pickedimghandler = async () => {
    filePickerRef.current.click();
  }
  const filePickerRef = useRef() as any;
  //Delete
  const handleDelete = async (id: any) => {
    if (user) {
      await deleteDoc(doc(db, "products", id));
    }
  }

  const brands = [
    "ADLV",
    "Balenciaga",
    "Dior",
    "Gucci",
    "Louis Vuiton",
    "Drew",
  ];
  const category = [
    "T-Shirt",
    "Hoodie",
    "Jacket",
    "Pant",
    "Polo",
  ];
  const handleChangeBrand = (event: SelectChangeEvent<typeof Brand>) => {
    const {
      target: { value }
    } = event;
    setBrand(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeCategory = (event: SelectChangeEvent<typeof Category>) => {
    const {
      target: { value }
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [id, setId] = useState('')
  const [Name, setName] = useState('')
  const [Brand, setBrand] = useState<string[]>([])
  const [Category, setCategory] = useState<string[]>([])
  const [Price, setPrice] = useState('')
  const [isUpdate, setIsupdate] = useState(false)
  const GetId = (id: any, imgURL: any, Name: any, Brand: any, Category: any, Price: any) => {
    setId(id)
    setpreviewUrl(imgURL)
    setName(Name)
    setBrand(Brand)
    setCategory(Category)
    setPrice(Price)
    setIsupdate(true)
  }
  const updateFields = () => {
    if (user) {
      let fieldToEdit = doc(db, 'products', id);
      updateDoc(fieldToEdit, {
        imgURL: previewUrl,
        Name: Name,
        Brand: Brand,
        Category: Category,
        Price: Price
      }).then(() => {
        setIsupdate(false)
      })
    } else {
      route.push('/login')
    }

  }
  console.log("data update", data);
  return (
    <div >
      <main className={styles.main}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className='show-img'>
              {previewUrl &&
                <>
                  <img src={previewUrl} style={{ width: '100%', marginTop: '22%' }} />
                  <Button type='button' onClick={pickedimghandler}>Edit image <EditIcon /></Button>
                </>
              }
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className='upload-info'>
              <h1>Upload Product</h1>
              <form  >
                <div className='formInput'>
                  <label htmlFor="">
                    Image
                  </label>
                  <input
                    type="file"
                    id='file'
                    accept='.jpg,.png,.jpeg'
                    ref={filePickerRef}
                    required
                    onChange={(e: any) => setFile(e.target.files[0])}
                  />
                </div>
                <div>
                  <div className='forminput' style={{ display: 'grid' }} >
                    <label htmlFor=""> Name :</label>
                    <TextField
                      sx={{   mt: 1 }}
                      type="text"
                      placeholder='Name'
                      required
                      value={Name}
                      onChange={(e: any) => setName(e.target.value)}
                    />
                    <label htmlFor=""> Brand :</label>

                    <FormControl sx={{   mt: 1 }}>
                      <Select
                        displayEmpty
                        value={Brand}
                        onChange={handleChangeBrand}
                      >
                        {brands.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label htmlFor=""> Category :</label>
                    <FormControl sx={{   mt: 1 }}>
                      <Select
                        displayEmpty
                        value={Category}
                        onChange={handleChangeCategory}
                      >
                        {category.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <TextField
                      type="text"
                      placeholder='Category'
                      required
                      value={Category}
                      onChange={(e: any) => setCategory(e.target.value)}
                    /> */}
                    <label htmlFor=""> Price :</label>
                    <TextField
                    sx={{   mt: 1 }}
                      type="text"
                      placeholder='Price'
                      required
                      value={Price}
                      onChange={(e: any) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                {/* <Button type='submit' variant="contained" >ADD</Button> */}
                {!isUpdate &&
                  <>
                    <Button onClick={handleAdd} variant="contained" >ADD</Button>
                  </>
                }
                {isUpdate &&
                  <>
                    <Button onClick={updateFields} variant="contained" >UPDATE</Button>
                  </>
                }

              </form>
            </div>
          </Grid>
        </Grid>


        <div className='list-pro'>
          {products.length > 0 && (
            <div>
              <h1>List Product</h1>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">PRODUCT</TableCell>
                        <TableCell align="right">NAME</TableCell>
                        <TableCell align="right">BRAND</TableCell>
                        <TableCell align="right">CATEGORY</TableCell>
                        <TableCell align="right">PRICE</TableCell>
                        <TableCell align="right">UPLOAD</TableCell>
                        <TableCell align="right">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {/* <Listproduct
                        products={products}
                      /> */}
                      {products.map((product: any) => {
                        return (
                          <>
                            <TableRow
                              key={product.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            // onClick={()=>setData({id:product.id,imgURL:product.imgURL,Name:product.Name,Brand:product.Brand,Category:product.Category,Price:product.Price})}
                            >
                              <TableCell align="right">
                                <img src={product.imgURL} style={{ width: 57, height: 61 }} ></img>
                              </TableCell>
                              <TableCell align="right">{product.Name}</TableCell>
                              <TableCell align="right">{product.Brand}</TableCell>
                              <TableCell align="right">{product.Category}</TableCell>
                              <TableCell align="right">{product.Price}$ </TableCell>
                              <TableCell align="right"><Button onClick={() => GetId(product.id, product.imgURL, product.Name, product.Brand, product.Category, product.Price)} ><EditIcon /></Button></TableCell>
                              <TableCell align="right"><Button onClick={() => handleDelete(product.id)}><DeleteIcon /></Button></TableCell>
                            </TableRow>
                          </>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

            </div>

          )}
          {products.length < 1 && (
            <div>
              No products to Show
            </div>
          )}

        </div>


      </main>
    </div>
  );
}

