# Cloudfare General Assignment 

## Main Links
Serverless Api - Worker: 
### `https://serverless-api.vamsi-peddi.workers.dev/`

Cloudfare Pages: 
### `cloudfare-workers.pages.dev`


## Backend

### Getting started with Wrangler 

For the backend of this Blogging platform, we'll be using Cloudflare Workers to launch a serverless API which will allow the creation and storage of new posts, as well as distributing those posts to visitors of the site. To start, let's create a new Workers project with Wrangler 

### Installing Wrangler

To install wrangler: 

```bash
npm i @cloudflare/wrangler -g
```

### Authentication

To set up wrangler to work with your Cloudflare user, first you must create a free Cloudfare account and then use the following commands:

```bash
wrangler login
```
After successful login In wrangler.toml update account_id field with your account id that you get from running the command:

```bash
wrangler whoami
```
### 👩 💻 Developing

First you must generate the wrangler workers project. We have generated a project with typescript template:

```bash
wrangler generate my-ts-project https://github.com/cloudflare/worker-typescript-template
```
Before we start implementing the api handlers we have to setup wrangler_kv - the key value storage system for Workers. 
Command to create kv 

```bash
wrangler kv:namespace create "MY_KV"
```
Add the following lines to wrangler.toml to finish KV-Store setup:
kv-namespaces = [
   { binding = "MY_KV", id = "<your_account_id>" }
]

After our KV is setup, we can begin to implement our api handlers. 

### Publishing our pages

In order to deploy your serverless api you need to publish your worker with:

```bash
wrangler publish
```
Make sure you are logged in first

### Testing

To test your backend, you can run wrangler in dev mode or even in preview mode:
Dev Mode:

```bash
wrangler dev
```
Preview Mode: 

```bash
wrangler preview --watch
```

## Frontend

### Create React App 

First you must create a react project with:

```bash
npx create-react-app <appname>
```
From here you need to add required components and route them properly. 

### Adding bootstrap 

To use bootstrap css and make your webpages better looking, you need to install react-bootstrap:

```bash
npm install react-bootstrap@next bootstrap@5.1.3
```
Add the following code to your index.js or App.js to get CSS components: 

```bash
import 'bootstrap/dist/css/bootstrap.min.css';
```
### Running and Testing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.