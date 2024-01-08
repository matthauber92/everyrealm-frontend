import AppLayout from "./common/AppLayout.tsx";
import {Route, Routes} from "react-router-dom";
import CustomerPage from "./CustomerPage.tsx";
import OrdersPage from "./OrdersPage.tsx";

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
