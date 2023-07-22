import { TIMEOUT_SECONDS } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    let req = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    let data = await req.json();

    if (!req.ok) throw new Error(`${err.message} ${err.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const setJSON = async function (url, reqBody) {
  try {
    console.log('requestBody', reqBody);
    let fetchData = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    let req = await Promise.race([fetchData, timeout(TIMEOUT_SECONDS)]);
    let data = await req.json();

    if (!req.ok) throw new Error(`Can not send the POST req`);
    return data;
  } catch (err) {
    throw err;
  }
};
