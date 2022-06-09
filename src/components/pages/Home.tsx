import { Carousel, Col, Progress, Row } from 'antd';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Typography } from "antd"
import CardLayoutBackdrop from '../layouts/CardLayoutBackdrop';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
const { Title } = Typography;


function Home() {

    const [movieDiscover, setMovieDiscover] = useState([])
    const [trending, setTrending] = useState([])
    const [graph, setGraph] = useState([])
    const [search, setSearch] = useState([])


    interface Movie {
        adult: boolean,
        backdrop_path: string,
        genre_ids: number[]
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

    interface TrendingMovie {
        poster_path: string,
        original_name: string,
        origin_country: string[],
        vote_average: number,
        name: string,
        first_air_date: Date,
        vote_count: number,
        backdrop_path: string,
        overview: string,
        genre_ids: number[]
        id: number,
        original_language: string,
        popularity: number,
        media_type: string
    }



    function getMovieDiscover() {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`)
            .then((response: AxiosResponse) => {
                setMovieDiscover(response.data.results);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    function getTrendingMovies() {
        axios
            .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response: AxiosResponse) => {
                setTrending(response.data.results);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    function getTopRatedMovies() {
        axios
            .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`)
            .then((response: AxiosResponse) => {
                setGraph(response.data.results);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getMovieDiscover()
        getTrendingMovies()
        getTopRatedMovies()
    }, [])


    const styles: React.CSSProperties = {
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        height: "300px",
    }

    const styleDirection: React.CSSProperties = {
        display: "flex",
        verticalAlign: "middle",
    }

    const data = graph.map((item: Movie) => {
        return {
            name: item.original_title,
            votos: item.vote_count,
            image: item.poster_path
        }
    })

    return (
        <div>
            <Carousel autoplay style={{ height: 500, overflow: "hidden" }}>
                {movieDiscover.map((movDisc: Movie) => {
                    return (
                        <div>
                            <img style={{ width: "100%" }} src={`https://image.tmdb.org/t/p/original/${movDisc.backdrop_path}`} alt={movDisc.original_title} />
                        </div>
                    )
                })}
            </Carousel>

            <section className="Trending">
                <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Tendências </Title>
                <div style={styles}>
                    <Row>
                        <div style={styleDirection}>
                            {trending.map((trend: TrendingMovie) => {
                                return (
                                    <>
                                        <div style={{ paddingLeft: "30px" }}>
                                            <CardLayoutBackdrop key={trend.id} photo={trend.backdrop_path} />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </Row>
                </div>
            </section>

            <section className='TopRated' style={{ paddingTop: 50 }}>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis dataKey="votos" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="votos" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </section>

            {/* <section className='Search' style={{ paddingTop: 50 }}>

            </section> */}

        </div>
    )
};

export default Home;