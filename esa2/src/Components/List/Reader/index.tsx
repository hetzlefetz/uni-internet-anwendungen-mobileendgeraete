import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { measurements } from "../../../constants";

import { useMediaItemStore } from "../../../Store/store.ts";

const Container = styled.div`
  height: calc(100% - 2 * ${measurements.barHeight});
  overflow-x: hidden;
`;

export const Reader = () => {
  const { id } = useParams();
  const { items } = useMediaItemStore();
  const item = items.find((x) => x.id === id);
  return (
    <Container>
      <img src={item.src} style={{ width: "100%", height: "auto" }} />
    </Container>
  );
};
