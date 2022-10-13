import React, { useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounceEffect } from '../../hooks/useDebounceEffect';
import { canvasPreview } from './canvasPreview';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPhoto } from '../../redux/user/userActions';
import { updateWishlistItem } from '../../redux/wishlist/wishlistActions';
import useModal from '../../hooks/useModal';
import { Box, Button, Grid, Slider, Typography } from '@mui/material';
import 'react-image-crop/src/ReactCrop.scss';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25,
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
  const { data } = useSelector(state => state.modal);
  const [imgSrc, setImgSrc] = useState();
  const [crop, setCrop] = useState({});
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(data.aspect);
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
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  const saveUserPhoto = () => {
    switch (data.path) {
      case 'updateUserPhoto':
        dispatch(
          updateUserPhoto({
            userPhoto: `${previewCanvasRef.current.toDataURL()}`,
          }),
        );
        break;
      case 'updateWishItemPhoto':
        dispatch(
          updateWishlistItem({
            id: data.wishItemId,
            data: { image: `${previewCanvasRef.current.toDataURL()}` },
          }),
        );
      default:
        break;
    }
    modal.close();
  };

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: '#eee',
            mb: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '150px',
          }}
        >
          {imgSrc && (
            <ReactCrop
              style={{ maxWidth: '600px' }}
              crop={crop}
              onChange={percentCrop => setCrop(percentCrop)}
              onComplete={c => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                alt=""
                ref={imgRef}
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </Grid>
        <Grid container item xs={12} md={12} justifyContent="center" gap="10px">
          <Grid item>
            {completedCrop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: `${data.width}px`,
                  height: `${data.height}px`,
                  borderRadius: `${data.canvasBorderRadius}%`,
                  margin: '10px',
                }}
              />
            )}
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            justifyContent="center"
            alignItems="center"
            direction="row"
          >
            <Grid item xs={10}>
              <Typography>Scale: {scale}</Typography>
              <Slider
                defaultValue={1}
                min={0.5}
                max={5}
                aria-label="Default"
                valueLabelDisplay="auto"
                value={scale}
                step={0.1}
                disabled={!imgSrc}
                onChange={e => setScale(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography>Rotate: {rotate + '°'}</Typography>
              <Slider
                id="rotate-input"
                max={360}
                min={0}
                defaultValue={0}
                value={rotate}
                disabled={!imgSrc}
                onChange={e => setRotate(Number(e.target.value))}
              />
            </Grid>
          </Grid>
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
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                />
              </Button>
            </Grid>
            <Grid item>
              {completedCrop && (
                <Button
                  variant="contained"
                  component="label"
                  onClick={saveUserPhoto}
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
