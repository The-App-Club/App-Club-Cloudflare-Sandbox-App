import { client, q } from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateFunction({
        name: 'UpdateCategory',
        body: q.Query(
          q.Lambda(
            'categoryName',
            q.Map(
              q.Paginate(
                q.Match(
                  q.Index('all_Rss_by_title_split'),
                  q.LowerCase(q.Var('categoryName'))
                )
              ),
              q.Lambda(
                'X',
                q.Update(
                  q.Select(['ref'], q.Get(q.Var('X'))),
                  q.Merge(q.Get(q.Var('X')), {
                    data: {
                      categories: q.Distinct(
                        q.Append(
                          q.Select(['data', 'categories'], q.Get(q.Var('X'))),
                          [q.LowerCase(q.Var('categoryName'))]
                        )
                      ),
                    },
                  })
                )
              )
            )
          )
        ),
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
