import { useGlobalState } from "~/GlobalContext/global";
import Modal from "./Modal";
import { Show } from "solid-js";
import UploadModal from "./UploadModal";

export default function ProductPage() {
  const global = useGlobalState();
  return (
    <>
      <div class="p-[50px] gap-8 w-full flex flex-col">
        <div class="w-full flex flex-col gap-1">
          <div class="text-[14px] font-light">Name</div>
          <input
            type="text"
            placeholder="Some product"
            onChange={(e) => {}}
            class="border rounded-[4px] px-4 p-3 text-[14px] outline-none border-slate-400"
          />
        </div>
        <div class="w-full flex flex-col gap-1">
          <div class="text-[14px] font-light">Description</div>
          <input
            type="text"
            placeholder="Description"
            class="border rounded-[4px] px-4 p-3 text-[14px] outline-none border-slate-400"
          />
        </div>
        <div class="w-full flex flex-col gap-1">
          <div class="text-[14px] font-light">Url</div>
          <input
            type="text"
            placeholder="Url"
            class="border rounded-[4px] px-4 p-3 text-[14px] outline-none border-slate-400"
          />
        </div>
        <div
          onClick={() => {
            global.setShowUploadModal(true);
          }}
          class="text-[14px] bg-gray-200 px-6 p-2 rounded-[4px] select-none w-fit active:translate-y-0.5 active:-translate-x-0.5 transition-all hover:bg-gray-300"
        >
          Upload
        </div>
        <Show when={global.state.showUploadModal}>
          <Modal close={global.setShowUploadModal}>
            <UploadModal />
          </Modal>
        </Show>
      </div>
    </>
  );
}
