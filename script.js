const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('x-twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function setQuote(quote){
    loading();
    if (quote.quote.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.quote;
    
    if (!quote.author) {
        quoteAuthor.textContent = "Unknown";
    }else {
        quoteAuthor.textContent = quote.author;
    }
    complete();
}

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function getQuote() {
    loading();
    try {
        const response = await fetch('https://quotes-api-self.vercel.app/quote');
        const newQuote = await response.json();
        console.log(newQuote);
        setQuote(newQuote);
    } catch (error) {
        console.error("Error fetching the quote:", error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuote(); 




