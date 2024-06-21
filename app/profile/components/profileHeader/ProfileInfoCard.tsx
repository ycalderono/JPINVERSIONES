"use client";
import { useEffect, useState } from 'react';
import { Card, CardBody } from "@nextui-org/card";

const ProfileInfoCard: React.FC = () => {
  const [profile, setProfile] = useState<{ fullName: string; email: string; phone: string }>({ fullName: '', email: '', phone: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/usuarios/profile?id=1'); // ID debe ser dinámico según la sesión
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <Card className="w-full h-full">
      <CardBody>
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg font-bold">{profile.fullName}</div>
          <div className="text-sm text-gray-600">{profile.email}</div>
          <div className="text-sm text-gray-600">{profile.phone}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileInfoCard;
