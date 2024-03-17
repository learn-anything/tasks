import { Match, Switch } from "solid-js";
import { useGlobalState } from "~/GlobalContext/global";
import ProductPage from "~/components/ProductPage";
import StoreSidebar from "~/components/StoreSidebar";
import StoreTopbar from "~/components/StoreTopbar";

export default function Home() {
  const global = useGlobalState();
  return (
    <>
      <div class="h-full w-screen flex dark:text-white text-black bg-white  min-h-screen ">
        <StoreSidebar />
        <div class="ml-[250px] w-full">
          <StoreTopbar />
          <Switch>
            <Match when={global.state.currentStorePage === "Product"}>
              <ProductPage />
            </Match>
          </Switch>
        </div>
      </div>
    </>
  );
}
