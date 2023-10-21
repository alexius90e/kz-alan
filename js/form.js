const applyParticipationForm = document.getElementById('applyParticipationForm');

applyParticipationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const stadium = form.get('stadium');
  const balanceHolder = form.get('balanceHolder');
  const fieldSize = form.get('fieldSize');
  const address = form.get('address');
  const contacts = form.get('contacts');

  event.currentTarget.reset();

  fetch('../contact-form-handler.php', {
    method: 'POST',
    data: { stadium, balanceHolder, fieldSize, address, contacts },
  })
    .then(() => console.log('success'))
    .catch(() => console.log('error'));
});
