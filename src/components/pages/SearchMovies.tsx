import { Col, Row, Typography } from "antd"
import axios, { AxiosResponse, AxiosError } from "axios"
import { useState, useEffect } from "react"
import { Movie } from "../interfaces/Movie";
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
                    <Title style={{ paddingTop: 10, fontFamily: "Ubuntu" }} level={2}> Resultados </Title>
                    <div>
                        <Row>
                            {search.map((upcom: Movie) => {
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