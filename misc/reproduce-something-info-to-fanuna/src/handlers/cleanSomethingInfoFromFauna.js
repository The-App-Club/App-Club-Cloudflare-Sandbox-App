import { clean } from '../fauna/clean';
const cleanSomethingInfoFromFauna = async (request) => {
  await clean();

  const body = JSON.stringify({
    status: 0,
    message: `something ok`,
  });
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export { cleanSomethingInfoFromFauna };
