import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    StarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Card, Input, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import axios, { AxiosResponse, AxiosError } from 'axios';
import SearchMovies from '../pages/SearchMovies';
import { ResearchMovies } from '../interfaces/ResearchMovies';
import { Movie } from '../interfaces/Movie';
import CardLayoutPoster from './CardLayoutPoster';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/">Home</Link>, '1', <HomeOutlined />),
    getItem(<Link to="/movies">Movies</Link>, '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem(<Link to="/details">Favoritos </Link>, '9', <StarOutlined />),
];



function MainLayout({ children }: { children: JSX.Element }) {
    const [collapsed, setCollapsed] = useState(false);
    const [showAppmoovies, setShowAppmoovies] = useState(true)
    const showOrHide = () => setShowAppmoovies((showAppmoovies) => !showAppmoovies)


    const styleInput: React.CSSProperties = {
        background: "none",
        border: "none",
        color: "#fff",
        width: "85%",
        alignItems: "center",
        borderBottom: "2px solid white",
        fontWeight: "bold"
    }

    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState<Movie[]>([])

    function searchMovies() {
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&query=${search}&page=1&include_adult=false&year=${search}`)
            .then((response: AxiosResponse) => {
                setMovies(response.data.results);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    useEffect(() => {
        searchMovies()
    },[])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, color: "lightblue", fontSize: 25, textAlign: "center", alignItems: "center" }}>
                    {showAppmoovies ? <strong style={{ fontFamily: "Ubuntu" }} >APPMOOVIES</strong> : <Input placeholder='Digite aqui' style={styleInput} value={search} onChange={(e) => setSearch(e.target.value)} />}
                    <FaSearch style={{ position: "absolute", right: 20, top: 20 }} onClick={showOrHide} />

                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Populares</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Card>
                            {search == '' ? children : <SearchMovies image={undefined} title={''}/>}
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ??2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;