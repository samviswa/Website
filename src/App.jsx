import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Home from "./components/home";
import LotteryInfo from "./components/Lotteryinfo/LotteryInfo";
import DailyGame from "./components/Game/DailyLotteryGame";
import WeeklyGame from "./components/Game/WeeklyLotteryGame";
import MonthlyGame from "./components/Game/MonthlyLotteryGame";
import Profile from "./components/profile/Profile"
import Admin from "./components/profile/Admin"
import MyTickets from "./components/MyTickets/MyTickets";
import FAQSection from "./components/FAQ/FAQsection";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/lottery-info",
      element: <LotteryInfo />,
    },
    {
      path: "/daily",
      element: <DailyGame />,
    },
    {
      path: "/weekly",
      element: <WeeklyGame />,
    },
    {
      path: "/monthly",
      element: <MonthlyGame />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/mytickets",
      element: <MyTickets />,
    },
    {
      path: "/faq",
      element: <FAQSection />,
    },
  ];
  
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
