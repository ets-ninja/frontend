import { get, del } from 'idb-keyval';
import * as Sentry from '@sentry/react';

const loadBackgroundMessages = async () => {
  try {
    const notificationList = await get('notificationList');
    if (notificationList) {
      await del('notificationList');
    }
    return notificationList;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};

export default loadBackgroundMessages;
