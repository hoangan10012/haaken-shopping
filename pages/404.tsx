import Breadcum from '../components/Breadcum';
import styles from '../styles/Home.module.css'

export default function Custom404(): JSX.Element {
    return <>
    <Breadcum/>
     <main className={styles.main}>
     <h1>Not found</h1>
           <p> Oh Snap, page not found. Aka 404. </p>
     </main>
    </>;
  }