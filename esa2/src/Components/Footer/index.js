import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { Bar } from "../Bar";
import { css } from "@emotion/react";

export const Footer = () => {
  const left = [];
  const right = [
    <Bar.Button
      key={"btn-cache-click"}
      onclick={() => {
        console.log("Cache click");
      }}
      icon={<CachedIcon />}
    />,
  ];
  return (
    <Bar
      left={left}
      right={right}
      border={css`
        border-top: 1px solid grey;
      `}
    />
  );
};
