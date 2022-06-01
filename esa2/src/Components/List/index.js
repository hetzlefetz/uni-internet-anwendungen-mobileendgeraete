import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { measurements } from "../../constants";
import { ListItem } from "./ListItem";
import { useMediaItemStore } from "../../Store/store.ts";

const ScrollView = styled.div`
  height: calc(100% - 2 * ${measurements.barHeight});
  overflow-x: hidden;
  overflow-y: scroll;
`;
export const List = async () => {
  const { create, read, update, readAll, reset, destroy } = useMediaItemStore();
  const [token, setToken] = useState(null);

  useEffect(() => {
    var foo = readAll();
    create({
      id: "asd",
      title: "foo",
      src: "https://placekitten.com/200/150",
      creationDate: new Date(),
    });
    var bar = readAll();
  });
  const items = [
    {
      title: "foo",
      src: "https://placekitten.com/200/150",
      creationDate: new Date(),
    },
  ];
  return (
    <ScrollView>
      {items.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </ScrollView>
  );
};
