const jwt = require("jsonwebtoken");
const mydatatype = require('../schimatype/schimatype');
const keysecret="ppopopopopopopopopoppopopo";



const authenticat = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const verifytoken = jwt.verify(token,keysecret);
        const rootUser = await mydatatype.findOne({_id:verifytoken._id});
        console.log(rootUser);
        if(!rootUser)
        {
            throw new Error("user not found");
        }
        req.token = token;
        req.rootUser= rootUser;
        req.userId = rootUser._id;
        next();
    }catch(error)
    {
       res.status(401).json({status:401,massage:"unauthorized no token provider"}); 
    }


}

module.exports = authenticat;

; // Use environment variable for security

const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 401, message: "Unauthorized: No token provided" });
    }
    
    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    // Verify the token
    const verifytoken = jwt.verify(token, keysecret);

    // Find the user in the database
    const rootUser = await mydatatype.findOne({ _id: verifytoken._id });
    if (!rootUser) {
      return res.status(401).json({ status: 401, message: "Unauthorized: User not found" });
    }

    // Attach user info to request object
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error); // Log error details for debugging
    res.status(401).json({ status: 401, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;

