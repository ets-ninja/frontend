import * as Sentry from '@sentry/react';

const showNotification = (data, navigate) => {
  const notification = new Notification('You have new donation!', {
    body: data.notification.body,
    icon: data.notification.image,
  });

  try {
    notification.onclick = () => {
      navigate(data.data.clickAction);
    };
  } catch (error) {
    Sentry.captureException(error);
  }
};

export default showNotification;
