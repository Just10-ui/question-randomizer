const params = new URLSearchParams(window.location.search);
const testId = params.get("test_id");
const enter = document.getElementById('enter');
const play = document.getElementById('play');

enter.addEventListener('click', addQuestion);
play.addEventListener('click', () => playQ(testId));

async function getTestName() {
  const container = document.querySelector('.container');
  const h1 = container.querySelector('h1');
  h1.innerText = '';

  try {
    const response = await fetch(`http://localhost:8080/api/test/${testId}`);
    const data = await response.json();
    data.forEach( val => {
      h1.innerText = val.test_name;
    });
  } catch (error) {
    console.log(error);
  }
};
getTestName();

async function viewQuestions() {
  const container = document.querySelector('.content');
  container.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:8080/api/questions/${testId}`);
    const data = await response.json();
    data.result.forEach( val => {
      const card = document.createElement('div');
      card.className = 'qCard';
      const description = document.createElement('p');
      description.innerText = val.description;
      const buttons = document.createElement('div');
      buttons.className = 'buttons';
      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      editBtn.className = 'editBtn';
      editBtn.id = val.question_id;
      editBtn.addEventListener('click', editQuestion);
      const delBtn = document.createElement('button');
      delBtn.innerText = 'Delete';
      delBtn.className = 'deleteBtn';
      delBtn.id = val.question_id;
      delBtn.addEventListener('click', deleteQuestion);

      buttons.append(editBtn, delBtn);
      card.append(description, buttons);
      container.append(card);
    })
  } catch (error) {
    console.log(error);
  }
}
viewQuestions();

async function addQuestion() {
  const text = document.getElementById('question-name').value;

  try {
    const response = await fetch(`http://localhost:8080/api/questions/add/${testId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: text
      })
    });
    const data = await response.json();
    window.alert(data.message);
    viewQuestions();
  } catch (error) {
    console.log(error);
  }
}

async function editQuestion(event) {
  event.stopPropagation();
  const clickedBtn = event.currentTarget;
  const id = event.currentTarget.id;
  const text = clickedBtn.closest('.qCard').querySelector('p').innerText;
  const update = window.prompt('Edit name', text);

  if (update == null || update.trim() == '') {
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: update })
    });
    const data = await response.json();
    window.alert(data.message);
    viewQuestions();
  } catch (error) {
    console.log(error);
  }
}

async function deleteQuestion(event) {
  event.stopPropagation();
  const id = event.currentTarget.id;
  const confirmDel = window.confirm('Delete this question?');

  if (!confirmDel) return;

  try {
    const response = await fetch(`http://localhost:8080/api/questions/delete/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    window.alert(data.message);
    viewQuestions();
  } catch (error) {
    console.log(error);
  }
}

function playQ(id) {
  window.location.href = `play.html?test_id=${id}`;
}