import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  //db opirations
  try {
    //if there was a problem creating the user like constrins
    //hash then save pass
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // creating new user and saving it to mongoDB using prisma
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    res.status(201).json({ message: "User created successfully" }); // success response
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Faild user creation!" }); // error response
  }
};
export const login = async (req, res) => {
  const { username, email, password } = req.body;
  //db opirations
  try {
    // check user exsist
    const user = await prisma.user.findUnique({
      where: { username },});

    if (!user) return res.status(401).json({ message: "Invalid Credentials" }); // error response (the numbers like 401 are error info for the web browser)

    //check user password
    const isPasswordValid = await bcrypt.compare(password, user.password); //check the hash
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    //generating token & send to user

    const age = 1000 * 60 * 60 * 24 * 7; //  from 1ms to 7 days


    const token = jwt.sign( //user info here
      {        
        id: user.id, // so we can decrypt the token then know the userid from posts/ etc
      isAdmin: true,
      
      },
      process.env.JWT_SECRET_KEY, // this is secret key for the token HASHING FOR SECURITY, i saved it in env file
      { expiresIn: age } // token will expier in this time.
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true, // for security purposes  // client side JS cant access the cookie
        // secure: true // to make sure its HTTPS only in online server, we need to turn it on when we finish
        maxAge: age, // when will it expier, now I made it  7 days, if removed will be till closing the session
      })
      .status(200)
      .json (userInfo); //log in successfull 

    // old wat for cookies:   res.setHeader("Set-Cookies", "test=" + "myValue").json("Success");

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to login!" });
  }
};

export const logout = (req, res) => {
  //db opirations
  res.clearCookie("token").status(200).json({ message: "Logout Successful" }); // to clear the token
};

// to restresct the user request this is what we will do. after the login we store the user information in a cookie, then we make a request we will send the cookie to the api , and inside our api  we  decript out cookie and check the user info, then  we interact with the request depending on that information 
// we will have like middlewre for checking for important requests like deleting a post to make sure the user have access, but it will not be needed in requests like fetching/seeing a post, because everyone can do that. nothing to be worried about.
//  after verify  the token info, if it wasnt the right user we will not make the database request nor do the request
// to use the important routs you should be loginned and we will verify the user first
// npm i cookie-parser  for using cookies
// npm i jsonwebtoken
 