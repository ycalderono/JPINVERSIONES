'use client';

import { useAuth } from '../hooks/useAuth';
import ProfilePicture from './components/profileHeader/ProfilePicture';
import ProfileInfoCard from './components/profileHeader/ProfileInfoCard';
import TransactionList from './components/profileBody/TransactionsAccordeon';

export default function ProfileClient() {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
      <div>
        <div className="flex flex-col items-center justify-center pb-8">
          Perfil de usuario
        </div>
        <div className='flex justify-center pb-8'>
          <ProfilePicture />
        </div>
        <div className='flex justify-center pb-8'>
          <ProfileInfoCard />
        </div>
        <div className='flex justify-center pb-8'>
          <TransactionList />
        </div>
      </div>
    );
}