import React from 'react';
import FullNameInput from '../FullNameInput';
import EmailInput from '../EmailInput';
import ConfirmEmailInput from '../ConfirmEmailInput';
import IDNumberInput from '../IDNumberInput';
import PhoneInput from '../PhoneInput';
import AddressInput from '../AddressInput';
import CityInput from '../CityInput';
import SuggestionsList from '../SuggestionsList';

export default function UserInfoView({
  fullName, setFullName,
  email, setEmail,
  confirmEmail, setConfirmEmail,
  isEmailMatch, setIsEmailMatch,
  phone, setPhone,
  idNumber, setIdNumber,
  address, setAddress,
  cityQuery, setCityQuery,
  suggestions, selectCity,
  handleEmailChange, handleConfirmEmailChange,
  handleCityInputChange, handleConfirmEmailBlur
}) {
  // Configura el estado `isInvalid` basado en `isEmailMatch`
  const isInvalid = !isEmailMatch; // `true` si no coinciden, `false` si coinciden
  const errorMessage = isInvalid ? 'Los correos electrónicos no coinciden' : '';

  return (
    <>
      <FullNameInput value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <EmailInput value={email} onChange={handleEmailChange(setEmail, setIsEmailMatch, confirmEmail)} />
      <ConfirmEmailInput
        value={confirmEmail}
        onChange={handleConfirmEmailChange(setConfirmEmail, setIsEmailMatch, "yourEmailHere")}
        onBlur={handleConfirmEmailBlur} // Llama a la función `onBlur` al perder el foco
        isInvalid={!isEmailMatch}
        errorMessage={!isEmailMatch ? 'Los correos electrónicos no coinciden' : ''}
      />
      <IDNumberInput value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
      <PhoneInput value={phone} onChange={(e) => setPhone(e.target.value)} />
      <AddressInput value={address} onChange={(e) => setAddress(e.target.value)} />
      <CityInput value={cityQuery} onChange={handleCityInputChange} />
      <SuggestionsList suggestions={suggestions} onSelect={selectCity} />
    </>
  );
}
