import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">한줄코딩 밋업</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">모두보기</Link>
          </li>
          <li>
            <Link href="/new-meetup">밋업 추가</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
