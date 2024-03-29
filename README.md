# Task Management App Frontend

This is a simple task management application built using React for the frontend and a RESTful API server for the backend. The application allows users to add new tasks, view all tasks, and mark tasks as completed.

## Prerequisite

- The following Backend is already installed, and running successfully. (https://github.com/DouchySebas/InternalBackend)
- Git Bash for execution of the commands below.
- Node.js LTS is installed correctly, with NPM support (Download URL: https://nodejs.org/en/download/)

## Features

- Add a new task with title and description.
- View all tasks and filter between completed and uncompleted tasks.
- Mark tasks as completed.
- Responsive design for mobile users.

## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - CSS: Styling the application.
  
- **Backend:**
  - RESTful API: Backend server providing endpoints for task management.
  
## Getting Started

To run the application locally, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/DouchySebas/InternalFrontend
   ```

2. Navigate to the `Internalfrontend` directory:

   ```bash
   cd InternalFrontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the API connection:

   - Run the command below to create a new file `.env` and modify the values to match your web URL.
   ```
   echo 'REACT_APP_API_URL=http://localhost:3001/api/tasks'  > .env
   ```

5. Run the frontend:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Folder Structure

- **frontend/src:** Contains the React application code.
  - **App.js:** Main application component.
  - **App.css:** Styling for the application.
  - **.env:** Configuration values for the application.

## How to Use

0. Make sure the backend application is already running ([https://github.com/DouchySebas/InternalBackend](https://github.com/DouchySebas/InternalBackend)).
1. Open the application in your web browser.
2. Add a new task with a title and description.
3. View all tasks and filter between completed and uncompleted tasks.
4. Mark tasks as completed.

## Responsive Design

The application is designed to be responsive, adapting to different screen sizes. The styling has been optimized for mobile users, ensuring a seamless experience on small screens.

## Contributing

If you'd like to contribute to the project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
