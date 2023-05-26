let newsIds = [];
let loadedNews = 0;

async function getLatestNewsIds() {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    newsIds = await response.json();
    showNewsDetails();
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
}

async function showNewsDetails() {
  try {
    const newsContainer = document.getElementById("news-container");

    const startIndex = loadedNews;
    let endIndex = startIndex + 10;
    if (endIndex > newsIds.length) {
      endIndex = newsIds.length;
    }

    for (let i = startIndex; i < endIndex; i++) {
      const newsId = newsIds[i];
      const newsResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`
      );
      const newsData = await newsResponse.json();

      const { title, url, time } = newsData;

      const newsElement = document.createElement("div");
      newsElement.classList.add("news-item");
      newsElement.innerHTML = `
        <h3><a href="${url}" target="_blank">${title}</a></h3>
        <p>${new Date(time * 1000).toLocaleString()}</p>
      `;
      newsContainer.appendChild(newsElement);
    }

    loadedNews = endIndex;

    const loadMoreButton = document.getElementById("load-more-button");
    loadMoreButton.style.display =
      loadedNews < newsIds.length ? "block" : "none";
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
}

function loadMoreNews() {
  showNewsDetails();
}

getLatestNewsIds();
