// Import required modules
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const { generateHtmlTables } = require('../controllers/ExportDoc');

// Define the route
router.get('/', async (req, res) => {
    try {
        // Generate HTML tables for all models
        const htmlTables = await generateHtmlTables();

        // HTML content with tables
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Project Data</title>
                <style>
                    /* Add your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #dddddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Project Data</h1>
                ${htmlTables}
            </body>
            </html>
        `;

        // Create a browser instance
        const browser = await puppeteer.launch();
        // Create a new page
        const page = await browser.newPage();

        // Set the content of the page
        await page.setContent(htmlContent);

        // Generate PDF
        const pdf = await page.pdf({ format: "A4", printBackground: true });

        // Close the browser instance
        await browser.close();

        // Send the PDF as a response
        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdf.length,
        });
        res.send(pdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Export the router
module.exports = router;
