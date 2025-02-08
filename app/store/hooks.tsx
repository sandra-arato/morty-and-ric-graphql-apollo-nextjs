'use client'

export type User = {
  name: string;
  profession: string;
};

const useAuth = () => {
  const noSession = {
    user: null,
    loggedIn: false,
    setUser: () => { },
  }
  if (typeof window !== 'undefined' && sessionStorage) {
    const name = sessionStorage?.getItem('name');
    const profession = sessionStorage?.getItem('profession');

    const loggedIn = !!name && !!profession;
    const setUser = (user?: User) => {
      if (!user) {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('profession');
        return;
      }
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('profession', user.profession);
    }

    const user = (name && profession) ? {
      name,
      profession,
    } : null;

    return {
      user,
      loggedIn,
      setUser
    };
  }
  return noSession;
}

export default useAuth