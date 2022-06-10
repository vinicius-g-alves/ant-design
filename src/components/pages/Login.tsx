import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const {Title} = Typography;

function Login() {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        <Link to={"/"}></Link>
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const styles: React.CSSProperties = {
        textAlign: "center",
        paddingTop: "2%"
    }

    const title: React.CSSProperties = {
        textAlign:"center",
        paddingTop:"5%",
        fontWeight:"bold",
        fontFamily:"Ubuntu",
        fontSize: 100,
        color: "lightblue"
    }

    return (
        <>
        <Title style={title}>APPMOOVIES</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={styles}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input size='large' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password size='large' />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" size='large' onClick={() => onFinish}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;