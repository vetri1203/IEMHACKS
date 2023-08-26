import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;
  // Checking the Existing User
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    next(err);
  }
  if (existingUser) {
    return res.status(200).send("User Already Exists!! Login Instead");
  }

  //  Creating new User
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    // Saving new User
    await newUser.save();
    return res.status(200).send("New Register Has Been Created");
  } catch (err) {
    next(err);
  }
  // next();
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.send("User Not Found! Please Register...");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.send("Wrong password or username!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
      expiresIn: "1hr",
    });

    if (req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = "";
    }

    // console.log("Generated Token\n",token);

    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ message: "Logged In SuccessFully!!!", user: user, token });
  } catch (err) {
    next(err);
  }
};
