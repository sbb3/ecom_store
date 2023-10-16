import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdMusicNote } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

export default function Software() {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const items = [
    { path: "/effects", label: "Effects" },
    { path: "/instruments", label: "Instruments" },
    { path: "/studio-tools", label: "Studio Tools" },
  ];

  const openSubmenu = () => {
    if (!submenuOpen) {
      setSubmenuOpen(true);
    }
  };

  const closeSubmenu = () => {
    if (submenuOpen) {
      setSubmenuOpen(false);
    }
  };

  return (
    <Menu>
      <MenuButton
        p={3}
        borderRadius="full"
        _hover={{
          color: "white",
          bg: "purple.500",
        }}
        //   outline="2px solid blue"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          //   outline="2px solid green"
        >
          <Icon as={MdMusicNote} boxSize={7} />
          {/* <Text ml={2} letterSpacing={1}>
              Cart
            </Text> */}
        </Flex>
      </MenuButton>
      <MenuList>
        {items.map((item) => (
          <MenuItem
            key={item.label}
            _hover={{
              color: "white",
              bg: "purple.500",
            }}
            borderRadius="md"
            // outline='2px solid green'
          >
            <Link
              as={RouterLink}
              to={item.path}
              p={1}
              w="full"
              _hover={{
                color: "white",
                bg: "purple.500",
              }}
            >
              <Flex alignItems="center" justifyContent="start">
                <Text ml={2} letterSpacing={1}>
                  {item.label}
                </Text>
              </Flex>
            </Link>
          </MenuItem>
        ))}
        {/* Submenu */}
        {/* <Menu isOpen={submenuOpen} placement="right-end" onClose={closeSubmenu}>
			<MenuButton as={MenuItem} onClick={() => setSubmenuOpen(!submenuOpen)}>
			  Open Submenu
			</MenuButton>
			<MenuList>
			  <MenuItem>Submenu Item 1</MenuItem>
			  <MenuItem>Submenu Item 2</MenuItem>
			  <MenuItem>Submenu Item 3</MenuItem>
			</MenuList>
		  </Menu> */}
      </MenuList>
    </Menu>
  );
}
