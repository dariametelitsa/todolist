import '../App.scss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppWithRedux } from 'common/hooks/useAppWithRedux';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar';
import { Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorSnackbar } from 'common/components/errorSnackbar/ErrorSnackbar';
import { HeaderMenu } from 'common/components/headerMenu/HeaderMenu';

function App() {
  const { theme, changeModeHandler, isLoading, isInitialized } = useAppWithRedux();

  if (!isInitialized)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={'App'}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 12 }}>
          <AppBar position="fixed">
            <HeaderMenu changeModeHandler={changeModeHandler} />
            {isLoading && <LinearProgress color="success" />}
          </AppBar>
        </Box>
        <ErrorSnackbar />

        <Container fixed>
          <Outlet />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
