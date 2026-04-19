function showLoader(destination) {
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `
    <div class="loader-content">
      <p class="loader-text">LOADING...</p>
      <div class="loader-track">
        <div class="loader-bar" id="loader-bar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loader);

  let progress = 0;
  const bar = document.getElementById('loader-bar');

  const interval = setInterval(() => {
    progress += 2;
    bar.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.location.href = destination;
      }, 200);
    }
  }, 25);
}