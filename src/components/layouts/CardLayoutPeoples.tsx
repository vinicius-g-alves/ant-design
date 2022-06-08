import { Card, Col, Descriptions, Row } from "antd"
import Meta from "antd/lib/card/Meta"

interface cardProps {
    adult?: boolean,
    gender?: number,
    id?: number,
    known_for?: undefined,
    known_for_department?: string,
    name?: string,
    popularity?: number,
    profile_path?: string
}

const styles: React.CSSProperties = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Ubuntu",
    textAlign: "center"
}

function CardLayoutPeoples({ adult, gender, id, known_for, known_for_department, name, popularity, profile_path }: cardProps) {
    return (
        <>
            <Card key={id} hoverable>
                <Descriptions title={name} layout="horizontal">
                    <Descriptions.Item label="Popularity">{popularity}</Descriptions.Item>
                    <Descriptions.Item label="Know for Department" >{known_for_department}</Descriptions.Item>

                </Descriptions>
            </Card>
        </>
    )
}

export default CardLayoutPeoples