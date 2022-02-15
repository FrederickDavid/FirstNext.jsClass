import "../styles/globals.css";
import HeaderComponent from "../pages/components/HeaderComponent";
import Main from "./components/Main";

function MyApp({ Component, pageProps }) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
