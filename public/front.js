const formEl = document.getElementById('form');
const authorEl = document.getElementById('author');
const bodyEl = document.getElementById('text');
const postsListEl = document.getElementById('posts-list');

const url = 'http://localhost:3000';

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(authorEl.value, bodyEl.value);
  fetch(`${url}/api/new`, {
    method: 'POST',
    body: JSON.stringify({ author: authorEl.value, text: bodyEl.value }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data.msg === 'success') {
        console.log('pavyko');
        formEl.reset();
      }
    })
    .catch((err) => console.log('err', err));
});

const renderPosts = (postsArr, destination) => {
  destination.innerHTML = '';
  postsArr.forEach((el) => {
    const liEl = `
      <li data-id=${el.id} >
        <h4>Author: ${el.author}</h4>
        <p>${el.body}</p>
      </li>
    `;
    destination.innerHTML += liEl;
  });
};

const getPosts = async () => {
  console.log('getPosts running');
  try {
    const resp = await fetch(`${url}/posts`);
    const data = await resp.json();
    if (data.msg === 'success') {
      console.log('posts', data.posts);
      renderPosts(data.posts, postsListEl);
    }
  } catch (error) {
    console.log(error);
  }
};

getPosts();
