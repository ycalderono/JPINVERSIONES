// components/UserProfileCard.tsx
import React, { useState } from 'react';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Spacer } from '@nextui-org/spacer';
import { useSession } from 'next-auth/react';

interface UserProfileProps {
  onUpdate: (data: { fullName?: string; email?: string; avatarUrl?: string }) => void;
}

const UserProfileCard: React.FC<UserProfileProps> = ({ onUpdate }) => {
  const { data: session } = useSession();
  const user = session?.user;
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.image || '');

  const [editing, setEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const handleSave = () => {
    // Lógica para enviar los datos actualizados
    const updatedData: { fullName?: string; email?: string; avatarUrl?: string } = {
      fullName,
      email,
    };

    if (newAvatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedData.avatarUrl = reader.result as string;
        onUpdate(updatedData);
      };
      reader.readAsDataURL(newAvatar);
    } else {
      onUpdate(updatedData);
    }
    setEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewAvatar(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardBody>
        <h2>{editing ? 'Editar Perfil' : 'Perfil de Usuario'}</h2>
        <Spacer y={1} />

        <Avatar
          src={newAvatar ? URL.createObjectURL(newAvatar) : avatarUrl}
          size="md"
          
          color="primary"
        />
        {editing && (
          <Input
            type="file"
            accept="image/*"
            label="Selecciona una nueva imagen"
            onChange={handleFileChange}
          />
        )}
        <Spacer y={1} />

        <Input
          label="Nombre Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          readOnly={!editing}
        />
        <Spacer y={1} />

        <Input
          label="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!editing}
        />
        <Spacer y={1} />

        {editing ? (
          <Button color="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        ) : (
          <Button color="secondary" onClick={() => setEditing(true)}>
            Editar Perfil
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;
