export const getPublicData = state => state.public.data;
export const getPublicUsers = state => state.public.users;
export const getPublicPagination = state => state.public.pagination;
export const getPublicStatus = state => ({
  isLoading: state.public.isLoading,
  error: state.public.error,
});
