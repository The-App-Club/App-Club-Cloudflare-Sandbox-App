import { client, q } from './config';

const uniq = (itemInfoList) => {
  return [
    ...new Map(
      itemInfoList.map((itemInfo) => {
        return [itemInfo.title, itemInfo];
      })
    ).values(),
  ];
};

(async () => {
  try {
    let response;
    const { data } = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Notify'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    const rssInfoList = uniq(
      data
        .map((item) => {
          return item.data.rssInfoList;
        })
        .flat()
    );
    response = await client.query(
      q.Map(
        rssInfoList,
        q.Lambda('rss', q.Create(q.Collection('Rss'), { data: q.Var('rss') }))
      )
    );
  } catch (error) {
    console.log(error);
  }
})();
