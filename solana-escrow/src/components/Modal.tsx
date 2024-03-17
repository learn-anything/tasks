import { useGlobalState } from "~/GlobalContext/global";

interface Props {
  children: any;
  close: (boolean: boolean) => void;
}

export default function Modal(props: Props) {
  const global = useGlobalState();
  return (
    <>
      <div class="fixed top-0 left-0 w-screen  h-screen bg-white bg-opacity-10 transition-all">
        <div
          class="fixed top-0 left-0 w-screen h-screen"
          onClick={() => {
            props.close(false);
          }}
        ></div>
        <div class="w-full h-full flex items-center justify-center">
          {props.children}
        </div>
      </div>
    </>
  );
}
