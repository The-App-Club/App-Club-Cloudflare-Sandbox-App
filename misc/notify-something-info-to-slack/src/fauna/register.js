import { client, q } from './config';

const register = ({ categoryName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await client.query(q.Call(q.Function('UpdateCategory'), categoryName));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export { register };
