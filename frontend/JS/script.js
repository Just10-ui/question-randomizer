const add = document.getElementById('addTest');
const delBtn = document.querySelectorAll('.deleteTest');

add.addEventListener('click', addTest);

async function getTest() {
  try {
    const response = await fetch('http://localhost:8080/api/test');
    const data = await response.json();
    const container = document.querySelector('.container');
    container.innerHTML = '';
    const addBtn = document.createElement('button');
    addBtn.id = 'testForm';
    addBtn.setAttribute('popovertarget', 'addTest-form');
    container.append(addBtn);

    data.forEach(value => {
      addBtn.innerText = 'Add';
      const header = document.createElement('h1');
      header.innerText = value.test_name.toUpperCase();
      const divCont = document.createElement('div');
      divCont.className = 'content';
      const divBut = document.createElement('div');
      divBut.className = 'buttons';
      const editBtn = document.createElement('button');
      editBtn.id = value.test_id;
      editBtn.className = 'editTest';
      editBtn.innerText = 'Edit';
      editBtn.addEventListener('click', editTest);
      const delBtn = document.createElement('button');
      delBtn.id = value.test_id;
      delBtn.className = 'deleteTest';
      delBtn.innerText = 'Delete';
      delBtn.addEventListener('click', deleteTest);

      divBut.append(editBtn, delBtn);
      divCont.append(header, divBut);
      container.append(divCont);
  });
  } catch (error) {
    console.log(error);
  }
}
getTest();

async function addTest() {
  const test_name = document.getElementById('nameTest').value.toUpperCase();
  try {
    const response = await fetch('http://localhost:8080/api/test/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test_name: test_name
      })
    })
    const data = await response.json();
    window.alert(data.message);
    document.getElementById('nameTest').value = '';
    getTest();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTest(event) {
  const id = event.currentTarget.id;
  try {
    const response = await fetch(`http://localhost:8080/api/test/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    window.alert(data.message);
    getTest();
  } catch (error) {
    console.log(error);
  }
}

async function editTest(event) {
  const id = event.currentTarget.id;
  const newName = prompt('Enter a new name');
  if (!newName) return;

  try {
    const response = await fetch(`http://localhost:8080/api/test/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test_name: newName.toUpperCase()
      })
    });
    const data = await response.json();
    window.alert(data.message);
    getTest();
  } catch (error) {
    console.log(error);
  }
}