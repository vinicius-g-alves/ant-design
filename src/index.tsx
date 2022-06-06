import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd/dist/antd.less'
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
