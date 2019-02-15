function getBlogPosts(){
  return fetch("https://api.github.com/repos/leonardmeagher2/leonardmeagher2.github.io/contents/blog")
  .then(function(response){
    return response.json();
  })
}

function parsePostName(post){
  var parts = post.name.split("-")
  return {
    date:parts[0].replace(/_/g,"/"),
    name:parts[1].replace(/_/g," ")
  }
}
