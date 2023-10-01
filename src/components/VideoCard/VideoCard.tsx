/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import cx from "classnames";
import { VideoDetails } from '../../api/dataSchemas';
import { truncate } from '../../helper/stringerFormatter';
import { ServerKeys } from '../../api/serverKeys';
import { viewCountFormatter } from '../../helper/numberFormatter';
import { getDuration } from '../../helper/dateFormatter';
import useAppSelector from '../../hooks/useAppSelector';
import { useLocation } from 'react-router-dom';
import { Paths } from '../../routes/pats';
import { Col, Row } from 'antd';
import { useData } from '../../context/DataContext';
import { useDispatch } from 'react-redux';
import { updateRelatedKey } from '../../store/slice/videoDetailsSlice';

interface IVideoCard {
  videoDetails: VideoDetails,
  isVertical: boolean,
}
const VideoCard = (props: IVideoCard) => {
  const { videoDetails, isVertical } = props;
  const { contentDetails, snippet, statistics, id } = videoDetails;

  const { sm, md, xs, navigateRouteWithState } = useData();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleNavigate = (tag: string) => {
    console.log(tag, "tag");
    dispatch(updateRelatedKey(tag))
    navigateRouteWithState(`${Paths.WATCH}?v=${id},${snippet?.[ServerKeys.CHANNEL_ID]}`, tag)
  }

  return (
    <div onClick={isVertical ? () => handleNavigate(snippet?.[ServerKeys.TITLE]) : () => null} className={cx('pb_4', isVertical ? "" : md ? "flex g_4 align_start" : "")}>
      {
        isVertical
          ? <img className={cx('h_100 br_2', isVertical ? "w_100" : "")} src={snippet?.[ServerKeys.THUMBNAILS]?.[ServerKeys.MAXRES]?.url ||
            snippet?.[ServerKeys.THUMBNAILS]?.[ServerKeys.DEFAULT]?.url} alt="" />
          : <Row>
            <Col md={8}>
              <img className={cx('h_100 br_2', xs ? "w_100" : "")} src={snippet?.[ServerKeys.THUMBNAILS]?.[ServerKeys.MAXRES]?.url ||
                snippet?.[ServerKeys.THUMBNAILS]?.[ServerKeys.MEDIUM]?.url} alt="" />
            </Col>
          </Row>
      }
      <div>
        <p className='fs_sm fw_700 py_2'>{truncate(snippet?.[ServerKeys.TITLE], 80)}</p>
        <p className='fs_xs'>{truncate(snippet?.[ServerKeys.CHANNEL_TITLE], 40)}</p>
        <p className='fs_xs flex justify_start align_center'>
          <span>{viewCountFormatter(Number(statistics?.[ServerKeys.VIEW_COUNT]))}</span>
          <span className='pb_2 px_2'>.</span>
          <span>{getDuration(snippet?.[ServerKeys.PUBLISHED_AT])}</span>
        </p>
        {
          pathname !== Paths.HOME
            ? <p>{truncate(snippet?.[ServerKeys.DESCRIPTION], 80)}</p>
            : <></>
        }
      </div>
    </div >
  )
}

export default VideoCard;