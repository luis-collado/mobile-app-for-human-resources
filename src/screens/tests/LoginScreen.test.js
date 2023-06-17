import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import LoginScreen from '../LoginScreen';

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Iniciar sesión')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('updates email and password fields', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  // Aquí podrías agregar más pruebas para verificar el comportamiento de tus botones, 
  // pero eso podría requerir que mockees la función de navegación y las llamadas a la API.
});
