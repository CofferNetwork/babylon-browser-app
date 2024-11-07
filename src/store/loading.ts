import { create } from "zustand";

interface LoadingState {
  showLoading: () => void;
  hideLoading: () => void;
  loading: boolean;
}

export const useLoadingStore = create<LoadingState>()((set) => ({
  loading: false,

  showLoading: () => {
    set(() => ({ loading: true }));
  },
  hideLoading: () => {
    set(() => ({ loading: false }));
  },
}));

export const useLoading = () => {
  const hideLoading = useLoadingStore((state) => state.hideLoading);
  const showLoading = useLoadingStore((state) => state.showLoading);

  return {
    hide: hideLoading,
    show: showLoading,
  };
};
