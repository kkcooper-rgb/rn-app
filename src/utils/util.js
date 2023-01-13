export function request(url, params, method = 'GET') {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(rej => {
        reject(rej);
      });
  });
}
