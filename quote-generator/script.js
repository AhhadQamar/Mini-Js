const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter-button");
// Array to store the qutoes from the API
let apiQuotes = [];
// showing the loader and hiding the quote container
function showloader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hiding the loader and showing the quote container
function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
// slecting a random quote and displaying a new quote
function newQuote() {
  showloader();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  quote.author
    ? (authorText.textContent = `- ${quote.author}`)
    : (authorText.textContent = "Unknown");
  if (quoteText.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoader();
}
// Get Quotes from API
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    showloader();
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("Whoops, no quote", error);
  }
}
// Function to tweet a quote
function tweet() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}
// Adding Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweet);
// Run on load
getQuotes();
