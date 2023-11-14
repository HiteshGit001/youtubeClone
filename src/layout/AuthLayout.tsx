import { ReactNode } from 'react'
import SidePannel from '../components/SidePannel/SidePannel';
import { useData } from '../context/DataContext';

interface IAuthLayout {
  child: ReactNode;
}
const AuthLayout = (props: IAuthLayout) => {
  const { child } = props;
  const { sm } = useData()
  return (
    <>
      {!sm ? <div></div> : <SidePannel />}
      {child}
    </>
  )
}

export default AuthLayout