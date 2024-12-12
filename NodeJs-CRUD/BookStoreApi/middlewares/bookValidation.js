import Joi from "joi";

const bookSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
    "any.required": "Title is required."
  }),
  author: Joi.string().required().messages({
    "string.empty": "Author is required.",
    "any.required": "Author is required."
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
    "any.required": "Description is required."
  }),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required().messages({
    "number.base": "Year must be a number.",
    "number.min": "Year must be greater than or equal to 1000.",
    "number.max": `Year must not exceed the current year (${new Date().getFullYear()}).`,
    "any.required": "Year is required."
  })
});

// Middleware to validate the request body
const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

export default validateBook;
