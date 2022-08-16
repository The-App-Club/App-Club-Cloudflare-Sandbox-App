import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Delete(q.Collection('Rss')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
