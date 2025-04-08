const postsContainer = document.getElementById("posts-container");
const addPostModal = document.getElementById("add-post-modal");
const showAddPostModal = document.getElementById("show-add-post-modal-btn");
const closeAddPostModal = document.getElementById("close-modal-btn");
const addPostForm = document.getElementById("add-post-form");
const postDetailContainer = document.getElementById("post-detail");
const commentsContainer = document.getElementById("comments-container");
const addCommentForm = document.getElementById("add-comment-form");

const posts = loadPostsFromLocalStorage();

class Post {
  constructor(id, title, content, comments, votes = 0) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = comments || [];
    this.votes = votes;
  }
}

class Comment {
  constructor(id, parentId, postId, content, author) {
    this.id = id;
    this.parentId = parentId || null;
    this.postId = postId;
    this.content = content;
    this.author = author;
    this.childComments = [];
  }
}

function savePostsToLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
  const storedPosts = localStorage.getItem("posts");
  return storedPosts ? JSON.parse(storedPosts) : [];
}

if (showAddPostModal) {
  showAddPostModal.addEventListener("click", showModal);

  window.addEventListener("click", (event) => {
    if (event.target === addPostModal) {
      closeModal();
    }
  });
}

if (closeAddPostModal) {
  closeAddPostModal.addEventListener("click", closeModal);
}

function showModal() {
  addPostModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  addPostModal.style.display = "none";
  document.body.style.overflow = "";
}

if (addPostForm) {
  addPostForm.addEventListener("submit", addPost);
}

function addPost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (title && content) {
    const post = new Post(Date.now(), title, content);
    posts.unshift(post);
    savePostsToLocalStorage();
    renderPosts(posts);
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    closeModal();
  }
}

function renderPosts(posts) {
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = `
      <div class="no-posts">
        <p>No posts yet!</p>        
      </div>
    `;
  } else {
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
        <div class="post-votes">
          <button onclick="postVote(${post.id}, 'upvote')">
            <i class="las la-chevron-circle-up"></i>
          </button>
          <span id="votes-${post.id}" class="${setPostVoteColor(post.votes)}">
            ${post.votes}
          </span>
          <button onclick="postVote(${post.id}, 'downvote')">
            <i class="las la-chevron-circle-down"></i>
          </button>
        </div>
        <div class="post-content">
          <h2>
            <a href="post.html?id=${post.id}">
              ${post.title}
            </a>
          </h2>
          <p>${post.content}</p>
        </div>
      `;

      postsContainer.appendChild(postElement);
    });
  }
}

function postVote(id, type) {
  const post = posts.find((post) => post.id === id);
  post.votes += type === "upvote" ? 1 : -1;
  const votesElement = document.getElementById(`votes-${id}`);
  votesElement.innerText = post.votes;
  votesElement.className = setPostVoteColor(post.votes);
  savePostsToLocalStorage();
}

function setPostVoteColor(postVotes) {
  if (postVotes === 0) {
    return "";
  }

  return postVotes > 0 ? "positive" : "negative";
}

function getPostFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  return posts.find((post) => post.id === parseInt(postId));
}

function renderPostDetail(post) {
  if (!post || !postDetailContainer) {
    return;
  }

  postDetailContainer.innerHTML = `
    <div class="post">
      <div class="post-votes">
        <button onclick="postVote(${post.id}, 'upvote')">
          <i class="las la-chevron-circle-up"></i>
        </button>
        <span id="votes-${post.id}" class="${setPostVoteColor(post.votes)}">
          ${post.votes}
        </span>
        <button onclick="postVote(${post.id}, 'downvote')">
          <i class="las la-chevron-circle-down"></i>
        </button>
      </div>
      <div class="post-content">
        <h2>
          <a href="post.html?id=${post.id}">
            ${post.title}
          </a>
        </h2>
        <p>${post.content}</p>
      </div>
    </div>
  `;
}

if (addCommentForm) {
  addCommentForm.addEventListener("submit", handleAddCommentFormSubmit);
}

function handleAddCommentFormSubmit(event) {
  event.preventDefault();

  const commentTextarea = document.getElementById("comment");
  const commentContent = commentTextarea.value;

  addComment(null, commentContent);

  commentTextarea.value = "";
}

function addComment(parentCommentId, replyContent) {

  const post = getPostFromUrl();

  const newComment = new Comment(
    Date.now(),
    Number(parentCommentId),
    post.id,
    replyContent,
    ""  //
  );

  if (!parentCommentId) {
    post.comments.push(newComment);
  } else {
    const parentComment = findCommentById(
      post.comments,
      Number(parentCommentId)
    );
    if (parentComment) {
      parentComment.childComments.push(newComment);
    }
  }

  savePostsToLocalStorage();
  renderComments(post.comments, commentsContainer);
}

function findCommentById(comments, id) {
  for (const comment of comments) {
    if (comment.id === id) {
      return comment;
    } else if (comment.childComments.length > 0) {
      const foundComment = findCommentById(comment.childComments, id);
      if (foundComment) {
        return foundComment;
      }
    }
  }
}

function renderComments(comments, container, depth = 0) {
  if (depth === 0) {
    container.innerHTML = "";
  }

  comments.forEach((comment) => {

    const commentElement = createCommentElement(comment, depth);

    container.appendChild(commentElement);

    if (comment.childComments && comment.childComments.length > 0) {
      renderComments(comment.childComments, container, depth + 1);
    }
  });
}

function createCommentElement(comment, depth) {
  const commentElement = document.createElement("div");
  commentElement.className = "comment";
  commentElement.style.marginLeft = `${depth * 20}px`;
  commentElement.innerHTML = `
    <p class="comment-author">${comment.author}</p>
    <p class="comment-content">${comment.content}</p>
    <button class="comment-reply" data-comment-id="${comment.id}">
      <i class="las la-reply"></i> reply
    </button>
  `;

  const replyBtn = commentElement.querySelector(".comment-reply");
  replyBtn.addEventListener("click", handleCommentReply);

  return commentElement;
}

function handleCommentReply(event) {
  const button = event.target;
  const commentId = button.getAttribute("data-comment-id");

  const commentElement = button.closest(".comment");
  const replyForm = commentElement.querySelector(".reply-form");

  if (!replyForm) {
    button.innerHTML = `<i class="las la-times"></i> cancel`;
    displayReplyForm(commentId, commentElement);
  } else {
    button.innerHTML = `<i class="las la-reply"></i> reply`;
    commentElement.removeChild(replyForm);
  }
}

function displayReplyForm(parentCommentId, commentElement) {
  const replyForm = document.createElement("form");
  replyForm.className = "reply-form";
  replyForm.innerHTML = `
    <textarea class="reply-textarea" rows="4" required></textarea>
    <button type="submit">Add reply</button>
  `;

  replyForm.setAttribute("data-parent-id", parentCommentId);
  replyForm.addEventListener("submit", handleReplyFormSubmit);
  commentElement.appendChild(replyForm);
  replyForm.style.display = "flex";
}

function handleReplyFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const parentCommentId = form.getAttribute("data-parent-id");
  const replyTextarea = form.querySelector(".reply-textarea");
  const replyContent = replyTextarea.value;

  addComment(parentCommentId, replyContent);

  replyTextarea.value = "";
  form.style.display = "none";
}

const postToRender = getPostFromUrl();
if (postToRender) {
  renderPostDetail(postToRender);
  renderComments(postToRender.comments, commentsContainer);
} else {
  renderPosts(posts);
}