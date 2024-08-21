import loading from "../assets/images/loading.svg";

function Loading() {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div data-testid="loading-message" className="spinner">
      <img src={loading} alt="Loading" />
    </div>
  );
}

export default Loading;
