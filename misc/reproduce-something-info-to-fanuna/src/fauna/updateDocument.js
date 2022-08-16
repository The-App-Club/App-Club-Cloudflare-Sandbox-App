import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_Rss_by_title_split'), 'Shopify')),
        q.Lambda(
          'X',
          q.Update(
            q.Select(['ref'], q.Get(q.Var('X'))),
            q.Merge(q.Get(q.Var('X')), {
              data: {
                categories: q.Distinct(
                  q.Append(
                    q.Select(['data', 'categories'], q.Get(q.Var('X'))),
                    ['Shopify']
                  )
                ),
              },
            })
          )
        )
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
