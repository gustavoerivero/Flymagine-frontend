import { object, string, ref } from 'yup'

export const dataAccessSchema = object({
  email: string()
    .email('El email debe ser válido')
    .max(100, 'El email debe contener máximo 100 caracteres')
    .required('El email es requerido'),
  currentPassword: string()
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .max(16, 'La contraseña debe contener máximo 16 caracteres')
    .required('La contraseña es requerida')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
  password: string()
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .max(16, 'La contraseña debe contener máximo 16 caracteres')
    .required('La contraseña es requerida')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es requerida'),
}).required()

export const dataAccessDefaultValues = {
  email: '',
  currentPassword: '',
  password: '',
  confirmPassword: '',
}