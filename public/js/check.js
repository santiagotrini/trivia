function check(e) {
  const questionId = document.getElementById('question').innerHTML;
  const userId = document.getElementById('user').innerHTML;
  console.log(questionId); // debug
  console.log(userId); // debug
  console.log(e.id); // debug
  const msg = document.getElementById('msg');
  let isRight = 0;
  if (e.value == 'true') {
    msg.innerHTML = 'Correcta!';
    isRight = 1;
  }
  else
    msg.innerHTML = 'Incorrecta'

  // actualizar el historial del usuario
  const data = {
    question: questionId,
    isRight: isRight
  };
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const url = `/api/user/${userId}`;
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log(json); // debug
    });

  // proxima pregunta
  setTimeout(() => { window.location.replace('/play') }, 1500)
}
