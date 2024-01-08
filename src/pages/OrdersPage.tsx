import {useEffect, useState} from "react";
import {Row, Col, Input, Button, message, Table, Modal, List, Typography, Divider} from "antd";
import {AxiosError, AxiosResponse} from "axios";
import {getOrderById, getOrders} from "../services/OrderService.ts";
import {Order} from "../models/orders.ts";
import {InfoCircleFilled} from "@ant-design/icons";
import {getOrderTotal} from "../utils/helpers.ts";

const columns = [
  {
    title: 'Order #',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Order Total',
    dataIndex: 'totalCost',
    key: 'id',
    render: (item: number) => (
      <span>${item.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
    )
  }
]
const OrdersPage = () => {
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  const login = async () => {
    if (password.length > 0) {
      if (password !== 'every-realm') {
        message.error("Invalid Credentials");
        return;
      }
      localStorage.setItem("apiKey", password);
      setIsLoggedIn(true);
      await getAllOrders();
    }
  }

  const getAllOrders = async () => {
    setLoadingOrders(true);
    await getOrders().then((res: AxiosResponse) => {
      setOrders(res.data);
      console.log(res, "DATA")
      setLoadingOrders(false);
      return res
    }).catch((e: AxiosError) => {
      console.log(e);
      setLoadingOrders(false);
    })
  }

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    if (key) {
      setIsLoggedIn(true);
      getAllOrders();
    }
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <Row justify="center" align="middle" style={{height: '100vh'}}>
          <Col span={24}>
            <div className="text-center">
              <div style={{marginLeft: 300, marginRight: 300}}>
                <Input
                  style={{marginBottom: '8px', width: '100%', fontSize: '14px', padding: '8px'}}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  block
                  style={{width: '100%', fontSize: '14px', padding: '8px'}}
                  onClick={login}
                >
                  Employee Login
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <Row className="mt-5">
        <Col span={24}>
          {isLoggedIn && (
            <Table
              dataSource={orders}
              columns={columns}
              loading={loadingOrders}
              rowKey={(row) => row.id}
              onRow={(record) => {
                return {
                  onClick: () => {
                    getOrderById(record.id).then(res => {
                      setOrder(res.data);
                      console.log(order, "ORDER DATA")
                    }).catch((e) => {
                      console.log(e);
                      message.error("Error Retrieving order details.")
                    })
                  }
                };
              }}
            />
          )}
        </Col>
      </Row>

      <Modal
        title={(
          <div style={{display: 'inline-flex'}}>
            <InfoCircleFilled style={{color: "#1777ff", fontSize: 24}}/>
            <Typography style={{fontWeight: 'bold', fontSize: 24}} className="ms-2">Order Review</Typography>
          </div>
        )}
        open={!!order}
        onCancel={() => setOrder(null)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={order?.orderItems ?? []}
          renderItem={(item) => {
            return (
              <List.Item extra={`$${(item.burrito.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}>
                <List.Item.Meta
                  title={`${item.burrito.name} x${item.quantity}`}
                  description={`Size: ${item.burrito.size}`}
                />
              </List.Item>
            )
          }}
        />
        <Divider className="mt-3 mb-3"/>
        <div className="mb-3">
          <Typography style={{fontWeight: 'bold'}}>Order Total:</Typography>
          <Typography className="float-start">
            ${order?.orderItems ? getOrderTotal(order?.orderItems) : 0.00}
          </Typography>
        </div>
      </Modal>
    </>
  )
}

export default OrdersPage;