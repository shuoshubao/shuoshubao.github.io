import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './app'

createRoot(document.querySelector('#app')).render(
  <ConfigProvider componentSize="small">
    <App />
  </ConfigProvider>
)
