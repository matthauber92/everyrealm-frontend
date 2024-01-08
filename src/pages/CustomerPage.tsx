import {useEffect, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {Row, Col, message} from "antd";
import {Burrito} from "../models/burrito.ts";
import {OrderItem} from "../models/orders.ts";
import BurritoCard from "../components/BurritoCard.tsx";
import Checkout from "../components/Checkout.tsx";
import {createOrder} from "../services/OrderService.ts";
import {getBurritos} from "../services/BurritoService.ts";

const CustomerPage = () => {
  const [burritos, setBurritos] = useState<Burrito[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    getBurritos().then((res: AxiosResponse) => {
      setBurritos(res.data);
    }).catch((e: AxiosError) => {
      console.log(e);
    });
  }, []);

  const handleCheckout = (cost: number) => {
    const order = {
      orderItems,
      totalCost: cost
    }

    createOrder(order).then(() => {
      setOrderItems([]);
      message.success("Order has been placed.")
    }).catch((e: AxiosError) => {
      console.log(e);
      message.error("Error placing order. Please try again.")
    });
  }

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
                    id={burrito.id}
                    name={burrito.name}
                    orderItems={orderItems}
                    burritoInfo={burritos.filter(x => x.name === burrito.name)}
                    addBurrito={(value: Burrito, quantity) => {
                      setOrderItems(prevOrderItems => {
                        const updatedOrderItems = prevOrderItems.map(item => {
                          if (item.burrito.name === value.name && item.burrito.size === value.size) {
                            return {
                              ...item,
                              quantity: quantity,
                              options: []
                            };
                          }
                          return item;
                        });

                        const newItem = {
                          quantity: quantity,
                          burrito: value,
                          options: []
                        };

                        if (!updatedOrderItems.some(item => item.burrito.name === value.name && item.burrito.size === value.size)) {
                          updatedOrderItems.push(newItem);
                        }

                        return updatedOrderItems;
                      });
                    }}
                    removeBurrito={(name, size, quantity) => {
                      setOrderItems(prevOrderItems => {
                        const updatedOrderItems = prevOrderItems.map(item => {
                          if (item.burrito.name === name && item.burrito.size === size) {
                            item.quantity = quantity > 0 ? quantity : 0;
                          }
                          return item;
                        });

                        // Filter out items with quantity 0
                        const filteredOrderItems = updatedOrderItems.filter(item => !(item.quantity === 0));

                        return filteredOrderItems;
                      });
                    }}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <Col span={12}>
          <Checkout
            items={orderItems}
            handleCheckout={(val: string) => handleCheckout(parseFloat(val))} />
        </Col>
      </Row>
    </div>
  )
}

export default CustomerPage