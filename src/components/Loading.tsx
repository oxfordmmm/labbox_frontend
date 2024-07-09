import loading from "../assets/images/loading.svg";

function Loading() {
  return (
    <div className="spinner">
      <img src={loading} alt="Loading" />
    </div>
  );
}

export default Loading;
