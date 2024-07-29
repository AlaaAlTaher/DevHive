import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
/*   const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
  }); */  // it have been taken to the middle ware to make it maore efficent and secure.


    //we will reach our user ID because in the middleware we passed our user id to request 
  console.log(req.userId); // this is so importent because using this ID we will verify our user when we delete any post we are gonna check the user ID of this post and then check if its equal to this id then it will mean that we are the owner of that post then we can delete. i like that
  
  
    res.status(200).json({ message: "You are authenticated" });

};




export const shouldBeAdmin = async (req, res) => {

    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not Authenticated" });
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
 
      if (!payload.isAdmin){
        return res.status(403).json({ message: "Not authorized" }); //if not admin - it checks if its an admin user
      }
 
    });
  
    res.status(200).json({ message: "You are authenticated" });
  

};

// npm install jsonwebtoken
// npm install
