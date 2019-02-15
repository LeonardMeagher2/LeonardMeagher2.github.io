function getBlogPosts(){
  return fetch("https://api.github.com/repos/leonardmeagher2/leonardmeagher2.github.io/contents/blog")
  .then(function(response){
    return response.json();
  })
}

function basename(path){
  return path.replace(/^.*\/|\.[^.]*$/g, '');
}
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

function parsePostName(post){
  var parts = post.name.split("-")
  return {
    date:parts[0].replace(/_/g,"/"),
    name:titleCase(basename(parts[1]).replace(/_/g," "))
  }
}
