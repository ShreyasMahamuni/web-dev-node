const User = require("../Models/User-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Helllo world router");
  } catch (error) {
    console.log(error);
  }
};

//registration logic

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExits = await User.findOne({ email });

    if (userExits) {
      return res.status(400).json({ message: "email already exits" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    res
      .status(201)
      .json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(500).json("internal server error");
    console.log(error);
  }
};

//login logic

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExits = await User.findOne({ email });

        //check user is register or not
        if(!userExits){
            return res.status(400).json({ message: "Invalid Credential"});
        }

        //const user = await bcrypt.compare(password, userExits.password);
        const user = await userExits.comparePassword(password);

        if(user) {
            res
            .status(200)
            .json({
            msg: "Login Successful",
            token: await userExits.generateToken(),
            userId: userExits._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }

    } catch (error) {
        res.status(500).json("internal server error");
    }
}

//to send user data  - user logic
const user = async(req, res) =>{
   try{
     const userData = req.user;
     console.log(userData);
     return res.status(200).json({ userData });
   } catch(error) {
     console.log(`error from the user route ${error}`);
   }
}


module.exports = { home, register, login, user };
