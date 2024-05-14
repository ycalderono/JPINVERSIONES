'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Cambiar a next/navigation
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import UserInfoView from './views/UserInfoView';
import FooterButtons from './FooterButtons';
import NumberSelectionView from './views/NumberSelectionView';
import LoginWithIdView from './views/LoginWithIdView';
import PaymentMethodsView from './views/PaymentMethodsView';
import SummaryView from './views/SummaryView';
import ConfirmationView from './views/ConfirmationView';
import colombia from '@/app/data/colombia';
import { filterCities } from '../utils/cityHelpers';

interface City {
  id: number;
  name: string;
}

export default function RaffleModal({ isOpen, onOpenChange, packageDetails }) {
  const router = useRouter(); // Cambiar a useRouter de next/navigation
  const { data: session, status } = useSession();
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
  const [preferredNumber, setPreferredNumber] = useState<string>('');
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [suggestedNumbers, setSuggestedNumbers] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const raffleType = packageDetails?.title;

  console.log("Selected package:", packageDetails);
  console.log("Raffle type:", raffleType);

  if (status === 'unauthenticated') {
    console.error("No hay sesión activa.");
  }

  useEffect(() => {
    if (colombia && colombia.allCities) {
      const cities = colombia.allCities();
      setAllCities(cities);
    }
  }, []);

  useEffect(() => {
    if (step === 6) {
      generateSuggestedNumbers();
    }
  }, [step]);

  const generateSuggestedNumbers = () => {
    const uniqueNumbers = new Set<string>();
    while (uniqueNumbers.size < 5) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
      uniqueNumbers.add(randomNumber);
    }
    setSuggestedNumbers(Array.from(uniqueNumbers));
  };

  const calculatedTotalAmount = packageDetails.price * packageDetails.tickets;

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

  useEffect(() => {
    const cities = colombia.allCities();
    setAllCities(cities);
  }, []);

  const handleConfirmEmailBlur = async () => {
    if (confirmEmail) {
      const emailExists = await checkIfEmailExists(confirmEmail);
      if (emailExists) {
        console.log("El correo ya está registrado en la base de datos.");
        setStep(5);
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

  const addPreferredNumber = () => {
    if (preferredNumber && !selectedNumbers.includes(preferredNumber)) {
      setSelectedNumbers([...selectedNumbers, preferredNumber]);
      setPreferredNumber('');
    }
  };

  const selectSuggestedNumber = (num) => {
    if (!selectedNumbers.includes(num) && selectedNumbers.length < packageDetails.tickets) {
      setSelectedNumbers([...selectedNumbers, num]);
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

      if (loginResult && !loginResult.ok) {
        console.error("Error al iniciar sesión automáticamente.");
        return;
      }
    }

    setStep(newStep);
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
      console.log("Inicio de sesión exitoso.");
      setStep(2);
    } else {
      console.error("Error al iniciar sesión.");
    }
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setStep(4);
  };

  const handleConfirmPurchase = async () => {
    try {
      const userId = session?.user?.id ?? 'defaultUserId';
      if (userId === 'defaultUserId') {
        console.error("No hay sesión activa o el usuario no está definido.");
        return;
      }

      const purchaseDetails = {
        userId: userId,
        raffleType,
        selectedNumbers,
        paymentMethod,
        totalAmount: calculatedTotalAmount,
      };

      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseDetails),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Compra guardada con éxito:', data.purchase);
        onOpenChange(false);
        router.push('/profile');
      } else {
        console.error('Error al guardar la compra:', data.error);
      }
    } catch (error) {
      console.error('Error al guardar la compra:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{`Comprar ${raffleType}`}</ModalHeader>
            <ModalBody>
              {step === 1 ? (
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
              ) : step === 2 ? (
                <NumberSelectionView
                  preferredNumber={preferredNumber}
                  setPreferredNumber={setPreferredNumber}
                  selectedNumbers={selectedNumbers}
                  addPreferredNumber={addPreferredNumber}
                  suggestedNumbers={suggestedNumbers}
                  selectSuggestedNumber={selectSuggestedNumber}
                  maxNumbers={packageDetails.tickets}
                />
              ) : step === 3 ? (
                <PaymentMethodsView onPaymentSelect={handlePaymentMethod} />
              ) : step === 4 ? (
                <SummaryView raffleType={raffleType} selectedNumbers={selectedNumbers} />
              ) : step === 5 ? (
                <LoginWithIdView
                  email={confirmEmail}
                  onSubmit={handleIdLogin}
                />
              ) : step === 6 ? (
                <ConfirmationView />
              ) : (
                <div>No hay vista definida para este paso.</div>
              )}
            </ModalBody>
            <ModalFooter>
              {step === 1 ? (
                <FooterButtons
                  onClose={onClose}
                  onSubmit={() => goToNextStep(2)}
                  disabled={false}
                />
              ) : step === 2 ? (
                <FooterButtons
                  onClose={onClose}
                  onSubmit={() => goToNextStep(3)}
                  disabled={false}
                />
              ) : step === 4 ? (
                <FooterButtons
                  onClose={onClose}
                  onSubmit={() => goToNextStep(6)}
                  disabled={false}
                />
              ) : step === 6 ? (
                <FooterButtons
                  onClose={() => onOpenChange(false)}
                  onSubmit={handleConfirmPurchase}
                  submitText="Ir al Perfil"
                  disabled={hasSubmitted}
                />
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
