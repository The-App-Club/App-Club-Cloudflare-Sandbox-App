addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

// cloud pagesにデプロイしたURLをリラックス対象に含める
const allowedOrigins = ['https://hogehoge.pages.dev', 'http://localhost:3000'];

const corsHeaders = (origin) => {
  return {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': origin,
  };
};

const checkOrigin = (request) => {
  const origin = request.headers.get('Origin');
  const foundOrigin = allowedOrigins.find((allowedOrigin) => {
    return allowedOrigin.includes(origin);
  });
  if (foundOrigin) {
    return foundOrigin;
  } else {
    return allowedOrigins[0];
  }
};

const getImages = async (request) => {
  const { query } = await request.json();
  // https://unsplash.com/documentation#search-photos
  const resp = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    }
  );

  const data = await resp.json();

  const images = data.results.map((item) => {
    return {
      id: item.id,
      image: item.urls.small,
      link: item.links.html,
    };
  });

  const allowedOrigin = checkOrigin(request);
  return new Response(JSON.stringify(images), {
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders(allowedOrigin),
    },
  });
};

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    const allowedOrigin = checkOrigin(request);
    return new Response('OK', { headers: corsHeaders(allowedOrigin) });
  }

  if (request.method === 'POST') {
    return getImages(request);
  }
}
