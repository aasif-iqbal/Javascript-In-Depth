Here’s an updated version of your code with sorting, filtering, and pagination features added:  

```javascript
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
```

### Features Added:
1. **Sorting**:
   - You can sort by any field using `sortBy` (default: `title`).
   - Specify order with `asc` (ascending) or `desc` (descending) using `order`.

2. **Filtering**:
   - Example: Search books by title using the `filter` query parameter. This uses a case-insensitive regular expression.

3. **Pagination**:
   - `page`: Specifies the current page (default: 1).
   - `limit`: Specifies the number of books per page (default: 10).
   - Pagination information includes `totalBooks`, `currentPage`, and `totalPages`.

### Example Query Parameters:
- **Sorting**: `?sortBy=author&order=desc`
- **Filtering**: `?filter=JavaScript`
- **Pagination**: `?page=2&limit=5`
- Combine them: `?sortBy=author&order=asc&filter=React&page=1&limit=10`


mkdir node-app
cd 
npm i express 
——————————————————

<app.js>
import express from ‘express’;

let app = express();

export app;

<server.js>
import app from ‘./app.js’;

let port = 3000;

app.listen(port, ()=>{
	console.log(`server is running on port::${port}`)
})
———
# db
- dbConfig.js
# models
# controllers
# services
# routes
- index.js
- users.js
# middleware
- auth.js
