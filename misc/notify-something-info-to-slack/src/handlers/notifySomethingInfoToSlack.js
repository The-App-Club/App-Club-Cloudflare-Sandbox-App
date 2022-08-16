import Parser from 'rss-parser';
import { timeAgo, convertToJapanTime } from '../plugins/time';
import { dressUpNotifyTemplate } from '../plugins/format';
import { getThumbnailImageURL } from '../plugins/image';
import { search, searchWithCategory } from '../fauna/search';
import { register } from '../fauna/register';

// https://gist.github.com/SauloSilva/9771598
Array.prototype.eachSlice = function (size) {
  this.arr = [];
  for (var i = 0, l = this.length; i < l; i += size) {
    this.arr.push(this.slice(i, i + size));
  }
  return this.arr;
};

const notifySomethingInfoToSlack = async (request) => {
  const { params, query } = request;
  let rssInfoList = [];
  if ('categoryName' in query) {
    rssInfoList = await searchWithCategory({
      categoryName: query.categoryName,
    });
  }
  if ('searchTerm' in query) {
    rssInfoList = await search({ searchTerm: query.searchTerm });
  }
  const groupedResultInfo2DList = rssInfoList.eachSlice(5);
  for (let i = 0; i < groupedResultInfo2DList.length; i++) {
    const groupedResultInfoList = groupedResultInfo2DList[i];

    const blockInfoList = [];

    blockInfoList.push({
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${`📰Todays CowBoy Bebop News`}`,
        emoji: true,
      },
    });

    for (let j = 0; j < groupedResultInfoList.length; j++) {
      const groupedResultInfo = groupedResultInfoList[j];

      const cacheedPublishedAt = groupedResultInfo.publishedAt;
      Object.assign(groupedResultInfo, {
        publishedAt: convertToJapanTime(groupedResultInfo.publishedAt),
      });

      Object.assign(groupedResultInfo, {
        ago: `${timeAgo(cacheedPublishedAt)} ago`,
      });

      blockInfoList.push(dressUpNotifyTemplate(groupedResultInfo));
      blockInfoList.push({
        type: 'divider',
      });
    }

    const notifySlackMessage = {
      blocks: blockInfoList,
    };

    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(notifySlackMessage),
    });
  }

  if (rssInfoList.length > 0) {
    if ('categoryName' in query) {
      await register({ categoryName: query.categoryName });
    }
    if ('searchTerm' in query) {
      await register({ categoryName: query.searchTerm });
    }
  }

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

export { notifySomethingInfoToSlack };
