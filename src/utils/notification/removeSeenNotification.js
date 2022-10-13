import { get, del } from 'idb-keyval';

const removeSeenNofitication = async () => {
  let notificationArr;
  try {
    notificationArr = await get('notificationList');
    if (notificationArr) {
      del('notificationList');
    }
  } catch (error) {}
};

export default removeSeenNofitication;
