import { Card, Col, Progress, Row, Statistic } from "antd"
import Meta from "antd/lib/card/Meta"
import {LikeOutlined} from '@ant-design/icons'

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

function CardLayoutBackdrop({ photo, title, overview, key }: cardProps) {
    return (
        <>
            <Card
                key={key}
                hoverable
                style={{ width: 300, marginTop: 30 }}
                cover={<img src={`https://image.tmdb.org/t/p/original/${photo}`} />}
                title={title}
                >
                <Statistic value={1128} prefix={<LikeOutlined />} style={{position:"absolute", right:20, bottom:5}} />

            </Card>


        </>
    )
}

export default CardLayoutBackdrop