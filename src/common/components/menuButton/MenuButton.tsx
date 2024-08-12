import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

type Props = { background?: string };

export const MenuButton = styled(Button)<Props>(({ background, theme }) => ({
  display: 'inline-block',
  padding: '.75rem 1.25rem',
  color: '#fff',
  textTransform: 'uppercase',
  fontSize: '1rem',
  letterSpacing: '.15rem',
  transition: 'all .3s',
  position: 'relative',
  overflow: 'hidden',
  zIndex: '1',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: '0',
    width: '100%',
    height: '0%',
    backgroundColor: background || theme.palette.primary.light,
    zIndex: -1,
    transition: 'all .3s',
  },
  '&:hover': {
    color: '#fff',
    '&::before': {
      height: '100%',
    },
  },

  // &:before {
  //         content: '';
  //         position: absolute;
  //         bottom: 0;
  //         left: 0;
  //         width: 0%;
  //         height: 100%;
  //         background-color: darken($color, 15%);
  //         transition: all .3s;
  //         border-radius: 10rem;
  //         z-index: -1;
  // }
  // &:hover {
  //         color: #fff;
  // &:before {
  //                 width: 100%;
  //         }
  // }
}));
