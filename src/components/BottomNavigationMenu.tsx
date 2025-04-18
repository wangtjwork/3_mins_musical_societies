import { Home, Settings } from "@mui/icons-material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router";

export default function BottomNavigationMenu() {
  return (
    <Paper elevation={3}>
      <BottomNavigation>
        <NavLink to="/">
          {({ isActive }) =>
            <BottomNavigationAction label="首页" icon={<Home />} showLabel sx={(theme) => (
              isActive ? {
                color: theme.palette.primary.main
              } : null
            )} />
          }
        </NavLink>
        <NavLink to="/settings">
          {({ isActive }) =>
            <BottomNavigationAction label="设置" icon={<Settings />} showLabel sx={(theme) => (
              isActive ? {
                color: theme.palette.primary.main
              } : null
            )} />
          }
        </NavLink>

      </BottomNavigation>
    </Paper>
  );
}