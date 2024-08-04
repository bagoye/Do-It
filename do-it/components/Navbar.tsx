import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: FC = () => {
  return (
    <nav>
      <Link href="/">
        <Image src="/Logo1.png" alt="로고" width={151} height={40} />
      </Link>
    </nav>
  );
};

export default Navbar;
