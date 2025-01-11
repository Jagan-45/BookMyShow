

const {transporter}=require('../services/authServices')
const sequelize=require('../config/database');
const {Theatre}=require('../models/Theatre')

const TheatreFormKyc = async (req,res)=>{
    const transaction=await sequelize.transaction();
        try{
            const {phno,email,theatre_name,theatre_address,state,city,pincode,seats,screens}=req.body;
            const FindTheatre=await Theatre.findOne({where:{email}});
            if(FindTheatre) return res.status(400).json({error:'Theatre already exists with this email'});
            const user=req.user;
            const owner=await Theatre.create({
                user_id:user.id,
                phno,
                email,
                theatre_name,
                theatre_address,
                state,
                city,
                pincode,
                seats,
                screens,
                isverified:false,
            })
            await owner.save();
            const row=await Theatre.findOne({where:{theatre_name}});

            await transaction.commit();


            const VERIFY_KYC_URL=`http://localhost:5173/theatre/kyc/${row.theatre_id}/${row.theatre_name}`;

            const mailOptions={
                from:email,
                to:"balujgn@gmail.com",
                subject:`Theatre KYC for ${row.theatre_name}`,
                html: `
                        <p>This is to verify the KYC of <strong>${row.theatre_name}</strong> with the following details:</p>
                        <a 
                            href="${VERIFY_KYC_URL}" 
                            style="
                                display: inline-block;
                                text-decoration: none;
                                background-color: #007BFF;
                                color: white;
                                padding: 10px 20px;
                                border: none;
                                border-radius: 5px;
                                cursor: pointer;
                                font-size: 16px;
                                transition: background-color 0.3s ease, transform 0.2s ease;
                            "
                            onmouseover="this.style.backgroundColor='#0056b3'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.backgroundColor='#007BFF'; this.style.transform='scale(1)';"
                        >
                            Verify KYC
                        </a>
                        <p>Alternatively, click <a href="${VERIFY_KYC_URL}">here</a> to verify.</p>
                    `,
                
                
            }

            await transporter.sendMail(mailOptions);

            res.send(201).json({message:'Theatre KYC submitted successfully. Please wait until the admin verifies your KYC.'});

        } catch(err){
            if(transaction.finished!=='commit') await transaction.rollback();
            return res.status(400).json({error:err.message});   
        }
}

    const KYCPage=async (req,res)=>{
    const transaction=await sequelize.transaction();
    try{
        const {id,name}=req.params;
        const theatre=await Theatre.findOne({where:{theatre_id:id,theatre_name:name}});
        if(!theatre) return res.status(404).json({error:'Theatre not found'});
        await transaction.commit();
        return res.json({theatre});
    }catch(err){
        if(transaction.finished!=='commit') await transaction.rollback();
        return res.status(400).json({error:err.message});
    }
}

    const VerifyKyc= async(req,res)=>{
    const transaction=await sequelize.transaction();
    try{
      const {isOk,theatre_id}=req.body;
      const theatre=await Theatre.findOne({where:{theatre_id}});
      if(!theatre) return res.status(404).json({error:'Theatre not found'});
      if(isOk){
          theatre.isverified=true;
        }
        else{
            const result=await Theatre.destroy({where:{theatre_id}});
            if(result===0) return res.status(400).json({error:'Failed to delete theatre'});
            else return res.status(200).json({message:'Theatre deleted successfully'});
        }
      await theatre.save();
      await transaction.commit();
      return res.status(200).json({message:'Theatre KYC verified successfully'});

    }catch(err){
        if(transaction.finished!=='commit') await transaction.rollback();
        return res.status(400).json({error:err.message});
    }
}

module.exports={
    TheatreFormKyc,
    KYCPage,
    VerifyKyc,
}