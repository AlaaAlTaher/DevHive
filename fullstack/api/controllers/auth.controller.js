import bcrypt from "bcrypt";
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
      where: { username },
    }); 
    if (!user) return res.status(401).json({ message: "Invalid Credentials" }); // error response (the numbers like 401 are error info for the web browser)

    //check user password
    const isPasswordValid = await bcrypt.compare(password, user.password); //check the hash
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    //generating token & send to user
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to login!" });
  }
};

export const logout = (req, res) => {
  //db opirations
};
