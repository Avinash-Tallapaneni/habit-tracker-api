# Habit Tracker API

The Habit Tracker API allows users to create, manage, and track their habits effectively. This API is designed to help users maintain their habits by logging completions, viewing progress, and filtering habits based on specific criteria. The API is built using Node.js and TypeScript, and it utilizes in-memory storage for habit data.

## Features

- Create Habits: Users can create new habits by providing a name, description, and target days per week.
- Update Habits: Users can update habit details, such as the name, description, or target days.
- Delete Habits: Users can delete habits, removing them from the system entirely.
- Track Progress: Habits can be marked as completed for specific days, and the system tracks the number of days each habit has been completed.
- View Habits: Users can retrieve a list of all habits, including details like name, description, target days, and progress.
- Filter and Pagination: Users can filter habits based on status (e.g., completed or not completed) and name. Pagination is supported to limit the number of habits returned per request.
- In-memory storage for quick prototyping
- Error Handling: The API provides meaningful error messages for invalid input, such as incorrect page numbers or limits.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- Zod for input validation

## Project Structure

```bash
├── src
| ├── config
│ │ └── config.ts
│ ├── controllers
│ │ └── habitController.ts
| ├── middleware
│ │ └── errorHandler.ts
│ ├── constants
│ │ └── dummyData.ts
| ├── routes
│ │ └── habitRoutes.ts
│ ├── types
│ │ └── habitTypes.ts
│ ├── utils
│ │ └── statusCodes.ts
| ├── validator
│ │ └── habitValidator.ts
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

- `POST /habits`: Create a new habit
- `PUT /habits/:id`: Update a habit's completion status
- `DELETE /habits/:id`: Delete a habit
- `GET /habits`: Retrieve habits with optional filtering and pagination

## Setup and Installation

1. Clone the repository:

```bash
    git clone https://github.com/yourusername/habit-tracker-api.git
```

2. Install dependencies:

```bash
    cd habit-tracker-api
    pnpm install
```

3. Start the development server:

```bash
    pnpm dev
```

## Usage

### Creating a Habit

```bash

POST /habits

body:
    {
    "name": "Morning Exercise",
    "description": "Do 30 minutes of exercise every morning",
    "target_days_per_week": 5
    }
```

### Updating a Habit

```bash

POST /habits/:id/log

body:
    {
    "date": "2024-08-26"
    }
```

### Deleting a Habit

```bash

DELETE /habits/:id

```

### Retrieving Habits

```bash

GET /habits?page=1&limit=2&status=not_completed&name=exercise

```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the MIT License.

This README provides an overview of the project, its features, technology stack, and basic usage instructions. It also includes information about the project structure and how to set up and run the application.

You may want to customize this README further based on your specific project needs, such as adding more detailed API documentation, explaining the project's purpose in more depth, or including information about testing and deployment processes.
