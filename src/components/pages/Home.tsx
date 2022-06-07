import { Card, Col, Row } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react";
import CardLayout from "../layouts/CardLayout";

import { Typography } from 'antd';

const { Title } = Typography;


function Home() {
    const [popular, setPopular] = useState([])

    interface PopularMovies {
        adult: boolean,
        backdrop_path: string,
        genre_ids: number[],
        id: number,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: string,
        poster_path: string,
        release_date: Date,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    }

    // https://api.themoviedb.org/3/movie/popular?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1

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

    useEffect(() => {
        getPopularMovies()
    }, [])


    return (
        <>
            <div>
                <section>
                <Title>Mais Populares</Title>
                    <Row justify="center">
                        {popular.map((popMovie: PopularMovies) => {
                            return (
                                <>
                                    <Col span={7}>
                                        <CardLayout key={popMovie.id} photo={popMovie.poster_path} title={popMovie.title}/>
                                    </Col>
                                </>
                            )
                        })}
                    </Row>
                </section>
            </div>
        </>
    )
}

export default Home