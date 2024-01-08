import {Row, Col, Card, Select, Typography} from "antd";
import {Burrito, BurritoSize} from "./models/burrito.ts";
import {useState} from "react";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";

interface BurritoCardProps {
  name: string;
  burritoInfo: Burrito[];
  addBurrito: (data: Burrito) => void;
  removeBurrito: (burritoName: string, size: string) => void;
}

const BurritoCard = ({name, burritoInfo, addBurrito, removeBurrito}: BurritoCardProps) => {
  const sizes: string[] = burritoInfo.map(x => x.size);
  const defaultPrice = burritoInfo.filter(x => x.size === 'REGULAR')[0]?.price.toLocaleString(undefined, { minimumFractionDigits: 2 });
  const [price, setPrice] = useState<string>(defaultPrice)
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quanity, setQuantity] = useState<number>(0);

  const handleAdd = () => {
    setQuantity(quanity + 1)
    const newBurrito: Burrito = {
      name,
      size: selectedSize as BurritoSize,
      price: Number(price),
    }
    addBurrito(newBurrito);
  }

  const handleChange = (val: string) => {
    const size = val;
    const price = burritoInfo.filter(x => x.size === size)[0];
    setSelectedSize(size);
    setPrice(price.price.toLocaleString(undefined, { minimumFractionDigits: 2 }));
    setQuantity(0);
  }

  return (
    <Card
      title={name}
      bordered={false}
      hoverable
      extra={(
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <MinusCircleOutlined style={{fontSize: 24}} onClick={() => {
              quanity > 0 && setQuantity(quanity - 1);
              removeBurrito(name, selectedSize);
            }} />
          </Col>
          <Col span={8} className="text-center">
            <Typography>{quanity}</Typography>
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
