import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import auth from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  //register
  const handleRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const handleLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //login with google
  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //log out
  const handleLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //profile update
  const handleUpdate = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //manage user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {

        const email = {email: currentUser.email}

        axios.post(`${import.meta.env.VITE_URL}/jwt`, email, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data)

          setLoading(false);
        }
        )

        // console.log(currentUser);
      } else {
        axios.get(`${import.meta.env.VITE_URL}/logout`, {withCredentials: true}).then((res) => {
          console.log("log out", res.data)
          setLoading(false);
        }
        )
        
      }

    });


    return () => {
      return unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    handleRegister,
    loading,
    handleLogin,
    handleGoogleLogin,
    handleLogOut,
    handleUpdate,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
