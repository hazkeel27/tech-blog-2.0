const updatePostHandler = async (event) => {  
    const title = document.querySelector('#update-post-title').value;
    const body = document.querySelector('#update-post-body').value;

  if (title && body) {
    if (event.target.getAttribute('update-post')) {
      const id = event.target.getAttribute('update-post');

      const response = await fetch(`/api/post/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, body }),
          headers: {
          'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(`Failed to update post: ${response.error}`);
      }
    }
  }
};

const deletePostHandler = async (event) => {
  if (event.target.hasAttribute('delete-post')) {
    const id = event.target.getAttribute('delete-post');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};
  
// Add an event listener for the update post button
document.querySelector('#update-post-btn').addEventListener('click', updatePostHandler);

// Add an event listener for the delete post button
document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler);