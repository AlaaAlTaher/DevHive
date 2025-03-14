import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
  // the paylod have the user id
    req.userId = payload.id;
    

    next(); // if the verification is completed we run the next process 

});


};

// the middleware allow us to intersept any process and make verification then continue that process  to the enext one