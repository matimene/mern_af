<div id="top"></div>

<!-- PROJECT SHIELDS -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<br />

<h3 align="center">FULLSTACK MERN APP</h3>

  <p align="center">
    <a href="https://mern-af.herokuapp.com/">View Live Demo (HEROKU)</a>
  </p>
</div>

## Project requirements

<br />

Create a prototype of app which provides information about News to users.

<br />

### FRONTEND

Use Angular / React to build Frontend app. This app is just prototype so it is not necessary to create any custom design, just use Bootstrap framework or whatever you want.
<br />
Frontend application communicate only with database (MongoDB)
<br />
Frontend application contains 2 views:
<br />

#### New

- All new News are displayed vertically one under the other, ordered by their date of storage
- Every News has button “Archive” -> News is moved after click to “Archived” view and is not shown at “New” view anymore
- When a new News item is added into DB, Frontend application will update the list of News

#### Archived

- All archived News are displayed one under the other ordered by their date of archive
- Each News item has a “Remove” button → News is removed after click from “Archived” view and is not shown at “Archived” or “New” views anymore

### BACKEND

- Use Node.js to build Backend application.
- Backend application is responsible for 2 basic functionalities:

  1. Get data from provider – get data from MongoDB
  2. Save data into MongoDB

- Use MongoDB to store and get all documents for Frontend application.
- Documents must have: title, description, date, content, author, archiveDate.

### Built With

- NodeJS
- Express
- Mongoose (MONGODB)
- React.js
- TailwindCSS

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/matimene/mern_af.git
   ```
2. Install NPM packages of each folder (back and front)
   ```sh
   npm install
   ```
3. Enter your environtment variables in `.env` in the main backend folder
   ```js
   MONGODB_URI = "ENTER YOUR MONGODB URL HERE";
   JWT_SECRET = "YOUR JWT SECRET HERE";
   PORT = 5000;
   ```

<br />

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[web-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[web-url]: https://www.matias.dev
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/meneghettimatias/
[product-screenshot]: images/screenshot.png
[matiasm-logo]: https://i.ibb.co/rxQrWxL/matiasm.png
