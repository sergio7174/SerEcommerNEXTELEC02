import styled from "styled-components";
import { sizes } from "../settings";

export const StyledSidebarHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  width: ${sizes.expanded};
  font-size: 22px;
  font-weight: 600;
  padding: 20px;
  span {
    margin-left: 16px;
    pointer-events: none;
    opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
    transition: all 0.4s ease;
  }
`;
