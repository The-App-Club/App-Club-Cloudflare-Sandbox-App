import Parser from 'rss-parser';
import { dressUpNotifyTemplate } from '../plugins/format';
import { getThumbnailImageURL } from '../plugins/image';
import { doQuery } from '../plugins/query';

const storeSomethingInfoToFauna = async (request) => {
  // https://github.com/kwhitley/itty-router/blob/v2.x/README.md#3-handle-incoming-requests
  const { params, query } = request;
  const parser = new Parser({
    customFields: {
      item: [['enclosure', { keepArray: true }]],
    },
  });
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      query.feedURL
    )}`
  );
  const feed = await response.json();
  const feedInfo = {
    rssInfoList: feed.items.map((item) => {
      return {
        title: item.title,
        publishedAt: item.pubDate,
        publicURL: item.link,
        categories: item.categories ? item.categories : [],
        description: item.contentSnippet
          ? item.contentSnippet.replace(/\n/g, '').slice(0, 140) + '...'
          : 'nothing description',
        thumbnail: getThumbnailImageURL(item['content:encoded']),
      };
    }),
    title: feed.title || `Todays CowBoy Bebop News`,
    description:
      feed.description || `Broadcast Nice Web Tips And Tech Info etc...`,
  };

  const result = await doQuery({ willLoadedData: feedInfo });

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

export { storeSomethingInfoToFauna };
