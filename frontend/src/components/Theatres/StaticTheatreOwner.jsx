import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import OkPage from './OkPage';
import Loader from '../Loader';

const StaticTheatreOwnerCheck = () => {
    const { id, name } = useParams();
    const [theatreData, setTheatreData] = useState({});
    const [status, setStatus] = useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const [showResponsePage, SetshowResponsePage] = useState(()=>{
        return localStorage.getItem("okpage")===true;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v0/admin/KYCPage/${id}/${name}`);
                const data = await response.json();
                console.log(data);
                setTheatreData(data.theatre);
            } catch (error) {
                console.error('Error fetching theatre data:', error);
            }
        };
        fetchData();
    }, [id, name]);

    const handleVerification = (status) => {
        setStatus(status);
    };

    useEffect(() => {
        const verifyKyc = async () => {
            if (status === null) return;
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/v0/admin/VerifyKyc', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        isOk: status,
                        theatre_id: id
                    })
                });
                if(response.status === 200) {
                    SetshowResponsePage(true)
                    localStorage.setItem("okpage",true);
                }
             
                console.log('KYC verification response:', await response.json());
            } catch (error) {
                console.error('Error verifying KYC:', error);
            }
            finally{
                setIsLoading(false);
            }
        };
        verifyKyc();
    }, [status, id]);

    return (
        <div>
            {showResponsePage?(
                <OkPage size={100} color={'#4CAF50'}/>
            ): isLoading?<Loader/>:
            <div className='min-h-screen bg-gradient-to-r from-zinc-50 to-slate-700 flex flex-col'>
                <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-50 to-slate-200 p-10">
                    <h1 className="flex flex-row justify-center items-center font-bold text-4xl bg-gradient-to-r from-zinc-900 to-slate-300 bg-clip-text text-transparent">
                        Theatre KYC Verification
                    </h1>
                </div>
                
                <div className="flex flex-row flex-1">
                    <div className="w-1/2 bg-gradient-to-r from-gray-50 to-gray-300 p-8 overflow-y-auto">
                        <Card heading="Theatre Name" description={theatreData.theatre_name} />
                        <Card heading="Phone Number" description={theatreData.phno} />
                        <Card heading="Email" description={theatreData.email} />
                        <Card heading="Theatre Address" description={theatreData.theatre_address} />
                        <Card heading="State" description={theatreData.state} />
                        <Card heading="City" description={theatreData.city} />
                        <Card heading="Pincode" description={theatreData.pincode} />
                        <Card heading="Screens" description={theatreData.screens} />
                        <Card heading="Seats" description={theatreData.seats} />

                        <div className='flex flex-row space-x-4 mt-8'>
                            <button className="bg-gradient-to-r from-lime-300 to-emerald-500 py-2 px-6 rounded-lg hover:opacity-80 transition-opacity duration-300 text-white"
                                onClick={() => { handleVerification(true) }}
                            >Accept</button>
                            <button className="bg-gradient-to-r from-red-400 to-amber-600 py-2 px-6 rounded-lg hover:opacity-80 transition-opacity duration-300 text-white"
                                onClick={() => { handleVerification(false) }}
                            >Reject</button>
                        </div>
                    </div>

                    <div className="w-1/2 bg-gradient-to-r from-slate-700 to-zinc-50 p-8 flex items-center justify-center">
                        <AnimatedContent />
                    </div>
                </div>
            </div>}
        </div>
    );
};

const Card = ({ heading, description }) => {
    return (
        <div className="relative w-full max-w-sm flex flex-row space-x-2 hover:opacity-80 transition-opacity duration-300 mb-4">
            <h1 className="font-mono text-lg text-gray-500 mr-3 w-1/3">{heading}</h1>
            <p className="font-mono text-lg text-black mr-3 w-2/3">{description}</p>
        </div>
    );
};

const AnimatedContent = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            className="text-white text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 className="text-3xl font-bold mb-4" variants={itemVariants}>
                Take a moment
            </motion.h2>
            <motion.p className="mb-4" variants={itemVariants}>
                Verify the detials of the theatre owner with the details provided.
            </motion.p>
            <motion.div variants={itemVariants}>
                <svg className="w-24 h-24 mx-auto text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </motion.div>
            <motion.p className="mt-4" variants={itemVariants}>
                I will ensure the kyc is done by checking the details provided by the theatre owner.
            </motion.p>
        </motion.div>
    );
};

export default StaticTheatreOwnerCheck;

