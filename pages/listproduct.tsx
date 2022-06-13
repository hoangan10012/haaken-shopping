import * as React from 'react';
import styles from '../styles/listproduct.module.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import {getProductList, addProduct } from '../context/service'
export interface IAppProps {
}

export default function App(props: IAppProps) {
    const [data, setData] = useState({
        id:'',
        name: '',
        price: '',
        img:null
      })
      const getProduct = async (e: any) => {
        e.preventDefault()
        try {
          
          
        } catch (err) {
          console.log(err)
        }
      }
    return (
        <div>
            <div className={styles.namepage}>
                <div className={styles.gridtittle}>
                    <span style={{ color: 'white' }} >Home/Shop/Four Columns</span>
                </div>
            </div>
            <main className={styles.main}>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product1-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product2-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product3-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product4-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                </Grid>
                <Grid style={{paddingTop:'5%'}} container spacing={4}>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product5-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product6-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product7-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="325"
                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product8-featured-img.jpg"
                            />
                            <CardContent className={styles.cardcontent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    ARTISTIC
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                £100.00
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}
