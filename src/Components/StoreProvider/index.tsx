import { FC, ReactNode, useMemo } from 'react';
import store, { StoreContext } from '../../Store';

interface StoreProviderProps {
  children?: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const storeObj = useMemo(() => store.create({}), []);

  return <StoreContext.Provider value={storeObj}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
