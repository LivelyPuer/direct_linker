# Direct Linker

A simple file upload server that provides direct download links for uploaded files, with API token authentication.

## Features

- File upload via API
- Direct download links for uploaded files
- Token-based authentication
- Simple web interface (optional)

## Installation

1. Clone the repository:
```bash
git clone https://your-repository-url.git
```
2. Install dependencies:
```bash
npm install
 ```

3. Create .env file:
```bash
copy .env.example .env
 ```

## Configuration
Edit the .env file:

```plaintext
API_TOKEN=your-secret-token-here
PORT=3010
 ```

## Usage
### API Endpoints
Upload File:

```plaintext
POST /upload
Headers:
  Authorization: Bearer your-secret-token-here
Body:
  form-data: file=@yourfile.ext
 ```

Download File:

```plaintext
GET /uploads/filename
 ```

### Running the Server
```bash
node server.js
 ```

The server will be available at http://localhost:3010

## Security
- Always keep your .env file secret
- Use strong API tokens
- The server should run behind a reverse proxy in production
## License
MIT