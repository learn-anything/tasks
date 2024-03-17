export default function UploadModal() {
  return (
    <>
      <div class="w-1/3 h-fit z-30 flex flex-col gap-4 bg-white border-gray-200 border rounded-lg p-4 px-5">
        <div class="flex flex-col gap-1">
          <div class="text-[18px]">Upload files</div>
          <div class="text-[#909090]">
            Select and upload the files of your choice
          </div>
        </div>
        <div class="border-2 border-dashed border-gray-200 rounded-[4px] h-[150px] w-full flex items-center justify-center">
          <div class="flex flex-col gap-1 items-center justify-center text-[14px]">
            <div class="">Choose a file or drag & drop it here.</div>
            <div class="text-[#909090] w-3/4 text-center font-light">
              JPEG, PNG, PDF and MP$ formats, up to 50 MB.
            </div>
            <div class="text-[#909090] font-semibold pt-1">Browse</div>
          </div>
        </div>
      </div>
    </>
  );
}
