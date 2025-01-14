import React from 'react';
import { motion, stagger } from 'framer-motion';


const OkPage=({size,color})=>{
    const containerVariants={
        hidden:{
            opacity:0
        },
        visible:{
            opacity:1,
            transition:{
                duration:0.5,
                staggerChildren:0.1
            }
        }
    }
    const circleVariants={
        hidden:{
            opacity:0,
            scale:0.5
        },
        visible:{
            opacity:1,
            scale:1,
            transition:{
                duration:0.5
            }
        }
    }

    const checkVariants={
        hidden:{
            pathLength:0
        },
        visible:{
            pathLength:1,
            transition:{
                duration:0.5
            }
        }
    }
     
    const itemVariants={
        hidden:{
            y:20,
            opacity:0
        },
        visible:{
            y:0,
            opacity:1,
            transition:{
                duration:0.5
            }
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-200 to-gray-400">
            <motion.div className="flex flex-col space-y-1 items-center justify-center h-screen" variants={containerVariants}>
            
            <motion.svg 
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 52 52"
                initial="hidden"
                animate="visible"
                >
            <motion.circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke={color}
            strokeWidth="2"
            variants={circleVariants}
            />
            
            <motion.path
            fill="none"
            stroke={color}
            strokeWidth="3"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
            variants={checkVariants}
            />

        </motion.svg>

       

        <motion.p className="text-3xl font-bold mb-4" variants={itemVariants}>
            Thankyou for the verification
        </motion.p>

        </motion.div>
        </div>
        
       
    )
}

export default OkPage;