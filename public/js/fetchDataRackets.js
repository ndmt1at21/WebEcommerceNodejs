import axios from 'axios';

export const fetchDataRackets = async (IDs) => {
  if (IDs.length === 0) return [];

  const url = `/api/v1/racket`;

  let query = '';
  IDs.map((id) => {
    if (!query) query = id;
    else query += `,${id}`;
  });

  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url + query
    })
      .then((res) => resolve(res.data.data.rackets))
      .catch((err) => reject(console.log(err)));
  });
};
