import { client, q } from './config';

const patch = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('Notify'))),
          q.Lambda(
            'X',
            q.Update(
              q.Select(['ref'], q.Get(q.Var('X'))),
              q.Merge(q.Get(q.Var('X')), {
                data: {
                  rssInfoList: q.Map(
                    q.Select(['data', 'rssInfoList'], q.Get(q.Var('X'))),
                    q.Lambda(
                      'rssInfo',
                      q.Merge(q.Var('rssInfo'), {
                        categories: q.Map(
                          q.Select(['categories'], q.Var('rssInfo')),
                          q.Lambda('category', q.LowerCase(q.Var('category')))
                        ),
                      })
                    )
                  ),
                },
              })
            )
          )
        )
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export { patch };
