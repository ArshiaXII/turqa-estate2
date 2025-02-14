"use client"

import type React from "react"
import { useLogin } from "@refinedev/core"
import { Form, Input, Button, Card } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

const LoginForm: React.FC = () => {
  const [form] = Form.useForm()
  const { mutate: login } = useLogin()

  const onFinish = (values: any) => {
    login(values)
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 300 }}>
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h1>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm

