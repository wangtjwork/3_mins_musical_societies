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
import { Link, Route, Routes } from 'react-router';
import HomeSection from './components/HomeSection';
import BottomNavigationMenu from './components/BottomNavigationMenu';
import KeySignatureTestSection from './components/KeySignatureTestSection';

function App() {
  return (
    <UserPreferencesContextProvider>
      <CssBaseline />
      <Stack textAlign={'center'} marginLeft={1} marginRight={1} height="100%">
        <AppBar position='static'>
          <Toolbar>
            <Routes>
              <Route index element={null} />
              <Route path="note-to-pitch" element={
                <BackButton />
              } />
              <Route path="key-signature" element={
                <BackButton />
              } />
            </Routes>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              乐理练习
            </Typography>
            <Button color='inherit' onClick={() => location.reload()}><Refresh /></Button>
          </Toolbar>
        </AppBar>
        <Box height="100%">
          <Routes>
            <Route index element={
              <HomeSection />
            } />
            <Route path="note-to-pitch" element={
              <NoteToPitchTestSection />
            } />
            <Route path="key-signature" element={
              <KeySignatureTestSection />
            } />
            <Route path="settings" element={
              <UserPreferencesSection />
            } />
          </Routes>
        </Box>
        <BottomNavigationMenu />
      </Stack>
      <Analytics />
      <SpeedInsights />
    </UserPreferencesContextProvider>
  )
}

function BackButton() {
  return (
    <Link to="/" style={{ color: 'inherit' }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <ArrowBack />
      </IconButton>
    </Link>
  );
}

export default App
