import { get, del } from 'idb-keyval';
import * as Sentry from '@sentry/react';

const removeSeenNofitication = async () => {
  let notificationArr;
  try {
    notificationArr = await get('notificationList');
    if (notificationArr) {
      await del('notificationList');
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

export default removeSeenNofitication;
