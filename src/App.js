import {Footer, Header} from "./components";
import {Route, Routes} from "react-router-dom";
import {
    Account,
    BuyShares,
    Contact,
    Deposit,
    Edit,
    Faq,
    Home,
    How,
    Login, Marketplace,
    News, PromoTools,
    Register,
    Rules, SellShares,
    Withdrawal
} from "./pages";
import Affiliates from "./pages/Affiliates";

function App() {
  return (
      <>
          <Header />
          <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
              <Route path={'/account'} element={<Account />} />
              <Route path={'/affiliates'} element={<Affiliates />} />
              <Route path={'/promo-tools'} element={<PromoTools />} />
              <Route path={'/edit'} element={<Edit />} />
              <Route path={'/deposit'} element={<Deposit />} />
              <Route path={'/withdrawal'} element={<Withdrawal />} />
              <Route path={'/buy-shares'} element={<BuyShares />} />
              <Route path={'/sell-shares'} element={<SellShares />} />
              <Route path={'/marketplace'} element={<Marketplace />} />
              <Route path={'/news'} element={<News />} />
              <Route path={'/faq'} element={<Faq />} />
              <Route path={'/rules'} element={<Rules />} />
              <Route path={'/how'} element={<How />} />
              <Route path={'/contact'} element={<Contact />} />
          </Routes>
          <Footer />
      </>
  );
}

export default App;
