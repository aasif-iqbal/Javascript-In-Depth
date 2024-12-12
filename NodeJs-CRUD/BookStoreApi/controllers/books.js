import Books from "../models/books.js";

export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = "title", order = "asc", filter } = req.query;

    // Construct sorting and filtering options
    const sortOption = { [sortBy]: order === "asc" ? 1 : -1 };
    const filterCriteria = filter ? { title: new RegExp(filter, "i") } : {}; // Example: filtering by title

    // Fetch books with sorting, filtering, and pagination
    const books = await Books.find(filterCriteria)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Count total books matching the filter criteria
    const totalBooks = await Books.countDocuments(filterCriteria);

    // Check if no books are found
    if (!books.length) {
      return res.status(404).json({
        success: false,
        message: "No books found.",
      });
    }

    // Respond with the retrieved books
    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully.",
      data: books,
      pagination: {
        totalBooks,
        currentPage: Number(page),
        totalPages: Math.ceil(totalBooks / limit),
      },
    });
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error retrieving books:", error);

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving books.",
      error: error.message,
    });
  }
};


export const createBook = async (req, res) => {
    try {
      const { title, author, description, year } = req.body;
  
      // Check if a book with the same title already exists (if titles must be unique)
      const existingBook = await Books.findOne({ title });
      if (existingBook) {
        return res.status(409).json({
          success: false,
          message: "A book with this title already exists.",
        });
      }
  
      // Create a new book
      const newBook = await Books.create({ title, author, description, year });
  
      // Return success response
      res.status(201).json({
        success: true,
        message: "Book created successfully.",
        data: newBook,
      });
    } catch (error) {
      // Handle server errors
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the book.",
        error: error.message,
      });
    }
  };

  export const getBookById = async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the ID is a valid MongoDB ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: "Invalid book ID format.",
        });
      }
  
      // Find the book by ID
      const book = await Books.findById(id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found.",
        });
      }
  
      // Return success response
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully.",
        data: book,
      });
    } catch (error) {
      // Handle server errors
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving the book.",
        error: error.message,
      });
    }
  };

export const updateBook = async (req, res) => {
    try {
      const { id } = req.params; 
  
      // Check if the ID is a valid MongoDB ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: "Invalid book ID format.",
        });
      }
  
      // Check if the book exists in the database
      const book = await Books.findById(id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found.",
        });
      }
  
      // Ensure at least one field is provided for updating
      const { title, author, description, year } = req.body;
      if (!title && !author && !description && !year) {
        return res.status(400).json({
          success: false,
          message: "No fields provided to update.",
        });
      }
  
      // Update the book
      const updatedBook = await Books.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true } // `new` returns the updated document, `runValidators` enforces schema rules
      );
  
      // Return success response
      res.status(200).json({
        success: true,
        message: "Book updated successfully.",
        data: updatedBook,
      });
    } catch (error) {
      // Handle server errors
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the book.",
        error: error.message,
      });
    }
  };

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; 

    // Check if the ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format.",
      });
    }

    // Check if the book exists in the database
    const book = await Books.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    // Delete the book
    await Books.findByIdAndDelete(id);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the book.",
      error: error.message,
    });
  }
};
