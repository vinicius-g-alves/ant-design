import { Row, Typography } from "antd"
import axios, { AxiosResponse, AxiosError } from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import CardLayoutPeoples from "../layouts/CardLayoutPeoples";
import CardLayoutPoster from "../layouts/CardLayoutPoster";
import CardLayout from "../layouts/CardLayoutPoster"

const { Title } = Typography;

function Movies() {
    const [popular, setPopular] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [popularPeople, setPopularPeople] = useState([])

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

    interface KnowFor {
        adult: boolean
        backdrop_path: string,
        genre_ids: number[]
        id: number,
        media_type: string,
        original_language: string,
        original_title: string,
        overview: string
        poster_path: string,
        release_date: Date,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    }

    interface Peoples {
        adult: boolean,
        gender: number,
        id: number,
        known_for: KnowFor[],
        known_for_department: string,
        name: string,
        popularity: number,
        profile_path: string
    }


    function getPopularMovies() {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`)
            .then((response: AxiosResponse) => {
                setPopular(response.data.results);
                console.log("estado: ", popular)
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    function getUpcomingMovies() {
        axios
            .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`)
            .then((response: AxiosResponse) => {
                setUpcoming(response.data.results);
                console.log("estado upco: ", upcoming)
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    function getPopularPeoples() {
        axios
            .get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`)
            .then((response: AxiosResponse) => {
                setPopularPeople(response.data.results);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getPopularMovies()
        getUpcomingMovies()
        getPopularPeoples()
    }, [])

    const styles: React.CSSProperties = {
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        height: "500px",
    }

    const styleDirection: React.CSSProperties = {
        display: "flex",
        verticalAlign: "middle",
    }

    function gerarCard(movie: Movie) {
        return (
            <Link to={`/details/${movie.id}`}>
                <div style={{ paddingLeft: "30px" }}>
                    <CardLayoutPoster key={movie.id} photo={movie.poster_path} title={movie.title} />
                </div>
            </Link>
        )
    }

    return (
        <>
            <div>
                <section className="Popular">
                    <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Mais Populares </Title>
                    <div style={styles}>
                        <Row>
                            <div style={styleDirection}>
                                {popular.map((popMovie: Movie) => {
                                    return gerarCard(popMovie)
                                })}
                            </div>
                        </Row>
                    </div>
                </section>

                <section className="Upcoming">
                    <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Próximos Lançamentos </Title>
                    <div style={styles}>
                        <Row>
                            <div style={styleDirection}>
                                {upcoming.map((upcom: Movie) => {
                                    console.log("id: ", upcom.id)
                                    return gerarCard(upcom)
                                })}
                            </div>
                        </Row>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Movies