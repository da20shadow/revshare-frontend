import {Footer, Header} from "./components";
import {Route, Routes, Navigate} from "react-router-dom";
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
import {useStateContext} from "./context/ContextProvider";

function App() {
    const {isLogged} = useStateContext();
  return (
      <>
          <Header />
          <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
              <Route path={'/account'} element={isLogged ? <Account /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/affiliates'} element={isLogged ? <Affiliates /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/promo-tools'} element={isLogged ? <PromoTools /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/edit'} element={isLogged ? <Edit /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/deposit'} element={isLogged ? <Deposit /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/withdrawal'} element={isLogged ? <Withdrawal /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/buy-shares'} element={isLogged ? <BuyShares /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/sell-shares'} element={isLogged ? <SellShares /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/marketplace'} element={isLogged ? <Marketplace /> : <Navigate to="/login" replace={true} />} />
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
