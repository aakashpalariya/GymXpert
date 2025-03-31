"use client"
export const dynamic = 'force-static'

// export const getGyms = async () => {
//     const endpoint = `${process.env.NEXT_PUBLIC_API_PATH}api/gym`;
//     let response = await fetch(endpoint);
//     if (response.status == 200) {
//         return response;
//     } else { console.log("error") }
// };

export const addNumbers = (a: number, b: number): number => {
    return a + b;
  };
  
  export const greetUser = (name: string): string => {
    return `Hello, ${name}!`;
  };

  export async function getGyms() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_PATH}api/gym`;
    console.log(endpoint);
    const res = await fetch(endpoint);
    // const res = await fetch(endpoint, {
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    console.log("after" +res);

    if(res.status == 200)
    {
      console.log("successs");
    }
    else{
      console.log("error");

    }
    const data = await res.json()
   
    return Response.json({ data })
  }