const fs = require('fs');

async function updateQuote() {
  try {
    // Load quotes from the JSON file
    const quotes = require('./quotes.json');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    // Create the new quote card
    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Replace the old quote card with the new one
    readmeContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->(.|\n)*<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign
    );

    // Write the updated content back to README.md
    fs.writeFileSync(readmePath, readmeContent);
  } catch (error) {
    console.error('Error updating quote:', error);
  }
}

// Call the function to update the quote
updateQuote();
