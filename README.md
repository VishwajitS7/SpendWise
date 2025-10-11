SpendWise - Full-Stack MERN Expense Tracker

SpendWise is a modern, full-stack web application designed to help users track their personal expenses. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a secure and intuitive interface for managing finances, complete with user authentication and data visualization.

(Note: After taking a screenshot of your running application, add it to your project folder and update the path above!)
Features

    Secure User Authentication: Users can register for a new account and log in securely. The system uses JSON Web Tokens (JWT) for session management.

    Full CRUD Functionality for Expenses:

        Create: Add new expenses with a description, amount, category, and date.

        Read: View a clean, paginated list of all personal expenses.

        Update: Edit existing expenses to correct any details.

        Delete: Remove expenses that are no longer needed.

    Data Visualization Dashboard: An interactive pie chart provides a clear visual breakdown of spending by category, helping users understand their financial habits at a glance.

    Responsive & Modern UI: A clean, attractive, and fully responsive user interface that works seamlessly on desktop and mobile devices.

Technology Stack
Backend

    Node.js: JavaScript runtime environment.

    Express.js: Web framework for building the RESTful API.

    MongoDB: NoSQL database for storing user and expense data.

    Mongoose: Object Data Modeling (ODM) library for MongoDB.

    JSON Web Token (JWT): For secure user authentication.

    bcryptjs: For hashing user passwords.

    dotenv: For managing environment variables.

Frontend

    React: JavaScript library for building the user interface.

    React Router: For client-side routing and navigation.

    Axios: For making HTTP requests to the backend API.

    Recharts: A composable charting library for data visualization.

Setup and Installation

To run this project locally, follow these steps:
Prerequisites

    Node.js installed on your machine.

    Git installed on your machine.

    A free MongoDB Atlas account for the database.

1. Clone the Repository

git clone [https://github.com/VishwajitS7/SpendWise.git](https://github.com/VishwajitS7/SpendWise.git)
cd SpendWise

2. Backend Setup

# Navigate to the server directory
cd server

# Install backend dependencies
npm install

# Create a .env file in the /server directory and add your variables
# You will need to get your connection string from MongoDB Atlas
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_string

# Start the backend server (runs on http://localhost:5000)
npm start

3. Frontend Setup

# Open a new terminal and navigate to the client directory from the root
cd client

# Install frontend dependencies
npm install

# Start the React development server (runs on http://localhost:3000)
npm start

Your application should now be running! Open http://localhost:3000 in your browser to see the SpendWise app.
Future Enhancements

    [ ] Filtering & Sorting: Add options to filter expenses by date range or category.

    [ ] User Profile Management: Allow users to update their password and username.

    [ ] Monthly Budgets: Implement a feature to set and track monthly spending budgets.
