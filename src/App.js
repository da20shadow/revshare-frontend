import {Footer, Header} from "./components";
import {Route, Routes, Navigate} from "react-router-dom";
import {
    Account, AdminPanel,
    Contact,
    Deposit, DepositHistory,
    Edit,
    Faq,
    Home,
    How,
    Login, Marketplace,
    News, PromoTools,
    Register, ReturnsHistory,
    Rules, SellShares,
    Withdrawal, WithdrawalHistory
} from "./pages";
import Affiliates from "./pages/Affiliates";
import {useStateContext} from "./context/ContextProvider";
import {
    AddNews, EditProcessors,
    ManageNews, ManageUsers,
    PendingDeposits,
    PendingWithdrawals,
    ProfitHistory,
    ShareProfit
} from "./pages/AdminPanel/Components";

function App() {
    const {user,isLogged} = useStateContext();
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
              <Route path={'/deposit-history'} element={isLogged ? <DepositHistory /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/withdrawal'} element={isLogged ? <Withdrawal /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/withdrawal-history'} element={isLogged ? <WithdrawalHistory /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/returns-history'} element={isLogged ? <ReturnsHistory /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/sell-shares'} element={isLogged ? <SellShares /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/marketplace'} element={isLogged ? <Marketplace /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/news'} element={<News />} />
              <Route path={'/faq'} element={<Faq />} />
              <Route path={'/rules'} element={<Rules />} />
              <Route path={'/how'} element={<How />} />
              <Route path={'/contact'} element={<Contact />} />
              <Route path={'/ref=:id'} element={<Register />} />
              <Route path={'/scradminpanel'} element={user.role === 1 ? <AdminPanel /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/add-news'} element={user.role === 1 ? <AddNews /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/manage-news'} element={user.role === 1 ? <ManageNews /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/manage-users'} element={user.role === 1 ? <ManageUsers /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/pending-deposits'} element={user.role === 1 ? <PendingDeposits /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/pending-withdrawals'} element={user.role === 1 ? <PendingWithdrawals /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/share-dividends'} element={user.role === 1 ? <ShareProfit /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/dividends-history'} element={user.role === 1 ? <ProfitHistory /> : <Navigate to="/login" replace={true} />} />
              <Route path={'/scradminpanel/edit-processors'} element={user.role === 1 ? <EditProcessors /> : <Navigate to="/login" replace={true} />} />
          </Routes>
          <Footer />
      </>
  );
}

export default App;
