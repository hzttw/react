import React, { useState ,useContext} from 'react';
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};


const  AuthContext = React.createContext()
export function AuthProvider({children}) {
  const [user,setUser] = useState(null)
  const signin = (newUser,callback)=>{
    setUser(newUser)
    callback()
  }
  const sigout = (callback)=>{
    setUser(null)
    callback()
  }
  let value = {user,signin,sigout}
  return <AuthContext.Provider value={value} children={children}></AuthContext.Provider>
}
export function useAuth() {
  return useContext(AuthContext);
  
}