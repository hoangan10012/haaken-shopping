import * as React from 'react';
import styles from '../styles/details.module.css';
import Head from 'next/head';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export interface IAppProps {
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
export default function App(props: IAppProps) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className={styles.namepage}>
                <div className={styles.gridtittle}>
                    <span style={{ color: 'white' }} >Home/Brand/Artistic</span>
                </div>
            </div>
            <main className={styles.main}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid className={styles.imagepro} item xs={7}>
                            <Grid container spacing={0}>
                                <Grid item xs={3}>
                                    <Item sx={{ height: '679px' }}>
                                        <ImageList sx={{ marginTop: 0 }} cols={1} >
                                            {itemData.map((item) => (
                                                <ImageListItem key={item.img}>
                                                    <img
                                                        src={`${item.img}?w=164&h=123&fit=crop&auto=format`}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Item>
                                </Grid>
                                <Grid item xs={9}>
                                    <Item sx={{ height: '679px' }}>
                                        <Card sx={{ maxWidth: 566 }}>
                                            <CardMedia
                                                component="img"
                                                height="662"
                                                image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product1-gallery-1-300x325.jpg"
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </Item>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={5}>
                            <Item className={styles.details}>
                                <h1>ARTISTIC</h1>
                                <span>£100.00</span>
                                <p>Alienum pha edrum torquatos nec eu, vis detra xit per iculis ex, nihil ex petendis in mei. Mei an per icula euripidis, hinc partem ei est eos ei nis.</p>
                                <form action="">
                                    <RemoveIcon></RemoveIcon>
                                    <TextField
                                        sx={{ width: 50, textAlign: 'center' }}
                                        id="outlined-number"
                                    // type="number"
                                    // InputLabelProps={{shrink: true}}
                                    />
                                    <AddIcon></AddIcon>
                                </form >
                                <a href=""><FavoriteBorderIcon sx={{ width: 16, height: 16 }}></FavoriteBorderIcon> add to wishlist</a> <br></br>
                                <span>SKU: 001</span> <br></br>
                                <span>CATEGORY: 001</span> <br></br>
                                <span>TAG: 001</span>
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
                <div>
                    <h2>RELATED PRODUCTS</h2>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: 566 }}>
                                <CardMedia
                                    component="img"
                                    height="327"
                                    image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product1-featured-img-300x325.jpg"

                                />
                            </Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" component="div">
                                    £100.00
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: 566 }}>
                                <CardMedia
                                    component="img"
                                    height="327"
                                    image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product1-featured-img-300x325.jpg"

                                />
                            </Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" component="div">
                                    £100.00
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: 566 }}>
                                <CardMedia
                                    component="img"
                                    height="327"
                                    image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product1-featured-img-300x325.jpg"

                                />
                            </Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" component="div">
                                    £100.00
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: 566 }}>
                                <CardMedia
                                    component="img"
                                    height="327"
                                    image="https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product1-featured-img-300x325.jpg"

                                />
                            </Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" component="div">
                                    £100.00
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    );
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },

];