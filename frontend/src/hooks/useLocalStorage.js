import { useState, useEffect } from "react";

  /** 
 * Create local storage for token and user
 */

function useLocalStorage(key, firstValue = null) {

  const initialValue = localStorage.getItem(key) || firstValue;
  const [item, setItem] = useState(initialValue);

  // * Note I used this in clear local storage when I was getting a bunch of errors regarding 
  //   const user = JSON.parse(localStorage.getItem('user'));
  console.log("hitting local storage")
  // localStorage.clear();


  useEffect(function setKeyInLocalStorage() {

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}


export default useLocalStorage;

