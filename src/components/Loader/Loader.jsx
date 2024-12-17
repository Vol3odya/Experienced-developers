import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <ThreeDots
      visible={true}
      height="60"
      width="60"
      color="#407BFF"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      wrapperClass=""
    />
  );
}
