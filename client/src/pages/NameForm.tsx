import React from 'react';

interface NameFormProps {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameForm:: React.FC =  ({ name, onChange }) => {
    return (
        <input
            type="text"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
        />
    );
};

export default NameForm;