import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
    return () => {};
  }, [session, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return !session && <AuthForm />;
}

export default AuthPage;
