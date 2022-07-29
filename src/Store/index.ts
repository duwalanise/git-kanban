import { Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import Issues from './Issues';

const Store = types.model({
  issues: types.optional(Issues, {}),
});

export default Store;

export type StoreInstance = Instance<typeof Store>;

export const StoreContext = createContext({} as StoreInstance);

export const useStore = () => useContext(StoreContext);
