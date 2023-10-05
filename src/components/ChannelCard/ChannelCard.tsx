import { SearchedListSchema } from '../../api/dataSchemas'
import { ServerKeys } from '../../api/serverKeys';
import { truncate } from '../../helper/stringerFormatter';

interface IChannelCard {
  channelDetails: SearchedListSchema,
}
const ChannelCard = (props: IChannelCard) => {
  const { channelDetails } = props;
  const { id, snippet } = channelDetails

  return (
    <div className='flex align_center g_2 pb_4'>
      <div className='w_30 flex justify_center'>
        <img className='br_4 w_50' src={snippet?.[ServerKeys.THUMBNAILS]?.[ServerKeys.MEDIUM]?.[ServerKeys.URL]} alt={id?.[ServerKeys.CHANNEL_ID]} />
      </div>
      <div>
        <p className='fs_sm fw_700 py_2'>{truncate(snippet?.[ServerKeys.TITLE], 80)}</p>
      </div>
    </div>
  )
}

export default ChannelCard