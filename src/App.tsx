import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { AppBar, Box, Button, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { ArrowBack, Refresh } from '@mui/icons-material';
import NoteToPitchTestSection from './components/NoteToPitchTestSection';
import UserPreferencesContextProvider from './components/UserPreferencesContextProvider';
import UserPreferencesSection from './components/UserPreferencesSection';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Link, NavLink, Route, Routes } from 'react-router';

function App() {
  return (
    <UserPreferencesContextProvider>
      <CssBaseline />
      <Box flexDirection={'column'} alignItems={'stretch'} textAlign={'center'} marginLeft={5} marginRight={5}>
        <AppBar position='static'>
          <Toolbar>
            <NavLink end to="/" style={{ color: 'inherit' }}>
              {
                ({ isActive }) =>
                  !isActive
                    ? <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <ArrowBack />
                    </IconButton>
                    : null
              }
            </NavLink>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              五线谱读音名练习
            </Typography>
            <Button color='inherit' onClick={() => location.reload()}><Refresh /></Button>
          </Toolbar>
        </AppBar>
        <Stack flexGrow={1} alignItems={'center'} marginTop={5}>
          <Routes>
            <Route index element={
              <Stack gap={1}>
                <Link to="/note-to-pitch">
                  <Button
                    sx={{ width: 'fit-content' }}
                    variant='contained'
                  >开始</Button></Link>
                <Link to="/settings">
                  <Button
                    sx={{ width: 'fit-content' }}
                    variant='outlined'
                  >设置</Button>
                </Link>
              </Stack>
            } />
            <Route path="note-to-pitch" element={
              <NoteToPitchTestSection />
            } />
            <Route path="settings" element={
              <UserPreferencesSection />
            } />
          </Routes>
        </Stack>
      </Box>
      <Analytics />
      <SpeedInsights />
    </UserPreferencesContextProvider>
  )
}

export default App
