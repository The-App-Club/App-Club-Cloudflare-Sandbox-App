import cheerio from 'cheerio';

const getThumbnailImageURL = (domText) => {
  if (domText) {
    const $ = cheerio.load(domText);
    return $(`img`).attr('src');
  }
  return `https://media1.giphy.com/media/3TACspcXhhQPK/giphy.gif`;
};

export { getThumbnailImageURL };
