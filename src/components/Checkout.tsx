import {OrderItem} from "@models/orders.ts";
import {List, Card, Divider, Typography, Button, Modal} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {getOrderTotal} from "@utils/helpers.ts";
const { confirm } = Modal;

interface CheckoutProps {
  items: OrderItem[];
  handleCheckout: (cost: string) => void;
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
        Order Total: ${getOrderTotal(items)}
      </Typography>
      <Button
        className="float-end"
        disabled={items.length === 0}
        onClick={ () => showConfirm(getOrderTotal(items))}
      >Checkout</Button>
    </Card>
  )
}

export default Checkout;