import React, { useState } from 'react';

type DateFieldProps = {
  onChangeAction: (bithDate: string) => void;
};


const DOBInput: React.FC<DateFieldProps> = ({onChangeAction}) => {
  const [dob, setDob] = useState<string>('');
  const [error, setError] = useState<string>('');

  const minDate = getDateYearsAgo(18); // oldest allowed
  const maxDate = getDateYearsAgo(8);  // youngest allowed

  const isValidDOB = (dob: string): boolean => {
  if (!dob) return false;

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 8 && age <= 18;
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);

    if (!isValidDOB(value)) {
      setError('Age must be between 8 and 18 years');
    } else {
      setError('');
    }

    onChangeAction(dob);
  };

  return (
    <div>
      <label>Date of Birth</label>
      <input
        type="date"
        value={dob}
        min={minDate}
        max={maxDate}
        onChange={handleChange}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DOBInput;

const getDateYearsAgo = (years: number): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};
