import React from "react";

type JerseytestType = {
  _id: string
  username: string
  password?: string
  date_added?: number
  name?: string
}

const JerseyListingTest = async () => {

    
  try {

    const res = await fetch('http://localhost:4000/products/get')
    const data = await res.json()

    console.log(data)

    return <div>
      <h2>Jerseys</h2>
      <ul>
        {data.items.map((item: JerseytestType) => 
          <li key={item._id}>{item._id}</li>
        )}
      </ul>
    </div>;
  } catch {
    return <div>Error on Fetch</div>;
  }
};

export default JerseyListingTest;
