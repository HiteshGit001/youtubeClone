import { FC } from 'react'

interface IErrorContainer {
  touched: boolean | undefined,
  error: string | undefined,
}

const ErrorContainer: FC<IErrorContainer> = (props: IErrorContainer) => {
  const { touched, error } = props;
  return (
    <>
      {
        touched && error
          ? <span className='fs_12 ta_left lh_md font_primary fw_400 danger'>{error}</span>
          : ''
      }
    </>
  )
}

export default ErrorContainer