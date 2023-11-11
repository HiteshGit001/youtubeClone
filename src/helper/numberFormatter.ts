export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const viewCountFormatter = (number: number) => {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
}

export const formatSubscriberCount = (subscriberCount:number) => {
  if (subscriberCount >= 10000000) { // 10 million or more
    return (subscriberCount / 10000000)?.toFixed(2) + ' Cr';
  } else if (subscriberCount >= 1000000) { // 1 million or more
    return (subscriberCount / 1000000)?.toFixed(2) + ' M';
  } else if (subscriberCount >= 1000) { // 1 thousand or more
    return (subscriberCount / 1000)?.toFixed(2) + ' K';
  } else {
    return subscriberCount?.toString();
  }
}