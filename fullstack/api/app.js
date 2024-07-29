import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";


const app = express(); //create app

/*     app.use("/api/test", (req, res) => { //take request and send respons  
        res.send("it works");
    })

    app.use("/api/auth/register", (req, res) => { 
        res.send("it works");
    })

    app.use("/api/auth/login", (req, res) => { 
        res.send("it works");
    })

    app.use("/api/auth/logout", (req, res) => { 
        res.send("it works");
    })

    app.use("/api/posts/", (req, res) => {  // post request
        res.send("it works");
    })

    app.use("/api/posts/", (req, res) => {  // post request
        res.send("it works");
    })
    
    app.use("/api/test", (req, res) => {  // get request
        res.send("it works");
    }) */

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // i used credentials:true to enable using cookies

app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

app.listen(8800, () => {
  console.log("Server is running!");
  // nodemon app.js
});
//console-ninja node --watch app.js
//but this is for tokens
//console-ninja node --env-file .env --watch app.js

// to connect the frontend:   npm i cors
