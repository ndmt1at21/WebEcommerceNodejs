import axios from 'axios';
import { showAlert } from './alert';

// type: 'info', 'password'
export const updateSetting = async (form, type) => {
  const urlApi =
    type === 'info' ? '/api/v1/user/updateMe' : '/api/v1/user/updatePassword';

  try {
    const res = await axios({
      method: 'PATCH',
      url: urlApi,
      data: form
    });

    if (res.data.status == 'success') {
      showAlert('success', 'Cập nhật thông tin thành công');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    // showAlert('error', error.data.message);
  }
};
