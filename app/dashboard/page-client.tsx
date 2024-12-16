'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';

export function PageClient() {
  const router = useRouter();
  const user = useUser({ or: 'redirect' });
  const teams = user.useTeams();
  const [teamDisplayName, setTeamDisplayName] = useState('');

  useEffect(() => {
    if (teams.length > 0 && !user.selectedTeam) {
      user.setSelectedTeam(teams[0]);
    }
  }, [teams, user]);

  if (teams.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="max-w-xs w-full">
          <h1 className="text-center text-2xl font-semibold">Welcome!</h1>
          <p className="text-center text-gray-500">Create a reveal group to get started</p>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              user.createTeam({ displayName: teamDisplayName });
            }}
          >
            <div>
              <Label className="text-sm">Reveal group name</Label>
              <Input
                placeholder="Reveal group name"
                value={teamDisplayName}
                onChange={(e) => setTeamDisplayName(e.target.value)}
              />
            </div>
            <Button className="mt-4 w-full">Create reveal group</Button>
          </form>
        </div>
      </div>
    );
  } else if (user.selectedTeam) {
    router.push(`/dashboard/${user.selectedTeam.id}`);
  }

  return null;
}
