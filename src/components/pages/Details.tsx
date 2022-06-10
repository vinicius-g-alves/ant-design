import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieDetails } from "../interfaces/Movie";
import { Col, Row, Statistic, Typography } from "antd"
import { LikeOutlined } from '@ant-design/icons'
import CardLayoutPeoples from "../layouts/CardLayoutPeoples";
import NO_IMAGE from "../img/NO_IMAGE.png"

const { Title } = Typography;

function Details() {
    const { id } = useParams()
    const [details, setDetails] = useState<MovieDetails>()
    const [cast, setCast] = useState<Cast[]>([])

    interface Cast {
        adult: boolean,
        gender: number,
        id: number,
        known_for_department: string,
        name: string,
        original_name: string,
        popularity: number,
        profile_path: string,
        cast_id: number,
        character: string,
        credit_id: string,
        order: number
    }

    function getMovie() {
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`)

            .then((response: AxiosResponse) => {
                console.log("AxiosResponse: ", response)
                setDetails(response.data);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    function getCast() {
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`)

            .then((response: AxiosResponse) => {
                console.log("castResponse: ", response)
                setCast(response.data.cast);
                console.log("cast: ", response.data.cast)
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }


    useEffect(() => {
        getMovie()
        getCast()
    }, [id])

    const styles: React.CSSProperties = {
        display: "flex",
    }

    const castStyles: React.CSSProperties = {
        padding: 30,
        textAlign: "center"
    }

    const style: React.CSSProperties = {
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        height: "300px",
    }

    const styleDirection: React.CSSProperties = {
        display: "flex",
        verticalAlign: "middle",
    }

    return (
        <>
            <div style={styles}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`} alt="" width={500} />
                </div>
                <div style={{ paddingLeft: 50 }}>
                    <Title style={{ fontFamily: "Ubuntu", color: "#111" }}> {details?.title} </Title>
                    <p style={{ paddingTop: 30, fontFamily: "Ubuntu", fontSize: 20, width: "60%", textAlign: "justify" }}>{details?.overview}</p>
                    <Statistic value={details?.popularity} prefix={<LikeOutlined />} style={{ paddingTop: 30 }} />
                    <p style={{ paddingTop: 30, fontFamily: "Ubuntu", fontSize: 20, width: "60%", textAlign: "justify" }}>{details?.release_date}</p>
                </div>
            </div>

            <section className="Popular">
                <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Elenco </Title>
                <div style={style}>
                    <Row>
                        <div style={styleDirection}>
                            {cast.map((item) => {
                                return (
                                    <>
                                        <div style={castStyles}>
                                            <img src={item.profile_path != null ? `https://image.tmdb.org/t/p/original/${item.profile_path}` : NO_IMAGE} alt="" width={100} />
                                            <Title level={4}>{item.name}</Title>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </Row>
                </div>
            </section>
        </>
    );
}

export default Details;
