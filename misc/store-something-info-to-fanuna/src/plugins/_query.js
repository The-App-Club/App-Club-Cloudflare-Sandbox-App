import 'isomorphic-fetch';
import { GraphQLClient, gql } from 'graphql-request';
// https://community.cloudflare.com/t/xmlhttprequest-is-not-defined/133866/2

const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${FAUNA_DB_SERVER_KEY}`,
  },
});

const doQuery = ({ willLoadedData }) => {
  const q = gql`
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

  return new Promise(async (resolve, reject) => {
    try {
      const data = await graphQLClient.request(q, { data: willLoadedData });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export { doQuery };
