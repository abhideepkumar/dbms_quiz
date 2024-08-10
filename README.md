# Quiz Management System

This project is a comprehensive **Quiz Management System** designed to facilitate the creation, administration, and participation in quizzes. It is built using modern web development technologies to ensure a robust, scalable, and secure platform for educational institutions.

## Features

- **Multi-Role Authentication**: Supports distinct user roles (Teachers, Students) with specific permissions and access levels.
- **Quiz Management**: Teachers can create, edit, and manage quizzes with detailed metadata.
- **Malpractice Detection**: Real-time monitoring and automated alerts for suspicious activities to uphold academic integrity.
- **Server-Side Rendering (SSR)**: Ensures faster load times and better SEO.
- **Authentication**: Secure login and user management with Next Auth Google Login with restrictions to prevent unauthorized access.
- **Database**: Stores data in a PostgreSQL database.

## Technologies Used

- **Frontend & Backend**: [Next.js](https://nextjs.org/) - for a responsive and dynamic interface also used Server Actions.
- **Authentication**: [Next Auth](https://next-auth.js.org/) - for user authentication.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - for storing data.
- **Deployment**: [Netlify](https://www.netlify.com/) - for hosting.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhideepkumar/dbms_quiz
   cd dbms_quiz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the PostgreSQL database**:
   - Ensure PostgreSQL is installed and running.
   - Create a new database and configure the connection in the `.env` file.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Usage

- **Administrators**: Manage user roles, monitor system performance, and oversee activities.
- **Teachers**: Create, manage, and review quizzes. Monitor student performance and potential malpractices.
- **Students**: Participate in quizzes, track progress, and view results securely.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.