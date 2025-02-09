'use client';
import useAuth, { User } from '@/app/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigation from './navigation';
import Characters from './characters';

type DashboardProps = {
  user: User | null;
};

export default function Dashboard({ user }: DashboardProps) {
  const { setUser } = useAuth();
  const router = useRouter();
  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [isClient, setIsClient] = useState(false);

  const onSignOut = () => {
    setUser();
    router.push('/login');
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    setIsClient(true);
  }, [user, router, setIsClient]);

  return (
    <>
      {isClient && user ? (
        <>
          <Navigation user={user} onSignOut={onSignOut} />
          <Characters />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
