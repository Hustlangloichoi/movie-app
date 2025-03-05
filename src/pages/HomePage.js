import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // const auth = useAuth();
  // let navigate = useNavigate();

  // if (!auth.user) {
  //   return <p></p>;
  // }

  return (
    <div>
      <h1>Đây mới là homepage - add list phim vào đây nha</h1>
    </div>
  );
}

export default HomePage;
