import React, { SFC } from "react";

import Guesses from "~/contexts/Guesses";
import SelectedNumber from "~/contexts/SelectedNumber";

interface AppProviderProps {
  selectedNumber: number;
  guesses: number;
}
const AppProvider: SFC<AppProviderProps> = ({
  children,
  selectedNumber,
  guesses
}) => (
  <SelectedNumber.Provider value={selectedNumber}>
    <Guesses.Provider value={guesses}>{children}</Guesses.Provider>
  </SelectedNumber.Provider>
);

export default AppProvider;
