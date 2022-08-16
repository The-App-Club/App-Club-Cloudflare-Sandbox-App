import 'isomorphic-fetch';
import { createClient } from '@urql/core';
const CowboyBebop = async (request) => {
  const client = createClient({
    url: 'https://graphql.fauna.com/graphql',
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${FAUNA_DB_SERVER_KEY}`,
        },
      };
    },
  });
  const doQuery = ({ q }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await client.query(q).toPromise();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  const result = await doQuery({q: `
    query FindAllTodos {
      allTodos {
        data {
          _id
          title
          completed
        }
      }
    }
  `});
  const body = JSON.stringify(result);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export { CowboyBebop };
