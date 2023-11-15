import { Skeleton, ConfigProvider, theme } from 'antd';

const SkeletonLoader = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: true ? darkAlgorithm : defaultAlgorithm,
      }}>
      <Skeleton.Avatar shape='square' style={{ width: "28rem", borderRadius: "1rem", height: "250px", marginBottom: "1rem" }} active />
      <Skeleton active style={{ marginBottom: "1rem" }} />
    </ConfigProvider>
  )
}

export default SkeletonLoader