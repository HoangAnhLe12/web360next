import create from 'zustand';

interface Item {
   id: number;
   title: string;
   description: string;
   thumbnail: string;
   audio: string;
}

interface ItemStore {
   items: Item[];
   addItem: (item: Item) => void;
}

const useItemStore = create<ItemStore>((set) => ({
   items: [],
   addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));

export default useItemStore;
