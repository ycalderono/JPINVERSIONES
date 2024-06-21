import ProfilePicture from './components/profileHeader/ProfilePicture';
import ProfileInfoCard from './components/profileHeader/ProfileInfoCard';
import TransactionList from './components/profileBody/TransactionsAccordeon';

export default function ProfilePage() {
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
