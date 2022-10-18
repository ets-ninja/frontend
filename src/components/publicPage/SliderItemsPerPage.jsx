import { Slider } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SliderItmesPerPage({ setJarsPerPage, jarsPerPage }) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1200 });
  const [currentPerPage, setCurrentPerPage] = useState(() => jarsPerPage);
  useEffect(() => {
    if (isTablet && jarsPerPage % 3 === 0) {
      setJarsPerPage(8);
      setCurrentPerPage(8);
    }
  }, [isTablet, jarsPerPage, setJarsPerPage]);
  return (
    <Slider
      color="secondary"
      value={currentPerPage}
      step={isTablet ? 2 : 3}
      min={isTablet ? 2 : 3}
      max={isTablet ? 40 : 45}
      aria-label="jars per page"
      valueLabelFormat={() => 'jars per page'}
      valueLabelDisplay="auto"
      marks={[{ value: currentPerPage, label: currentPerPage }]}
      onChange={(_, value) => {
        setCurrentPerPage(value);
      }}
      onChangeCommitted={(_, value) => {
        setJarsPerPage(value);
      }}
      sx={{ maxWidth: '320px' }}
    />
  );
}
