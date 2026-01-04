const addTest = document.getElementById('addTest');

addTest.addEventListener('click', addTests);

function addTests() {
  const container = document.querySelector('.test-cont');
  const header = document.createElement('h1');
  header.innerText = 'Test';
  const div = document.createElement('div');
  div.className = 'content';
  div.append(header);
  container.append(div);
};