import '../styles/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
  </div>
 
  )
  
}

export default MyApp
