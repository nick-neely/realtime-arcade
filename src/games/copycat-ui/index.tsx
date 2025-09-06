"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useRoomChannel } from "@/hooks/useRoomChannel";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/lib/supabase/database.types";

export default function CopycatUIClient({ roomId }: { roomId: string }) {
  const { members, sendAction, connection } = useRoomChannel(roomId);
  const queryClient = useQueryClient();

  const eventsQuery = useQuery<Tables<"room_events">[]>({
    queryKey: ["room_events", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("room_events")
        .select("*")
        .eq("room_id", roomId)
        .order("id", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as Tables<"room_events">[];
    },
    refetchOnWindowFocus: false,
  });

  // Live tail of events
  useEffect(() => {
    const channel = supabase.channel(`room:${roomId}:events`);
    channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "room_events",
          filter: `room_id=eq.${roomId}`,
        },
        (payload: { new: Tables<"room_events"> }) => {
          queryClient.setQueryData<Tables<"room_events">[]>(
            ["room_events", roomId],
            (cur = []) => [payload.new, ...cur].slice(0, 50)
          );
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, roomId]);

  return (
    <div className="flex-1 grid grid-cols-12">
      <div className="col-span-9 p-4 space-y-3">
        <div className="text-sm text-muted-foreground">
          Connection {connection}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              sendAction("place_block", {
                x: Math.random() * 100,
                y: Math.random() * 100,
              })
            }
          >
            Send action
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              void (async () => {
                const {
                  data: { user },
                } = await supabase.auth.getUser();
                if (!user) return; // already auth-gated, but satisfy TS
                await supabase.from("room_events").insert({
                  room_id: roomId,
                  user_id: user.id,
                  type: "note",
                  payload: { text: "Hello" },
                });
              })();
            }}
          >
            Append DB event
          </Button>
        </div>
      </div>
      <aside className="col-span-3 border-l p-3 space-y-3">
        <div className="font-medium">Presence</div>
        <ul className="text-sm">
          {Object.entries(members).map(([key, metas]) => (
            <li key={key}>
              {metas[0]?.name ?? "Anon"} • {key.slice(0, 4)}
            </li>
          ))}
        </ul>
        <div className="font-medium mt-4">Events</div>
        <ul className="text-xs space-y-1 max-h-[50vh] overflow-auto">
          {(eventsQuery.data ?? []).map((e) => (
            <li key={e.id} className="border rounded p-2">
              <div className="text-muted-foreground">
                #{e.id} {new Date(e.created_at).toLocaleTimeString()}
              </div>
              <div>{e.type}</div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
