import { ReactNode } from 'react'
import SidePannel from '../components/SidePannel/SidePannel';

interface IAuthLayout {
  child: ReactNode;
}
const AuthLayout = (props: IAuthLayout) => {
  const { child } = props;
  return (
    <>
      <SidePannel />
      {child}
    </>
  )
}

export default AuthLayout