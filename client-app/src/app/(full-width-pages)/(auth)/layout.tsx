import React from 'react'
import styles from "./layout.module.css";
import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.auth_body}>

        <div className={styles.auth_container}>
            <div className={styles.auth_left_section}>
                {children}
            </div>
            <div className={styles.auth_right_section}>
                <div className={styles.branding}>
                    <Image src={'/logo/logo-white.png'} alt={'Gym Xpert'} width={200} height={0} />
                    <p className={styles.branding_para}>Free and Open-Source Tailwind CSS Admin Dashboard Template</p>
                </div>
            </div>
            </div>

         </div>
    );
}
