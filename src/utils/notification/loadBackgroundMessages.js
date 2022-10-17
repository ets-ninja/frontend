import { get, del } from 'idb-keyval';

const loadBackgroundMessages = async () => {
  try {
    const notificationList = await get('notificationList');
    if (notificationList) {
      del('notificationList');
    }
    return notificationList;
  } catch (error) {
    return null;
  }
};

export default loadBackgroundMessages;
