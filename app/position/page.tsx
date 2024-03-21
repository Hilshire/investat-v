'use client';

import { Button, Checkbox, Form, type FormProps, Input } from 'antd';

type FieldType = {
    code?: string
    snowballCode?: string
    cost?: number
    price?: number
    count?: number
};

export default function position() {
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <div>
        <Form
            name="createPositionA"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="股票代码"
                name="code"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="雪球代码"
                name="snowballCode"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="成本"
                name="cost"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="成本价"
                name="price"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="持股数"
                name="count"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}