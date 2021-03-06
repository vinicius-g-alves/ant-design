import { Carousel, Col, Progress, Row } from 'antd';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Typography } from "antd"
import CardLayoutBackdrop from '../layouts/CardLayoutBackdrop';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { Movie } from '../interfaces/Movie';
import { Trending } from '../interfaces/Trending';
import { Link } from 'react-router-dom';
const { Title } = Typography;


function Home() {

    const [movieDiscover, setMovieDiscover] = useState([])
    const [trending, setTrending] = useState([])
    const [graph, setGraph] = useState([])
    const [search, setSearch] = useState([])


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


    function gerarCard(movie: Trending) {
        console.log("card: ", movie)
        return (
            <Link to={`/details/${movie.id}`}>
                <div style={{ paddingLeft: "30px" }}>
                    <CardLayoutBackdrop key={movie.id} photo={movie.backdrop_path} overview={movie.overview} />
                </div>
            </Link>
        )
    }
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
                <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Tend??ncias </Title>
                <div style={styles}>
                    <Row>
                        <div style={styleDirection}>
                            {trending.map((trend: Trending) => {
                                return gerarCard(trend)
                            })}
                        </div>
                    </Row>
                </div>
            </section>

            <section className='TopRated' style={{ paddingTop: 50 }}>
                <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Os Mais Votados </Title>
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