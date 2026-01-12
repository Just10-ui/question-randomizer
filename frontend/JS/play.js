const params = new URLSearchParams(window.location.search);
const testId = params.get('test_id');
const refresh = document.getElementById('refresh');
const next = document.getElementById('next');
const prev = document.getElementById('back');
let index = 0;

refresh.addEventListener('click',shuffleQuestion);
next.addEventListener('click', nextQ);
prev.addEventListener('click', prevQ);

async function shuffleQuestion() {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  index = 0;
  
  try {
    const response = await fetch(`http://localhost:8080/api/questions/${testId}/shuffle`);
    const data = await response.json();
    data.result.forEach((val, i) => {
      const p = document.createElement('p');
      p.innerText = val.description;
      p.style.display = i === 0 ? 'block' : 'none';
      container.append(p);
    });
  } catch (error) {
    console.log(error);
  }
}
shuffleQuestion();

function nextQ() {
  const p = document.querySelectorAll('.container p');
  if(index < p.length - 1 >= index) {
    p[index].style.display = 'none';
    index += 1;
    p[index].style.display = 'block';
  }
}

function prevQ() {
  const p = document.querySelectorAll('.container p');
  if(index > 0) {
    p[index].style.display = 'none';
    index -= 1;
    p[index].style.display = 'block';
  }
}