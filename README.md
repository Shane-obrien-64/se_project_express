# WTWR (What to Wear?): Back End

## frontend repo

https://github.com/Shane-obrien-64/se_project_react

## Link

https://www.wtwr1.crabdance.com

## Overview

This repository contains the Express.js server for the What to Wear (WTWR) web application. WTWR helps users choose outfits based on weather, occasions, and personal preferences.

## Features

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

## Installation

Follow these steps to set up and run the Express.js and Node.js backend locally:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Shane-obrien-64/se_project_express.git
   ```

2. Navigate to the project directory:

   ```bash
   cd se_project_express
   ```

3. Install project dependencies using [Node Package Manager (NPM)](https://www.npmjs.com/). Make sure you have Node.js installed on your machine.

   ```bash
   npm install
   ```

   This command will download and install the necessary dependencies specified in the `package.json` file.

4. Set up environment variables:

   Create a `.env` file in the root of your project and define any necessary environment variables. For example:

   ```plaintext
   PORT=3001
   ```

   Adjust these values based on your specific configuration needs.

5. Start the Express.js server:

   ```bash
   npm start
   ```

   This command will start the Express.js server, and you can access the API at [http://localhost:3001](http://localhost:3001) (or the port you specified in your `.env` file).
