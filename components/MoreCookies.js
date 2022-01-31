import dynamic from "next/dynamic";
const CookieClicker = dynamic(() => import("react-cookie-clicker"), {
  ssr: false
});

const MoreCookies = () => {
  return (
    <div style={{ marginTop: 150 }}>
      <CookieClicker />
      <h2>Click the cookie</h2>
    </div>
  );
};

export default MoreCookies;