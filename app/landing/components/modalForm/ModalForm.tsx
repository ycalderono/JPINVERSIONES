import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import FooterButtons from './FooterButtons';
import UserInfoView from './views/UserInfoView';
import LoginWithIdView from './views/LoginWithIdView';
import NumberSelectionView from './views/NumberSelectionView';
import { signIn } from 'next-auth/react';
import { filterCities, selectCity } from '../utils/cityHelpers';
import colombia from '@/app/data/colombia';
import PaymentMethodsView from './views/PaymentMethodsView';
import SummaryView from './views/SummaryView';
import ConfirmationView from './views/ConfirmationView';

// Función para generar números sugeridos
const generateSuggestedNumbers = (setSuggestedNumbers) => {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < 5) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
    uniqueNumbers.add(randomNumber);
  }
  setSuggestedNumbers([...uniqueNumbers]);
};

export default function RaffleModal({ isOpen, onOpenChange, raffleType }) {
  // Declaración de los estados
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
  const [step, setStep] = useState(1);


  // Estados para la selección de números
  const [preferredNumber, setPreferredNumber] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [suggestedNumbers, setSuggestedNumbers] = useState([]);

  // Función para añadir un número preferido
  const addPreferredNumber = () => {
    if (preferredNumber && !selectedNumbers.includes(preferredNumber)) {
      setSelectedNumbers([...selectedNumbers, preferredNumber]);
      setPreferredNumber(''); // Restablecer el valor después de añadir
    }
  };
  
  // Función para seleccionar un número sugerido
  const selectSuggestedNumber = (num) => {
    if (!selectedNumbers.includes(num)) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  // Generar números sugeridos al montar el componente
  useEffect(() => {
    generateSuggestedNumbers(setSuggestedNumbers);
  }, []);
  

  // Llenar `allCities` al cargar el componente
  useEffect(() => {
    const cities = colombia.allCities(); // Obtener todas las ciudades
    setAllCities(cities); // Establecerlas en el estado
  }, []);

  // Funciones de manejo
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
  

  const selectCity = (city) => {
    setCityQuery(city.name);
    setSuggestions([]);
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

  // Función para manejar el método de pago seleccionado
  const handlePaymentMethod = () => {
    // Aquí puedes añadir más lógica, como guardar el método de pago seleccionado
    // o simplemente cambiar el paso a la siguiente vista.
    setStep(4); // Asumimos que el siguiente paso es 4 (resumen)
  };

    // Función para cambiar al paso de confirmación
    const handleSummaryToConfirmation = () => {
      setStep(6);
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
                />
              ) : step === 3 ? (
                <PaymentMethodsView onBancolombiaClick={handlePaymentMethod} />
              ) : step === 4 ? (
                <SummaryView raffleType={raffleType} selectedNumbers={selectedNumbers} />
              ) : step === 5 ? (
                <LoginWithIdView
                  email={confirmEmail}
                  onSubmit={handleIdLogin}
                />
              ) : step === 6 ? (
                <ConfirmationView onClose={onClose} />
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
            )  : null}
          </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}







// // components/RaffleModal/RaffleModal.js
// import React, { useState, useEffect } from 'react';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
// import FooterButtons from './FooterButtons';
// import UserInfoView from './views/UserInfoView';
// import NumberSelectionView from './views/NumberSelectionView';
// import PaymentMethodsView from './views/PaymentMethodsView';
// import SummaryView from './views/SummaryView';
// import ConfirmationView from './views/ConfirmationView';
// import colombia from '@/app/data/colombia';
// import { handleEmailChange, handleConfirmEmailChange } from '../utils/formHandlers';
// import { filterCities, selectCity } from '../utils/cityHelpers';
// import { generateSuggestedNumbers, addPreferredNumber, selectSuggestedNumber } from '../utils/numberHelpers';
// import { signIn } from "next-auth/react";
// import LoginWithIdView from './views/LoginWithIdView'; // Importar la nueva vist

// // Función para enviar datos a la ruta `/api/usuarios`
// const handleSubmit = async (data) => {
//   const response = await fetch("/api/usuarios", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();
//   return result.success;
// };

// const checkIfEmailExists = async (email) => {
//   const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
//   const result = await response.json();
//   console.log("Este es el resultado:", result);
//   return result.exists;
// };


// export default function RaffleModal({ isOpen, onOpenChange, raffleType }) {
//   // Estados generales para la vista 1
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [confirmEmail, setConfirmEmail] = useState('');
//   const [isEmailMatch, setIsEmailMatch] = useState(true);
//   const [phone, setPhone] = useState('');
//   const [idNumber, setIdNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [cityQuery, setCityQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [allCities, setAllCities] = useState([]);

//   // Estado para alternar entre vistas
//   const [step, setStep] = useState(1);

//   // Estado para el número preferido
//   const [preferredNumber, setPreferredNumber] = useState('');
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [suggestedNumbers, setSuggestedNumbers] = useState([]);

//   // Cargar todas las ciudades al montar el componente
//   useEffect(() => {
//     const cities = colombia.allCities(); // Llama a `allCities` para obtener todas las ciudades
//     setAllCities(cities);
//   }, []);

//   // Generar números aleatorios como sugerencias
//   useEffect(() => {
//     generateSuggestedNumbers(setSuggestedNumbers);
//   }, []);

//     // Función para manejar el evento `onBlur` en el campo de confirmación de correo
//     const handleConfirmEmailBlur = async () => {
//       if (email && confirmEmail && email === confirmEmail) {
//         setIsEmailMatch(true);
    
//         // Verificar si el correo ya está registrado
//         const emailExists = await checkIfEmailExists(email);
//         if (emailExists && step < 4) { // Evita cambiar al LoginWithIdView si ya avanzaste
//           setStep(5);
//         }
//       } else {
//         setIsEmailMatch(false);
//       }
//     };
    
    
    

//   // Función para redirigir al perfil del usuario
//   const handleProfileRedirect = async () => {
//     await signIn("credentials", {
//       email,
//       idNumber,
//       callbackUrl: "/profile", // Redirige al perfil del usuario
//     });
//   };

//   const handleIdLogin = async (idNumber) => {
//     // if (!idNumber) {
//     //   alert('Por favor, ingresa tu número de documento.');
//     //   return;
//     // }
  
//     // if (!email) {
//     //   alert('El correo electrónico no está disponible. Por favor, vuelve a ingresar tu correo.');
//     //   return;
//     // }
  
//     const result = await signIn("credentials", {
//       email,
//       idNumber,
//       redirect: false, // No redirigir automáticamente
//       callbackUrl: "/profile", // Redirigir al perfil
//     });
  
//     if (result.ok) {
//       setStep(2);
//     } else {
//       alert('Inicio de sesión fallido. Verifica tu número de documento.');
//     }
//   };
  
  
//   // Filtrar ciudades según lo que el usuario está escribiendo
//   const handleCityInputChange = (e) => {
//     const query = e.target.value;
//     setCityQuery(query);
//     setSuggestions(query.length > 0 ? filterCities(allCities, query) : []);
//   };

//   // Función para cambiar al siguiente paso
//   const goToNextStep = async (newStep) => {
//     if (newStep === 2) {
//       const formData = {
//         fullName,
//         email,
//         idNumber,
//         address,
//         phone,
//       };
  
//       // Guardar datos para nuevos usuarios
//       const success = await handleSubmit(formData);
//       if (!success) {
//         console.error("Error al guardar la información.");
//         return;
//       }
  
//       // Iniciar sesión automáticamente para nuevos usuarios
//       const loginResult = await signIn("credentials", {
//         email,
//         idNumber,
//         redirect: false,
//       });
  
//       if (!loginResult.ok) {
//         console.error("Error al iniciar sesión automáticamente.");
//         return;
//       }
//     } else if (newStep === 4 || newStep === 5) {
//       // Verificar si el correo ya está registrado antes de ir a LoginWithIdView
//       const emailExists = await checkIfEmailExists(email);
//       if (!emailExists) {
//         console.error("El correo no está registrado.");
//         return;
//       }
  
//       if (newStep === 5) {
//         console.log("Correo ya registrado, mostrando LoginWithIdView.");
//       }
//     }
  
//     // Cambiar al siguiente paso si todo es exitoso
//     setStep(newStep);
//   };
  
  
//   // Modal inicial con las primeras dos vistas
// return (
//   <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
//     <ModalContent>
//       {(onClose) => (
//         <>
//           <ModalHeader>{`Comprar ${raffleType}`}</ModalHeader>
//           <ModalBody>
//             {step === 1 ? (
//               <UserInfoView
//                 fullName={fullName}
//                 setFullName={setFullName}
//                 email={email}
//                 setEmail={setEmail}
//                 confirmEmail={confirmEmail}
//                 setConfirmEmail={setConfirmEmail}
//                 isEmailMatch={isEmailMatch}
//                 setIsEmailMatch={setIsEmailMatch}
//                 phone={phone}
//                 setPhone={setPhone}
//                 idNumber={idNumber}
//                 setIdNumber={setIdNumber}
//                 address={address}
//                 setAddress={setAddress}
//                 cityQuery={cityQuery}
//                 setCityQuery={setCityQuery}
//                 suggestions={suggestions}
//                 selectCity={(city) => selectCity(city, setCityQuery, setSuggestions)}
//                 handleEmailChange={handleEmailChange}
//                 handleConfirmEmailChange={handleConfirmEmailChange}
//                 handleCityInputChange={handleCityInputChange}
//                 handleConfirmEmailBlur={handleConfirmEmailBlur}
//               />
//             ) : step === 2 ? (
//               <NumberSelectionView
//                 preferredNumber={preferredNumber}
//                 setPreferredNumber={setPreferredNumber}
//                 selectedNumbers={selectedNumbers}
//                 addPreferredNumber={() => addPreferredNumber(preferredNumber, selectedNumbers, setSelectedNumbers, setPreferredNumber)}
//                 suggestedNumbers={suggestedNumbers}
//                 selectSuggestedNumber={(num) => selectSuggestedNumber(num, selectedNumbers, setSelectedNumbers)}
//               />
//             ) : null}
//           </ModalBody>
//           {/* Footer con botones para avanzar al siguiente paso */}
//           <ModalFooter>
//             {step === 1 ? (
//               <FooterButtons
//                 onClose={onClose}
//                 onSubmit={() => goToNextStep(2)}
//                 disabled={false}
//               />
//             ) : step === 2 ? (
//               <FooterButtons
//                 onClose={onClose}
//                 onSubmit={() => goToNextStep(3)}
//                 disabled={false}
//               />
//             ) : null}
//           </ModalFooter>
//         </>
//       )}
//     </ModalContent>
//   </Modal>
// );

  

//   return (
//     <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader>{`Comprar ${raffleType}`}</ModalHeader>
//             <ModalBody>
//               {step === 1 ? (
//                 <UserInfoView
//                   fullName={fullName}
//                   setFullName={setFullName}
//                   email={email}
//                   setEmail={setEmail}
//                   confirmEmail={confirmEmail}
//                   setConfirmEmail={setConfirmEmail}
//                   isEmailMatch={isEmailMatch}
//                   setIsEmailMatch={setIsEmailMatch}
//                   phone={phone}
//                   setPhone={setPhone}
//                   idNumber={idNumber}
//                   setIdNumber={setIdNumber}
//                   address={address}
//                   setAddress={setAddress}
//                   cityQuery={cityQuery}
//                   setCityQuery={setCityQuery}
//                   suggestions={suggestions}
//                   selectCity={(city) => selectCity(city, setCityQuery, setSuggestions)}
//                   handleEmailChange={handleEmailChange}
//                   handleConfirmEmailChange={handleConfirmEmailChange}
//                   handleCityInputChange={handleCityInputChange}
//                   handleConfirmEmailBlur={handleConfirmEmailBlur}
//                 />
//               ) : step === 2 ? (
//                 <NumberSelectionView
//                   preferredNumber={preferredNumber}
//                   setPreferredNumber={setPreferredNumber}
//                   selectedNumbers={selectedNumbers}
//                   addPreferredNumber={() => addPreferredNumber(preferredNumber, selectedNumbers, setSelectedNumbers, setPreferredNumber)}
//                   suggestedNumbers={suggestedNumbers}
//                   selectSuggestedNumber={(num) => selectSuggestedNumber(num, selectedNumbers, setSelectedNumbers)}
//                 />
//               ) : step === 3 ? (
//                 <PaymentMethodsView onBancolombiaClick={() => goToNextStep(4)} />
//               ) : step === 4 ? (
//                 <SummaryView raffleType={raffleType} selectedNumbers={selectedNumbers} />
//               ) : step === 5 ? ( // Nuevo paso para el LoginWithIdView
//                 <LoginWithIdView
//                   email={email}
//                   onSubmit={handleIdLogin}
//                   onBack={() => setStep(1)} // Permite regresar al primer paso
//                 />
//               ) : (
//                 <ConfirmationView onClose={onClose} />
//               )}
//             </ModalBody>
//             {step !== 3 && (
//               <ModalFooter>
//               {step === 1 ? (
//                 <FooterButtons
//                   onClose={onClose}
//                   onSubmit={() => goToNextStep(2)}
//                   disabled={false}
//                 />
//               ) : step === 2 ? (
//                 <FooterButtons
//                   onClose={onClose}
//                   onSubmit={() => goToNextStep(3)}
//                   disabled={false}
//                 />
//               ) : step === 4 ? (
//                 <FooterButtons
//                   onClose={onClose}
//                   onSubmit={() => goToNextStep(5)} // Continuar al paso de confirmación
//                   disabled={false}
//                 />
//               ) : null}
//             </ModalFooter>
//             )}
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// }
