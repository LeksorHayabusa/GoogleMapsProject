# Neighborhood React and Google Maps application

This is a last project on Nanodegree using React. There are shown some place must to visit in Hamburg. They are highlighted with markers on the map and you may click any of them or any their title to read the description.

### Get Started

All you need is npm installed on your PC. After cloning the project do next:
- Run `npm install`
- Run `npm start`
- The application opens in your browser: **localhost:3000**

to enable ServiceWorker you must:
- go to local directory
- install static server: `npm install -g serve`
- run the server command: `serve -s build`

All dependencies will be installed automatically.

### React hierarchy

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── MapModule.js.js # A module of the map consisting places.
    ├── SideContainer.js # A module for searching and showing them.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

- The **list of locations** and **Google Map** are stored in the `<App />` component

### Licence 
Under MIT licence