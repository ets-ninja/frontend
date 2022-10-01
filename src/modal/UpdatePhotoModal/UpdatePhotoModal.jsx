import React, { useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounceEffect } from '../../hooks/useDebounceEffect';
import { canvasPreview } from './canvasPreview';
import 'react-image-crop/src/ReactCrop.scss';
import { useDispatch } from 'react-redux';
import { updateUserPhoto } from '../../redux/user/userActions';
import useModal from '../../hooks/useModal';
import { Box, Button, Grid } from '@mui/material';


function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const UpdatePhotoModal = () => {
  const [imgSrc, setImgSrc] = useState();
  const [crop, setCrop] = useState();
  const [aspect, setAspect] = useState(1);
  const [completedCrop, setCompletedCrop] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  const dispatch = useDispatch();
  const modal = useModal();

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {

        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop],
  );

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <Grid container>
        <Grid item xs={12}>
          {imgSrc && (
            <ReactCrop
              style={{ maxWidth: '600px' }}
              crop={crop}
              onChange={percentCrop => setCrop(percentCrop)}
              onComplete={c => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </Grid>
        <Grid item container xs justifyContent="center" gap='10px'>
          {completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                margin: '10px'
              }}
            />
          )}

          <Grid
            item
            container
            xs={12}
            md={6}
            gap="10px"
            justifyContent="center"
          >
            <Grid item>
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </Button>
            </Grid>
            <Grid item>
              {previewCanvasRef.current && (
                <Button
                  variant="contained"
                  component="label"
                  onClick={() =>
                    dispatch(
                      updateUserPhoto({
                        userPhoto: `${previewCanvasRef.current.toDataURL()}`,
                      }),
                    )
                  }
                >
                  Save
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                component="label"
                onClick={() => modal.close()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdatePhotoModal;
