function chequearRespuesta(e) {
  if (e.value == 'true') {
    console.log('bien');
    e.style.backgroundColor = 'green';
  } else {
    console.log('mal');
    e.style.backgroundColor = 'red';
  }

}
