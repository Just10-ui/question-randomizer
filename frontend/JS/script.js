const enter = document.getElementById('enter');

enter.addEventListener('click', addTest);

async function viewTest() {
  const container = document.querySelector('.test-container');
  container.innerHTML = '';

  try {
    const response = await fetch('http://localhost:8080/api/test');
    const data = await response.json();
    data.test.forEach(value => {
      const card = document.createElement('div');
      card.className = 'test-card';
      card.id = value.test_id;
      card.addEventListener('click', () => goToQuestions(card.id));
      const h1 = document.createElement('h1');
      h1.innerText = value.test_name;
      const buttons = document.createElement('div');
      buttons.className = 'buttons';
      const editBtn = document.createElement('button');
      editBtn.className = 'editBtn';
      editBtn.innerText = 'Edit';
      editBtn.id = value.test_id;
      editBtn.addEventListener('click', editTest);
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'deleteBtn';
      deleteBtn.innerText = 'Delete';
      deleteBtn.id = value.test_id;
      deleteBtn.addEventListener('click', deleteTest);

      buttons.append(editBtn, deleteBtn);
      card.append(h1, buttons);
      container.append(card);
    });
  } catch (error) {
    console.log(error);
  }
}
viewTest();

async function addTest() {
  const nameTest = document.getElementById('test-name').value;
  try {
    const response = await fetch('http://localhost:8080/api/test/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        testName: nameTest
      })
    });
    const data = await response.json();
    document.getElementById('test-name').value = '';
    window.alert(data.message);
    viewTest();
  } catch (error) {
    console.log(error);
  }
}

async function editTest(event) {
  event.stopPropagation();
  const clickedBtn = event.currentTarget;
  const id = event.currentTarget.id;
  const testText = clickedBtn.closest('.test-card').querySelector('h1').innerText;
  const update = window.prompt('Edit name', testText);

  if (update == null || update.trim() == '') {
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/test/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ testName: update })
    });
    const data = await response.json();
    window.alert(data.message);
    viewTest();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTest(event) {
  event.stopPropagation();
  const id = event.currentTarget.id;
  const testName = event.currentTarget.closest('.test-card').querySelector('h1').innerText;
  const confirmDel = window.confirm(`Delete ${testName}`);

  if (!confirmDel) return;

  try {
    const response = await fetch(`http://localhost:8080/api/test/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    window.alert(data.message);
    viewTest();
  } catch (error) {
    console.log(error);
  }
}

function goToQuestions(testId) {
  window.location.href = `question.html?test_id=${testId}`;
}