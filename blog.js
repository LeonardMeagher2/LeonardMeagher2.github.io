function basename(path) {
  return path.replace(/^.*\/|\.[^.]*$/g, "");
}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getBlogPosts() {
  return fetch(
    "https://api.github.com/repos/leonardmeagher2/leonardmeagher2.github.io/contents/blog"
  ).then(function(response) {
    return response.json();
  }).then(function(posts){
    return posts.map(function(post){
      var parts = post.name.split("-");
      return {
        file_path: `/blog/${post.name}`,
        title: titleCase(basename(parts[1]).replace(/_/g, " ")),
        date: new Date(parts[0].replace(/_/g, "/"))
      }
    }).sort(function(a,b){
      return a.date - b.date;
    });
  });
}

function showPost(post) {
  fetch(post.file_path)
  .then(function(response) {
    return response.text();
  })
  .then(function(html) {
    // move this to templates
    var section = document.createElement("section");
    var header = document.createElement("h2");
    header.textContent = post.title;
    section.appendChild(header);
    section.insertAdjacentHTML("beforeend", html);
    document.body.appendChild(section);
  });
}


getBlogPosts().then(function(posts){
  showPost(posts[0]);
});
