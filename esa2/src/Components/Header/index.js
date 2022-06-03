import React, { useState } from "react";

import { Bar } from "../Bar";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { EditDialog } from "../Dialogs/index.ts";
import { useMediaItemStore } from "../../Store/store.ts";
import { useLocation, useNavigate } from "react-router-dom";

const MenuHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

export const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { create, items, destroy } = useMediaItemStore();
  const navigate = useNavigate();
  let item = null;
  if (location.pathname.includes("/read/")) {
    const id = location.pathname.split("/").pop();
    item = items.find((x) => x.id === id);
  }

  const handleAdd = async (title) => {
    var newItem = {
      title,
      creationDate: new Date(),
      src: "https://placekitten.com/100/100",
    };
    await create(newItem);
    setOpen(false);
  };
  const left = [
    <Bar.Button
      key={"btn-menu"}
      onclick={() => {
        console.log("Menu click");
      }}
      icon={<MenuIcon key={"1"} />}
    />,
    <MenuHeading key={"1"}>{item ? item.title : "Menü"}</MenuHeading>,
  ];
  const addButton = (
    <Bar.Button
      key={"btn-add"}
      onclick={() => {
        setOpen(true);
      }}
      icon={<AddIcon key={"1"} />}
    />
  );
  const deleteButton = (
    <Bar.Button
      key={"btn-delete"}
      onclick={() => {
        destroy(item.id);
        navigate(-1);
      }}
      icon={<DeleteIcon key={"1"} />}
    />
  );
  const right = [];
  if (location.pathname.includes("/read/")) {
    right.push(deleteButton);
  } else {
    right.push(addButton);
  }
  return (
    <>
      <Bar
        key={"1"}
        left={left}
        right={right}
        border={css`
          border-bottom: 1px solid grey;
        `}
      />
      {open && (
        <EditDialog
          item={null}
          onConfirm={handleAdd}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
    </>
  );
};
