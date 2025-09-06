"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type PresenceMeta = { name?: string; color?: string };

export function useRoomChannel(roomId: string) {
  const [members, setMembers] = useState<Record<string, PresenceMeta[]>>({});
  const [connection, setConnection] = useState<"joined"|"error"|"closed"|"subscribing">("subscribing");
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    const channel = supabase.channel(`room:${roomId}`, {
      config: { presence: { key: crypto.randomUUID() } }
    });

    channel
      .on("presence", { event: "sync" }, () => setMembers(channel.presenceState() as any))
      .on("system", { event: "error" }, () => setConnection("error"))
      .on("broadcast", { event: "action" }, ({ payload }) => {
        window.dispatchEvent(new CustomEvent("room:action", { detail: payload }));
      })
      .subscribe(async status => {
        if (status === "SUBSCRIBED") {
          setConnection("joined");
          await channel.track({ name: "Guest", ts: Date.now() });
        }
      });

    channelRef.current = channel;
    return () => { channel.unsubscribe(); channelRef.current = null; };
  }, [roomId]);

  function sendAction(type: string, payload: any) {
    channelRef.current?.send({ type: "broadcast", event: "action", payload: { type, payload, ts: Date.now() } });
  }

  return { members, connection, sendAction };
}
