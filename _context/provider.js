'use client';

import { createContext, useContext, useReducer } from 'react';

const initialState = {
  products: [],   // ← تغییر مهم: آرایه
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload]   // اضافه کردن به آرایه
            };
            
        case "CLEAR_PRODUCTS":
            return {
                ...state,
                products: []
            };
            
        default:
            return state;
    }
}

export const FormContext = createContext();

export function FormProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    return useContext(FormContext);
}