// components/utils/formHandlers.js
// components/utils/formHandlers.tsx
// components/utils/formHandlers.js
export const handleEmailChange = (setEmail, setIsEmailMatch, confirmEmail) => (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailMatch(email === confirmEmail);
  };
  
  export const handleConfirmEmailChange = (setConfirmEmail, setIsEmailMatch, email) => (e) => {
    const confirmEmail = e.target.value;
    setConfirmEmail(confirmEmail);
    setIsEmailMatch(confirmEmail === email);
  };
  
  
export const handleSubmit = async (data) => {
    const response = await fetch("/api/usuarios", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result.success;
};
