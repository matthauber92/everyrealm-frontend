import {Row, Col, Card, Select, Typography} from "antd";
import {Burrito} from "../models/burrito.ts";
import {useEffect, useState} from "react";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {OrderItem} from "../models/orders.ts";

interface BurritoCardProps {
  id: string;
  name: string;
  burritoInfo: Burrito[];
  orderItems: OrderItem[];
  addBurrito: (data: Burrito, quantity: number) => void;
  removeBurrito: (burritoName: string, size: string, quantity: number) => void;
}

const sizes = ['REGULAR', 'MEDIUM', 'LARGE', 'XL'];
const BurritoCard = ({id, name, burritoInfo, orderItems, addBurrito, removeBurrito}: BurritoCardProps) => {
  const defaultPrice = burritoInfo.filter(x => x.size === 'REGULAR')[0]?.price.toLocaleString(undefined, { minimumFractionDigits: 2 });
  const [price, setPrice] = useState<string>(defaultPrice)
  const [selectedSize, setSelectedSize] = useState<string>("REGULAR");
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity)
    const newBurrito: Burrito = {
      id,
      name,
      size: selectedSize,
      price: Number(price)
    }
    addBurrito(newBurrito, newQuantity);
  }

  const handleChange = (val: string) => {
    const size = val;
    const price = burritoInfo.filter(x => x.size === size)[0];
    setSelectedSize(size);
    setPrice(price.price.toLocaleString(undefined, { minimumFractionDigits: 2 }));
    setQuantity(0);
  }

  useEffect(() => {
    if(orderItems.length === 0) {
      setQuantity(0);
    }
  }, [orderItems]);

  return (
    <Card
      title={name}
      bordered={false}
      hoverable
      extra={(
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <MinusCircleOutlined style={{fontSize: 24}} onClick={async () => {
              const newQuantity = quantity > 0 ? quantity - 1 : 0;
              setQuantity(newQuantity);
              removeBurrito(name, selectedSize, newQuantity);
            }} />
          </Col>
          <Col span={8} className="text-center">
            <Typography>{quantity}</Typography>
          </Col>
          <Col span={8}>
            <PlusCircleOutlined style={{fontSize: 24}} onClick={() => handleAdd()} />
          </Col>
        </Row>
      )}
    >
      <Row>
        <Col span={12}>
          <Typography className="me-2">Size:</Typography>
          <Select
            defaultValue="REGULAR"
            style={{width: 120}}
            onChange={handleChange}
            options={sizes.map((x: string) => ({
              value: x,
              label: x
            }))}
          />
        </Col>
        <Col span={12}>
          <Typography>Price:</Typography>
          <span style={{fontWeight: 'bold'}}>${price}</span>
        </Col>
      </Row>
    </Card>
  )
}

export default BurritoCard;
