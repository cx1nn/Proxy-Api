import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 3000;

app.use(express.static('public'));

// Function to generate random string
const generateRandomString = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Endpoint to generate and return a random link
app.get('/generate-link', (req, res) => {
    const randomSubdomain = generateRandomString(12);
    const subdomainUrl = `https://${randomSubdomain}.vercel.app`;

    const vercelProjectUrl = 'https://tropical70.vercel.app'; // your Vercel app URL

    exec(`vercel alias set ${vercelProjectUrl} ${randomSubdomain}`, (error, stdout, stderr) => {
        // Check for errors during the execution
        if (error) {
            // Return a user-friendly error message
            return res.json({ status: 'failure', error: 'Failed to generate the link. Please try again.' });
        }

        // Send the generated link back to the client
        res.json({ status: 'success', link: subdomainUrl });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});