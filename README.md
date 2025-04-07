# Library Management App

This is a responsive library management application built with Angular. It allows librarians to:

- View, search, sort, and paginate the list of books
- Add, edit, and delete books (add implemented)
- View detailed book information
- Check for books by title

- Used json-server for data fetching via REST API (server will run on port 3000)

## How to Run

1. Run `npm run dev`
2. Open `http://localhost:4200`

## Tests

- Only 2 unit tests 
- Run `ng test`

## Features

- Responsive design
- Angular routing
- Bootstrap styling
- Bonus: sort, pagination, search bar

## Data managing

- Possible to add data manually to JSON file `src/assets/books.json` 
    * to check pagination, for example

## Folder Structure

- `src/app/components` – Components for UI
- `src/app/models` – Data interfaces
- `src/app/services` – Book data service
- `src/app/core` – Base API class implemented HTTP-connection

Made with ❤️
