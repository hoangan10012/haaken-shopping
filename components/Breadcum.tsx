import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../styles/cart.module.css'

const Breadcum = ({ hasEndLink }:any) => {
    //arr = ["collection, index"]
    const router = useRouter();

    const arrLink = router.pathname.split("/").slice(1);
    let endLink = arrLink.pop();
    if (hasEndLink) {
        endLink = hasEndLink;
    }
    return (

        <div className={styles.namepage} >
            <div className={styles.gridtittle} style={{ color: 'white' }}>

                <span >
                    <Link href="/">Home</Link>/
                    {arrLink.map((link) => (
                        <>
                            {" "}
                            <Link href={`\\${link}`}>{link}</Link>/ {" "}
                        </>
                    ))}
                    {endLink}
                </span>
            </div>

        </div>

    );
};

export default Breadcum;
