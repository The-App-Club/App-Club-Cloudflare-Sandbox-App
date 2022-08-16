import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('all_Rss_by_title'),
            'Usage of the nearest server in cloud functions'
          )
        ),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    console.log(response);
    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_Rss_by_categories'), 'Shopify')),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
})();
