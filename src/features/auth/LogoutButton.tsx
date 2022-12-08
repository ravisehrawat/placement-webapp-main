import { Button } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "./authSlice";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return <Button onClick={()=>dispatch(logout())}>Logout</Button>;
};

export default LogoutButton;
