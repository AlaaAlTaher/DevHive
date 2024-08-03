
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const getUsers = async (req, res) => {
    try{
       // console.log("it works")                   testing
       const users = await prisma.user.findMany();
       res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Faild to get users" });
    }
}


export const getUser = async (req, res) => {
    const id = req.params.id; 
    try{
        const user = await prisma.user.findUnique({
            where:{id},
        });
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Faild to get the user" });
    }
}




export const updateUser = async (req, res) => {
    const id = req.params.id; 
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body; // to make sure the pass will stay hashed while fetching and updating the body (the info)

    if(id !== tokenUserId){ //if not the owner
        return res.status(403).json({ message: "No authorised to update . You can only update your own profile" });
    }

    let updatedPassword = null;  //variable
    try{
        
        if(password){
            updatedPassword =await bcrypt.hash(password, 10); 
        }

        const updatedUser = await prisma.user.update({
            where:{id},
            data:{
                ...inputs, //we update everything but password at first
                ...(updatedPassword && {password: updatedPassword}), //if there is no password we don't update it if there is we do
                ...(avatar && {avatar}),
            }
        });

        const {password:userPassword, ...rest} = updatedUser; 
        res.status(200).json(rest);
    }catch(err){ 
        console.log(err);
        res.status(500).json({ message: "Faild to update users" });
    }
}







export const deleteUser = async (req, res) => {

    const id = req.params.id; 
    const tokenUserId = req.userId;


    if(id !== tokenUserId){ //if not the owner
        return res.status(403).json({ message: "No authorised to update . You can only update your own profile" });
    }

    try{
        await prisma.user.delete({
            where:{
                id
            }
        })
        res.status(200).json({ message: "User deleted successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Faild to delete users" });
    }
}