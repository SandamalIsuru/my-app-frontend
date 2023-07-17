# my-app-frontend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)

## Introduction

With this platform, an user can register/login with the My App platform and see his/her contacts in a paginated view. Also user can maintain a profile by updating their details.

## Features

Following features have been intodused under this platform.

- User Authentication (SIgnin, Signup)
- Listing all the contact and user can filter users by Gender or Country
- Updating user profile data

## Installation

- Clone the repository: `git clone https://github.com/SandamalIsuru/my-app-frontend.git`

- Navigate to the project directory: `cd my-app-frontend`

- Run fullowing command to install necessary npm modules

    `yarn install`

- create .env file and add following env variables in .env file. 

    `REACT_APP_API`: <UPDATE_ME>

    `REACT_APP_RANDOM_USER_EP`: <UPDATE_ME>

    `REACT_APP_FIREBASE_API_KEY`: <UPDATE_ME>

    `REACT_APP_FIREBASE_AUTH_DOMAIN`: <UPDATE_ME>

    `REACT_APP_FIREBASE_PROJECT_ID`: <UPDATE_ME>

    `REACT_APP_FIREBASE_STORAGE_BUCKET`: <UPDATE_ME>

    `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: <UPDATE_ME>

    `REACT_APP_FIREBASE_APP_ID`: <UPDATE_ME>

    `REACT_APP_FIREBASE_MEASUREMENT_ID`: <UPDATE_ME>


- Run fullowing command to run the project in locally

    `yarn start`

## Folder Structure

- `/src`: Contains the source code files.
- `/public`: Contains the public assets and the root HTML file.
- `/src/components`: Contains reusable components.
- `/src/pages`: Contains different pages of the application.
- `/src/hooks`: Contains custom hooks of the application.
- `/src/config`: Contains configuration files of the application.
- `/src/utils`: Contains util functions used in components and pages.