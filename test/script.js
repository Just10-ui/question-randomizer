const delBtn = document.querySelectorAll('.delete');

delBtn.forEach(value => {
  value.addEventListener('click', del);
});

function del(event) {
  const id = event.currentTarget.id;
  console.log(id);
}