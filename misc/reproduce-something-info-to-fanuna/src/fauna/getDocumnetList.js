import { client, q } from './config';

(async () => {
  try {
    const { data } = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Rss'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
