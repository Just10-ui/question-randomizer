const params = new URLSearchParams(window.location.search);
const testId = params.get("test_id");
const enter = document.getElementById('enter');

enter.addEventListener('click', addQuestion);

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
      const delBtn = document.createElement('button');
      delBtn.innerText = 'Delete';
      delBtn.className = 'deleteBtn';
      delBtn.id = val.question_id;

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