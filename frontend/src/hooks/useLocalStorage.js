import { useState, useEffect } from "react";

  /** Create local storage for token  */

// function localStorage(key, firstValue = null) {
//   const initialValue = localStorage.getItem(key) || firstValue;

//   const [item, setItem] = useState(initialValue);

//   useEffect(function setKeyInLocalStorage() {

//     if (item === null) {
//       localStorage.removeItem(key);
//     } else {
//       localStorage.setItem(key, item);
//     }
//   }, [key, item]);

//   return [item, setItem];
// }s

function useLocalStorage(key, firstValue = null) {
  console.log("localStorage.getItem(key):", localStorage.getItem(key))
  console.log("localStorage.getItem(key):", typeof localStorage.getItem(key))

  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}


export default useLocalStorage;

// const [value, setValue] = useState(() =>


// localStorage.getItem(key) || initialValue);
//   useEffect(() => {
//     localStorage.setItem(key, value);
//   }, [key, value]);
//   return [value, setValue];
