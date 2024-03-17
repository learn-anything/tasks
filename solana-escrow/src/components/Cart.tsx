import { useGlobalState } from "~/GlobalContext/global";

export default function Cart() {
  const global = useGlobalState();
  return (
    <>
      <style>
        {`
        #Cart {
          animation: 0.1s CartSlideIn forwards ease-out
        }
        @keyframes CartSlideIn {
          0% {
            transform: translateX(400px)
          }
        }
      `}
      </style>
      <div class="fixed top-0 z-50 left-0 flex items-center justify-end w-screen h-screen">
        <div
          onClick={() => {
            global.setShowCart(false);
          }}
          class="fixed top-0 left-0 z-50 w-screen h-screen"
        ></div>
        <div id="Cart" class="w-[400px] bg-white h-full flex flex-col gap-3">
          <div
            id="ItemInCart"
            class="flex z-[60] bg-white w-full gap-3 p-3 border-b border-gray-100"
          >
            <div class="min-w-[80px] flex items-center justify-center h-[80px] bg-[#f9f8f6]">
              image
            </div>
            <div class="flex w-full py-2 justify-between gap-4">
              <div class="text-[14px]">name</div>
              <div class="font-light text-[12px] items-end justify-between flex flex-col">
                <div>$1250.00</div>
                <div class="opacity-40">REMOVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
