import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import UserInfoView from './views/UserInfoView';
import { filterCities } from '../utils/cityHelpers';
import FooterButtons from './FooterButtons';
import NumberSelectionView from './views/NumberSelectionView';
import { signIn } from 'next-auth/react';
import colombia from '@/app/data/colombia';
import LoginWithIdView from './views/LoginWithIdView';
import PaymentMethodsView from './views/PaymentMethodsView';
import SummaryView from './views/SummaryView';
import ConfirmationView from './views/ConfirmationView';

export default function RaffleModal({ isOpen, onOpenChange, packageDetails }) {
  console.log("Package details:", packageDetails);

  // Extrayendo los detalles del paquete e inicializando las variables de estado para el formulario de inicio de sesión
  const { title: raffleType } = packageDetails || {};
  const router = useRouter();
  const { data: session } = useSession();
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
  const [allCities, setAllCities] = useState([]);
  const [preferredNumber, setPreferredNumber] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [suggestedNumbers, setSuggestedNumbers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

    // Calcular el monto total
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
    // Filtra la lista completa de ciudades utilizando el texto ingresado
    const filteredSuggestions = query.length > 2 ? filterCities(allCities, query) : [];
    setSuggestions(filteredSuggestions);
  };

  useEffect(() => {
    const cities = colombia.allCities(); // Obtener todas las ciudades
    setAllCities(cities); // Establecerlas en el estado
  }, []);

  const handleConfirmEmailBlur = async () => {
    // Realiza la llamada solo si hay un valor en `confirmEmail`
    if (confirmEmail) {
      const emailExists = await checkIfEmailExists(confirmEmail);
      if (emailExists) {
        console.log("El correo ya está registrado en la base de datos.");
        setStep(5);
        // Realiza cualquier otra acción que necesites, como cambiar de paso o mostrar una alerta
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

  // Función para añadir un número preferido
  const addPreferredNumber = () => {
    if (preferredNumber && !selectedNumbers.includes(preferredNumber)) {
      setSelectedNumbers([...selectedNumbers, preferredNumber]);
      setPreferredNumber(''); // Restablecer el valor después de añadir
    }
  };

  // Función para seleccionar un número sugerido
  const selectSuggestedNumber = (num) => {
    if (!selectedNumbers.includes(num) && selectedNumbers.length < packageDetails.tickets) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

        // Función para generar números sugeridos
  const generateSuggestedNumbers = (setSuggestedNumbers) => {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 5) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
      uniqueNumbers.add(randomNumber);
    }
    setSuggestedNumbers([...uniqueNumbers]);
  };

  const goToNextStep = async (newStep) => {
    if (newStep === 2) {
      // Recopilar datos para el nuevo usuario
      const formData = {
        fullName,
        email,
        idNumber,
        address,
        phone,
      };
  
      // Verificar si el usuario ya existe (llamando a `checkIfEmailExists`)
      const exists = await checkIfEmailExists(email);
      if (exists) {
        console.error("Usuario ya registrado");
        return;
      }
  
      // Guardar información en la base de datos
      const success = await handleSubmit(formData);
      if (!success) {
        console.error("Error al guardar la información.");
        return;
      }

      // Iniciar sesión automáticamente para nuevos usuarios
      const loginResult = await signIn("credentials", {
        email,
        idNumber,
        redirect: false,
      });
  
      if (!loginResult.ok) {
        console.error("Error al iniciar sesión automáticamente.");
        return;
      }
    }

    // Cambiar a la siguiente vista
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

  // Generar números sugeridos al montar el componente
  useEffect(() => {
    generateSuggestedNumbers(setSuggestedNumbers);
  }, []);

  
  const handleIdLogin = async (idNumber) => {
    const result = await signIn("credentials", {
      email: confirmEmail, // Usa el correo confirmado
      idNumber,
      redirect: false, // Evitar la redirección automática
    });
  
    if (result.ok) {
      console.log("Inicio de sesión exitoso.");
      // Actualiza el paso o muestra una vista diferente después de iniciar sesión
      setStep(2); // Por ejemplo, muestra la vista de selección de números
    } else {
      alert("Inicio de sesión fallido. Verifica tu número de documento.");
    }
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method); // Guarda el método de pago seleccionado
    setStep(4); // Suponiendo que el paso 4 es el resumen
  };

  const handleConfirmPurchase = async () => {
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          raffleType,
          selectedNumbers,
          paymentMethod,
          totalAmount: calculatedTotalAmount,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Compra guardada con éxito:', data.purchase);
        onOpenChange(false); // Cierra el modal
        router.push('/profile'); // Redirige al perfil
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
                <ConfirmationView/>
              ) : (
                // Otros componentes según el valor de `step`
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
              )  :step === 6 ? (
                <FooterButtons onClose={() => onOpenChange(false)} onSubmit={handleConfirmPurchase} submitText="Ir al Perfil" disabled={hasSubmitted} />
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}