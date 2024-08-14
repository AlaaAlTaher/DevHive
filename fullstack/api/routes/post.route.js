import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post controller.js";
import { verifyToken } from "../middleware/verifyToken.js";



const router = express.Router();

 router.get("/test",(req,res) => { //router.get// post // put for updating // delete for deleting
    console.log("router works")
    res.send("it works testttt");
}) 


    
router.get("/", getPosts)

router.get("/:id", getPost)


router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)

export default router;
