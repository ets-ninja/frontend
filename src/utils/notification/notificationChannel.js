let channel;

const getChannel = () => {
  let channel = new BroadcastChannel('sw-messages');
  return channel;
};

export const notificationChannel = {
  getInstance: () => {
    if (channel === undefined || channel === null) {
      channel = getChannel();
    }
    return channel;
  },
};
