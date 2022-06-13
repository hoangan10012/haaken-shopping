import * as React from 'react';
import styles from '../styles/checkout.module.css'
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from '@mui/material/Button';
import { CashOnDeli } from '../components/CashOnDeli';
import { Tablecart } from '../components/Tablecart';
export interface IAppProps {
}


export default function App(props: IAppProps) {
  const [country, setCountry] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  return (
    <div>
      <div className={styles.namepage}>
        <div className={styles.gridtittle}>
          <span style={{ color: 'white' }} >Home/Checkout</span>
        </div>
      </div>
      {/* <main className={styles.main}>
        <div id='info'>
          <Grid container rowSpacing={1} >
            <Grid item xs={6} >
              <h3>BILLING DETAILS</h3>
              <form action="">

                <InputLabel htmlFor="standard-adornment-amount">First name</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Last name</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Company name (option)</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />

                <InputLabel id="demo-simple-select-label">Country / Region</InputLabel>
                <Select
                  value={country}
                  onChange={handleChange}
                  sx={{ width: '500px' }}
                >
                  <MenuItem value={'UK'} >United Kingdom (UK)</MenuItem>
                  <MenuItem value={'UKraine'} >Ukraine</MenuItem>
                  <MenuItem value={'VN'} >Vietnam</MenuItem>
                </Select>
                <InputLabel htmlFor="standard-adornment-amount">Street address</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  placeholder="House number and street name"
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  placeholder="Apartment, suite, unit, etc.(optional)"
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Town / City</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}

                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Country (optional)</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}

                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Postcode</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}

                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Phone</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}

                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">Email address</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}                
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
              </form>

            </Grid>
            <Grid item xs={6} >
              <h3>ADDITIONAL INFOMATION</h3>
              <InputLabel htmlFor="standard-adornment-amount">Order notes (optional)</InputLabel>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="notes about your order, e.g. special notes for delivery."
                style={{ width: 200 }}
              />
            </Grid>
          </Grid>
        </div>
        <div id='yourorder'>
          <h3> YOUR ORDER</h3>
          <table style={{width: '100%'}}>
            <thead>
              <tr >
                <th >Product</th>
                <th >Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderRight:'none',border:1}}>
                <td >Crimson&nbsp;<strong >×&nbsp;1</strong>
                </td>
                <td>
                  <span ><bdi><span >£</span>220.00</bdi></span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{border: '1px',borderLeft: 'none',borderRight: 'none'}}>
                <th>Subtotal</th>
                <td>
                  <span><bdi><span >£</span>220.00</bdi></span>
                </td>
              </tr>
              <tr >
                <th>Total</th>
                <td><strong><span ><bdi><span >£</span>220.00</bdi></span></strong> </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div id='payment'>
            <h3>CREDIT / DEBIT CARD SECURE PAYMENT</h3>
            <InputLabel htmlFor="standard-adornment-amount">CARDHOLDER</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
            <InputLabel htmlFor="standard-adornment-amount">CARD NUMBER</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
                <InputLabel htmlFor="standard-adornment-amount">EXPIRATION DATE</InputLabel>
                <Select                  
                  onChange={handleChange}
                  sx={{ width: '500px' }}
                  placeholder='month'
                >
          
                  <MenuItem value={1} >1</MenuItem>
                  <MenuItem value={2} >2</MenuItem>
                </Select>
                <Select
                  onChange={handleChange}
                  sx={{ width: '500px' }}
                  placeholder='year'
                >
                 <MenuItem value={1} >2020</MenuItem>
                  <MenuItem value={2} >2022</MenuItem>
                </Select>
                <InputLabel htmlFor="standard-adornment-amount">CARD VERIFICATION NUMBER</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
        </div>
        <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
        <Button variant="contained">PLACE HOLDER</Button>
      </main> */}

      <main  className={styles.main}>
        <Tablecart/>
      </main>
    </div>
  );
}
