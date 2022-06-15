import '../styles/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import type { AppProps } from 'next/app'
import { AuthContextProvider} from '../context/AuthContext'



function MyApp({ Component, pageProps }: AppProps,{totalProducts}:any) {
  return (
  <div>
    
    <AuthContextProvider>
    <Navbar />
    <Component {...pageProps} />
    <Footer/>
    </AuthContextProvider>
  </div>
 
  )
  
}

export default MyApp
