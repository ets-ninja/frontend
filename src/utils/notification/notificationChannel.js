let channel;

const getChannel = () => {
  const channel = new BroadcastChannel('sw-messages');
  return channel;
};

export const notificationChannel = {
  getInstance: () => {
    if (!channel) {
      channel = getChannel();
    }
    return channel;
  },
};
