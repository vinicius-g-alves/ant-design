import { Card, Col, Progress, Row } from "antd"
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

function CardLayoutPoster({ photo, title, overview, key }: cardProps) {
    return (
        <>
            <Card
                key={key}
                hoverable
                style={{ width: 230, marginTop: 30 }}
                cover={<img src={`https://image.tmdb.org/t/p/w300/${photo}`} />}>
                <Meta style={styles} title={title} />
            </Card>
        </>
    )
}

export default CardLayoutPoster