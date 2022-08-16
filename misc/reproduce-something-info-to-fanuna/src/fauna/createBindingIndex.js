import { client, q } from './config';
// https://fauna.com/blog/applying-test-driven-development-to-your-database

function Split(str, sep) {
  return q.Map(
    q.FindStrRegex(str, q.Concat(['[^\\', sep, ']+'])),
    q.Lambda('X', q.Select(['data'], q.Var('X')))
  );
}

(async () => {
  try {
    let response;
    response = await client.query(
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
