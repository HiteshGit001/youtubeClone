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
          ? <span className='fs_12 lh_12 font_primary fw_400 error_red'>{error}</span>
          : ''
      }
    </>
  )
}

export default ErrorContainer