import { Card, Col, Row } from "antd"
import Meta from "antd/lib/card/Meta"

interface cardProps {
    photo: string,
    title: string,
    overview?: string,
    key: number
}

const styles: React.CSSProperties = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Ubuntu",
    textAlign: "center"
}

function CardLayout({ photo, title, overview, key }: cardProps) {
    return (
        <>
                    <Card
                        key={key}
                        hoverable
                        style={{ width: 400, marginTop: 50}}
                        cover={<img src={`https://image.tmdb.org/t/p/w400/${photo}`} />}>
                        <Meta style={styles} title={title}/>
                    </Card>
        </>
    )
}

export default CardLayout