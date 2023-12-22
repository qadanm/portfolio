document.addEventListener("DOMContentLoaded", function () {
    // Set current year
    document.getElementById("currentYear").innerText = new Date().getFullYear();

    // List of 70 inspirational quotes
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Success is not in what you have, but who you are. - Bo Bennett",
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "It's not about how hard you hit. It's about how hard you can get hit and keep moving. - Rocky Balboa",
        "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
        "Hard work beats talent when talent doesn't work hard. - Tim Notke",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
        "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
        "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
        "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs",
        "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort",
        "If you want to achieve greatness stop asking for permission. - Anonymous",
        "Your time is now. Start where you stand and never back down. - Tom Hopkins"
    ];

    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Display the quote
    document.getElementById("quote").innerText = randomQuote;
});
