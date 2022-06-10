import { Row, Typography } from "antd"
import axios, { AxiosResponse, AxiosError } from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import CardLayoutPoster from "../layouts/CardLayoutPoster";

const { Title } = Typography;

function Movies() {
    const [popular, setPopular] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [popularPeople, setPopularPeople] = useState([])

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
        console.log("card: ", movie)
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