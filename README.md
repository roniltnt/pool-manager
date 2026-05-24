# 🏊‍♂️ Yotam's Pool Scheduling System

A full-stack web application designed to solve complex scheduling and load-balancing problems for a swimming school. This project was built to demonstrate algorithmic problem-solving, clean architecture, and modern web development practices.

## 📌 Project Overview
The Yotam's Pool system receives a list of students with specific preferences (swimming style and lesson type: private/group/flexible) and automatically generates an optimal weekly schedule. It balances the workload among the available swimming instructors while adhering to strict business rules and time constraints.

## 🚀 Tech Stack
* **Backend:** Java, Spring Boot, Spring Data JPA, RESTful APIs
* **Frontend:** React.js, CSS Grid (Custom Gantt Chart), i18n (Bilingual support without external libraries)
* **Database:** Neon Serverless PostgreSQL

## 🧠 The Core Algorithm: Heuristic-Based Greedy Approach
Scheduling problems are inherently NP-Hard. To ensure extremely fast response times (O(N * M)) without crashing the server or over-engineering the solution, this system utilizes a **Heuristic-based Greedy Algorithm**.

### Key Architectural Decisions & Heuristics:
1.  **Most Constrained First (Bottleneck Prioritization):**
    The algorithm identifies styles that can only be taught by specific "Generalist" teachers (e.g., Freestyle and Backstroke). It prioritizes scheduling these students first to prevent the generalists from being filled up with easier-to-schedule lessons, thus preventing "Starvation" of constrained students.
2.  **Flexibility Sorting (The Modulo Problem):**
    When grouping students, the system sorts them internally. Students who strictly demand `GROUP_ONLY` are prioritized for group formation. Students who are `ANY` (Flexible) are pushed to the end of the queue, ensuring that if a group doesn't reach full capacity, the flexible students gracefully fall back into private lesson slots without causing the rigid students to be rejected.
3.  **Dynamic Load Balancing:**
    Instead of hardcoded penalties, the algorithm calculates a real-time `Load Score` for each teacher (combining absolute total minutes and daily specific load). It consistently routes new requests to the least-burdened capable teacher.

## 🔌 API & Client-Server Communication
The system operates on a highly decoupled architecture.
* **Endpoint:** `POST /api/pool/schedule`
* **Payload:** An array of `Student` objects containing their preferences.
* **Response:** A comprehensive `ScheduleResponse` object containing the `scheduledLessons` (time, teacher, participants) and an `unassignedStudents` array for edge cases where business rules prevented a match.
* **Frontend Handling:** The React app handles the state, displays a seamless loading UI during server processing, and renders the complex JSON response into an interactive, printable weekly Gantt chart.

## 🗄️ Database & Zero-Setup Philosophy
To make the project easy to evaluate, it is connected to a **Neon Serverless PostgreSQL** database.
* **Auto-Seeding:** The Spring Boot application includes a `DataSeeder` configuration. On startup, it checks if the database is empty and automatically injects the initial Teachers and Time Windows configurations. No local database installation or SQL scripts are required to run and test this project.

## 🏃‍♂️ How to Run the Project
1.  Clone the repository.
2.  **Backend:** Navigate to the Spring Boot root directory and run `PoolManagerApplication.java` via your IDE or run `./mvnw spring-boot:run`. (The Neon DB connection is already configured in `application.properties`).
3.  **Frontend:** Navigate to the React directory, run `npm install`, and then `npm run dev`.
4.  Open `http://localhost:3000` in your browser.
5.  *Tip:* Use the "Load 30 Mock Students" button in the UI to instantly stress-test the algorithm!

## 👨‍💻 Author
**Roni Laufer Zukerman**
