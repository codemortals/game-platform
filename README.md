# Game Platform
 
![Code Mortals](https://cdn.codemortals.io/mascot/5.png)

## Getting Started

This is a game platform developed using Angular framework with Node and Firestore

- 1a. [optional] Fork the project
- 1b. Clone the project (or your fork if you did step 1) with `git clone {GITHUB_REPO_URL}`
- 1c. Navigate into the project directory `cd game-platform`

### Local development for UI (Angular UI)

- 2a. Navigate from the project directory in the **hosting** directory with `cd hosting`
- 3a. Install sub project dependencies with `npm install`
- 4a. Duplicate the `src/environments/environment.ts` file and name it `src/environments/environment.local.ts` 
- 5a. In the `src/environments/environment.local.ts` replace it with your **Firebase** config
- 6a. Run the sub project (Angular UI) with `npm start`
- 7a. Open in the browser `http://localhost:4200`

### Local development for Functions (Firebase)

**prerequisite** [Firebase CLI](https://firebase.google.com/docs/cli)

- 2b. Navigate from the project directory in the **functions** directory with `cd functions`
- 3b. Install sub project dependencies with `npm install`
- 4b. ...
