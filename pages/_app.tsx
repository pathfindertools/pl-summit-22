import "../styles.css";

const App = ({ Component, pageProps }) => {
  return (
    // <TinaProvider>
      <Component {...pageProps} />
    // </TinaProvider>
  );
};

export default App;
