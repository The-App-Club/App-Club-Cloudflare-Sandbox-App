import { client, q } from './config';

function Split(str, sep) {
  return q.Map(
    q.FindStrRegex(str, q.Concat(['[^\\', sep, ']+'])),
    q.Lambda('X', q.Select(['data'], q.Var('X')))
  );
}

const produce = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await client.query(q.CreateCollection({ name: 'Rss' }));

      const { data } = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('Notify'))),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      );

      const rssInfoList = data
        .map((item) => {
          return item.data.rssInfoList;
        })
        .flat();

      await client.query(
        q.Map(
          rssInfoList,
          q.Lambda('rss', q.Create(q.Collection('Rss'), { data: q.Var('rss') }))
        )
      );

      await client.query(
        q.CreateIndex({
          name: 'all_Rss_by_title',
          source: q.Collection('Rss'),
          terms: [{ field: ['data', 'title'] }],
        })
      );
      await client.query(
        q.CreateIndex({
          name: 'all_Rss_by_categories',
          source: q.Collection('Rss'),
          terms: [{ field: ['data', 'categories'] }],
        })
      );
      await client.query(
        q.CreateIndex({
          name: 'all_Rss_by_title_split',
          source: {
            collection: q.Collection('Rss'),
            fields: {
              qDex: q.Query(
                q.Lambda(
                  'doc',
                  Split(q.Select(['data', 'title'], q.Var('doc')), ' ')
                )
              ),
            },
          },
          terms: [{ binding: 'qDex' }],
        })
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export { produce };
