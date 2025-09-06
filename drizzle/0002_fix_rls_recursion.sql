-- Fix RLS infinite recursion between rooms and room_players
-- Error observed: 42P17 infinite recursion detected in policy for relation "room_players"

-- Drop the recursive policy referencing rooms
drop policy if exists "select roster if member or room public" on public.room_players;

create policy "select own membership"
  on public.room_players
  for select
  using (auth.uid() = user_id);

