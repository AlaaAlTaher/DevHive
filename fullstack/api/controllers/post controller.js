import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  // console.log(query)
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000,
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Faild to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          // to send the user info like name and image
          select: {
            // to only send these from the user without password
            username: true,
            avatar: true,
          },
        },
      },
    });

    let userId;

    const token = req.cookies?.token; // if we are logged in you can show the saved posts in the get post function

    if (!token) {
      // if there is no token like user isnt logged in
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          userId = null;
        } else {
          userId = payload.id;
        }
      }); // if there is token it should be verified
    }

    const saved = await prisma.savedPost.findUnique({
      // when verified this shows if post is saved or not
      where: {
        userId_postId: {
          userId, // from token
          postId: id,
        },
      },
    });

    res.status(200).json({...post,isSaved: saved ? true : false});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Faild to get the post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        //pass the datA
        ...body.postData, //take everything inside the body like title/ imge ...
        userId: tokenUserId, //the id for prisma database referance relation
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Faild to create the post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Faild to update the post" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id; // post id
  const tokenUserId = req.userId; // user id

  try {
    //we check if id of post  is for user id
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: true, // to send the user info like name and image
      },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({
        message: "No authorised to delete . You can only delete your own post",
      });
    }
    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted successfully" }); // if everything is ok  we will return this msg
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Faild to delete the post" });
  }
};
