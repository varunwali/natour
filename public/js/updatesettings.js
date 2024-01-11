/* eslint-disable */
// Wrap your code in an event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };

  const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
  };

  // type is either 'password' or 'data'
  const updateSettings = async (data, type) => {
    try {
      const url =
        type === 'password'
          ? 'https://natour-production.up.railway.app/api/v1/users/updateMyPassword'
          : 'https://natour-production.up.railway.app/api/v1/users/updateMe';

      const res = await axios({
        method: 'PATCH',
        url,
        data
      });

      if (res.data.status === 'success') {
        showAlert('success', `${type.toUpperCase()} updated successfully!`);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  const userDataForm = document.querySelector('.form-user-data');
  const userPasswordForm = document.querySelector('.form-user-password');

  if (userDataForm)
    userDataForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      await updateSettings({ name, email }, 'data');
    });

  if (userPasswordForm)
    userPasswordForm.addEventListener('submit', async e => {
      e.preventDefault();
      document.querySelector('.btn--save-password').textContent = 'Updating...';

      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password'
      );

      document.querySelector('.btn--save-password').textContent =
        'Save password';
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
    });
});
