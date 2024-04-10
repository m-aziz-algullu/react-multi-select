"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import MultiSelect from "@/components/MultiSelect";
import { NavigationProvider as NavigationContextProvider } from "@/context/navigationContext";

export default function Home() {
  return (
    <ReduxProvider store={store}>
      <NavigationContextProvider>
        <main>
          <div className="multi-select-container">
            <MultiSelect />
          </div>
        </main>
      </NavigationContextProvider>
    </ReduxProvider>
  );
}
