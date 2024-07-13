const jwt = require("jsonwebtoken");

// protected routes
const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "User not found , Please Login..." });
  }
};

module.exports = requireSignIn;
