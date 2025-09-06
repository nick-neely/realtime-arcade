-- Foreign keys that reference other schemas
alter table public.profiles
  add constraint profiles_user_fk foreign key (user_id) references auth.users(id) on delete cascade;

alter table public.rooms
  add constraint rooms_game_fk foreign key (game_id) references public.games(id) on delete restrict,
  add constraint rooms_host_fk foreign key (host_user_id) references auth.users(id) on delete cascade;

alter table public.room_players
  add constraint room_players_room_fk foreign key (room_id) references public.rooms(id) on delete cascade,
  add constraint room_players_user_fk foreign key (user_id) references auth.users(id) on delete cascade,
  add constraint room_players_unique unique (room_id, user_id);

alter table public.room_events
  add constraint room_events_room_fk foreign key (room_id) references public.rooms(id) on delete cascade,
  add constraint room_events_user_fk foreign key (user_id) references auth.users(id) on delete cascade;

alter table public.room_state
  add constraint room_state_room_fk foreign key (room_id) references public.rooms(id) on delete cascade;

-- Helpful indexes
create index if not exists rooms_game_idx on public.rooms(game_id);
create index if not exists rooms_vis_status_idx on public.rooms(visibility, status);
create index if not exists room_players_room_idx on public.room_players(room_id);
create index if not exists room_events_room_id_idx on public.room_events(room_id, id);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.games enable row level security;
alter table public.rooms enable row level security;
alter table public.room_players enable row level security;
alter table public.room_events enable row level security;
alter table public.room_state enable row level security;

-- Policies

-- profiles
drop policy if exists "read profiles" on public.profiles;
create policy "read profiles" on public.profiles
for select using (true);

drop policy if exists "upsert own profile" on public.profiles;
create policy "upsert own profile" on public.profiles
for insert with check (auth.uid() = user_id);
create policy "update own profile" on public.profiles
for update using (auth.uid() = user_id);

-- games
drop policy if exists "read games" on public.games;
create policy "read games" on public.games for select using (true);

-- rooms
drop policy if exists "select public rooms or member rooms" on public.rooms;
create policy "select public rooms or member rooms"
on public.rooms for select using (
  visibility <> 'private'
  or exists (
    select 1 from public.room_players rp
    where rp.room_id = rooms.id and rp.user_id = auth.uid()
  )
);

drop policy if exists "insert room" on public.rooms;
create policy "insert room"
on public.rooms for insert with check (auth.uid() = host_user_id);

drop policy if exists "update own room status" on public.rooms;
create policy "update own room status"
on public.rooms for update using (auth.uid() = host_user_id);

-- room_players
drop policy if exists "select roster if member or room public" on public.room_players;
create policy "select roster if member or room public"
on public.room_players for select using (
  exists(select 1 from public.rooms r
         where r.id = room_players.room_id
           and (r.visibility <> 'private'
             or exists (select 1 from public.room_players rp2
                        where rp2.room_id = r.id and rp2.user_id = auth.uid())))
);

drop policy if exists "self join" on public.room_players;
create policy "self join"
on public.room_players for insert with check (
  user_id = auth.uid()
  and exists(select 1 from public.rooms r where r.id = room_players.room_id and r.status <> 'ended')
);

drop policy if exists "leave room" on public.room_players;
create policy "leave room"
on public.room_players for delete using (
  user_id = auth.uid()
  or exists(select 1 from public.rooms r where r.id = room_players.room_id and r.host_user_id = auth.uid())
);

-- room_events
drop policy if exists "append events as member" on public.room_events;
create policy "append events as member"
on public.room_events for insert with check (
  exists(select 1 from public.room_players rp where rp.room_id = room_events.room_id and rp.user_id = auth.uid())
);

drop policy if exists "read events as member" on public.room_events;
create policy "read events as member"
on public.room_events for select using (
  exists(select 1 from public.room_players rp where rp.room_id = room_events.room_id and rp.user_id = auth.uid())
);

-- room_state
drop policy if exists "read state as member" on public.room_state;
create policy "read state as member"
on public.room_state for select using (
  exists(select 1 from public.room_players rp where rp.room_id = room_state.room_id and rp.user_id = auth.uid())
);

revoke insert, update, delete on public.room_state from anon, authenticated;

-- Realtime publication
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_players;
alter publication supabase_realtime add table public.room_events;
