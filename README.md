# CS50 Final Project - Personal Progress Tracker

#### Video demo:

### Description

This is my cs50 final project. Cs50 has been an amazing journey, and the best course on intro to cs I ever took. it really taught me a lot.
For this final project, I went on to create a personal progress tracker. It's a simple tool I built for myself in which i can add progress of each day.

### How does it work?

It works pretty simply:

- Click on any date you want at Calendar page
- A modal will appear in which there are fields of time, category, text of what work did and a textarea for day's reflection/thoughts. You can add as many fields as you want
- After filling out your work of day, just click "Save" and your day's progress is saved.
- Whenever you want to see what work you did on a particular date, just click on that date from calendar and a modal will open showing you all work of that day.
- You can simply edit and update your work whenever you want
- You can navigate to dashboard page and there you can see your work on month in a table.

### Tech I used:

- React for frontend
- Python backend with flask
- SQLite3 for database
- React-Router for implementing basic navigation
- `react-calendar` library was used to render calendar
- Tailwind css for styling

## Project Walkthrough

### Frontend Walkthrough

Frontend is made in react. I had learned react basics recently so I wanted to do it with react because I liked its smooth CSR (client side rendering). Manual dom manipulation just felt to daunting.
I created this react project with Vite.

## `src`

### `main.jsx`

It's the main.jsx file which imports renders `<App />`. lt implements both Browser router and dom rendering.

### `App.jsx`

It's the main App which is imported and rendered in main.jsx.
It imports other components and sets up React-Router routes.

### `index.css`

Main css file of frontend. Contains tailwindcss imports, theme variables, and default styling of some tags.

### components

#### `Dashboard.jsx`

It's the `Dashboard` component which uses `useMonthProgress` to get all progress fields of the month and renders them in a simple table. It has two select elements to select month and year.

#### `CalendarComponent.jsx`

This component renders `react-calendar`'s Calendar component and the functionality is used. You can click a date and its value will get selected.

#### `CalendarComponent.css`

CSS overrides for `react-calendar` component own styling

#### `AddProgressModal.jsx`

It's a react-modal which appears when any date on Calendar component is clicked. In this modal, it has work fields, day thoughts field. More fields could be added and removed easily.
On clicking "Save" button, work progress is saved to the server db.

#### `Navbar.jsx`

Navbar component with navigation to only two main pages of app. Navigation details in App.jsx

#### `WorkField.jsx`

It's an abstraction of each workField which will be rendered in a loop in `AddProgressModal`

#### `helpers.jsx`

A simple `get_options` function to make rendering of options in select elements easy.

### hooks

In this folder, custom hooks are implemented. These custom hooks use react hooks inside them that's why they are called custom hooks. They abstract states hooks logic and make working easy.

The three custom hooks down below are all for fetching data and reduce states clutter from main code.

#### `useCategoriesList.js`

Inside it is a hook hook `useCategoriesList` fetches categories data from server and returns them. All fetching and state management logic s abstraction in it.

#### `useMonthProgress.js`

Inside it is a hook hook `useMonthProgress` fetches categories data from server and returns them. It returns various functions to work with states too. All fetching and state management logic s abstraction in it.

#### `useProgressData.js`

Inside it is a hook hook `useProgressData` fetches categories data from server and returns them. It returns various functions to work with states too. All fetching and state management logic s abstraction in it.

### `helpers.js`

It contains one `postProgress` function which is used to POST progress fields to the server.

### `simpleData.js`

It's just a simple array of names of 12 months. just for tidying code up.

## Backend Walkthrough

Backend is built with flask and sqlite3. CORS for flask was also used. It's a pretty simple backend but does the job. I didn't optimize it good enough, but "it just works" for me. I prioritized simplicity. I've used chatgpt help in feedback and design decisions. Citing to chatgpt help is mentioned in comments where i used it.

### `app.py`

All the flask app code lives here.

- It sets up flask app
- `get_db()` function gets the db whenever called
- `init_db()` is run starting the app, it runs schema.sql so that table exists before app.run() proceeds

#### `/api/get-progress`

get-progress GET route to get progress of the specified date

#### `/api/save-progress`

save-progress POST route for saving progress

#### `get-month-progress`

get-month-progress GET route for getting selected month progress

#### `get-categories`

get-categories GET route to get all categories

### `schema.sql`

It has sql queries for recreating database tables if they don't exist already. It's read into app.py in `init_db` so tables could be created if they don't already exist.

### `requirements.txt`

Contains all dependencies of this project
