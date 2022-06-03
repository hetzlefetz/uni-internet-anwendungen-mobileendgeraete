import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { measurements } from "../../constants";
import { ListItem } from "./ListItem";
import { useMediaItemStore } from "../../Store/store.ts";
import { OptionsDialog, EditDialog, ConfirmDialog } from "../Dialogs/index.ts";
import { Reader } from "./Reader/index.tsx";
import { Routes, Route, useNavigate } from "react-router-dom";

const ScrollView = styled.div`
  height: calc(100% - 2 * ${measurements.barHeight});
  overflow-x: hidden;
  overflow-y: scroll;
`;
export const List = () => {
  const { destroy, update, items } = useMediaItemStore();
  const selectedItem = useRef(null);
  const [dialogState, setDialogState] = useState({
    option: false,
    edit: false,
  });
  const navigate = useNavigate();

  const openOptionDialog = () => {
    setDialogState({
      edit: false,
      option: true,
      confirm: false,
    });
  };
  const openEditDialog = () => {
    setDialogState({
      edit: true,
      option: false,
      confirm: false,
    });
  };
  const openConfirmationDialog = () => {
    setDialogState({
      edit: false,
      option: false,
      confirm: true,
    });
  };

  const resetView = () => {
    selectedItem.current = null;
    setDialogState({
      edit: false,
      option: false,
      confirm: false,
    });
  };

  const handleDelete = () => {
    destroy(selectedItem.current.id);
    resetView();
  };
  const handleConfirmation = (item) => {
    openConfirmationDialog();
  };
  const handleEdit = async (item) => {
    await update(item);
    resetView();
  };
  const handleItemClick = async (item) => {
    navigate(`/read/${item.id}`);
  };
  const handleOptionsClick = async (item) => {
    selectedItem.current = item;
    openOptionDialog();
  };

  return (
    <>
      <Routes>
        <Route path="read/:id" element={<Reader />} />
        <Route
          path="/"
          element={
            <ScrollView>
              {items.length === 0 && <div>Keine Einträge vorhanden</div>}
              {items &&
                items.length > 0 &&
                items.map((item, index) => (
                  <ListItem
                    key={index}
                    {...item}
                    itemClick={() => handleItemClick(item)}
                    optionClick={() => handleOptionsClick(item)}
                  />
                ))}
            </ScrollView>
          }
        />
      </Routes>
      {dialogState.option && (
        <OptionsDialog
          item={selectedItem.current}
          onEdit={openEditDialog}
          onDelete={handleConfirmation}
          onClose={resetView}
          open={dialogState.option}
        />
      )}
      {dialogState.confirm && (
        <ConfirmDialog
          item={selectedItem.current}
          onConfirm={handleDelete}
          onClose={resetView}
          open={dialogState.confirm}
        />
      )}
      {dialogState.edit && (
        <EditDialog
          item={selectedItem.current}
          onConfirm={handleEdit}
          onClose={resetView}
          open={dialogState.edit}
        />
      )}
    </>
  );
};
