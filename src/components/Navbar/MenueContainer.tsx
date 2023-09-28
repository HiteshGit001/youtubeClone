import { MenuOutlined } from "@ant-design/icons";

interface IMenueContainer {
  onClick: () => void;
  isIcon?: boolean;
}
const MenueContainer = (props: IMenueContainer) => {
  const { onClick, isIcon = true } = props
  return (
    <>
      <div className='flex g_4'>
        {isIcon ? <MenuOutlined onClick={onClick} /> : <></>}
        <p>Hi tube</p>
      </div>
    </>
  )
}

export default MenueContainer