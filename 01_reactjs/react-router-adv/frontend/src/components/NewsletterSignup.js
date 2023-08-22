import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher(); // action, loader 트리거 hook. 페이지 전환을 하지 않음
  const { data, state } = fetcher; // action, loader 가 성공했는지 여부도 알려준다.

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
