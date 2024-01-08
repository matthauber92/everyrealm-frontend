import {useEffect, useState} from "react";
import {BurritoService} from "./services";
import {AxiosError, AxiosResponse} from "axios";
import {Row, Col} from "antd";
import {Burrito} from "./models/burrito.ts";
import BurritoCard from "./BurritoCard.tsx";
import {OrderItem} from "./models/orders.ts";

const CustomerPage = () => {
  const [burritos, setBurritos] = useState<Burrito[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    BurritoService.getBurritos().then((res: AxiosResponse) => {
      console.log(res, "BURRITOS")
      setBurritos(res.data);
    }).catch((e: AxiosError) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="m-3">
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            {burritos
              .filter((burrito, index, self) => self.findIndex(b => b.name === burrito.name) === index)
              .map((burrito, idx) => (
                <Col span={24} key={`${burrito.name}-${idx}`}>
                  <BurritoCard
                    name={burrito.name}
                    burritoInfo={burritos.filter(x => x.name === burrito.name)}
                    addBurrito={(value: Burrito) => {
                      let item = orderItems.filter(x => x.burrito.name === value.name && x.burrito.size === value.size)[0];
                      const newOrderItems = orderItems.filter(x => x.burrito.name !== value.name && x.burrito.size !== value.size);

                      const orderItem = {
                        quantity: item.quantity + 1,
                        burrito: value
                      }
                      setOrderItems([
                        ...newOrderItems,
                        orderItem
                      ]);
                    }}
                    removeBurrito={(name, size) => {
                      let orderItem = orderItems.filter(x => x.burrito.name === name && x.burrito.size === size)[0];

                      if(orderItem.quantity > 0) {
                        orderItem.quantity = orderItem.quantity - 1;
                        let newOrderItems = orderItems.filter(x => x.burrito.name !== orderItem.burrito.name && x.burrito.size !== orderItem.burrito.size);

                        setOrderItems([
                            ...newOrderItems,
                          orderItem
                        ]);
                        console.log(orderItems)
                      }
                    }}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CustomerPage