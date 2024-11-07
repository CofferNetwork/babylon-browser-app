import {
  createRoutesFromElements,
  Route,
  createHashRouter,
} from "react-router-dom";
import Root from "./Root";
import Explorer from "./Explorer";
import ErrorPage from "./Error";
import Home from "./Home";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route errorElement={<ErrorPage />}>
        <Route path="address/:address" element={<Explorer />} />
        <Route index element={<Home />} />
      </Route>
    </Route>
  )
);

export default router;
