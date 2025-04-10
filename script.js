// script.js
document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quotes');
    const authorElement = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('newquotebtn');
  
    async function fetchQuote() {
      try {
        const response = await fetch('https://cheerful-druid-73acab.netlify.app/.netlify/functions/zenquotes-proxy');
        const data = await response.json();
        return {
          text: data[0].q,
          author: data[0].a
        };
      } catch (error) {
        console.error("Using fallback quote");
        return {
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs"
        };
      }
    }
  
    async function displayNewQuote() {
      quoteElement.textContent = "Loading...";
      authorElement.textContent = "";
      
      const quote = await fetchQuote();
      quoteElement.textContent = `"${quote.text}"`;
      authorElement.textContent = `— ${quote.author}`;
    }
  
    newQuoteBtn.addEventListener('click', displayNewQuote);
    displayNewQuote(); // Load first quote immediately
  });
