import { patch } from '../fauna/patch';
const patchSomethingInfoToFauna = async (request) => {
  await patch();

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

export { patchSomethingInfoToFauna };
