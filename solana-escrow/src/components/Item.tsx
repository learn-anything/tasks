import { useGlobalState } from "~/GlobalContext/global"
import { getAdapter } from "~/lib/solana/adapter"

interface Props {
  name: string
  price: string
  image?: string
  onClick?: () => void
}

export default function Item(props: Props) {
  const global = useGlobalState()
  return (
    <>
      <div
        onClick={async () => {
          global.setShowItemInfo(true)
        }}
        class="flex flex-col gap-2 pb-10"
      >
        <div class="cursor-pointer h-[48vh] w-full bg-gray-100 dark:bg-neutral-800 "></div>
        <div class="flex justify-between items-center px-4">
          <div class="font-mono text-[14px]">{props.name}</div>
          <div class="text-[12px] font-light">$150.00</div>
        </div>
      </div>
    </>
  )
}
