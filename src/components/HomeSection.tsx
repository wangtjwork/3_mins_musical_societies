
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router";

import * as Abouts from '../constants/Abouts';

export default function HomeSection() {
  return (
    <Stack sx={{ height: '100%' }} paddingTop={5} justifyContent='space-between'>
      <Link to="/note-to-pitch">
        <Button
          sx={{ width: 'fit-content' }}
          variant='contained'
        >开始测试</Button>
      </Link>

      <Paper elevation={6} sx={{ marginBottom: 5 }}>
        <Typography variant="body2">
          本项目为个人在学习<a target="_blank" href={Abouts.BILIBILI_LINK}>《零基础自学音乐学乐理合集-第二季》</a>时，为加快练习速度所写。
          所有代码开源发布在<a target="_blank" href={Abouts.GITHUB_LINK}>Github</a>上
        </Typography>
      </Paper>
    </Stack>
  );
}