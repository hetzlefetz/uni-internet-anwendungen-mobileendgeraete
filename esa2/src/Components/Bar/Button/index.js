import { IconButton } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { measurements } from "../../../constants";

const BarButton = styled(IconButton)`
  width: ${measurements.buttonSize};
  height: ${measurements.buttonSize};
  max-width: ${measurements.buttonSize};
  max-height: ${measurements.buttonSize};
  min-width: ${measurements.buttonSize};
  min-height: ${measurements.buttonSize};
`;
export const Button = ({ icon, onclick }) => {
  return <BarButton onClick={onclick}>{icon}</BarButton>;
};
