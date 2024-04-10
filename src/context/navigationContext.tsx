import React, { createContext, RefObject, useContext, useRef } from "react";

interface INavigationContextProps {
  selectedCharactersContainerRef: RefObject<HTMLDivElement>;
  modalRef: RefObject<HTMLDivElement>;
  selectedCharactersContainerDivRef: RefObject<HTMLDivElement>;
}

const NavigationContext = createContext<INavigationContextProps>(
  {} as INavigationContextProps
);

export function NavigationProvider({ children }: any) {
  const selectedCharactersContainerRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const selectedCharactersContainerDivRef = useRef<HTMLDivElement>(null);

  const values = {
    selectedCharactersContainerRef,
    modalRef,
    selectedCharactersContainerDivRef,
  };

  return (
    <NavigationContext.Provider value={values}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
