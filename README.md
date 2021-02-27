<p align="center">
  <img src="https://i.ibb.co/sWjV6W5/readme-HEADER.png" />
</p>

## Table of Contents
1. [Description](#description)
2. [GIF](#gif)
3. [Architecture](#architecture)
4. [Stack](#stack)
5. [Features](#features)
6. [Testing](#testing)
7. [Installation](#installation)
8. [Screenshots](#screenshots)
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

- #### Angular-App
Frontend app enabling user interacting with backend api.
- #### Api-Gateway
Api-gateway sits between a frontend and multiple backend services - the task of this microservice is to secure (Helmet, CORS, Rate limiting) and distribute incoming queries & mutations across the other two services using Apollo Federation.
Moreover, in this repository are placed all e2e tests.
- #### Blog-Service  
Blog-service is responsible for all CRUD operations related to posts and categories.
- #### User-Service  
User-service enables the management of own account and other ones (assuming that you have appropriate permissions).
- #### Auth Package  
This package (which is deployed to NPM and Github Package Registry) handle authentication & authorization using key-value database and add needful layer between app and redis data store.

## Stack

- NestJS
- Angular + PrimeNG
- GraphQL & Apollo Federation
- TypeORM and PostgreSQL,
- IOredis and Redis,
- Jest, Supertest

## Features
[in progress]

## Testing
[in progress]
## Installation

```
#1 Clone the repository
git clone TomaszTrebacz/fox.CMS

#2 Move into working directory
cd fox.CMS

#3 Initialize and clone all microservices
git submodule init && git submodule update
```

## Screenshots
[in progress]
