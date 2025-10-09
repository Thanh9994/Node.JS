import { Router } from "express";
import {
  addAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/author";
import { validateRequest } from "../middleware/validationRequest";
import { authorAddSchema, authorUpdateSchema } from "../validation/author.validation";

const authorRouter = Router();

// GET api/authors
authorRouter.get("/", getAuthors);

// GET api/authors/:id
authorRouter.get("/:id", getAuthorById);

// POST api/authors
authorRouter.post("/", validateRequest(authorAddSchema), addAuthor);

// PUT api/authors/:id
authorRouter.put("/:id", validateRequest(authorUpdateSchema), updateAuthor);

// DELETE // api/authors/:id
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;