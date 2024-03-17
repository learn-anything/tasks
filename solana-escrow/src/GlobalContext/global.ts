import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

interface Product {
  name: string;
  description?: string;
  imageUrl?: string;
  websiteUrl?: string;
  priceInUsd: number;
}
type GlobalState = {
  expandItemId?: string;
  showItemInfo: boolean;
  showCart: boolean;
  products: Product[];
  currentStorePage: StorePages;
  showUploadModal: boolean;
};
type StorePages = "Product" | "Home";

// various global state
export function createGlobalState() {
  const [state, setState] = createStore<GlobalState>({
    showItemInfo: false,
    showCart: false,
    products: [{ name: "Ring", priceInUsd: 300 }],
    currentStorePage: "Product",
    showUploadModal: false,
  });

  return {
    state,
    setShowUploadModal: (boolean: boolean) => {
      setState({ showUploadModal: boolean });
    },
    setShowItemInfo: (boolean: boolean) => {
      setState({ showItemInfo: boolean });
    },
    setCurrentStorePage: (page: StorePages) => {
      setState({ currentStorePage: page });
    },
    setShowCart: (boolean: boolean) => {
      setState({ showCart: boolean });
    },
    set: setState,
  } as const;
}

const GlobalStateCtx = createContext<ReturnType<typeof createGlobalState>>();

export const GlobalStateProvider = GlobalStateCtx.Provider;

export const useGlobalState = () => {
  const ctx = useContext(GlobalStateCtx);
  if (!ctx) throw new Error("useGlobalState must be used within UserProvider");
  return ctx;
};
