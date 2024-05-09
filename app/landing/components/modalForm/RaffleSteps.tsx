// components/modalForm/RaffleSteps.tsx
import React, { useEffect } from 'react';
import UserInfoView from './views/UserInfoView';
import NumberSelectionView from './views/NumberSelectionView';
import PaymentMethodsView from './views/PaymentMethodsView';
import SummaryView from './views/SummaryView';
import ConfirmationView from './views/ConfirmationView';
import LoginWithIdView from './views/LoginWithIdView';
import { handleEmailChange, handleConfirmEmailChange } from '../utils/formHandlers';
import { filterCities, selectCity } from '../utils/cityHelpers';
import { generateSuggestedNumbers, addPreferredNumber, selectSuggestedNumber } from '../utils/numberHelpers';

const RaffleSteps = ({ step, goToNextStep, ...viewProps }) => {
  const {
    setEmail,
    setConfirmEmail,
    setIsEmailMatch,
    email,
    confirmEmail,
    allCities,
    setCityQuery,
    setSuggestions,
    preferredNumber,
    selectedNumbers,
    setSelectedNumbers,
    setPreferredNumber,
    setSuggestedNumbers,
  } = viewProps;

  useEffect(() => {
    generateSuggestedNumbers(setSuggestedNumbers);
  }, [setSuggestedNumbers]);

  const handleCityInputChange = (e) => {
    const query = e.target.value;
    setCityQuery(query);
    setSuggestions(query.length > 0 ? filterCities(allCities, query) : []);
  };

  return (
    <>
      {step === 1 ? (
        <UserInfoView
          {...viewProps}
          handleEmailChange={handleEmailChange(setEmail, setIsEmailMatch, confirmEmail)}
          handleConfirmEmailChange={handleConfirmEmailChange(setConfirmEmail, setIsEmailMatch, email)}
          handleCityInputChange={handleCityInputChange}
          selectCity={(city) => selectCity(city, setCityQuery, setSuggestions)}
        />
      ) : step === 2 ? (
        <NumberSelectionView
          {...viewProps}
          addPreferredNumber={() => addPreferredNumber(preferredNumber, selectedNumbers, setSelectedNumbers, setPreferredNumber)}
          selectSuggestedNumber={(num) => selectSuggestedNumber(num, selectedNumbers, setSelectedNumbers)}
        />
      ) : step === 3 ? (
        <PaymentMethodsView onBancolombiaClick={() => goToNextStep(4)} />
      ) : step === 4 ? (
        <SummaryView {...viewProps} />
      ) : step === 5 ? (
        <LoginWithIdView {...viewProps} />
      ) : (
        <ConfirmationView {...viewProps} />
      )}
    </>
  );
};

export default RaffleSteps;
