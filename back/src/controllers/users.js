import bcrypt from "bcrypt";
import { Router } from "express";
import { User } from "../models/index.js";

const usersRouter = new Router();

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log(body);
  if (body.username.length < 6 || body.password.length < 6) {
    return response.status(400).json({
      error:
        "username and password need to have a minimun length of 6 characters long",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  try {
    const user = new User({
      username: body.username,
      passwordHash,
      news: [],
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (err) {
    console.log(err);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("news").exec();
  response.json(users);
});

export { usersRouter };
