function loadRSSFeeds(url) {
  const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${url}`;
  const data = fetch(rssToJsonApi)
    .then((response) => response.json())
    .then((data) => data);
  return data;
}

const accordionContainer = document.getElementById("accordionExample");

magazines.forEach(async (magazine, index) => {
  const data = await loadRSSFeeds(magazine);
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";
  let carouselInner = "";
  data.items.forEach((item, index) => {
    carouselInner += `
    <div class="carousel-item ${index == 0 ? "active" : ""}">
    <div class="card w-100">
    <img src="${item.enclosure.link}" class="card-img-top w-100" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.description}</p>
    </div>
  </div>
  </div>`;
  });
  accordionItem.innerHTML = `
  <h2 class="accordion-header" id="heading${index}">
  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
    ${data.feed.title}
  </button>
</h2>
<div id="collapse${index}" class="accordion-collapse collapse ${
    index == 0 ? "show" : ""
  }" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
  <div class="accordion-body">
  <div id="carouselExample${index}" class="carousel slide">
<div class="carousel-inner">
${carouselInner}
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>
  </div>
</div>`;
  accordionContainer.append(accordionItem);
});
