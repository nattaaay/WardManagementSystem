// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  // get the authorization header from the request
  // this header contains the JWT token which is sent by the client with each request after they have successfully logged in.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //why [1]?

  if (token == null) {
    return res.sendStatus(401);
  }

  //the jwt_secret environment variable is used as the secret key to verify the token.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } //is successful, the user object is attached to the request object and passed to the next middleware function.
    req.user = user;
    next();
  });
}
