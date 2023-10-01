/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import cx from "classnames";
import { getLocalStorage, setLocalStorage } from '../../utils/webStorage';
import { ServerKeys } from '../../api/serverKeys';
import useAppSelector from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { updateFilterContent } from '../../store/slice/videoDetailsSlice';
import { useData } from '../../context/DataContext';

const Filter = () => {
  const { filterContent } = useAppSelector((state) => state.videoDetails);
  const dispatch = useDispatch();
  const { xs, sm } = useData();

  const [selected, setSelected] = useState<string>("all")

  useEffect(() => {
    const query: any = getLocalStorage(ServerKeys.FILTER_DATA)
    const parsedData: any = query ? JSON.parse(query) : [];
    if (parsedData?.length) {
      dispatch(updateFilterContent([...parsedData]))
    } else {
      setLocalStorage(ServerKeys.FILTER_DATA, JSON.stringify(filterContent))
    }
  }, []);

  const handleSelected = (ele: string) => {
    setSelected(ele);
  }

  return (
    <div className={cx('flex g_2 pb_2 w_100 align_center', sm || xs ? "d_none" : "")}>
      {
        filterContent?.map((ele, index) => {
          return (
            <div
              onClick={() => handleSelected(ele)}
              key={index.toString() + ele}
              className={cx('w_max_content py_2 px_4 br_4 pointer tt_capitalize', selected === ele ? "bg_white primary" : "bg_gray")}
            >
              {ele}
            </div>
          )
        })
      }
    </div>
  )
}

export default Filter