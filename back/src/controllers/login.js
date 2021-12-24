import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import { User } from "../models/index.js";

const loginRouter = new Router();

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect = await bcrypt.compare(body.password, user?.passwordHash);

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  const token = jwt.sign({
    username: user.username,
    id: user.id,
  }, process.env.JWT_SECRET);

  response.status(200).send({
    token,
    username: user.username,
    id: user.id,
  });
});

export {loginRouter};
