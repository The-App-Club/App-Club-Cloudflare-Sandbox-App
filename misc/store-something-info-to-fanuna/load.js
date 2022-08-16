import data from './load.json';
import { GraphQLClient, gql } from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();

const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_DB_SERVER_KEY}`,
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

(async () => {
  const result = await doQuery({ willLoadedData: data });
  console.log(JSON.stringify(result, null, 2));
})();
