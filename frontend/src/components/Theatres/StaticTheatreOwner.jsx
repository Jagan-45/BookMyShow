
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StaticTheatreOwnerCheck = () => {

    const {id,name} = useParams();
    const [theatreData,setTheatreData] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/v0/admin/KYCPage/${id}/${name}`);
            const data = await response.json();
            setTheatreData(data);
        };
        fetchData();
    },[])
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-50 to-gray-400 border rounded-md oultine-none space-y-2 w-full'>

        <h1 className="relative w-[max-content] font-mono
                        before:absolute before:inset-0 before:animate-typewriter
                        before:bg-white
                        after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
                        after:bg-black
        ">
            Theatre KYC Verification
        </h1>

           <Card heading={"Theatre Name"} description={theatreData.theatre_name}/>
           <Card heading={"Phone Number"} description={theatreData.phno}/>
           <Card heading={"Email"} description={theatreData.email}/>
           <Card heading={"Theatre Address"} description={theatreData.theatre_address}/>
           <Card heading={"State"} description={theatreData.state}/>
           <Card heading={"City"} description={theatreData.city}/>
           <Card heading={"Pincode"} description={theatreData.pincode}/>
            <Card heading={"Screens"} description={theatreData.screens}/>
           <Card heading={"Seats"} description={theatreData.seats}/>

            <div className='flex flex-row space-x-4'>
            <button className="bg-gradient-to-r from-lime-300 to-emerald-500 py-2 px-6 rounded-lg hover:opacity-80 transition-opacity duration-300 text-white">Accept</button>
            <button className="bg-gradient-to-r from-red-400 to-amber-600  py-2 px-6 rounded-lg hover:opacity-80 transition-opacity duration-300 text-white">Reject</button>
            </div>
            
            
        </div>
    )
}

const Card= ({heading,description}) => {

    return (

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-row space-x-2 hover:opacity-80 transition-opacity duration-300">
            <h1 className="font-mono text-lg text-gray-500 mr-3">{heading}</h1>
            <p className="font-mono text-lg text-black">{description}</p>
        </div>
    )
}


export default StaticTheatreOwnerCheck;