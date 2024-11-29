import React from 'react';

interface TextFieldProps {
    htmlFor: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ htmlFor, type, label, value, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                name={htmlFor}
                type={type}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
};

export default TextField;