import { client, q } from './config';
const clean = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await client.query(q.Delete(q.Index('all_Rss_by_title')));
      await client.query(q.Delete(q.Index('all_Rss_by_title_split')));
      await client.query(q.Delete(q.Collection('Rss')));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export { clean };
