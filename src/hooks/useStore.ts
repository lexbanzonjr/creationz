import { create } from "zustand";

interface DataState {}

const useStore = create<DataState>((set) => ({}));

export default useStore;
