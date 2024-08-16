# Kontex API



### Description
Kontex is an educational platform designed to facilitate the creation and management of online courses. The platform enables users to register, log in, and access a variety of courses and lessons. Course creators can manage course content and track user engagement, while learners can explore different courses, complete lessons, and enhance their skills.

The core features include:

**User Management**: Register, login, and manage user profiles.

**Course Management**: Create, update, and delete courses with detailed descriptions.

**Lesson Management**: Manage lessons associated with specific courses, including content creation and updates.

**Search Functionality**: Users can search for courses, lessons, and users by keywords.

**Security**: Robust security practices are implemented to protect user data and secure the application from common web vulnerabilities.



### Setup Instructions to Run the Application Locally
To run the Kontex application locally, follow the steps below:

1. **Clone the Repository**

First, clone the repository to your local machine using the following command:
```
git clone https://github.com/kingkampala/kontex.git
```

2. **Navigate to the Project Directory**

Change into the project's root directory:
```
cd kontex
```

3. **Install Dependencies**

Install all required dependencies using `npm`:
```
npm install
```

4. **Create a `.env` File**

Create a `.env` file in the root directory of the project and add the following environment variables:
```
PORT=2810
DB_URL=postgres://<username>:<password>@<host>/<database>
JWT_SECRET=your_jwt_secret
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
EMAIL=your_email_address
EMAIL_PASSWORD=your_email_password
```
Replace the placeholders with your actual credentials or use the provided values.

5. **Start the Application**

Start the application using the following command:
```
npm start
```
The application will run on `http://localhost:2810` by default. If the specified port is already in use, you can modify the `PORT` in your `.env` file.

6. **Test the Application**

After starting the application, you can test the API endpoints using tools like Postman or cURL.

8. **Stop the Application**

To stop the application, use `Ctrl + C` in the terminal where the application is running.



### Base URL
Kontex API backend is hosted at:

`https://kontex.onrender.com`

This is the base URL for the Kontex API, which is intended to be accessed by the application's frontend. It serves as the foundation for managing various entities within the application, ensuring efficient handling of users, courses, lessons, and other related resources.



### User Endpoint
**Register a New User**: POST `/user/register`
```
Request;
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!"
}

Response;
{
  "user registered successfully": {
    "id": "c3b3d6c6-4b2e-4a4d-8af2-123456789abc",
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "$2a$10$...",
    "confirmPassword": null,
    "createdAt": "2024-08-16T14:55:22.123Z",
    "updatedAt": "2024-08-16T14:55:22.123Z"
  }
}
```

**Login a New User**: POST `/user/login`
```
Request;
{
  "loginIdentifier": "johndoe" OR "johndoe@example.com",
  "password": "Password123!"
}

Response;
{
  "user login successful": {
    "id": "c3b3d6c6-4b2e-4a4d-8af2-123456789abc",
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Reset Password**: PATCH `/user/:id`
```
Request;
{
  "password": "OldPassword123!",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}

Response;
{
  "password reset successfully": {
    "id": "c3b3d6c6-4b2e-4a4d-8af2-123456789abc",
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
}
```

**Get All Users**: GET `/user`
```
Response;
[
  {
    "id": "c3b3d6c6-4b2e-4a4d-8af2-123456789abc",
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com"
  },
  {
    "id": "b7b8e9e6-4f3e-4a4c-8cf3-123456789def",
    "name": "Jane Doe",
    "username": "janedoe",
    "email": "janedoe@example.com"
  }
]
```

**Get User by ID**: GET `/user/:id`
```
Response;
{
  "id": "c3b3d6c6-4b2e-4a4d-8af2-123456789abc",
  "name": "John Doe",
  "username": "johndoe",
  "email": "johndoe@example.com"
}
```

**Update User**: PUT `/user/:id`
```
Request;
{
  "username": "johnnydoe",
  "email": "johnnydoe@example.com"
}

Response;
{
  "user updated successfully": {
    "id": "c3b3d6c6-4b2e-4a4d-8af2-123456789abc",
    "name": "John Doe",
    "username": "johnnydoe",
    "email": "johnnydoe@example.com"
  }
}
```

**Delete User**: DELETE `/user/:id`
```
Response;
{
  "message": "user deleted successfully"
}
```



### Course Endpoint
**Create a New Course**: POST `/course`
```
Request;
{
  "title": "Introduction to Node.js",
  "description": "Learn the basics of Node.js, including modules, event-driven programming, and more."
}

Response;
{
  "course created successfully": {
    "id": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc",
    "title": "Introduction to Node.js",
    "description": "Learn the basics of Node.js, including modules, event-driven programming, and more.",
    "createdAt": "2024-08-16T14:55:22.123Z",
    "updatedAt": "2024-08-16T14:55:22.123Z"
  }
}
```

**Get All Courses**: GET `/course`
```
Response;
[
  {
    "id": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc",
    "title": "Introduction to Node.js",
    "description": "Learn the basics of Node.js, including modules, event-driven programming, and more."
  },
  {
    "id": "d9e7a6c4-6e3b-4f7c-a7c6-123456789def",
    "title": "Advanced Node.js",
    "description": "Deep dive into Node.js with topics like performance optimization and asynchronous programming."
  }
]
```

**Get Course by ID**: GET `/course/:id`
```
Response;
{
  "id": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc",
  "title": "Introduction to Node.js",
  "description": "Learn the basics of Node.js, including modules, event-driven programming, and more."
}
```

**Update Course**: PUT `/course/:id`
```
Request;
{
  "title": "Introduction to Node.js (Updated)",
  "description": "An updated course on Node.js basics with new content."
}

Response;
{
  "course updated successfully": {
    "id": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc",
    "title": "Introduction to Node.js (Updated)",
    "description": "An updated course on Node.js basics with new content."
  }
}
```

**Delete Course**: DELETE `/course/:id`
```
Response;
{
  "message": "course deleted successfully"
}
```



### Lesson Endpoint
**Create a New Lesson**: POST `/lesson`
```
Request;
{
  "title": "Introduction to Node.js Basics",
  "content": "This lesson covers the fundamentals of Node.js, including modules, event-driven architecture, and more.",
  "courseId": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc"
}

Response;
{
  "lesson created successfully": {
    "id": "e8b7c1f6-8f4c-4d1e-8a6f-123456789abc",
    "title": "Introduction to Node.js Basics",
    "content": "This lesson covers the fundamentals of Node.js, including modules, event-driven architecture, and more.",
    "courseId": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc",
    "createdAt": "2024-08-16T14:55:22.123Z",
    "updatedAt": "2024-08-16T14:55:22.123Z"
  }
}
```

**Get All Lessons by Course**: GET `/lesson/:courseId`
```
Response;
[
  {
    "id": "e8b7c1f6-8f4c-4d1e-8a6f-123456789abc",
    "title": "Introduction to Node.js Basics",
    "content": "This lesson covers the fundamentals of Node.js, including modules, event-driven architecture, and more.",
    "courseId": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc"
  },
  {
    "id": "f3a2d1e9-5e2c-4b8f-a8e2-123456789def",
    "title": "Advanced Node.js Concepts",
    "content": "This lesson delves deeper into advanced Node.js topics like clustering and scaling.",
    "courseId": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc"
  }
]
```

**Get Lesson by ID**: GET `/lesson/:id`
```
Response;
{
  "id": "e8b7c1f6-8f4c-4d1e-8a6f-123456789abc",
  "title": "Introduction to Node.js Basics",
  "content": "This lesson covers the fundamentals of Node.js, including modules, event-driven architecture, and more.",
  "courseId": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc"
}
```

**Update Lesson**: PUT `/lesson/:id`
```
Request;
{
  "title": "Introduction to Node.js Basics (Updated)",
  "content": "An updated lesson covering the fundamentals of Node.js with new content."
}

Response;
{
  "lesson updated successfully": {
    "id": "e8b7c1f6-8f4c-4d1e-8a6f-123456789abc",
    "title": "Introduction to Node.js Basics (Updated)",
    "content": "An updated lesson covering the fundamentals of Node.js with new content.",
    "courseId": "c5e3d1f1-4b4c-4a8e-b8f5-123456789abc"
  }
}
```

**Delete Lesson**: DELETE `/lesson/:id`
```
Response;
{
  "message": "lesson deleted successfully"
}
```



### Assumptions and Decisions that I Made During the Development of this Application
During the development of the Kontex content management system, several key assumptions and decisions were made to ensure the successful implementation of the application. Below is a summary of these considerations:

**Tech Stack and Frameworks**:

_Node.js and Express.js_ were chosen for the backend due to their flexibility, scalability, and extensive community support.

_Sequelize ORM_ was selected to manage database interactions, given its robust features for handling complex queries, associations, and migrations.

_PostgreSQL_ was utilized as the primary database, leveraging its reliability, performance, and compatibility with Sequelize.

_Redis_ was integrated for caching to enhance performance, particularly for frequently accessed data like course and lesson information.

**Data Model Design**:

The application was structured around three core entities: _User_, _Course_, and _Lesson_.

Relationships between these entities were carefully defined to ensure data integrity and simplify query operations. For instance, a _Course_ can have multiple _Lessons_, and lessons are automatically deleted if the associated course is removed (cascading delete).

**Security Measures**:

Authentication and authorization were handled using _JWT (JSON Web Tokens)_, providing a secure method to verify user identity and permissions.

Passwords were securely stored using _bcryptjs_ to hash and salt passwords, protecting user credentials from potential breaches.

Environment variables managed sensitive data such as database credentials, JWT secrets, and email service credentials. These were kept out of the source code to avoid exposure.

**Performance Considerations**:

Caching with _Redis_ was implemented to reduce database load and speed up response times for common requests.

API rate limiting using _express-rate-limit_ was employed to protect against denial-of-service attacks and ensure the API could handle high traffic efficiently.

**Error Handling**:

A consistent and informative error-handling strategy was put in place across the application. This included returning meaningful error messages to the client and logging errors server-side for debugging and monitoring purposes.

**Development and Deployment Environment**:

The application was designed to run locally for development with environment-specific configurations stored in a `.env` file. This file includes configuration for the application’s port, database connection string, Redis connection, and email credentials.

_Nodemon_ was used to enhance development efficiency by automatically restarting the server on file changes.

**Assumptions**:

It was assumed that users interacting with the API would have valid authentication tokens.

The application’s scalability was anticipated, hence the design of modular and reusable components. Future enhancements or scaling needs were considered during the initial setup to accommodate potential growth.

**API Documentation**:

API endpoints were documented in a clear and concise manner, allowing for easy interaction and testing of the application’s features. The decision was made to integrate caching logic directly into the route handlers to ensure that both cached and fresh data were accessible through the same endpoints.


These decisions and assumptions were integral to the project, guiding the development process and ensuring that the _**Kontex**_ application is secure, performant, and easy to maintain. The aim was to build a robust foundation that could support future enhancements and scale with the needs of its users.
