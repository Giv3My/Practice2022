// const express = require('express'),
//     app = express(),
//     cors = require('cors'),
//     port = process.env.PORT || 3001,
//     md5 = require('md5');

// // app.use(cors());
// app.use(express.json());

// let token = "";

// const generateToken = (data) => {
//     const { userEmail } = data;

//     return md5(userEmail);
//     // localStorage.setItem("userToken", token);
// }

// app.post("/auth", (req, res) => {
//     token = generateToken(req.body);

//     res.json(token);
// })

// app.get("/auth", (req, res) => {
//     if (token)
//         res.json(token);
//     else
//         res.send("");
// })

// app.listen(port, () => {
//     console.log("Server is running on port:", port);
// })