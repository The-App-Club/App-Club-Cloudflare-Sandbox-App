const dressUpNotifyTemplate = (targetItem) => {
  const {
    categories,
    title,
    publicURL,
    description,
    publishedAt,
    thumbnail,
    ago,
  } = {
    ...targetItem,
  };
  const notifyTemplate = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${title}*\n${description}\n${publicURL}`,
    },
    accessory: {
      type: 'image',
      image_url: thumbnail,
      alt_text: ' ',
    },
    fields: [
      {
        type: 'mrkdwn',
        text: `*publishedAt*\n${publishedAt}`,
      },
      {
        type: 'mrkdwn',
        text: `*before*\n${ago}`,
      },
      {
        type: 'mrkdwn',
        text: `*categories*\n${categories}`,
      },
    ],
  };

  return notifyTemplate;
};

export { dressUpNotifyTemplate };
