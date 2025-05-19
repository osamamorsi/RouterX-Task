// Try to detect the router IP based on common local gateways
const ipSpan = document.getElementById('ip');
const openBtn = document.getElementById('openRouter');

const commonIPs = ['192.168.1.1', '192.168.0.1', '192.168.8.1'];

function testIP(index = 0) {
  if (index >= commonIPs.length) {
    ipSpan.textContent = 'Not detected';
    return;
  }

  const img = new Image();
  img.onload = () => {
    ipSpan.textContent = commonIPs[index];
    openBtn.dataset.ip = commonIPs[index];
  };
  img.onerror = () => {
    testIP(index + 1);
  };
  img.src = `http://${commonIPs[index]}/favicon.ico?${Date.now()}`;
}

testIP();

openBtn.addEventListener('click', () => {
  const ip = openBtn.dataset.ip;
  if (ip) {
    const confirmOpen = confirm(`Open router page at http://${ip}?`);
    if (confirmOpen) {
      window.open(`http://${ip}`, '_blank');
    }
  } else {
    alert("Router IP not detected.");
  }
});
function navigate(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById('main-content').innerHTML = data;
    });
}