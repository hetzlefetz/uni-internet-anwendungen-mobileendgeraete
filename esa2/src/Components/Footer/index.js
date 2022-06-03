import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Bar } from "../Bar";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaItemStore } from "../../Store/store.ts";

export const Footer = () => {
  const left = [];
  const right = [];
  const location = useLocation();
  const navigate = useNavigate();
  const { source, switchSource } = useMediaItemStore();
  if (location.pathname.includes("/read/")) {
    left.push(
      <Bar.Button
        key={"btn-back-click"}
        onclick={() => {
          navigate(-1);
        }}
        icon={<ArrowBack />}
      />
    );
  } else {
    left.push(<pre key="source">{source}</pre>);
    right.push(
      <Bar.Button
        key={"btn-cache-click"}
        onclick={async () => {
          await switchSource();
        }}
        icon={<CachedIcon />}
      />
    );
  }
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
