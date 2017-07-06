# HCJ Starter
A productivity starter kit for full-stack AngularJS (v1) developers.

# Why bother

- It codifies a bunch of decisions that you'll have to make each time you start a project. 
- **Stop working like an amateur** and use/create a starter kit. They contain:
  - Good practices
  - Lessons learnt
  - Encourages consistency/predictability
  - Avoid forgetting important details
- Too much BS involved to setup a productive environment as a JS developer. Save yourself hours of headache and use this template. 
![image](https://github.com/jeshan/hcj-starter/raw/master/The%20Javascript%20Starter%20Kit%20Manifesto%20-%20YouTube%20-%20Google%20Chrome_420.png)

# Main Stack
- ES7
- Angular JS
- Node.js
- Swagger
- SASS
- MongoDB with Mongoose

# Features
## Available
- ES7 for latest JS features from front to back
- auto reload for API, JS on frontend and backend, HTML, and SASS.
- API development, mocking and code generation with Swaggewr
- prod build for minification of css, js and other resources
- testing with Mocha: automatic running on tests on changes to catch regressions as early as possible
- Sensible linting rules baked-in to catch code style issues (with ESLint)
- Code conventions
- Cache busting to cache resources for as long as possible and not more.
- Easier Mongo queries, validation and business logic with Mongoose JS
- Node process management with PM2
- Docker: just run `docker-compose up` and you're good  to go. Containers allow for fast iteration by using volumes for source directories.

## Others coming soon
- zero-downtime deployment with PM2
- Github/Gitlab issue templates
- build optimisation
- error logging
- [your suggestions](https://github.com/jeshan/hcj-starter/issues/new)

# Setup
## Installing mongo

## Create a replica set
To create a few mongo nodes (make sure dbpath directories exist beforehand):
`mkdir -p /path/to/data/hcj-repl-set-1 /path/to/data/hcj-repl-set-2 /path/to/data/hjc-repl-set-3`

`mongod --port 27017 --dbpath /path/to/data/hcj-repl-set-1 --replSet hcj-repl-set`

`mongod --port 27018 --dbpath /path/to/data/hcj-repl-set-2 --replSet hcj-repl-set`

`mongod --port 27019 --dbpath /path/to/data/hcj-repl-set-3 --replSet hcj-repl-set`

### Regular setup (dev)

To connect to a node: `mongo --port <PORT>`
Run the following commands only on any one of the nodes:
- `rs.initiate()`
- `rs.add("2ndHost:2ndPort")`
- `rs.add("3rdHost:3rdPort")`

Verify that the 3 nodes are connected to the same replica set with

`rs.status()`

Next, we need to add some users and enable authentication.

#### Mongo Security
- Create a keyfile to be used so that the replica set members can authenticate with each other:

`openssl rand -base64 756 > /path/to/keyfile`

- Copy this key file to each server hosting the replica set members.
- Restart all members of the cluster.
- Connect to the **primary** node in the cluster. Identify which one it is by running `mongo --eval "db.isMaster().primary"`
- Create a user administrator:
```
db.getSiblingDB("admin").createUser(
  {
    user: <USER>,
    pwd: <PASS>,
    roles: ["root"]
  }
)
```
- Authenticate as the above user, with either:
  - `db.auth(<ADMIN>, <PASS>)`
  - `mongo -u <ADMIN> -p <PASS> --authenticationDatabase admin --port <PORT>`
- Create a cluster administrator:

```
db.getSiblingDB("admin").createUser(
  {
    user: <USER>,
    pwd: <PASS>,
    roles: [ { role: "clusterAdmin", db: "admin" } ]
  }
)
```
Note: from now on, use this user to make queries like `rs.status()`

- Create an application user:
```
db.getSiblingDB("hcj-app").createUser(
  {
    "user" : "appuser",
    "pwd" : <PASS>,
    roles: ["readWrite"]
  }
)
```

# Licence
Copyright Jeshan G. BABOOA. Released under the "simplified" BSD licence.

# Acknowledgements
Thanks to Cory House for the inspiration [1] [2] and help [3] in devising this starter kit.
1. [The Javascript Starter Kit Manifesto (YouTube)](https://www.youtube.com/watch?v=QGCWal_JWek)
2. [React Slingshot, Cory's starter kit for React](https://github.com/coryhouse/react-slingshot)
3. [Building a JavaScript Development Environment](https://www.pluralsight.com/courses/javascript-development-environment)
