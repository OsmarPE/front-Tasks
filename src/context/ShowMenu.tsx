

// showMenuContext.tsx
import { ShowMenuContextType } from '@/types';
import React, { createContext, useState, ReactNode } from 'react';



// Crear el contexto con un valor inicial
export const ShowMenuContext = createContext<ShowMenuContextType | undefined>(undefined);

// Crear el proveedor de contexto
export const ShowMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  return (
    <ShowMenuContext.Provider value={{ showMenu, toggleMenu }}>
      {children}
    </ShowMenuContext.Provider>
  );
};

// Hook para usar el contexto en componentes
