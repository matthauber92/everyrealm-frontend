import AppLayout from "@common/AppLayout.tsx";
import {Route, Routes} from "react-router-dom";
import CustomerPage from "@pages/CustomerPage.tsx";
import OrdersPage from "@pages/OrdersPage.tsx";
import "./App.css";

function App() {

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
