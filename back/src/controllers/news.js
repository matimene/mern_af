import { Router } from "express";
import { News } from "../models/index.js";

const newsRouter = new Router();

// Read all paginated
newsRouter.get("/", async (request, response) => {
  //let { page = 1, perPage = 20, isArchived = false } = request.query; // Int, fist page = 1
  let { page, perPage, isArchived } = request.query; // Int, fist page = 1
  console.log(request.query);
  page = parseInt(page);
  perPage = parseInt(perPage);
  const skip = (page - 1) * perPage;
  const archivedDateVal = isArchived == "true" ? { $ne: null } : null;

  const news = await News.find({ archiveDate: archivedDateVal })
    .populate("author", "username")
    .sort({ date: "desc" })
    .limit(perPage)
    .skip(skip);
  const total = await News.count({ archiveDate: archivedDateVal });
  response.json({ news, total });
});

// Read all
newsRouter.get("/full", async (request, response) => {
  const news = await News.find({})
    .populate("author", "username")
    .sort({ date: -1 });
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

// Put (only toggle archiveDate)
newsRouter.put("/toggle/:id", async (request, response, next) => {
  const user = request.user;
  const newsToUpdate = await News.findOne({ _id: request.params.id });

  // _id values needs to be converted to string before consumption
  if (user._id.toString() === newsToUpdate.author.toString()) {
    try {
      newsToUpdate.archiveDate = newsToUpdate.archiveDate
        ? null
        : new Date().toISOString();
      await newsToUpdate.save();
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

// Put
newsRouter.put("/:id", async (request, response, next) => {
  const user = request.user;
  const newsToUpdate = await News.findOne({ _id: request.params.id });

  // _id values needs to be converted to string before consumption
  if (user._id.toString() === newsToUpdate.author.toString()) {
    try {
      const updatedNews = await News.findOneAndUpdate(
        { _id: request.params.id },
        request.body, // {...request.body, author: user._id }
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
      response.json(updatedNews);
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

export { newsRouter };
