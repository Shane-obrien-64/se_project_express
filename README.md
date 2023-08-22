# WTWR (What to Wear?): Back End

This repository contains the Express.js server for the What to Wear (WTWR) web application. WTWR helps users choose outfits based on weather, occasions, and personal preferences.

Features

- Weather-based outfit recommendations
- Outfit planning
- User authentication

API Endpoints

/items

- GET api/items/ Get items
- POST api/items/ Create item
- DELETE api/items/:itemId Delete item
- PUT api/items/:itemId/likes Add like
- DELETE api/items/:itemId/likes Delete like

/users

- POST api/users Creates user
- GET api/users Gets all users
- GET api/users/:userId Get specific user

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
