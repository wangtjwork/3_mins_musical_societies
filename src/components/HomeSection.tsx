
import Stack from "@mui/material/Stack";
import { Link } from "react-router";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import * as Abouts from '../constants/Abouts';

export default function HomeSection() {
  return (
    <Stack sx={{ height: '100%' }} paddingTop={2} justifyContent='space-between'>
      <Grid container spacing={2} paddingLeft={1} paddingRight={1}>
        <Grid size={6} height={80} >
          <Card variant='outlined'>
            <CardActionArea>
              <Link to="/note-to-pitch">
                <CardContent>
                  <Typography variant="h6" component="div">
                    单音符识别练习
                  </Typography>
                  <br />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    对于五线谱上的单音符，在最短时间内识别出对应的音名
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={6} sx={{ marginBottom: 5 }}>
        <Typography variant="body2">
          本项目为个人在学习<a target="_blank" href={Abouts.BILIBILI_LINK}>《零基础自学音乐学乐理合集-第二季》</a>时，为加快练习速度所写。
          所有代码开源发布在<a target="_blank" href={Abouts.GITHUB_LINK}>Github</a>上
        </Typography>
      </Paper>
    </Stack>
  );
}