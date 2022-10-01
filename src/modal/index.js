import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Outlet } from 'react-router-dom';
import useModal from '../hooks/useModal';

export default function ModalWindow() {
  const modal = useModal();

  return (
    <Modal open={true} onClose={() => modal.close()}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          overflowY: 'auto',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#ffffff',
          border: '1px solid transparent',
          outline: '1px solid transparent',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: 2,
          maxWidth: '800px',
          minWidth: { xs: 'calc(100% - 34px)', sm: '566px', md: '600px' },
          maxHeight: { xs: 'calc(100% - 34px)', sm: '90vh' },
          p: { xs: 2, sm: 4 },
          pt: { sm: 2 },
          pb: { sm: 2 },
        }}
      >
        <CloseIcon
          onClick={() => modal.close()}
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
        />
        <Outlet />
      </Box>
    </Modal>
  );
}
