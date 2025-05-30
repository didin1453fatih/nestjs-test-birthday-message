## Technologies Used
1. NestJS
2. MongoDB
3. Docker
4. Agenda.js


## How to use
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
    cd <project-directory>
   ```
3. Start the application:
   ```bash
    docker-compose up
   ```
4. Access the application swagger documentation at:
   ```
   http://localhost:3000/docs
   ```
5. If you want change code, you must rebuild the app docker image:
   ```bash
    docker-compose build --no-cache app
   ```

## API Examples
0. To see the API documentation, you can visit:
   ```
   http://localhost:3000/docs
   ```
1. To get all users:
   ```bash
    curl -X 'GET' \
      'http://localhost:3000/api/users' \
      -H 'accept: */*'
   ```
2. Try to add a new user:
   ```bash
    curl -X 'POST' \
        'http://localhost:3000/api/users' \
        -H 'accept: */*' \
        -H 'Content-Type: application/json' \
        -d '{
        "name": "Budi",
        "email": "budi@gmail.com",
        "birthday": "2022-09-27",
        "timezone": "America/New_York"
        }'
   ```
3. To get a user by ID:
   ```bash
    curl -X 'GET' \
      'http://localhost:3000/api/users/user_id' \
      -H 'accept: */*'
   ```
4. To update a user by ID:
   ```bash
    curl -X 'PUT' \
      'http://localhost:3000/api/users/683898c896fa9a4176fef0fd' \
      -H 'accept: */*' \
      -H 'Content-Type: application/json' \
      -d '{
      "name": "Budi",
      "email": "budi@gmail.com",
      "birthday": "2022-09-27",
      "timezone": "America/New_York"
      }'
   ```
5. To delete a user by ID:
   ```bash
    curl -X 'DELETE' \
      'http://localhost:3000/api/users/683898c896fa9a4176fef0fd' \
      -H 'accept: */*'
   ```

## Brief notes on assumptions, limitations, and design decisions.
### Assumptions
- The most important test case are:
  - **agenda.service.spec.ts** for testing the Agenda service with combination of birthday, current date, and timezone.
  - **user.dto.spec.ts** for testing the User DTO validation.
- MongoDB: The application assumes a running and accessible MongoDB instance, as configured by the MONGO_URI environment variable.
- Agenda.js: The app uses Agenda.js for job scheduling, assuming the Agenda service always connect to the same MongoDB instance. And agenda jobs who started at 9:00 AM in the user's timezone always run at that time.
- Docker: The app is designed to run in Docker containers, with Docker Compose orchestrating both the app and MongoDB.
- Environment Variables: Configuration (such as DB URI and port) is managed via environment variables, loaded using @nestjs/config.
- For local development change MONGO_URI in .env file to your local MongoDB instance.

### Limitations
1. No Authentication: There is no authentication or authorization implemented for the API endpoints.
2. Email Uniqueness: User emails must be unique, enforced at both the DTO validation and MongoDB schema level.
3. Birthday Scheduling: The birthday job is scheduled for 9:00 AM in the user's timezone, and leap year birthdays are handled by moving to March 1st in non-leap years.

### Design Decisions
1. NestJS: Chosen for its modularity, dependency injection, and strong TypeScript support.
2. Mongoose: Used for MongoDB object modeling and schema validation.
3. Agenda.js: Third-party library for job scheduling, allowing for flexible and persistent job management using MongoDB.
4. Swagger: API documentation is auto-generated and available at /docs. it provides a user-friendly interface for testing API endpoints.
5. DTO Validation: Uses class-validator for input validation, ensuring data integrity at the controller level.
6. Dockerization: The app is containerized for easy deployment and consistent environments.