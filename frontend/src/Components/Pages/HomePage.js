const HomePage = () => {
  const token = localStorage.getItem("token");
  const main = document.querySelector('main');
  main.innerHTML = '<h1>Welcome to our blog <333333 </h1>';
  if(token) {
    main.innerHTML += '<form method="post"><div><label>Add a post</label><input type="text" id="message"></div> <div><button>Submit</button></div></form>'
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      addPost();
      showPosts();
    });
  showPosts();                        
}};

function showPosts() {
  const main = document.querySelector('main');
  main.innerHTML += '<div id="posts"></div>'
  const diiv = document.getElementById("posts");
  diiv.innerHTML = "";
  fetch('http://localhost:3000/posts').then(response => response.json()).then((result) => {
    result.reverse().forEach(e => {
      diiv.innerHTML += `<div><h3>${e.message}</h3></div>`
    });
})};

function addPost() {
  const message = document.getElementById("message").value;
  const data = {
    message,
  }
  fetch('http://localhost:3000/posts/createPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status !== 200) {
      throw new Error("Create post failed");
    } else {
      return response.json();
    }
  }).then((result) => {
    console.log(result);
  })
}

export default HomePage;
