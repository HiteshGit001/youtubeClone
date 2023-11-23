import { MenuOutlined } from "@ant-design/icons";
import { useData } from "../../context/DataContext";

interface IMenueContainer {
  onClick: () => void;
  isIcon?: boolean;
}
const MenueContainer = (props: IMenueContainer) => {
  const { onClick, isIcon = true } = props;
  const { sm } = useData()
  return (
    <div className={`flex g_4 ${!sm ? "mb_4" : ""}`}>
      {isIcon ? <MenuOutlined className="white" onClick={onClick} /> : <></>}
      <p className="fs_md">Hi tube</p>
    </div>
  )
}

export default MenueContainer