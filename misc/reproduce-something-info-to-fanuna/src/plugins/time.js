import dayjs from 'dayjs';

// https://github.com/yysun/apprun-hn/blob/master/src/app.tsx#L137-L151
function pluralize(number, label) {
  if (!number) number = 0;
  return number === 1 ? number + label : number + label + 's';
}

function timeAgo(pastTime) {
  // https://www.unitconverters.net/time/month-to-second.htm
  const currentTime = dayjs();
  const between = currentTime.diff(
    dayjs(pastTime, 'YYYY-MM-DD HH:mm:ss'),
    'seconds'
  );
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else if (between < 2628000) {
    return pluralize(~~(between / 86400), ' day');
  } else if (between < 31536000) {
    return pluralize(~~(between / 2628000), ' month');
  } else {
    return pluralize(~~(between / 31536000), ' year');
  }
}

const coolSort = (itemInfoList, key) => {
  itemInfoList.sort((a, b) => {
    return dayjs(a[key]).isAfter(dayjs(b[key])) ? 1 : -1;
  });
};

const coolSortDesc = (itemInfoList, key) => {
  itemInfoList.sort((a, b) => {
    return dayjs(a[key]).isBefore(dayjs(b[key])) ? 1 : -1;
  });
};

export { timeAgo, coolSort, coolSortDesc };
