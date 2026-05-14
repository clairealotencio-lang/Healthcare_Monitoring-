function handleLogin() {
  const email = document.querySelector('input[type="email"]').value.trim();
  const pass  = document.querySelector('input[type="password"]').value;

  if (!email || !pass) {
    alert('Please enter your email and password.');
    return;
  }

  // TODO: connect to your PHP backend
  // Example fetch call:
  // const formData = new FormData();
  // formData.append('email', email);
  // formData.append('password', pass);
  // fetch('login.php', { method: 'POST', body: formData })
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.success) window.location.href = 'dashboard.php';
  //     else alert(data.message);
  //   });

  alert('Login submitted! Connect this to your PHP backend.');
}

// Allow Enter key to trigger login
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') handleLogin();
});