import { client, q } from './config';

const search = ({ searchTerm }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index('all_Rss_by_title_split'), searchTerm)),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      );
      const resultInfoList = data.map((item) => {
        return item.data;
      });

      resolve(resultInfoList);
    } catch (error) {
      reject(error);
    }
  });
};

const searchWithCategory = ({ categoryName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index('all_Rss_by_categories'), categoryName)),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      );
      const resultInfoList = data.map((item) => {
        return item.data;
      });
      resolve(resultInfoList);
    } catch (error) {
      reject(error);
    }
  });
};

export { search, searchWithCategory };
