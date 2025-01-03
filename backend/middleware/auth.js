const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };

    console.log(`Authenticated User ID: ${userId}`);
    if (req.body.userId && req.body.userId !== userId) {
      throw "401 Error: user is not authorized";
    } else {
      next();
    }
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(401).json({
      error: new Error("Invalid request!").message,
    });
  }
};
