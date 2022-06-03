import React, { useEffect, useState } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { MediaItem } from "../../../Types/types";
import { Button, DialogActions, TextField } from "@mui/material";

type EditDialogProps = {
  item?: MediaItem;
  onConfirm: Function;
  onDelete: Function;
  onClose: Function;
  open: boolean;
};
export const EditDialog = ({
  item,
  onConfirm,
  onClose,
  open,
}: EditDialogProps) => {
  const [value, setValue] = useState(item ? item.title : "");
  const inputRef = React.useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);
  const setTextInputRef = (element: HTMLInputElement) => {
    inputRef.current = element;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{item ? item.title : "NEUES MEDIUM"}</DialogTitle>
      <TextField
        id="name-input"
        value={value}
        label={`${item ? item.title : "Name"}`}
        variant="standard"
        onChange={handleChange}
        autoFocus={true}
      />
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            if (item) {
              item.title = value;
              onConfirm(item); //For Edit
            } else {
              onConfirm(value); //For Add
            }
          }}
        >
          {item ? "Ändern" : "Hinzufügen"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
