import Users from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "username", "usia", "gender", "tinggibadan", "beratbadan"],
    });
    res.json(users);
  } catch (error) {
    console, console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, username, password, configpassword, usia, gender, tinggibadan, beratbadan } = req.body;
  if (password !== configpassword) return res.status(400).json({ msg: "passwors salah" });
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      username: username,
      password: hashpassword,
      usia: usia,
      gender: gender,
      tinggibadan: tinggibadan,
      beratbadan: beratbadan,
    });
    res.json({ msg: "regis sukses" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "salah" });
    const userId = user[0].id;
    const name = user[0].name;
    const username = user[0].username;
    const usia = user[0].usia;
    const gender = user[0].gender;
    const tinggibadan = user[0].tinggibadan;
    const beratbadan = user[0].beratbadan;
    const accessToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });
    const refreshToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 100,
      secure: true,
    });
    res.json({ accessToken });
    // res.json({
    //   accessToken,
    //   user: {
    //     id: userId,
    //     name,
    //     username,
    //     usia,
    //     gender,
    //     tinggibadan,
    //     beratbadan,
    //   },
    // });
  } catch (error) {
    res.status(404).json({ msg: "salah" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params; // Assuming the user ID is passed as a URL parameter
  const { usia, tinggibadan, beratbadan } = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Ensure only the authenticated user can update their own information
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.userId !== user.id) return res.status(403).json({ msg: "Unauthorized" });

    // Update the user's information
    user.usia = usia || user.usia;
    user.tinggibadan = tinggibadan || user.tinggibadan;
    user.beratbadan = beratbadan || user.beratbadan;

    await user.save();

    res.json({ msg: "User information updated", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
