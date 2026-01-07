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
      const h1 = document.createElement('h1');
      h1.innerText = value.test_name;
      const buttons = document.createElement('div');
      buttons.className = 'buttons';
      const editBtn = document.createElement('button');
      editBtn.className = 'editBtn';
      editBtn.innerText = 'Edit';
      editBtn.id = value.test_id;
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'deleteBtn';
      deleteBtn.innerText = 'Delete';
      deleteBtn.id = value.test_id;

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