import { Router } from "express";
import { News } from "../models/index.js";

const newsRouter = new Router();

// Read all paginated
newsRouter.get("/", async (request, response) => {
  const { page, perPage } = request.body; // Int, fist page = 1
  const limit = perPage || 0;
  const skip = (page -1) * perPage || 20;
  console.log({limit, skip});
  const news = await News.find({})
                         .populate("author", 'username')
                         .sort({'date': 'asc'})
                         .limit(limit)
                         .skip(skip);
  response.json(news);
});

// Read all
newsRouter.get("/full", async (request, response) => {
  const news = await News.find({})
                         .populate("author", 'username')
                         .sort({'date': -1});
  response.json(news);
});

// Read one
newsRouter.get("/:id", async (request, response) => {
  const news = await News.findOne({ _id: request.params.id });
  response.json(news);
});

// Create
newsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  // Required properties (others at creation: date auto-asigned, archiveDate default to null, author obtained from the user)
  const { title, description } = body;
  if (!title || !description) {
    return response.status(400).json({
      error: "DATA MISSING: Title and description are required",
    });
  }

  if (!user) {
    return response.status(400).json({
      error: "Err: users need to be logged in to create news",
    });
  }

  console.log({user,body})
  try {
    // Saving news
    const news = new News({
      author: user.id,
      title,
      description,
    });
    await news.save();

    // Updating news list on the user creator
    user.news = user.news.concat(news);
    await user.save();

    response.json(news);
  } catch (error) {
    next(error);
  }
});

// Put
newsRouter.put("/:id", async (request, response, next) => {
  const user = request.user;
  const newsToUpdate = await News.findOne({ _id: request.params.id });

  // _id values needs to be converted to string before consumption
  if (user._id.toString() === newsToUpdate.author.toString()) {
    try {
      await News.findOneAndUpdate(
        { _id: request.params.id },
        request.body,
        { upsert: true, new: true, runValidators: true }
      );
      response.json(newsToUpdate);
    } catch (error) {
      next(error);
    }
  } else {
    response.status(401).json({
      error: "Unauthorized: only the user who create the news can edit it",
    });
  }
});

// Delete
newsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;
  const newsToDelete = await News.findOne({ _id: request.params.id });
  
  // _id values needs to be converted to string before consumption
  if (user._id.toString() === newsToDelete.author._id.toString()) {
    try {
      await News.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  } else {
    response.status(401).json({
      error: "Unauthorized: only the user who create the news can delete it",
    });
  }
});

export {newsRouter};
