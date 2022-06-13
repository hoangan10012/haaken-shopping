import React from 'react'
import Link from "next/link";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { Product } from '../models/product.model'
import Select from "react-select";

const options = [
    { value: "default", label: "Default" },
    { value: "high", label: "Price: High to low" },
    { value: "low", label: "Price: Low to high" },
]
const ProductCard = ({ id, imgURL, Name, Brand, Price }: any) => {
    const router = useRouter();
    const seeMore = (id: any, e: any) => {
        e.stopPropagation();
        router.push(`/collections/${id}`)
    }
    return (
        <div>
            <Link href={`/collections/${id}`}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="345"
                        width="100%"
                        image={imgURL}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {Brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            price:{Price}$
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={e => seeMore(id, e)}>Details</Button>
                        {/* <Button size="small" >Add To Cart</Button> */}
                    </CardActions>
                </Card>
            </Link>

        </div>
    )
}
export const Collections = ({ productsFilter, sortProducts }: any) => {
    return (
        <div >
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h1>Collections</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{marginTop:'5%', width:'50%',marginLeft:'20%'}}>
                        <Select
                            options={options}
                            onChange={(e: any) => sortProducts(e.value)}

                        />
                        </div>
                        
                    </Grid>
                </Grid>
            </div>
            <div style={{marginTop:'1%'}} >
                <Grid container spacing={5}>
                    {productsFilter.map((product: any) => (
                        <Grid item xs={4} key={product.id}>
                            <ProductCard {...product} />
                        </Grid>
                    )
                    )}

                </Grid>
            </div>
        </div>
    )
}
