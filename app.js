window.addEventListener('load', () => {
  console.log("load is running!")
  const baseURL = 'http://localhost:3000/blogposts/';
  const pullPosts = () => {
    const blogPostList = document.createElement('ul');
    axios.get(`${baseURL}`)
      .then(response => {
        const list = response.data;
        console.log(list);

        list.forEach( post => {
          const li = document.createElement('li');
          li.innerHTML = `${post.title}`;
          blogPostList.appendChild(li);
          const navList = document.getElementById('blogPostList');
          navList.appendChild(li);
        })

      })
      .catch( error => {
        console.error(error)})
    }
    pullPosts();
})
