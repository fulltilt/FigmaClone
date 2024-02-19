import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback } from "react";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((evt: React.PointerEvent) => {
    evt.preventDefault();

    const x = evt.clientX - evt.currentTarget.getBoundingClientRect().x;
    const y = evt.clientY - evt.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((evt: React.PointerEvent) => {
    evt.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((evt: React.PointerEvent) => {
    const x = evt.clientX - evt.currentTarget.getBoundingClientRect().x;
    const y = evt.clientY - evt.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <div
      className="h-[100vh] w-full flex justify-center items-center text-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
