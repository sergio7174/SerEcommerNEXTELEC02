import * as Styled from "./styles";
import { SidebarContext } from "../../contexts/sidebarContext";
import { useContext } from "react";

function SidebarHeader({ icon, children }) {
  const { collapsed } = useContext(SidebarContext);
  return (
    <Styled.StyledSidebarHeader collapsed={collapsed}>
      {icon}
      <span>{children}</span>
    </Styled.StyledSidebarHeader>
  );
}

export default SidebarHeader;
