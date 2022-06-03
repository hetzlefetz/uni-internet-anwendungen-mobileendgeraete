import React from "react";
import styled from "@emotion/styled";
import { measurements } from "../../../constants";
import { Bar } from "../../Bar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Row = styled.div`
  height: ${measurements.rowHeight};
  flex-direction: row;
  padding: 8px;
  display: flex;
  width: 100%;
  gap: 8px;
  border-bottom: 1px grey;
`;
const ImageItem = styled.img`
  object-fit: cover;
  height: calc(${measurements.rowHeight} * ${measurements.imageSizeFactor});
  width: calc(${measurements.rowHeight} * ${measurements.imageSizeFactor});
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
  & > p {
    margin: 0;
    font-size: small;
    line-height: normal;
    font-style: italic;
  }
  & > h2 {
    margin: 0;
    font-size: 22px;
    line-height: 22px;
  }
`;

export const ListItem = (props) => {
  const { title, src, creationDate, optionClick } = props;
  return (
    <Row>
      <ImageItem key={"1"} src={src} />
      <InfoItem key={"2"}>
        <h2>{title}</h2>
        <p>
          {creationDate.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </InfoItem>
      <Bar.Button
        key={"btn-options-click"}
        onclick={optionClick}
        icon={<MoreVertIcon />}
      />
      ,
    </Row>
  );
};
