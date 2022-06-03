import React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { MediaItem } from "../../../Types/types";
import { Button, DialogActions, Typography } from "@mui/material";

type ConfirmDialogProps = {
  item?: MediaItem;
  onConfirm: Function;
  onDelete: Function;
  onClose: Function;
  open: boolean;
};
export const ConfirmDialog = ({
  item,
  onConfirm,
  onClose,
  open,
}: ConfirmDialogProps) => {
  console.log("HUHU");
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{item.title}</DialogTitle>
      <Typography variant="body1">
        {`Soll der Eintrag ${item.title} wirklich gelöscht werden?`}
      </Typography>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Abbrechen
        </Button>
        <Button onClick={onConfirm}>Löschen</Button>
      </DialogActions>
    </Dialog>
  );
};
