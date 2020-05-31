# Game Platform
 
![Code Mortals](https://cdn.codemortals.io/mascot/5.png)

## Getting Started

This is a game platform developed using Angular framework with Node and Firestore

1 [optional] Fork the project
2. Clone the project (or your fork if you did step 1) with `git clone {GITHUB_REPO_URL}`
3. Navigate into the project directory `cd game-platform`

### Local development for UI (Angular UI)

4a. Navigate from the project directory in the **hosting** directory with `cd hosting`
5a. Install sub project dependencies with `npm install`
6a. Duplicate the `src/environments/environment.ts` file and name it `src/environments/environment.local.ts` 
7a. In the `src/environments/environment.local.ts` replace it with your **Firebase** config
7a. Run the sub project (Angular UI) with `npm start`
8a. Open in the browser `http://localhost:4200`

### Local development for Functions (Firebase)

4b. Navigate from the project directory in the **functions** directory with `cd functions`
5b. Install sub project dependencies with `npm install`
6b. ...
