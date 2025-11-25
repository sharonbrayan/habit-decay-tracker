import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
if (
    req.path.includes("vite") ||
    req.path.includes("@react-refresh") ||
    req.path.includes("favicon") ||
    req.method === "OPTIONS"
  ) {
    return next();
  }

  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401) 
      .json({ success: false, message: "No token provided in cookies" });
  }

  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // same secret as register

    if (!decoded?.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    req.id = decoded.id;
    next(); 
  } catch (error) {
    return res 
      .status(401)
      .json({ success: false, message: error.message });
  }
};
