import 'isomorphic-fetch';

const query = `
mutation addItem($data: NotifyInput!) {
  createNotify(data: $data) {
    title
    description
    rssInfoList {
      ago
      description
      publicURL
      publishedAt
      thumbnail
      title
      categories
    }
  }
}
`;

const doQuery = ({ willLoadedData }) => {
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
          variables: {
            data: willLoadedData,
          },
        }),
      });
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

export { doQuery };
