"use client"
import Notify, { showToast } from '@/components/_helpers/toaster/notify';
import React from 'react'

export default function SignIn() {
    function getdata(): void {
        console.log(`${process.env.NEXT_PUBLIC_API_PATH}WeatherForecast`);
        // async (data: any) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_API_PATH}WeatherForecast`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(data),
            };

            const fetchData = async () => {
                let response = await fetch("https://catfact.ninja/fact");
                response = await response.json();

            };
            console.log("1");
            const res: any = fetch(endpoint, options);
            var data = JSON.stringify(res);
            console.log("2" + data);
            console.log("3");

            const regMsg = res.json();
            if (res.status == 202) {
                showToast(regMsg.msg, "success");
                // reset();
            } else showToast(regMsg, "error");
        } catch (e: any) {
            showToast(e, "error");
        }
        // };
    }
    const fetchData = async () => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_PATH}WeatherForecast`;
        let response = await fetch(endpoint);
        console.log(response);
        if (response.status == 200) {
            showToast("success", "success");
            // reset();
        } else showToast("something wrong", "error");
        console.log(response);
    };
    return (
        <div className=''>
            <Notify />
            <button className='btn' onClick={fetchData}>Click to call API</button>
        </div>
    );
}
