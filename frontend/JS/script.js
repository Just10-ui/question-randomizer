const addTest = document.getElementById('addTest');

addTest.addEventListener('click', addTests);

function addTests() {
  const container = document.querySelector('.container');
  const test = document.getElementById('nameTest').value;
  const header = document.createElement('h1');
  header.innerText = test.toUpperCase();
  const divCont = document.createElement('div');
  divCont.className = 'content';
  const divBut = document.createElement('div');
  divBut.className = 'buttons';
  const editBtn = document.createElement('button');
  editBtn.id = 'editTest';
  editBtn.innerText = 'Edit';
  const delBtn = document.createElement('button');
  delBtn.id = 'deleteTest';
  delBtn.innerText = 'Delete';

  divBut.append(editBtn, delBtn);
  divCont.append(header, divBut);
  container.append(divCont);
};

async function getTest() {
  try {
    const response = await fetch('http://localhost:8080/api/test');
    const data = await response.json();

    data.forEach(value => {
      const container = document.querySelector('.container');
      const header = document.createElement('h1');
      header.innerText = value.test_name.toUpperCase();
      const divCont = document.createElement('div');
      divCont.className = 'content';
      const divBut = document.createElement('div');
      divBut.className = 'buttons';
      const editBtn = document.createElement('button');
      editBtn.id = 'editTest';
      editBtn.innerText = 'Edit';
      const delBtn = document.createElement('button');
      delBtn.id = 'deleteTest';
      delBtn.innerText = 'Delete';
      
      divBut.append(editBtn, delBtn);
      divCont.append(header, divBut);
      container.append(divCont);
  });
  } catch (error) {
    console.log(error);
  }
}
getTest();