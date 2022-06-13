import * as React from 'react';
import Image from 'next/image'
import styles from '../styles/footer.module.css'
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <footer className={styles.footer}>     
         <p>Copyright  &copy; 2022 by Pham Tran Hoang An_2185031</p> 
      </footer>
    </div>
  );
}
