async function getTestName() {
  const params = new URLSearchParams(window.location.search);
  const testId = params.get("test_id");
  const container = document.querySelector('.container');
  container.innerHTML = '';

  try {
    const response = await fetch(`http://localhost:8080/api/test/${testId}`);
    const data = await response.json();
    data.forEach(val => {
      const h1 = document.createElement('h1');
      h1.innerText = val.test_name;
      container.append(h1);
    });
  } catch (error) {
    console.log(error);
  }
};
getTestName();