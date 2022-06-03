import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { MediaItem } from "../../../Types/types";

type OptionsDialogProps = {
  item: MediaItem;
  onEdit: Function;
  onDelete: Function;
  onClose: Function;
  open: boolean;
};
export const OptionsDialog = ({
  item,
  onEdit,
  onDelete,
  onClose,
  open,
}: OptionsDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{item.title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => onDelete(item.id)} key={"delete"}>
          <ListItemText primary={"Löschen"}></ListItemText>
        </ListItem>
        <ListItem button onClick={() => onEdit(item.id)} key={"edit"}>
          <ListItemText primary={"Editieren"}></ListItemText>
        </ListItem>
      </List>
    </Dialog>
  );
};
