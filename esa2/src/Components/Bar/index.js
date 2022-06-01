import React from "react";
import styled from "@emotion/styled";
import { measurements } from "../../constants";
import { Button } from "./Button";
const BarContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: ${() => measurements.barHeight};
  min-height: ${() => measurements.barHeight};
  max-height: ${() => measurements.barHeight};
  align-items: baseline;
  ${(props) => {
    return props.border ? props.border : "";
  }}
`;
const Left = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: baseline;
  flex-direction: row;
  min-height: ${() => measurements.barHeight};
  max-height: ${() => measurements.barHeight};
`;

const Right = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  min-height: ${() => measurements.barHeight};
  max-height: ${() => measurements.barHeight};
  flex-grow: 1;
  justify-content: end;
`;
export const Bar = ({ left, right, border }) => {
  return (
    <BarContainer border={border}>
      {left?.length > 0 && <Left>{left.map((item) => item)}</Left>}
      {right?.length > 0 && <Right>{right.map((item) => item)}</Right>}
    </BarContainer>
  );
};

Bar.Button = Button;
