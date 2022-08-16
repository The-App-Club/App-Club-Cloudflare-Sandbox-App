import 'isomorphic-fetch';
import { timeAgo, coolSort, coolSortDesc } from './time';

const query = `
# Write your query or mutation here
query a {
  getNotifyInfoList {
    data {
      title
      description
      rssInfoList {
        title
        description
        publicURL
        thumbnail
        categories
        publishedAt
      }
    }
  }
}
`;

const doQuery = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://graphql.fauna.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${FAUNA_DB_SERVER_KEY}`,
        },
        body: JSON.stringify({
          query,
        }),
      });
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

const coolFetch = async () => {
  const { data } = await doQuery();
  const filteredRssInfoList = data.getNotifyInfoList.data
    .map((item) => {
      return item.rssInfoList;
    })
    .flat()
    .map((item) => {
      return {
        ...item,
        ago: timeAgo(item.publishedAt),
      };
    });
  coolSortDesc(filteredRssInfoList, 'publishedAt');
  return filteredRssInfoList;
};

export { coolFetch };
