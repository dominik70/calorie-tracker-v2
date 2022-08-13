import {
  useContext,
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { startOfDay } from 'date-fns';

interface Context {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DateContext = createContext<Context | null>(null);
export const useDate = () => {
  const context = useContext(DateContext);

  if (context === null) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState(startOfDay(new Date()));

  const value = useMemo(() => ({ date, setDate }), [date]);

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
