import {User} from '../models/index.js'
import jwt from 'jsonwebtoken';

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      request.token = authorization.substring(7);
    }
    next();
};

const userExtractor = async (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const token = authorization.substring(7);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken.id) {
            return response
                .status(401)
                .json({ error: "Token missing or invalid: Unauthorized" });
        }
        const user = await User.findById(decodedToken.id);
        request.user = user;
    }

    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    next(error);
};
  
export {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler,
};