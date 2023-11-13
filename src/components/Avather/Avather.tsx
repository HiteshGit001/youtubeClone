import { Avatar } from 'antd'
import useAppSelector from '../../hooks/useAppSelector'
import { useData } from '../../context/DataContext';

const Avather = () => {
  const { userData } = useAppSelector((state) => state.auth);
  return (
    <div className='pointer'>
      <Avatar
        children={userData?.firstName?.slice(0, 1) + userData?.lastName?.slice(0, 1)}
      />
    </div>
  )
}

export default Avather