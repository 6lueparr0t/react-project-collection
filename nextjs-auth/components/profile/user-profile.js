// import { useSession, getSession } from "next-auth/react";
// import { useEffect, useState } from "react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // v3 loading 이 동작하지 않을 때 썼던 임시 코드
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();

  // useEffect(() => {
  //   getSession().then(session => {
  //     setLoadedSession(session);
  //     setIsLoading(false);
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // Client Side Process
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  // // Redirect away if NOT auth
  // useEffect(() => {
  //   if (!session) {
  //     window.location.href = '/auth';
  //   }
  // }, []);
  
  // // isLoading 으로도 동작한다.
  // // if (isLoading) {
  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type" : "application/json"
      }
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
