let channel;

const getChannel = () => {
  let channel = new BroadcastChannel('sw-messages');
  return channel;
};

export const notificationChannel = {
  getInstance: () => {
    //console.log(channel);
    if (channel === undefined || channel === null) {
      channel = getChannel();
    }
    return channel;
  },
};
