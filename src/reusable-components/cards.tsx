import styled from "styled-components";

export const CardSymbol = styled.abbr<{ src: string }>`
  background-image: url(${(props) => props.src});
  margin: 2px 1px -3px 1px;
  display: inline-block;
  width: 16px;
  height: 16px;
`;
