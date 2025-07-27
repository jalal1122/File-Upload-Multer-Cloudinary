# File Upload with Multer & Cloudinary

A Node.js backend application that demonstrates file upload functionality using Multer for handling multipart/form-data and Cloudinary for cloud storage. This project includes user registration with profile picture upload capabilities.

## Features

- 🚀 **File Upload**: Upload files using Multer middleware
- ☁️ **Cloud Storage**: Store files on Cloudinary
- 👤 **User Management**: User registration with profile pictures
- 🔐 **Authentication**: JWT-based authentication system
- 🛡️ **Security**: Password hashing with bcrypt
- 🏗️ **Clean Architecture**: Organized folder structure with controllers, models, and utilities

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account for file storage

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jalal1122/File-Upload-Multer-Cloudinary.git
   cd File-Upload-Multer-Cloudinary
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000

   MONGODB_URI=mongodb://localhost:27017/fileUpload

   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=10d

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

## API Endpoints

### User Registration

- **POST** `/api/user/register`
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `profilePicture` (file, optional)

**Example using curl:**

```bash
curl -X POST http://localhost:5000/api/user/register \
  -F "username=johndoe" \
  -F "email=john@example.com" \
  -F "password=securepassword" \
  -F "profilePicture=@/path/to/image.jpg"
```

**Response:**

```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "id": "user_id",
      "name": "johndoe",
      "email": "john@example.com",
      "profilePicture": "https://cloudinary_url/image.jpg"
    }
  },
  "message": "User registered successfully",
  "success": true
}
```

## Project Structure

```
├── public/
│   └── temp/                 # Temporary storage for uploaded files
├── src/
│   ├── app.js               # Express app configuration
│   ├── server.js            # Server entry point
│   ├── config/
│   │   └── db.config.js     # Database configuration
│   ├── controllers/
│   │   └── user.controller.js # User-related business logic
│   ├── middleware/
│   │   ├── auth.middleware.js # Authentication middleware
│   │   └── multer.middleware.js # File upload middleware
│   ├── models/
│   │   └── user.model.js    # User data model
│   ├── routes/
│   │   └── user.routes.js   # User route definitions
│   └── utils/
│       ├── ApiError.js      # Custom error handling
│       ├── ApiResponse.js   # Standardized API responses
│       ├── asyncHandler.js  # Async error handling wrapper
│       └── cloudinary.js    # Cloudinary upload utility
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md               # Project documentation
```

## Key Components

### Multer Configuration

The application uses Multer to handle file uploads with temporary local storage before uploading to Cloudinary.

### Cloudinary Integration

Files are uploaded to Cloudinary for reliable cloud storage and optimized delivery.

### User Model

- User registration with profile picture support
- Password hashing using bcrypt
- JWT token generation for authentication

### Error Handling

- Custom error classes for better error management
- Standardized API response format
- Async error handling wrapper

## Environment Variables

| Variable                | Description                   | Required |
| ----------------------- | ----------------------------- | -------- |
| `PORT`                  | Server port number            | Yes      |
| `MONGODB_URI`           | MongoDB connection string     | Yes      |
| `ACCESS_TOKEN_SECRET`   | Secret for JWT access tokens  | Yes      |
| `REFRESH_TOKEN_SECRET`  | Secret for JWT refresh tokens | Yes      |
| `ACCESS_TOKEN_EXPIRY`   | Access token expiration time  | Yes      |
| `REFRESH_TOKEN_EXPIRY`  | Refresh token expiration time | Yes      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name         | Yes      |
| `CLOUDINARY_API_KEY`    | Cloudinary API key            | Yes      |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret         | Yes      |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Jalal Ahmad** - [GitHub Profile](https://github.com/jalal1122)

## Acknowledgments

- [Multer](https://github.com/expressjs/multer) for file upload handling
- [Cloudinary](https://cloudinary.com/) for cloud storage
- [Express.js](https://expressjs.com/) for the web framework
- [MongoDB](https://www.mongodb.com/) for the database
