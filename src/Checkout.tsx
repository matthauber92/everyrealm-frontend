import {OrderItem} from "./models/orders.ts";
import {List, Card, Divider, Typography, Button, Modal} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
const { confirm } = Modal;

interface CheckoutProps {
  items: OrderItem[];
  handleCheckout: (cost: string) => void;
}

interface Burritos {
  key: string;
  quantity: number;
  price: number;
  total: number;
}

// group together burritos and added up total cost
const getTotalPrice = (items: OrderItem[]) => {
  const allBurritos: Burritos[] = items.map((orderItem: OrderItem)=> {
    const { name, size, price } = orderItem.burrito;
    const key = `${name}-${size}`;
    return { key, quantity: orderItem.quantity, price, total: orderItem.quantity * price };
  });
  return allBurritos.reduce((sum, group) => sum + group.total, 0);
}

const Checkout = ({items, handleCheckout}: CheckoutProps) => {

  const showConfirm = (totalCost: string) => {
    confirm({
      title: 'Ready to checkout?',
      icon: <ShoppingCartOutlined />,
      content: `Total Checkout Cost: $${totalCost}`,
      onOk() {
        handleCheckout(totalCost);
      }
    });
  };

  return (
    <Card
      title="Burrito Checkout"
      bordered={false}
      hoverable
    >
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={`${item.burrito.name} x${item.quantity}`}
                description={`Size: ${item.burrito.size}`}
              />
              <div className="float-end">
                <Typography>Price: ${items
                  .filter(x => x.burrito.name === item.burrito.name && x.burrito.size === item.burrito.size)
                  .map((z) => z.burrito.price)
                  .reduce((acc, curr) => acc + curr, 0) * item.quantity}</Typography>
              </div>
            </List.Item>
          )
        }}
      />
      <Divider className="mt-3 mb-3"/>
      <Typography style={{fontWeight: 'bold'}}>Total:</Typography>
      <Typography className="float-start">
        Total: ${getTotalPrice(items).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Typography>
      <Button
        className="float-end"
        disabled={items.length === 0}
        onClick={ () => showConfirm(getTotalPrice(items).toLocaleString(undefined, { minimumFractionDigits: 2 }))}
      >Checkout</Button>
    </Card>
  )
}

export default Checkout;