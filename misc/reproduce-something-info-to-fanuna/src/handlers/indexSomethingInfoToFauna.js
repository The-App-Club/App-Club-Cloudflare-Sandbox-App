import { produce } from '../fauna/produce';
const indexSomethingInfoToFauna = async (request) => {
  await produce();

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

export { indexSomethingInfoToFauna };
