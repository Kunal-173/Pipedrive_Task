
# Project Name: Pipedrive CRM Test Automation Task

## Table of Contents
- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Test Cases Locally](#running-the-test-cases-locally)
- [Additional Notes](#additional-notes)

---

## Introduction
This repository contains automated test cases for the Pipedrive application using Cypress. The tests include both functional and regression tests for lead feature in the application, such as login, lead creation, updation, archive and lead management.

---

## Folder Structure
Here is an overview of the folder structure:

```
.
├── cypress
│   ├── fixtures        # Contains test data files (e.g., JSON files for input data)
│   ├── e2e             # Contains all the test files
│   │   ├── leads       # Tests for lead-related functionality
│   ├── plugins         # Plugins and configuration extensions for Cypress
│   ├── support         # Custom commands and reusable utilities
│       ├── commands.js # Custom Cypress commands
│       └── index.js    # Global setup for test execution(login test)
├── node_modules        # Dependencies installed via npm
├── cypress.config.js   # Cypress configuration file
├── package.json        # Project dependencies and scripts
└── README.md           # Documentation for the repository
```

---

## Setup and Installation

### Prerequisites
Ensure the following are installed on your local machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Kunal-173/Pipedrive_Task.git
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Verify Cypress Installation:**
   ```bash
   npx cypress verify
   ```

---

## Running the Test Cases Locally

### Open Cypress Test Runner
1. Run the following command to open the Cypress Test Runner:
   ```bash
   npx cypress open
   ```
2. Select the desired test file from the Cypress Test Runner UI to execute it.

### Run All Tests in Headless Mode
To run all tests in headless mode:
```bash
npx cypress run
```

### Run All Tests in Headless Mode in Chrome Browser
To run all tests in headless mode:
```bash
npx cypress run --browser chrome
```

### Run Specific Test Files
To run a specific test file:
```bash
npx cypress run --spec "cypress/e2e/lead_spec_1.cy.js"
```

### Generate a Test Report
To generate a report after running tests:
1. Install a reporting plugin (e.g., `mochawesome`).
   ```bash
   npm install mochawesome --save-dev
   ```
2. Run tests with reporting:
   ```bash
   npx cypress run --reporter mochawesome
   ```
3. The report will be generated in the specified directory.

---

```

### Debugging
- Use `cy.log()` for custom logs during test execution.
- Add the `--browser chrome` flag to run tests in Chrome for better debugging:
  ```bash
  npx cypress run --browser chrome
  ```

## Running the Dockerfile Locally

You can run the tests inside a Docker container using the provided `Dockerfile`.

### Steps:

1. **Build the Docker Image:**
   ```bash
   docker build -t cypress-tests .
   ```
   Here:
   - `-t cypress-tests` tags the image with the name `cypress-tests`.
   - `.` specifies the current directory as the build context.

2. **Run the Docker Container:**
   ```bash
   docker run cypress-tests
   ```
   This runs the default command specified in the `Dockerfile` (e.g., `npx cypress run`).
