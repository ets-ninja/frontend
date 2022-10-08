import { styled } from '@mui/material/styles';

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

export default ResponsiveContainer;