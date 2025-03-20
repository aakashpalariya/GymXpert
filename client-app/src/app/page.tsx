import Image from "next/image";
import styles from "./page.module.css";

import React from 'react'

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Centers vertically
        height: "100vh", // Full viewport height
        textAlign: "center", // Ensures text is centered
        flexDirection: "column", // Stack items vertically
        backgroundColor: "white"
      }}>
      <Image src={'/logo/logo-black.png'} alt={'Gym Xpert'} width={200} height={0} />
      <p>A application for managing you Gym</p>
    </div>
  )
}

export default Home