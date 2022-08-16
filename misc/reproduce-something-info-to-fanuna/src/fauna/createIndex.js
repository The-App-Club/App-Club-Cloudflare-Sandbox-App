import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'all_Rss_by_title',
        source: q.Collection('Rss'),
        terms: [{ field: ['data', 'title'] }],
      })
    );
    response = await client.query(
      q.CreateIndex({
        name: 'all_Rss_by_categories',
        source: q.Collection('Rss'),
        terms: [{ field: ['data', 'categories'] }],
      })
    );
  } catch (error) {
    console.log(error);
  }
})();
