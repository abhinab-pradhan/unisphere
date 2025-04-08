let posts = JSON.parse(localStorage.getItem('posts')) || [];

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function renderPosts() {
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const title = document.createElement('h3');
    title.textContent = post.title;

    const content = document.createElement('p');
    content.textContent = post.content;

    const votes = document.createElement('div');
    votes.className = 'vote-btns';
    votes.innerHTML = `
      <button onclick="votePost(${index}, 1)">⬆️ ${post.upvotes}</button>
      <button onclick="votePost(${index}, -1)">⬇️ ${post.downvotes}</button>
    `;

    const comments = document.createElement('div');
    comments.className = 'comment-section';

    post.comments.forEach((comment, cIndex) => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `
        <p>${comment.text}</p>
        <div class="comment-votes">
          <button onclick="voteComment(${index}, ${cIndex}, 1)">⬆️ ${comment.upvotes}</button>
          <button onclick="voteComment(${index}, ${cIndex}, -1)">⬇️ ${comment.downvotes}</button>
        </div>
      `;
      comments.appendChild(commentDiv);
    });

    const commentForm = document.createElement('form');
    commentForm.className = 'comment-form';
    commentForm.onsubmit = function (e) {
      e.preventDefault();
      const input = commentForm.querySelector('input');
      const text = input.value.trim();
      if (text) {
        posts[index].comments.push({
          text,
          upvotes: 0,
          downvotes: 0
        });
        input.value = '';
        savePosts();
        renderPosts();
      }
    };
    commentForm.innerHTML = `
      <input type="text" placeholder="Add a comment..." required>
      <button type="submit">Comment</button>
    `;

    comments.appendChild(commentForm);

    postDiv.appendChild(title);
    postDiv.appendChild(content);
    postDiv.appendChild(votes);
    postDiv.appendChild(comments);
    postList.appendChild(postDiv);
  });
}

function votePost(index, value) {
  if (value === 1) posts[index].upvotes++;
  else posts[index].downvotes++;
  savePosts();
  renderPosts();
}

function voteComment(postIndex, commentIndex, value) {
  const comment = posts[postIndex].comments[commentIndex];
  if (value === 1) comment.upvotes++;
  else comment.downvotes++;
  savePosts();
  renderPosts();
}

document.getElementById('submit-post').addEventListener('click', () => {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (title && content) {
    posts.unshift({
      title,
      content,
      upvotes: 0,
      downvotes: 0,
      comments: []
    });
    savePosts();
    renderPosts();
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
  } else {
    alert('Please fill in both fields.');
  }
});

renderPosts();
