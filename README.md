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
