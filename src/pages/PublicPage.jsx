import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import JarCard from '../components/JarCard';
import useModal from '../hooks/useModal';

const ResponsiveContainer = styled('div')`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  @media (min-width: 600px) {
    width: 570px;
  }
  @media (min-width: 768px) {
    width: 720px;
  }
  @media (min-width: 900px) {
    width: 870px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
  @media (min-width: 1536px) {
    width: 1400px;
  }
  @media (max-width: 599px) {
    width: 100%;
  }
`;

export default function PublicPage() {
  const modal = useModal();
  const [val, setVal] = useState(0);

  useEffect(() => {
    const demoTimeout = setTimeout(() => {
      setVal(prevVal => (prevVal === 1000 ? 0 : prevVal + 50));
    }, 350);
    return () => clearTimeout(demoTimeout);
  }, [val]);

  function handleOpenModal(e) {
    if (
      e.target.getAttribute('data-clickable') ||
      e.target.parentElement.getAttribute('data-clickable')
    )
      return;
    modal.open('public-jar/10');
  }

  return (
    <ResponsiveContainer>
      <div
        style={{
          background: '#FBB13C',
          paddingTop: '100px',
          marginBottom: '15px',
        }}
      ></div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <JarCard
          bank={{ user: {}, value: val, finalGoal: 1000 }}
          handleOpenModal={handleOpenModal}
        />
        <JarCard
          bank={{
            user: {},
            value: 143,
            finalGoal: 500,
            image: 'https://wallpaperaccess.com/full/5163201.jpg',
          }}
          handleOpenModal={handleOpenModal}
        />
        <JarCard
          bank={{
            user: {},
            value: 15220,
            finalGoal: 100000,
          }}
          handleOpenModal={handleOpenModal}
        />
        <JarCard bank={{ user: {}, value: 1964, finalGoal: 2000 }} />
        <JarCard
          bank={{
            user: {},
            name: 'very very very very long nameeeeeee',
            value: 32,
            finalGoal: 1000,
          }}
        />
        <JarCard bank={{ user: {}, value: 115000, finalGoal: 200000 }} />
      </Box>
    </ResponsiveContainer>
  );
}
