import { Card, Col, Row } from "antd"
import Meta from "antd/lib/card/Meta";

function Home() {


    return (
        <Row gutter={16}>


            <Col className="gutter-row" span={6}>
                <Card
                    hoverable
                    style={{ width: 340 }}
                    cover={<img alt="example" src={`https://picsum-photos.translate.goog/200/300?_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR`} />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Col>

            <Col className="gutter-row" span={6}>
                <Card
                    hoverable
                    style={{ width: 340 }}
                    cover={<img alt="example" src={`https://picsum-photos.translate.goog/200/300?_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR`} />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Col>

            <Col className="gutter-row" span={6}>
                <Card
                    hoverable
                    style={{ width: 340 }}
                    cover={<img alt="example" src={`https://picsum-photos.translate.goog/200/300?_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR`} />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Col>

            <Col className="gutter-row" span={6}>
                <Card
                    hoverable
                    style={{ width: 340 }}
                    cover={<img alt="example" src={`https://picsum-photos.translate.goog/200/300?_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR`} />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Col>

        </Row>
    )
}

export default Home