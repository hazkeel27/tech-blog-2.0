const savePostHandler = async (event) => {  
    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    console.log(title);
    console.log(body);
  
    if (title && body) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to save post');
      }
    }
  };
  
  // Add an event listener for the save new post button
  document.querySelector('#post-btn').addEventListener('click', savePostHandler);