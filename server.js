const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const marked = require('marked'); // To parse the README.md into HTML
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Route for the homepage (serve README.md as HTML)
app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, 'public', 'README.md');
  
  // Read the README file
  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading README.md');
    }

    // Convert the markdown to HTML using 'marked' library
    const htmlContent = marked(data);

    // Create a simple HTML page with the README content and a link to index.html
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to My Website</title>
        </head>
        <body>
          <div>
            ${htmlContent} <!-- Rendered README.md content here -->
          </div>
          <a href="/index.html">Go to the main site</a> <!-- Link to index.html -->
        </body>
      </html>
    `;

    // Send the HTML response
    res.send(html);
  });
});

// Route for the index page
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
