# StoryVault

A Node.js web application for creating, sharing, and managing public and private stories. Users can log in with Google, write their own stories, and read stories shared by others.

## Features

- Google OAuth authentication
- Create, edit, and delete your own stories
- Set stories as public or private
- View all public stories from all users
- Dashboard to manage your stories
- Responsive UI with Materialize CSS
- Rich text editing with CKEditor

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Passport.js (Google OAuth)
- Express-Session & connect-mongo
- Handlebars (hbs) templating
- Materialize CSS
- CKEditor

## Getting Started

### 1. Clone the repository

git clone https://github.com/sakshi-chakre-04/StoryVault.git
cd StoryVault

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a `.env` file in the `config` folder (or use `config/config.env`) and add:

PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

### 4. Run the app

npm run dev
or
node app.js

## Folder Structure

StoryBooks/
  ├── app.js
  ├── config/
  ├── middleware/
  ├── models/
  ├── public/
  ├── routes/
  ├── views/
  ├── package.json
  └── README.md

## Credits

- [Materialize CSS](https://materializecss.com/)
- [Font Awesome](https://fontawesome.com/)
- [CKEditor](https://ckeditor.com/)
