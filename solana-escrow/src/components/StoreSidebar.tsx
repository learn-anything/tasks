import clsx from "clsx";
import { useGlobalState } from "~/GlobalContext/global";

export default function StoreSidebar() {
  const global = useGlobalState();
  return (
    <>
      <div
        id="SellSidebar"
        class="min-w-[250px] justify-between font-light text-white flex flex-col bg-black h-screen fixed left-0 top-0"
      >
        <div>
          <div class="border-b-[0.5px] text-[24px] font-semibold min-h-[100px] flex items-center justify-center">
            Learn Anything
          </div>
          <div
            class={clsx(
              "p-3 px-4 border-y-[0.5px] border-gray-400 transition-all",
              global.state.currentStorePage === "Home" && "text-purple-500"
            )}
            onClick={() => {
              global.setCurrentStorePage("Home");
            }}
          >
            Home
          </div>
          <div
            class={clsx(
              "p-3 px-4 border-y-[0.5px] border-gray-400 transition-all",
              global.state.currentStorePage === "Product" && "text-purple-500"
            )}
            onClick={() => {
              global.setCurrentStorePage("Product");
            }}
          >
            Products
          </div>
          <div class="p-3 px-4 border-y-[0.5px] border-gray-400">Checkout</div>
        </div>
        <div>
          <div class="p-3 px-4 border-y-[0.5px] border-gray-400">Help</div>
          <div class="p-3 px-4 border-t-[0.5px] border-gray-400">Settings</div>
        </div>
      </div>
    </>
  );
}
