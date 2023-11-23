import { Avatar, Dropdown, MenuProps } from 'antd'
import useAppSelector from '../../hooks/useAppSelector'
import { ReactNode, useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { Paths } from '../../routes/pats';
import { setLocalStorage } from '../../utils/webStorage';

const Avather = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { navigateToSpecificRoute } = useData()
  const [items, setItems] = useState<MenuProps['items']>()

  const generateMenuItem = (key: string, label: ReactNode) => {
    return {
      key,
      label,
    }
  }

  const handleSignOut = () => {
    setLocalStorage("loggerId", "");
    window.location.reload();
  }
  useEffect(() => {
    const menuItem = [
      generateMenuItem("login", <p className='black' onClick={() => navigateToSpecificRoute(Paths.LOGIN)}>Login</p>),
      generateMenuItem("signUp", <p className='black' onClick={() => navigateToSpecificRoute(Paths.SIGN_UP)}>Sign up</p>),
      generateMenuItem("signOut", <p className='black' onClick={() => handleSignOut()}>Sign out</p>)
    ].filter((ele) => userData?.loggerId ? ele.key === "signOut" : ele.key !== "signOut")
    setItems(menuItem)
    console.log(menuItem.filter((ele) => userData?.loggerId ? ele.key === "signOut" : ele.key !== "signOut"), 'Loooog')
  }, [userData])
  return (
    <div className='pointer br_5 b_2_white'>
      <Dropdown className='' menu={{ items }}>
        <Avatar
          children={userData?.firstName?.slice(0, 1) + userData?.lastName?.slice(0, 1)}
        />
      </Dropdown>
    </div>
  )
}

export default Avather