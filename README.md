<p align="center">
  <img src="https://i.ibb.co/sWjV6W5/readme-HEADER.png" />
</p>

## Table of Contents
1. [Description](#description)
2. [GIF](#gif)
3. [Architecture](#architecture)
4. [Stack](#stack)
5. [Features](#features)
7. [Installation](#installation)
8. [Seeding](#seeding)
9. [Testing](#testing)
10. [Screenshots](#screenshots)
 
## Description

Fox.CMS is a super-simple, lightweight content management system which provide you all needed tools to create own blog.
## Gif
<p align="center">
  <img src="https://s4.gifyu.com/images/20210227133110-c31361e3d9.gif-2-mp4.com.gif" />
</p>

## Architecture
<p align="center">
  <img src="https://i.ibb.co/CK0JdCc/fox-cms-architecture.png" />
</p>

- #### <a href="https://github.com/TomaszTrebacz/fox.CMS-angular-app/">Angular-App</a>
Frontend enables interaction with backend api via Apollo Client.
- #### <a href="https://github.com/TomaszTrebacz/fox.CMS-api-gateway/">Api-Gateway</a>
Api-gateway sits between frontend and multiple backend services - the task of this microservice is to secure (Helmet, CORS, Rate limiting) and distribute incoming queries & mutations across the other two services using Apollo Federation.  
Moreover, in this repository are placed all e2e tests.
- #### <a href="https://github.com/TomaszTrebacz/fox.CMS-blog-service/">Blog-Service</a>
Blog-service is responsible for all CRUD operations related to posts and categories.
- #### <a href="https://github.com/TomaszTrebacz/fox.CMS-user-service/">User-Service</a>
User-service enables the management of own account and others (assuming that you have appropriate permissions).
- #### <a href="https://github.com/TomaszTrebacz/nest-auth-graphql-redis">Auth Package</a>
This package (which is deployed to NPM and Github Package Registry) handle authentication & authorization using Passport.js and adds needed layer between app - redis data store.

## Stack

- NestJS,
- Angular + PrimeNG,
- GraphQL & Apollo Federation,
- TypeORM and PostgreSQL,
- IOredis and Redis,
- Jest, Supertest.

## Features
- unit/integration/e2e tests on backend,
- microservices-based architecture, 
- GraphQL api created with Apollo Federation,
- storing data in relational postgresql database and redis key-value data store, 
- authentication & authorization handled by external package deployed to NPM & Github Package Registry,
- access to endpoints depended by user roles-permissions,
- refresh token with count mechanism (alternative to blacklist),
- confirming user with email,
- changing/resetting sensitive data like password/phone number,
- CRUD operations which enables management of blog,
- admin panel,
- custom validators with decorators,
- sending SMS with Twilio,
- sending emails with package built on top of Nodemailer,
- uploading images to Amazon S3.

## Installation

1. Clone the repository
```
git clone TomaszTrebacz/fox.CMS
```
2. Move into working directory
``` 
cd fox.CMS
```
3. Initialize and clone all microservices
```
git submodule init
git submodule update // optionally
```
4. Run backend
```
cd ./[backend-service-name] // move into each service
npm install
npm run start
```
&nbsp;*Note: Run blog-service and user-service in the first place.*

5. Run frontend
```
cd ./angular-app
npm install
ng serve
```

## Seeding
**Postgres**
```
cd ./[blog-service][user-service]
npm run seed:postgres
```
**Redis**
```
cd ./user-service
npm run seed:redis
```

*Note: There are also useful commands like 'npm run schema:drop', 'npm run schema:sync'/'npm run db:migrate'.*
## Testing
1. Please follow the instructions from previous paragraph about seeding.
2. Move into right directory:
```
cd ./api-gateway
```
3. Build process for e2e tests:
```
npm run pretest:e2e
```
4. Run tests
```
npm run test:e2e
```

The result:

<p align="center">
<img src="https://i.ibb.co/5kCDs5v/test.png" alt="Tests" />
</p>

In case of unit/integration testing, please check out <a href="https://github.com/TomaszTrebacz/fox.CMS-user-service/">user-service</a>, <a href="https://github.com/TomaszTrebacz/fox.CMS-blog-service/">blog-service</a> and <a href="https://github.com/TomaszTrebacz/nest-auth-graphql-redis/">auth package</a>.
 


## Screenshots

|                        Homepage                         |                         Create Post                         |                     GraphQL Playground                      
| :-----------------------------------------------------: | :-----------------------------------------------------: | :-----------------------------------------------------: | 
| <img src="https://i.ibb.co/1my7h5w/HOMEPAGE.png" width="100%"> | <img src="https://i.ibb.co/yXsSVVx/BATMAN.png" width="100%"> | <img src="https://i.ibb.co/GQdYvrB/Screenshot-from-2021-02-27-23-40-33.png" width="100%">

|                        Edit Account                         |                         Post                        |                     Manage Users                      
| :-----------------------------------------------------: | :-----------------------------------------------------: | :-----------------------------------------------------: | 
| <img src="https://i.ibb.co/qdBDkrM/EDIT.png" width="100%"> | <img src="https://i.ibb.co/hC3bjd2/POST.png" width="100%"> | <img src="https://i.ibb.co/MSxQPkL/manageusrs.png" width="100%">

|                        Category                         |                         Sign in                         |                    Reset Password                      
| :-----------------------------------------------------: | :-----------------------------------------------------: | :-----------------------------------------------------: | 
| <img src="https://i.ibb.co/VVW5JTW/category.png" width="100%"> | <img src="https://i.ibb.co/ZcgWNPY/signin.png" width="100%"> | <img src="https://i.ibb.co/Dt710Wq/reset.png" width="100%">
