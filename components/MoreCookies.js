import dynamic from "next/dynamic";
import { useScoreboard } from "../hooks";
const CookieClicker = dynamic(() => import("react-cookie-clicker"), {
  ssr: false
});

const MoreCookies = () => {
  const [count, increment] = useScoreboard();

  return (
    <div style={{ marginTop: 150 }}>
      <CookieClicker count={count} onClick={increment} />
      <h2>Click the cookie</h2>
    </div>
  );
};

export default MoreCookies;