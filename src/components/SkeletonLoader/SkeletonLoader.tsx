import { Skeleton } from 'antd'
import { useState } from 'react'
import { DotChartOutlined } from '@ant-design/icons';
import { ConfigProvider, theme, Button, Card } from "antd";

const SkeletonLoader = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
      <Skeleton.Avatar shape='square' style={{ width: "28rem", borderRadius: "1rem", height: "250px", marginBottom: "1rem" }} active />
      <Skeleton active style={{ marginBottom: "1rem" }} />
    </ConfigProvider>
  )
}

export default SkeletonLoader