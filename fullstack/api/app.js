import express from "express";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
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
app.use(express.json());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("Server is running!");
  // nodemon app.js
}); //console-ninja node --watch app.js
