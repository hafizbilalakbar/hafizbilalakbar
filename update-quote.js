const fs = require('fs');
const path = require('path');

// Function to update the quote in the README.md file
async function updateQuote() {
  try {
    // Load quotes from JSON file
    const quotesPath = path.join(__dirname, 'quotes.json');
    
    // Check if the quotes.json file exists
    if (!fs.existsSync(quotesPath)) {
      console.error('Quotes file not found:', quotesPath);
      process.exit(1);
    }

    const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));

    // Select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    // Create the card design for the quote
    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

    // Path to the README.md file
    const readmePath = './README.md';

    // Read the content of README.md
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Replace the old quote card with the new one
    const newReadmeContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->(.|\n)*<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign
    );

    // Check if the README.md actually needs an update
    if (readmeContent === newReadmeContent) {
      console.log("No update needed. The quote is already up-to-date.");
      return;
    }

    // Write the updated content back to README.md
    fs.writeFileSync(readmePath, newReadmeContent);

    console.log("README.md updated successfully with a new quote!");
  } catch (error) {
    // Log any errors that occur
    console.error('Error updating quote:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);  // Exit with a non-zero code if there is an error
  }
}

// Call the updateQuote function
updateQuote();
