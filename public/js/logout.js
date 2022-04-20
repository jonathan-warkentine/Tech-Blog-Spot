const logout = async () => {
    const response = await fetch('../api/users/logout', {
    });
  
    if (!response.ok) {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  