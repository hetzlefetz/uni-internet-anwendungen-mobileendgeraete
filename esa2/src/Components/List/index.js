import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { measurements } from "../../constants";
import { ListItem } from "./ListItem";
import { useMediaItemStore } from "../../Store/store.ts";
import { OptionsDialog, EditDialog } from "../Dialogs/index.ts";

const ScrollView = styled.div`
  height: calc(100% - 2 * ${measurements.barHeight});
  overflow-x: hidden;
  overflow-y: scroll;
`;
export const List = () => {
  const { destroy, update, items } = useMediaItemStore();
  const [dialogState, setDialogState] = useState({
    option: false,
    edit: false,
  });

  const selectedItem = useRef(null);

  const handleDelete = (id) => {
    destroy(id);
    setDialogState({
      edit: false,
      option: false,
    });
  };
  const handleEdit = async (item) => {
    await update(item);
    setDialogState({
      edit: false,
      option: false,
    });
  };

  return (
    <>
      <ScrollView>
        {items.length === 0 && <div>Keine Einträge vorhanden</div>}
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <ListItem
              key={index}
              {...item}
              optionClick={() => {
                selectedItem.current = item;
                setDialogState({
                  edit: false,
                  option: true,
                });
              }}
            />
          ))}
      </ScrollView>
      {dialogState.option && (
        <OptionsDialog
          item={selectedItem.current}
          onEdit={async (id) => {
            setDialogState({
              edit: true,
              option: false,
            });
          }}
          onDelete={handleDelete}
          onClose={() =>
            setDialogState({
              edit: false,
              option: false,
            })
          }
          open={dialogState.option}
        />
      )}
      {dialogState.edit && (
        <EditDialog
          item={selectedItem.current}
          onConfirm={handleEdit}
          onClose={() =>
            setDialogState({
              edit: false,
              option: false,
            })
          }
          open={dialogState.edit}
        />
      )}
    </>
  );
};
