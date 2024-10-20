import jwt from "jsonwebtoken";
function verifyToken(req, res, next) {
  //  const tokens = req.headers["authorization"];
  // const token=tokens.split(" ")[1]
  const { token } = req.headers;

  if (!token) return res.status(401).json({ error: "Access denied" });

  /*  const decoded = jwt.verify(token, "basanti",(err,user)=>{
        if(err) {
            return res.status(401).json({ error: "Invalid token" })
        };
        req.user=user;
        next();
    });
   */
  try {
    const decode = jwt.verify(token, "basanti");
    req.body.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
export default verifyToken;
