‎# Note-Taking API
‎
‎A simple RESTful API for managing notes, built with Node.js and Express. This API allows you to create, read, update, and delete notes with features like automatic timestamping and request logging.
‎
‎## Features
‎
‎- ✅ Create new notes with title and content
‎- ✅ Retrieve all notes
‎- ✅ Update existing notes
‎- ✅ Delete notes by ID
‎- ✅ Automatic date timestamping
‎- ✅ Request logging with Morgan
‎- ✅ JSON-based data storage
‎
‎## Tech Stack
‎
‎- **Node.js** - Runtime environment
‎- **Express.js** - Web framework
‎- **Morgan** - HTTP request logger
‎- **dotenv** - Environment variable management
‎
‎## Prerequisites
‎
‎- Node.js (v12 or higher)
‎- npm or yarn
‎
‎## Installation
‎
‎1. Clone the repository:
‎```bash
‎git clone https://github.com/Pavan-Bhudiya/Note-Taking.git
‎cd Note-Taking
‎```
‎
‎2. Install dependencies:
‎```bash
‎npm install
‎```
‎
‎3. Create a `.env` file in the root directory:
‎```env
‎PORT=3000
‎```
‎
‎4. Start the server:
‎```bash
‎node app.js
‎```
‎
‎The server will start on the port specified in your `.env` file (default: 3000).
‎
‎## API Endpoints
‎
‎### Base URL
‎```
‎http://localhost:3000
‎```
‎
‎### 1. Health Check
‎Check if the server is running.
‎
‎**Endpoint:** `GET /`
‎
‎**Response:**
‎```
‎server active 😁
‎```
‎
‎---
‎
‎### 2. Get All Notes
‎Retrieve all notes from the system.
‎
‎**Endpoint:** `GET /note`
‎
‎**Response:** `200 OK`
‎```json
‎[
‎  {
‎    "id": 1,
‎    "title": "Group4 -assignment",
‎    "content": "create a note taking api",
‎    "date": "Thu Oct 30 2025"
‎  }
‎]
‎```
‎
‎---
‎
‎### 3. Create a New Note
‎Add a new note to the collection.
‎
‎**Endpoint:** `POST /note`
‎
‎**Request Body:**
‎```json
‎{
‎  "title": "Meeting Notes",
‎  "content": "Discuss project requirements"
‎}
‎```
‎
‎**Response:** `201 Created`
‎```json
‎[
‎  {
‎    "id": 1,
‎    "title": "Group4 -assignment",
‎    "content": "create a note taking api",
‎    "date": "Thu Oct 30 2025"
‎  },
‎  {
‎    "id": 2,
‎    "title": "Meeting Notes",
‎    "content": "Discuss project requirements",
‎    "date": "Thu Oct 30 2025"
‎  }
‎]
‎```
‎
‎**Error Response:** `404 Not Found`
‎```json
‎{
‎  "error": "title and body is neede"
‎}

‎```
‎
‎**Note:** Both `title` and `content` fields are required.
‎
‎---
‎
‎### 4. Update a Note
‎Update an existing note by ID (partial update supported).
‎
‎**Endpoint:** `PATCH /note/:id`
‎
‎**URL Parameters:**
‎- `id` (integer) - The ID of the note to update
‎
‎**Request Body:** (any fields to update)
‎```json
‎{
‎  "title": "Updated Title",
‎  "content": "Updated content"
‎}
‎```
‎
‎**Response:** `200 OK`
‎```json
‎{
‎  "id": 1,
‎  "title": "Updated Title",
‎  "content": "Updated content",
‎  "date": "Thu Oct 30 2025"
‎}
‎```
‎
‎**Error Response:** `404 Not Found`
‎```json
‎{
‎  "message": "note does not exit"
‎}
‎```
‎
‎---
‎
‎### 5. Delete a Note
‎Remove a note from the collection by ID.
‎
‎**Endpoint:** `DELETE /note/:id`
‎
‎**URL Parameters:**
‎- `id` (integer) - The ID of the note to delete
‎
‎**Response:** `204 No Content`
‎
‎**Error Response:** `404 Not Found`
‎```json
‎{
‎  "error": "Not found"
‎}
‎```
‎
‎---
‎
‎## Request Examples
‎
‎### Using cURL
‎
‎**Get all notes:**
‎```bash
‎curl http://localhost:3000/note
‎```
‎
‎**Create a note:**
‎```bash
‎curl -X POST http://localhost:3000/note \
‎  -H "Content-Type: application/json" \
‎  -d '{"title":"My Note","content":"Note content here"}'
‎```
‎
‎**Update a note:**
‎```bash
‎curl -X PATCH http://localhost:3000/note/1 \
‎  -H "Content-Type: application/json" \
‎  -d '{"title":"Updated Note"}'
‎```
‎
‎**Delete a note:**
‎```bash
‎curl -X DELETE http://localhost:3000/note/1
‎```
‎
‎### Using JavaScript (Fetch API)
‎
‎```javascript
‎// Get all notes
‎fetch('http://localhost:3000/note')
‎  .then(response => response.json())
‎  .then(data => console.log(data));
‎
‎// Create a note
‎fetch('http://localhost:3000/note', {
‎  method: 'POST',
‎  headers: {
‎    'Content-Type': 'application/json',
‎  },
‎  body: JSON.stringify({
‎    title: 'My Note',
‎    content: 'Note content here'
‎  })
‎})
‎  .then(response => response.json())
‎  .then(data => console.log(data));
‎```
‎
‎## Data Structure
‎
‎Each note object contains the following fields:
‎
‎| Field | Type | Description | Auto-generated |
‎|-------|------|-------------|----------------|
‎| `id` | Integer | Unique identifier | Yes |
‎| `title` | String | Note title | No (Required) |
‎| `content` | String | Note content | No (Required) |
‎| `date` | String | Creation/update date | Yes |
‎
‎## Logging
‎
‎The API uses Morgan to log all HTTP requests to an `access.log` file in the root directory. The log format is `combined`, which includes:
‎- Remote address
‎- Request date/time
‎- Request method and URL
‎- HTTP version
‎- Status code
‎- Response size
‎- Referrer
‎- User agent
‎
‎## Project Structure
‎
‎```
‎Note-Taking/
‎├── app.js           # Main application file
‎├── access.log       # HTTP request logs (auto-generated)
‎├── .env             # Environment variables
‎├── package.json     # Dependencies and scripts
‎└── README.md        # Project documentation
‎```
‎
‎## Dependencies
‎
‎```json
‎{
‎  "express": "Web framework",
‎  "morgan": "HTTP request logger",
‎  "dotenv": "Environment variable loader"
‎}
‎```
‎
‎## Important Notes
‎
‎⚠️ **Data Persistence:** This API stores notes in memory. All data will be lost when the server restarts. For production use, consider integrating a database (MongoDB, PostgreSQL, etc.).
‎
‎⚠️ **Validation:** The API performs minimal input validation. Consider adding more robust validation for production use.
‎
‎⚠️ **Security:** This is a basic implementation without authentication or authorization. Implement proper security measures before deploying to production.
‎
‎## Future Enhancements
‎
‎- [ ] Database integration (MongoDB/PostgreSQL)
‎- [ ] User authentication and authorization
‎- [ ] Search and filter functionality
‎- [ ] Pagination for large datasets
‎- [ ] Input validation and sanitization
‎- [ ] Error handling middleware
‎- [ ] API rate limiting
‎- [ ] Unit and integration tests
‎- [ ] API documentation with Swagger/OpenAPI
‎
‎## Contributing
‎
‎Contributions are welcome! Please feel free to submit a Pull Request.
‎
‎## License
‎
‎This project is open source and available under the [MIT License](LICENSE).
‎
‎## Author
‎
‎**Pavan Bhudiya**
‎- GitHub: [@Pavan-Bhudiya](https://github.com/Pavan-Bhudiya)
‎**V1ron6** 
-GitHub : [@V1ron6](https://github.com/V1ron6)
‎## Support
‎
‎For issues, questions, or contributions, please open an issue in the GitHub repository.
