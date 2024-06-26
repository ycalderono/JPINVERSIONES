'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import UserInfoView from '../../../landing/components/modalForm/views/UserInfoView';
import FooterButtons from '../../../landing/components/modalForm/FooterButtons';
import PaymentMethodsView from '../../../landing/components/modalForm/views/PaymentMethodsView';
import SummaryView from '../../../landing/components/modalForm/views/SummaryView';
import ConfirmationView from '../../../landing/components/modalForm/views/ConfirmationView';
import LoginWithIdView from '../../../landing/components/modalForm/views/LoginWithIdView';
import colombia from '@/app/data/colombia';
import { filterCities } from '../../../landing/components/utils/cityHelpers';

interface City {
  id: number;
  name: string;
}

export default function WallpaperPurchaseModal({ isOpen, onOpenChange, wallpaperDetails }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isEmailMatch, setIsEmailMatch] = useState(true);
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allCities, setAllCities] = useState<City[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (colombia && colombia.allCities) {
      const cities = colombia.allCities();
      setAllCities(cities);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      setStep(2); // Ir directamente al selector de método de pago si el usuario está autenticado
    }
  }, [status]);


  const selectCity = (city) => {
    setCityQuery(city.name);
    setSuggestions([]);
  };

  const handleEmailChange = (setEmail, setIsEmailMatch, confirmEmail) => (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailMatch(email === confirmEmail);
  };

  const handleConfirmEmailChange = (setConfirmEmail, setIsEmailMatch, email) => (e) => {
    const confirmEmail = e.target.value;
    setConfirmEmail(confirmEmail);
    setIsEmailMatch(confirmEmail === email);
  };

  const handleCityInputChange = (e) => {
    const query = e.target.value;
    setCityQuery(query);
    const filteredSuggestions = query.length > 2 ? filterCities(allCities, query) : [];
    setSuggestions(filteredSuggestions);
  };

  const handleConfirmEmailBlur = async () => {
    if (confirmEmail) {
      const emailExists = await checkIfEmailExists(confirmEmail);
      if (emailExists) {
        console.log("El correo ya está registrado en la base de datos.");
        setStep(4);  // Ir al paso de login con ID
      } else {
        console.log("El correo no está registrado.");
      }
    }
  };

  const checkIfEmailExists = async (email) => {
    try {
      const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        console.error("Error al buscar el correo");
        return false;
      }

      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error("Error durante la verificación de correo", error);
      return false;
    }
  };

  const goToNextStep = async (newStep) => {
    if (newStep === 2) {
      const formData = {
        fullName,
        email,
        idNumber,
        address,
        phone,
      };

      const exists = await checkIfEmailExists(email);
      if (exists) {
        console.error("Usuario ya registrado");
        setStep(4);  // Ir al paso de login con ID
        return;
      }

      const success = await handleSubmit(formData);
      if (!success) {
        console.error("Error al guardar la información.");
        return;
      }

      const loginResult = await signIn("credentials", {
        email,
        idNumber,
        redirect: false,
      });

      if (loginResult && loginResult.ok) {
        console.log("Inicio de sesión exitoso:", loginResult);
        setStep(newStep);
      } else {
        console.error("Error al iniciar sesión automáticamente.");
        return;
      }
    } else {
      setStep(newStep);
    }
  };

  const handleSubmit = async (data) => {
    const response = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.success;
  };

  const handleIdLogin = async (idNumber) => {
    const result = await signIn("credentials", {
      email: confirmEmail,
      idNumber,
      redirect: false,
    });

    if (result && result.ok) {
      console.log("Inicio de sesión exitoso.", result);
      setStep(2);  // Ir al paso de selección de método de pago
    } else {
      console.error("Error al iniciar sesión.", result);
    }
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setStep(3);  // Ir al resumen después de seleccionar el método de pago
  };

  const handleFinishPurchase = () => {
    // Redireccionar al perfil
    router.push('/profile');
    
    // Cerrar el modal
    onOpenChange(false);
  };

  const handleConfirmPurchase = async () => {
    if (status !== "authenticated" || !session?.user) {
      console.error("No hay sesión activa o el usuario no está autenticado.");
      router.push('/login');
      return;
    }
  
    try {
      const purchaseDetails = {
        email: session.user.email,
        idNumber: session.user.idNumber,
        wallpaperTitle: wallpaperDetails.title,
        paymentMethod,
        totalAmount: wallpaperDetails.price,
      };
  
      const response = await fetch('/api/wallpaper-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseDetails),
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      const data = await response.json();
      console.log('Compra de wallpaper guardada con éxito:', data.purchase);
      setStep(4);  // Ir al paso de confirmación
    } catch (error) {
      console.error('Error al guardar la compra de wallpaper:', error);
      // Manejar el error aquí
    }
  };


  const renderFooterButtons = (onClose: () => void) => {
    if (status === "authenticated" && step === 2) {
      return null; // No renderizar botones en la vista de selección de método de pago para usuarios autenticados
    }
  
    return (
      <FooterButtons
        onClose={onClose}
        onSubmit={
          status === "authenticated" 
            ? (step === 3 ? handleConfirmPurchase : 
               step === 4 ? handleFinishPurchase : 
               () => setStep(step + 1))
            : (step === 1 ? () => goToNextStep(2) : handleIdLogin)
        }
        disabled={false}
        submitText={
          status === "authenticated"
            ? (step === 3 ? "Confirmar Compra" : 
               step === 4 ? "Ir al Perfil" : 
               "Siguiente")
            : (step === 1 ? "Siguiente" : "Iniciar Sesión")
        }
      />
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{`Comprar ${wallpaperDetails.title}`}</ModalHeader>
            <ModalBody>
              {status === "loading" ? (
                <div>Cargando...</div>
              ) : status === "authenticated" ? (
                step === 2 ? (
                  <PaymentMethodsView onPaymentSelect={handlePaymentMethod} />
                ) : step === 3 ? (
                  <SummaryView 
                    wallpaperTitle={wallpaperDetails.title}
                    price={wallpaperDetails.price}
                    paymentMethod={paymentMethod}
                  />
                ) : step === 4 ? (
                  <ConfirmationView />
                ) : null
              ) : (
                step === 1 ? (
                  <UserInfoView
                    fullName={fullName}
                    setFullName={setFullName}
                    email={email}
                    setEmail={setEmail}
                    confirmEmail={confirmEmail}
                    setConfirmEmail={setConfirmEmail}
                    isEmailMatch={isEmailMatch}
                    setIsEmailMatch={setIsEmailMatch}
                    phone={phone}
                    setPhone={setPhone}
                    idNumber={idNumber}
                    setIdNumber={setIdNumber}
                    address={address}
                    setAddress={setAddress}
                    cityQuery={cityQuery}
                    setCityQuery={setCityQuery}
                    suggestions={suggestions}
                    selectCity={selectCity}
                    handleEmailChange={handleEmailChange}
                    handleConfirmEmailChange={handleConfirmEmailChange}
                    handleCityInputChange={handleCityInputChange}
                    handleConfirmEmailBlur={handleConfirmEmailBlur}
                  />
                ) : step === 4 ? (
                  <LoginWithIdView
                    email={confirmEmail}
                    onSubmit={handleIdLogin}
                  />
                ) : null
              )}
            </ModalBody>
            <ModalFooter>
              {renderFooterButtons(onClose)}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}