import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Delete(q.Index('all_Rss_by_title')));
    response = await client.query(q.Delete(q.Index('all_Rss_by_categories')));
    response = await client.query(q.Delete(q.Index('all_Rss_by_title_split')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
