const saveCommentHandler = async (event) => {
    // Get the comment text from the textarea
    const body = document.querySelector('#comment-textarea').value;

    // Clear the textarea
    document.getElementById('comment-textarea').value = '';

    if (body) {
        if (event.target.hasAttribute('post-id')) {
            const id = event.target.getAttribute('post-id');
        
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/comment/${id}`, {
                method: 'POST',
                body: JSON.stringify({ body }),
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
                // If successful, redirect the browser to the same post page
                document.location.replace(`/${id}`);
            } else {
                alert('Failed to save comment');
            }
        }
    }
  };
  
  // Add an event listener for the "Save Comment" button
  document.querySelector('#comment-btn').addEventListener('click', saveCommentHandler);