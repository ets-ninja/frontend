export default function transformTransactionTime(transactionDate) {
  if (!transactionDate) return 'No donations yet';
  const lastTransaction = Math.floor(Date.now() - new Date(transactionDate));
  const MINUTE = 1000 * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const response = 'Last donation';
  if (lastTransaction < MINUTE) {
    return response + ` less than a minute ago`;
  } else if (lastTransaction < HOUR) {
    return response + ` ${Math.floor(lastTransaction / MINUTE)} min. ago`;
  } else if (lastTransaction < DAY) {
    return response + ` ${Math.floor(lastTransaction / HOUR)} hrs. ago`;
  } else if (lastTransaction < WEEK) {
    return response + ` ${Math.floor(lastTransaction / DAY)} d. ago`;
  } else return response + ' more than a week ago';
}
