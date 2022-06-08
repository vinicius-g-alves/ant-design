import { Card, Col, Progress, Row } from "antd"
import Meta from "antd/lib/card/Meta"

interface cardProps {
    photo: string,
    title?: string,
    overview?: string,
    key: number,
}

const styles: React.CSSProperties = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Ubuntu",
    textAlign: "center"
}

function CardLayoutBackdrop({ photo, title, overview, key}: cardProps) {
    return (
        <>
            <Card
                key={key}
                hoverable
                style={{ width: 300, marginTop: 30 }}
                cover={<img src={`https://image.tmdb.org/t/p/original/${photo}`} />}>
                <Progress strokeColor={{
                    '0%': '#0000CD',
                    '100%': '#87d068',
                }} style={{ position: "absolute", right: 10, bottom: 4 }} width={60} type="circle" percent={90} />
            </Card>


        </>
    )
}

export default CardLayoutBackdrop