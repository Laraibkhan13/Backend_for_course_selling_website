## Backend course selling website

### Description

## Routes

### Admin Routes:
Admin Routes
POST /admin/signup
Creates a new admin account.
Body: { username, password }
Response: { message: 'Admin created successfully' }

POST /admin/signin
Logs in an admin.
Body: { username, password }
Response: { token }

POST /admin/courses
Creates a new course.
Headers: { 'Authorization': 'Bearer <token>' }
Body: { title, description, price, imageLink }
Response: { message: 'Course created successfully', courseId }

GET /admin/courses
Returns all courses.
Headers: { 'Authorization': 'Bearer <token>' }
Response: { courses: [ { id, title, description, price, imageLink, published }, ... ] }

User Routes
POST /users/signup
Creates a new user account.
Body: { username, password }
Response: { message: 'User created successfully' }

POST /users/signin
Logs in a user.
Body: { username, password }
Response: { token }

GET /users/courses
Lists all available courses.
Headers: { 'Authorization': 'Bearer <token>' }
Response: { courses: [ { id, title, description, price, imageLink, published }, ... ] }

POST /users/courses/

Purchases a course.
Headers: { 'Authorization': 'Bearer <token>' }
Response: { message: 'Course purchased successfully' }

GET /users/purchasedCourses
Lists all purchased courses.
Headers: { 'Authorization': 'Bearer <token>' }
Response: { purchasedCourses: [ { id, title, description, price, imageLink, published }, ... ] }
