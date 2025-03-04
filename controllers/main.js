// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the reques with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
// require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(`${username} ${password}`)
  // validation options:
  // mongoose validation
  // Joi  package, use later
  // check in the controller

  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }

  //for testing/demo, normally provided by DB
  const id = new Date().getDate;
  //   console.log(id);
  //only provide resources that belong to user
  //don't use password in payload
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(username, password);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.headers);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log('custom error no authHeader')
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(' ')[1]
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("decoded", decoded)
    
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here it is your authorized data, your lucky number is ${luckyNumber}`,
    });

} catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
}




  
};

module.exports = {
  login,
  dashboard,
};
