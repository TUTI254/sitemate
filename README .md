
# REST API Server + Client for Issues

## Introduction

Welcome to the REST API Server + Client for Issues challenge! The goal is to build a simple REST API server and client application for managing issues, similar to systems like GitHub or Jira. The challenge must be completed within 2 hours.

The issues are represented as hard-coded JSON objects with the following attributes:
- `id`: Unique identifier for the issue.
- `title`: Title of the issue.
- `description`: Detailed description of the issue.

Both the server and client should handle these JSON objects according to the four standard operations: Create, Read, Update, and Delete (CRUD).

## REST API Server

### Overview

The REST API server can be implemented using any technology that can return static JSON, whether it's local or hosted in the cloud. Possible options include Node.js, Python, or a serverless function.

### Endpoints

The server should support the following operations:

- **Create**
  - **Endpoint:** `/api/issues`
  - **Method:** `POST`
  - **Request Body:** JSON object containing `id`, `title`, and `description`
  - **Response:** Prints/logs the received JSON object

- **Read**
  - **Endpoint:** `/api/issues/:id`
  - **Method:** `GET`
  - **Response:** Returns a static JSON object with the specified `id`

- **Update**
  - **Endpoint:** `/api/issues/:id`
  - **Method:** `PUT`
  - **Request Body:** JSON object containing `id`, `title`, and `description`
  - **Response:** Prints/logs the received JSON object

- **Delete**
  - **Endpoint:** `/api/issues/:id`
  - **Method:** `DELETE`
  - **Response:** Prints/logs the `id` of the deleted issue

## REST API Client

### Overview

The REST API client is a web application that interacts with the server endpoints to perform CRUD operations. It can be built using any front-end framework like React, Angular, or Vue.

### Features

- **Create**
  - **Action:** Sends a JSON object to the server
  - **Interaction:** Form submission or button click

- **Read**
  - **Action:** Requests a JSON object from the server and displays it
  - **Interaction:** Fetch data on page load or button click

- **Update**
  - **Action:** Sends an updated JSON object to the server
  - **Interaction:** Form submission or button click

- **Delete**
  - **Action:** Requests the server to delete an issue
  - **Interaction:** Button click or other UI element

## Setup Instructions

### Server
after navigating to the Client directory, run the following command:

`node server.js `

### Client

after navigating to the Client directory, run the following command:
`pnpm install`
`pnpm dev`
