// import { Spinner } from "react-bootstrap";

// const Loader = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <Spinner
//         animation="border"
//         role="status"
//         style={{
//           width: "75px",
//           height: "75px",
//         }}
//       />
//     </div>
//   );
// };

// export default Loader;

// Old if someday it creates some error
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "75px",
        height: "75px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};
export default Loader;
