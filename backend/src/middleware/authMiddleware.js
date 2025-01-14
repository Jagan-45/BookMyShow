const jwt=require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    console.log(req.headers);
    const token = req.headers['authorization']?.split('%20')[1];
    console.log(token);
    console.log(req.headers['authorization']);
   
    if(!token) return res.status(403).json({error:'No token provided'});

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) throw new Error('Cannot decode token');
        req.user=decoded;
        next();
    } catch(err) {
        return res.status(401).json({error:'Invalid or expired token'});
    }
};

module.exports={verifyToken};