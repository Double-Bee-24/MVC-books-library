# 3.2-MVC-books-library
# Book Library Management System

## Overview

This project is a simple Book Library Management System built using the MVC (Model-View-Controller) architecture. It allows users to manage a collection of books, authors, and their associated data. The application supports pagination, search functionality, and the ability to view and edit book details. It also features basic authentication for the admin panel.

## Features

- **Book Management**: View, add, edit, and delete books in the system.
- **Author Management**: Manage authors and link them to books.
- **Pagination**: View books with pagination to handle large data sets.
- **Search**: Search for books by title, author, or publication year.
- **Admin Panel**: Basic authentication for administrative tasks.
- **View Count**: Track how many times a book has been viewed.
- **AJAX Support**: Update book view and "want" counters without reloading the page.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL (for storing books, authors, and their relationships)
- **Frontend**: HTML, CSS, Bootstrap 4
- **Authentication**: Basic Auth
- **Pagination**: Handled via SQL queries with `OFFSET` and `LIMIT`
- **AJAX**: For dynamic interaction (e.g., updating view count or clicks)

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/book-library.git

