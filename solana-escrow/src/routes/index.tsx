import { Show } from "solid-js";
import { useGlobalState } from "~/GlobalContext/global";
import Cart from "~/components/Cart";
import ItemInfo from "~/components/ItemInfo";
import ItemsPage from "~/components/ItemsPage";
import Nav from "~/components/Nav";

export default function Home() {
  const global = useGlobalState();
  return (
    <>
      <div class="h-full w-screen mt-[80px] dark:text-white text-black bg-white dark:bg-neutral-900 p-2 min-h-screen ">
        <Show when={global.state.showCart}>
          <Cart />
        </Show>
        <Nav />
        <div id="hamburger" class="text-[12px] font-light h-[60px] px-8">
          <span class="text-black dark:text-white text-opacity-50">
            All jewelery Collection /{" "}
          </span>
          <span class="font-normal">Featured</span>
        </div>
        <ItemsPage />
        <Show when={global.state.showItemInfo}>
          <ItemInfo />
        </Show>
      </div>
    </>
  );
}
