// import express from "express";
// import { getUsers, Register, Login, updateUser } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/verifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
// const router = express.Router();

// router.get("/users", verifyToken, getUsers);
// router.post("/register", Register);
// router.post("/login", Login);
// router.get("/token", refreshToken);
// export default router;   


import express from "express";
import { getUsers, Register, Login, updateUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers); // Menggunakan verifyToken untuk memastikan pengguna yang sedang login
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.put("/updateUser", verifyToken, updateUser); // Menggunakan verifyToken untuk memastikan pengguna yang sedang login

export default router;
