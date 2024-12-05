# 3.2-MVC-books-library
# Book Library Management System

## Overview

This project is a simple Book Library Management System built using the MVC (Model-View-Controller) architecture. It allows users to manage a collection of books, authors, and their associated data. The application supports pagination, search functionality, and the ability to view and edit book details. It also features jwt authentication for the admin panel.

## Features

- **Book Management**: View, add, edit, and delete books in the system.
- **Author Management**: Manage authors and link them to books.
- **Pagination**: View books with pagination to handle large data sets.
- **Search**: Search for books by title, author, or publication year.
- **Admin Panel**: Basic authentication for administrative tasks.
- **View Count**: Track how many times a book has been viewed. Represented as clicks on admin panel.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL (for storing books, authors, and their relationships)
- **Frontend**: HTML, CSS, React
- **Authentication**: JWT authentication
- **Pagination**: Handled via SQL queries with `OFFSET` and `LIMIT`

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Double-Bee-24/3.2-MVC-books-library.git
```

### 2. Install dependencies in both 'frontend' and 'backend' folders
```bash
npm i
```

### 3. Set up database 
Create mySql database named mvc_library (you can use your own name, but make sure you set your DB_NAME in backend .env to this value)

### 4. Create and configure .env file in the backend and frontend directories
'Frontend' directory should include next lines in .env file:
```bash
 VITE_BASE_API_URL=http://localhost:3000/api/v1
 VITE_ADMIN_API_URL=http://localhost:3000/admin/api/v1
```
'Backend' directory should include next .env file: 
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mvc_library
ADMIN_LOGIN=admin
ADMIN_PASSWORD="&S8f^k2#JpR$L9z@X7g!"
JWT_SECRET="don't tell anyone"
```
*DB_USER* (by default set to 'root') and *DB_PASSWORD* fields should contain your own database data. You also can change other fields and app would use your variables instead.
Access to the admin panel requires *ADMIN_lOGIN/PASSWORD* to be entered to the login fields  

### 5. Run app 
Create two terminals, enter to the folders of both backend and frontend and use next command:
```bash
npm run dev
```


