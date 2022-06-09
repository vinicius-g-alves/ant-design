import { Col, Row, Typography } from "antd"
import axios, { AxiosResponse, AxiosError } from "axios"
import { useState, useEffect } from "react"
import CardLayoutPeoples from "../layouts/CardLayoutPeoples";
import CardLayoutPoster from "../layouts/CardLayoutPoster";
import CardLayout from "../layouts/CardLayoutPoster"

const { Title } = Typography;

interface SearchProps {
    image: unknown,
    title: string
}

function SearchMovies({image, title}:SearchProps) {
    const [search, setSearch] = useState([])

    interface Movies {

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

   

    useEffect(() => {
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

    return (
        <>
            <div>
                <section className="Upcoming">
                    <Title style={{ paddingTop: 50, fontFamily: "Ubuntu" }} level={2}> Próximos Lançamentos </Title>
                    <div>
                        <Row>
                            {search.map((upcom: Movies) => {
                                return (
                                    <>
                                        <Col span={8}>
                                            <div style={{ paddingLeft: "30px" }}>
                                                <CardLayoutPoster key={upcom.id} photo={upcom.poster_path} title={upcom.title} />
                                            </div>
                                        </Col>
                                    </>
                                )
                            })}
                        </Row>
                    </div>
                </section>

            </div>
        </>
    )
}

export default SearchMovies