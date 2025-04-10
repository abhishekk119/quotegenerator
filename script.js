// script.js
document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quotes');
    const authorElement = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('newquotebtn');
    
    // Array of fallback quotes
    const fallbackQuotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Life is what happens when you're busy making other plans.",
            author: "John Lennon"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "In the middle of every difficulty lies opportunity.",
            author: "Albert Einstein"
        },
        {
            text: "Be the change that you wish to see in the world.",
            author: "Mahatma Gandhi"
        }
    ];
    
    // Function to fetch a random quote using ZenQuotes API with CORS proxy
    async function fetchQuote() {
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = 'https://zenquotes.io/api/random';
            const response = await fetch(proxyUrl + apiUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                signal: AbortSignal.timeout(3000) // 3 second timeout
            });
            
            if (response.ok) {
                const data = await response.json();
                // ZenQuotes returns an array with one quote object
                return {
                    text: data[0].q,
                    author: data[0].a
                };
            } else {
                throw new Error(`API Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Return a random fallback quote if API fails
            return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        }
    }
    
    // Function to display a new quote
    async function displayNewQuote() {
        // Show loading state
        quoteElement.textContent = "Loading...";
        authorElement.textContent = "";
        
        try {
            const quote = await fetchQuote();
            quoteElement.textContent = `"${quote.text}"`;
            authorElement.textContent = `— ${quote.author}`;
        } catch (error) {
            console.error('Error displaying quote:', error);
            // If everything fails, show a hardcoded quote
            quoteElement.textContent = `"The greatest glory in living lies not in never falling, but in rising every time we fall."`;
            authorElement.textContent = `— Nelson Mandela`;
        }
    }
    
    // Event listener for the new quote button
    newQuoteBtn.addEventListener('click', displayNewQuote);
    
    // Display initial quote when page loads
    displayNewQuote();
});