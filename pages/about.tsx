import * as React from 'react';
import Breadcum from '../components/Breadcum';
import styles from '../styles/about.module.css'
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
    <Breadcum/>
      <main className={styles.main}>
            
            
      </main>
    </div>
  );
}
