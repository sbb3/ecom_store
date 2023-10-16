import React, { forwardRef } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Portal,
} from "@chakra-ui/react";

const Submenu = forwardRef(Menu)((props, ref) => (
  <Menu>
    <MenuButton ref={ref} {...props}>
      Other
    </MenuButton>
    <Portal>
      <MenuList>
        <MenuItem>Twitter</MenuItem>
        <MenuItem>Face</MenuItem>
      </MenuList>
    </Portal>
  </Menu>
));

const NavDropdown = () => {
  return (
    <Menu>
      <MenuButton>Open Menu</MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>Link 3</MenuItem>
          <MenuItem as={Submenu}/>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default NavDropdown;

import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
