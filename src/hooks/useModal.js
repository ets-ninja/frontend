import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import modalSlice from '../redux/modal/modalSlice';

export default function useModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const open = (path, data = null) => {
    navigate(`/modal/${path}`, {
      state: { backgroundLocation: location },
    });
    if (data)
      dispatch(
        modalSlice.actions.setModalData({
          path,
          data,
        }),
      );
  };

  const close = () => {
    dispatch(modalSlice.actions.closeModal());
    navigate(location.state === null ? '/' : -1);
  };

  return { open, close };
}
