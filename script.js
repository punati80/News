
// Define the path to the JSON file
const apiUrl = 'news.json'; 
const newsContainer = document.getElementById('news-container');
let articles = [];

// Fetch news articles from the JSON file
async function fetchNews() {
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if data has articles
        if (data.articles && data.articles.length > 0) {
            console.log("Fetched articles:", data.articles);
            articles = shuffleArray(data.articles);
            renderNews();
        } else {
            newsContainer.innerHTML = '<p>No articles found in the JSON file.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching articles. Please try again later.</p>';
    }
}

// Shuffle the array of articles randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Render a random news article to the container
function renderNews() {
    newsContainer.innerHTML = '';
    
    if (articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const article = articles[randomIndex];
        
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.urlToImage}" alt="${article.title}" style="max-width: 100%; height: auto;">
        `;
        
        articleElement.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
        
        newsContainer.appendChild(articleElement);
    } else {
        newsContainer.innerHTML = '<p>No articles available.</p>';
    }
}

// Function to refresh the displayed news article
function refreshNews() {
    renderNews();
}

// Event listener for the refresh button
document.getElementById('refresh-button').addEventListener('click', refreshNews);

// Fetch the news articles when the page loads
fetchNews();
