export default function StoreTopbar() {
  return (
    <>
      <div class="h-[100px] border-b-[0.5px] flex items-center border-gray-400 w-full">
        <div class="w-full h-full flex items-center justify-between p-6 px-8">
          <div class="text-[24px]">title</div>
          <div class="flex gap-2">
            <div class="rounded-[4px] border border-slate-400 flex items-center justify-center p-2 px-4">
              Search
            </div>
            <div class="p-2 px-4 rounded-[4px] border border-slate-400">
              New Product
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
