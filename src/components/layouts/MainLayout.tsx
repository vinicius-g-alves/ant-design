import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card, Input, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import axios, { AxiosResponse, AxiosError } from 'axios';
import SearchMovies from '../pages/SearchMovies';


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
    getItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/movies">Movies</Link>, '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];



function MainLayout({ children }: { children: JSX.Element }) {
    const [collapsed, setCollapsed] = useState(false);
    const [showAppmoovies, setShowAppmoovies] = useState(false)
    const showOrHide = () => setShowAppmoovies((showAppmoovies) => !showAppmoovies)

    interface ResearchMovies {
        adult: boolean,
        backdrop_path: string,
        genre_ids: number[],
        id: number,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        release_date: Date,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    }

    const styleInput: React.CSSProperties = {
        background:"none",
        border:"none",
        color:"#fff",
        width: "85%",
        alignItems: "center",
        borderBottom: "2px solid white",
        fontWeight:"bold"
    }

    const [search, setSearch] = useState<ResearchMovies[]>([])

    function searchMovies() {
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&query=${search}&page=1&include_adult=false&year=${search}`)
            .then((response: AxiosResponse) => {
                setSearch(response.data.results);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    // {pesquisa.map((filme) => {
    //     return (
    //       <li className="li-resull-pesquisa">
    //         <a href="#" onClick={() => handleOpen(filme)}>
    //           {filme.title}
    //           <div className="invisible-search-elements">
    //             {filme.overview}
    //             {filme.release_date}
    //           </div>
    //         </a>
    //       </li>
    //     );
    //   })}

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, color: "lightblue", fontSize: 25, textAlign: "center", alignItems:"center" }}>
                    { showAppmoovies ? <strong>APPMOOVIES</strong> : <Input placeholder='Digite aqui' style={styleInput} />}
                    <FaSearch style={{ position: "absolute", right: 20, top: 20 }} onClick={showOrHide} />

                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Populares</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Card>
                            {children}
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;