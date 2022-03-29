const link = document.getElementById("link");
const text = document.getElementById("text");
const author = document.getElementById("author");
const quoteButton = document.getElementById("new-quote");
const anchorButton = document.getElementsByClassName("button-container__button");
const quoteMarks = document.getElementsByClassName("icon-size");
const tweet = document.getElementById("tweet-quote");
const tumbler = document.getElementById("tumbler");
const body = document.body;

// Everythin in here is a hack since I am using npm i just made this js into a module in the html calling of the script

var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

console.log(colors[Math.floor(Math.random() * colors.length)]);
const url = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

//let quotesBank = await getQuotes(url).catch((e) => console.error(e));




async function getQuotes(url) {
    // remember that async function needs to wait for response to be finished before 
    //while waiting js will do other things first and then comeback when asynch is finished
    const response = await fetch(url);
    const jsonObject = await response.json();
    return jsonObject;
}
function randomColor(colors) {
    // returns a random color from the colors array 
    return colors[Math.floor(Math.random() * colors.length)];
}
function randomQuote(qoutesBank){ // dependent on async
    // get a random qoute from the qoutes bank
    return qoutesBank.quotes[Math.floor(Math.random() * qoutesBank.quotes.length)]
}

function addSomeStyle(color){
    // this is the function that handles all the styling
    body.style.background = color;
    body.style.color = color;
    quoteButton.style.background = color;
    anchorButton[0].style.background = color;
    anchorButton[1].style.background = color;
    text.animate([{opacity: 0},{opacity: 1}], 1000);
    author.animate([{opacity: 0},{opacity: 1}], 1000);
    quoteMarks[0].animate([{opacity: 0},{opacity: 1}], 1000);
    quoteMarks[1].animate([{opacity: 0},{opacity: 1}], 1000);
}

function getQuote(quotesBank, colors) {
    let quoteOfTheDay = randomQuote(quotesBank);
    let currQuote = quoteOfTheDay['quote'];
    let currAuthor = quoteOfTheDay['author'];
    console.log(currQuote + " -" + currAuthor)
    text.innerHTML = currQuote;
    author.innerHTML = "- "+currAuthor;
    let tweetIntent = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currQuote + '" -' + currAuthor);
    let tumblrIntent = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + encodeURIComponent(currAuthor) + '&content=' + encodeURIComponent(currQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';
    tweet.href = tweetIntent;
    tumbler.href = tumblrIntent;
    tweet.addEventListener('click', (e) =>{ 
        e.preventDefault();
        window.open(tweetIntent, 'newwindow');
    })
    tumbler.addEventListener( 'click', (e) => {
        e.preventDefault();
        window.open(tumblrIntent, 'newwindow');
    }
    )
    let color = randomColor(colors);
    addSomeStyle(color);
}

//getQuote(quotesBank, colors);
//quoteButton.addEventListener('click', () => getQuote(quotesBank, colors));

(async() =>{
    let quotesBank = await getQuotes(url).catch((e) => console.error(e));
    getQuote(quotesBank, colors);
    quoteButton.addEventListener('click', () => getQuote(quotesBank, colors));
  })();