import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import React, { useState, useEffect } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
  {
    label: "Component",
    href: '/component',
  },
  {
    label: "Component1",
    href: "/component1",
    children: [],
  },
  {
    label: "Component2",
    href: "/component2",
  },
  {
    label: "Component3",
    href: "/component3",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  const [menuPosition, setMenuPosition] = useState(null);

  const handleRightClick = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX,
    });
  };

  const handleItemClick = (event) => {
    setMenuPosition(null);
  };

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {Logo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{Logo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href, children }) => {
      if (children) {
        return (
          <Link
            {...{
              component: RouterLink,
              to: children.href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: children.label,
            }}
          >
            <MenuItem>{children.label}</MenuItem>
          </Link>
        );
      } else {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      }
    });
  };

  const Logo = (
    <Typography variant="h6" component="h1" className={logo}>
      NavTest
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href, children }) => {
      if (children) {
        return (
          <>
            <Button
              onClick={handleRightClick}
              endIcon={<ArrowDropDownIcon />}
              {...{
                key: label,
                color: "inherit",
                component: RouterLink,
                className: menuButton,
              }}
            >
              {label}
            </Button>
            <Menu
              open={!!menuPosition}
              onClose={() => setMenuPosition(null)}
              anchorReference="anchorPosition"
              anchorPosition={menuPosition}
            >
              <MenuItem onClick={handleItemClick}>Button 1</MenuItem>
              <MenuItem onClick={handleItemClick}>Button 2</MenuItem>
              <NestedMenuItem
                label="Button 3"
                parentMenuOpen={!!menuPosition}
                onClick={handleItemClick}
              >
                <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
                <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
                <NestedMenuItem
                  label="Sub-Button 3"
                  parentMenuOpen={!!menuPosition}
                  onClick={handleItemClick}
                >
                  <MenuItem onClick={handleItemClick}>
                    Sub-Sub-Button 1
                  </MenuItem>
                  <MenuItem onClick={handleItemClick}>
                    Sub-Sub-Button 2
                  </MenuItem>
                </NestedMenuItem>
              </NestedMenuItem>
              <MenuItem onClick={handleItemClick}>Button 4</MenuItem>
              <NestedMenuItem
                label="Button 5"
                parentMenuOpen={!!menuPosition}
                onClick={handleItemClick}
              >
                <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
                <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
              </NestedMenuItem>
            </Menu>
          </>
        );
      } else {
        return (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
