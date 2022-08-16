import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Delete(q.Function('UpdateCategory')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
