const formEl = document.getElementById('form');
const authorEl = document.getElementById('author');
const bodyEl = document.getElementById('text');

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

const getPosts = async () => {
  console.log('getPosts running');
  try {
    const resp = await fetch(`${url}/posts`);
    const data = await resp.json();
    if (data.msg === 'success') {
      console.log('posts', data.posts);
    }
  } catch (error) {
    console.log(error);
  }
};
getPosts();
