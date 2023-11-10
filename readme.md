# Fullstack Kanban App

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`: `mongodb+srv://mahendra:mahendra@cluster0.kbgkbw0.mongodb.net/?retryWrites=true&w=majority`

`PASSWORD_SECRET`:`dsfdsfdsfdsfd`

`JWT_SECRET`:`ljdslkfjesoifjdsoli`

## Installation

Install packages with `yarn` run these commands in order

Server Side

```bash
  cd server
  yarn
  yarn start
```

Client Side

```bash
  cd client
  yarn
  yarn start
```

## Features

- Secure Login/SignUp with JWT
- You can Create Boards and Sub sections inside boards
- You can add your board to favourites
- Realtime updations using Redux

## Please Note

- Drag and Drop Feature is left
- Status Feature is not completed

## Tech Stack

**Client:** React, TypeScript, Redux, Material-UI, React-beautiful-dnd, Axios

**Server:** Node, Express, MongoDB

## Demo User

To test the app, use these dummy credentials

```
username - test user
password -  12345678
```
