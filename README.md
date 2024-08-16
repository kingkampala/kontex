# Kontex API


### Description
Kontex is an educational platform designed to facilitate the creation and management of online courses. The platform enables users to register, log in, and access a variety of courses and lessons. Course creators can manage course content and track user engagement, while learners can explore different courses, complete lessons, and enhance their skills.

The core features include:

**User Management**: Register, login, and manage user profiles.

**Course Management**: Create, update, and delete courses with detailed descriptions.

**Lesson Management**: Manage lessons associated with specific courses, including content creation and updates.

**Search Functionality**: Users can search for courses, lessons, and users by keywords.

**Security**: Robust security practices are implemented to protect user data and secure the application from common web vulnerabilities.


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
