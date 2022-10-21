let channel;

const getChannel = () => {
  const channel = new BroadcastChannel('sw-messages');
  return channel;
};

const notificationChannel = {
  getInstance: () => {
    if (!channel) {
      channel = getChannel();
    }
    return channel;
  },
};

export default notificationChannel;
