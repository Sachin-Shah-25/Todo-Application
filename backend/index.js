const server = require('express');
const app = server();
const dotenv = require('dotenv')
const userrouter = require('./UserRouter/userrouter');
const cors = require('cors');
const todorouter = require('./UserRouter/todorouter');
const { default: mongoose } = require('mongoose');
const todomodel = require('./UserModels/todomodel');
const usermodel = require('./UserModels/usermodel');
const cookieParser = require('cookie-parser');
const { verifyUser } = require('./helper/utils');

dotenv.config()



const options = {
    origin: ["http://localhost:5173"],
    credentials: true
}

app.use(cors(options));
app.use(cookieParser())
app.use(server.static("public"));
app.use(server.json());
app.use("/user", userrouter);
app.use("/todo", todorouter);


app.get("/user", verifyUser, async (req, res) => {
    const getUser=req.user
    return res.status(201).json({success:true,data:getUser})
})
app.get("/logout", async (req, res) => {
    if(req.cookies['token']){
        res.clearCookie("token")
    }
    return res.status(201).json({success:true,data:""})
})
app.get("/", verifyUser, async (req, res) => {

    try {
        const getToken = req.headers.authorization;
        const getUserId = getToken.split(" ")[1];
        if (!getUserId) {
            return res.status(401).json({ success: false, message: "Please Login Again " });
        }
        const findAllTodo = await usermodel.findOne({ _id: getUserId }).populate({
            path: "todocreateby"
        });
        return res.status(200).json({ success: true, message: "Tasks retrieved successfully", userTask: findAllTodo });

    } catch (error) {
        return res.status(500).json({ success: false, message: "An error Found.", error: error.message });
    }
});

// mongodb://localhost:27017/todoapp


mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Database ")).catch(e => console.log(e.message));
app.listen(5000, () => {
    console.log("Server Started ", 5000);
})
