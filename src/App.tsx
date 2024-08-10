import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { AppBar, Box, Button, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { ArrowBack, Refresh } from '@mui/icons-material';
import { AppMode } from './constants/AppMode';
import NoteToPitchTestSection from './components/NoteToPitchTestSection';
import UserPreferencesContextProvider from './components/UserPreferencesContextProvider';
import UserPreferencesSection from './components/UserPreferencesSection';

function App() {
  const [appMode, setAppMode] = useState<AppMode>(AppMode.INITIAL);

  return (
    <UserPreferencesContextProvider>
      <CssBaseline />
      <Box flexDirection={'column'} alignItems={'stretch'} textAlign={'center'} marginLeft={5} marginRight={5}>
        <AppBar position='static'>
          <Toolbar>
            {
              appMode != AppMode.INITIAL
                ? (<IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setAppMode(AppMode.INITIAL)}
                >
                  <ArrowBack />
                </IconButton>)
                : null
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              五线谱读音名练习
            </Typography>
            <Button color='inherit' onClick={() => location.reload()}><Refresh /></Button>
          </Toolbar>
        </AppBar>
        <Stack flexGrow={1} alignItems={'center'} marginTop={5}>
          {appMode == AppMode.INITIAL
            && (
              <Stack gap={1}>
                <Button
                  sx={{ width: 'fit-content' }}
                  variant='contained'
                  onClick={() => setAppMode(AppMode.TEST_NOTE_TO_PITCH)}
                >开始</Button>
                <Button
                  sx={{ width: 'fit-content' }}

                  variant='outlined'
                  onClick={() => setAppMode(AppMode.USER_PREFERENCES)}
                >设置</Button>
              </Stack>
            )}
          {appMode == AppMode.TEST_NOTE_TO_PITCH && <NoteToPitchTestSection goToMainPage={() => setAppMode(AppMode.INITIAL)} />}
          {appMode == AppMode.USER_PREFERENCES && <UserPreferencesSection />}
        </Stack>
      </Box>
    </UserPreferencesContextProvider>
  )
}

export default App
