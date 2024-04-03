import { createContext } from "react";
import { useState } from "react";

export let AuthContext = createContext(0);

export default function AuthContextProvider(props) {
  const [userData, setUserdata] = useState(null);

  return (
    <AuthContext.Provider value={{ userData, setUserdata }}>
      {props.children}
    </AuthContext.Provider>
  );
}




