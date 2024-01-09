import {useState} from 'react';
import {useEffect} from 'react';
import {
  ContainerTwoTone,
  SmileTwoTone
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {useNavigate, useLocation} from "react-router-dom";

const {Content, Sider} = Layout;

function getItem(label: string, key: string, icon: JSX.Element) {
  return {
    key,
    icon,
    label,
  };
}

interface AppLayoutProps {
  children: Array<JSX.Element> | JSX.Element;
}

const AppLayout = ({children}: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [route, setRoute] = useState('');

  const routes = [
    getItem('Customers', '/', <SmileTwoTone />),
    getItem('Employees', '/orders', <ContainerTwoTone />)
  ];

  useEffect(() => {
    const isCollapsed = localStorage.getItem('isCollapsed');

    if (isCollapsed !== null)
      isCollapsed === 'true' ? setCollapsed(true) : setCollapsed(false);

    setRoute(location.pathname);
  }, []);

  const handleCollapse = (isCollapsed: boolean) => {
    localStorage.setItem('isCollapsed', isCollapsed ? 'true' : 'false');
    setCollapsed(isCollapsed);
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider className="pt-4" collapsible collapsed={collapsed} onCollapse={(value) => handleCollapse(value)}>
        <Menu
          theme="dark"
          defaultSelectedKeys={[route]}
          selectedKeys={[route]}
          mode="inline"
          items={routes}
          onSelect={(item) => {
            setRoute(item.key);
            navigate(item.key);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;