import { useNavigate } from "solid-start"
import Icon from "./Icon"

export default function Nav() {
  const navigate = useNavigate()
  return (
    <>
      <div class="h-[80px] font-mono flex text-[14px] bg-white items-center justify-between fixed top-0 left-0 w-screen px-10">
        <div class="flex gap-4">
          <div
            class="cursor-pointer"
            onClick={() => {
              navigate("/")
            }}
          >
            <Icon name="Store" />
          </div>
        </div>
        <div class="flex gap-4">
          <button onClick={() => navigate("/auth")} class="cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </>
  )
}
