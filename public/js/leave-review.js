import axios from 'axios';
import { showAlert } from './alert';

export const sendReview = async (star, title, content, racketID) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/racket/${racketID}/review`,
      data: {
        rating: star,
        title,
        content
      }
    });
    showAlert('success', 'Đăng nhận xét thành công');
  } catch (err) {
    console.log(err);
    showAlert('error', 'Không thể đăng nhận xét ngay lúc này!');
  }
};
