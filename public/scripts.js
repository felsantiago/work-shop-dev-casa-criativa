function onOff() {
  document.querySelector('#modal').classList.toggle('hide');

  document.querySelector('body').classList.toggle('hideScroll');

  document.querySelector('#modal').classList.toggle('addScroll');
}

function onDelete(event) {
  const id = event.getAttribute('data-id');
  const form = document.createElement('form');
  form.id = 'fom_delete';
  form.action = `/${id}?_method=DELETE`;
  form.method = 'post';

  document.body.append(form);

  form.submit();

  event.remove();
}

function checkFields(event) {
  const valueToCheck = ['title', 'image', 'category', 'description', 'link'];

  const isEmpty = valueToCheck.find(function (value) {
    const checkIfIsString = typeof event.target[value].value === 'string';
    const checkIfIsEmpty = !event.target[value].value.trim();

    if (checkIfIsString && checkIfIsEmpty) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();
    alert('Por favor, preencha todos os campos');
  }
}
