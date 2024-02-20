import { Avatar } from "./Avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import styles from "./index.module.css";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";

export default function ActiveUsers() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoizedUsers = useMemo(
    () => (
      <main className="flex items-center justify-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && (
            <Avatar
              name="You"
              otherStyles="border-[3px] border-primary-green"
            />
          )}

          {users.slice(0, 3).map(({ connectionId }) => {
            return (
              <Avatar
                key={connectionId}
                name={generateRandomName()}
                otherStyles="-ml-3"
              />
            );
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}

          {/* {currentUser && (
      <div className="relative ml-8 first:ml-0">
        <Avatar src={currentUser.info.avatar} name="You" />
      </div>
    )} */}
        </div>
      </main>
    ),
    [users.length]
  );

  return memoizedUsers;
}
