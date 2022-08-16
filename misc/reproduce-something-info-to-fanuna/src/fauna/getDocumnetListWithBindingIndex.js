import { client, q } from './config';

(async () => {
  try {
    let response;
    const { data } = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_Rss_by_title_split'), 'Next')),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    const resultInfoList = data.map((item) => {
      return item.data;
    });
    console.log(resultInfoList);
  } catch (error) {
    console.log(error);
  }
})();
