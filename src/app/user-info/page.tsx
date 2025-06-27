import { auth } from "@/auth";
import Image from "next/image";
import styles from '../ui/lecture.module.css';

export default async function UserInfo() {
  const session = await auth();
  return (
    <div className={styles.main}>
      <h1> Paniieheal User Info </h1>
      <p> User signed with name: {session?.user?.name} </p>
      <p> User signed with e-mail: {session?.user?.email} </p>
      {session?.user?.image && (
        <Image 
          src={session.user.image}
          width={48}
          height={48}
          alt={session.user.name ?? "Avatar"}
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}