'use client';

import useAuth from '@/app/store/hooks';
import { Suspense } from 'react';
import Dashboard from './dashboard/dashboard';


export default function Home() {
  const { user } = useAuth();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard user={user} />
    </Suspense>
  );
}
