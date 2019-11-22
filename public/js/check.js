function check(e) {
  console.log(e.id); // debug
  const msg = document.getElementById('msg');
  if (e.value == 'true')
    msg.innerHTML = 'Correcta!';
  else
    msg.innerHTML = 'Incorrecta'
  setTimeout(() => { window.location.replace('/play') }, 1500)  
  // TODO: actualizar el historial del usuario
}
