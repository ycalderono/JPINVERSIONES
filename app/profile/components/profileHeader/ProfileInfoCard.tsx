"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardBody } from "@nextui-org/card";

const ProfileInfoCard: React.FC = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<{ fullName: string; email: string; phone: string }>({ fullName: '', email: '', phone: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/usuarios/profile`);
        const data = await res.json();
        console.log(data);
        setProfile(data);
      }
    };
    fetchProfile();
  }, [session]);

  return (
    <Card className="w-full h-full">
      <CardBody>
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg font-bold">{profile.fullName}</div>
          <div className="text-sm text-gray-600">{profile.email}</div>
          <div className="text-sm text-gray-600">+57 {profile.phone}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileInfoCard;
