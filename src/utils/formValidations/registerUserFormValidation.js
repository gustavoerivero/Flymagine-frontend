import { object, string, array, ref } from 'yup'

export const registerSchema = object({
  firstName: string()
    .min(2, 'El nombre debe contener al menos 2 caracteres')
    .max(40, 'El nombre debe contener máximo 40 caracteres')
    .required('El nombre es requerido'),
  lastName: string()
    .min(2, 'El apellido debe contener al menos 2 caracteres')
    .max(40, 'El apellido debe contener máximo 40 caracteres')
    .required('El apellido es requerido'),
  phone: string()
    .min(10, 'El número telefónico debe contener al menos 10 caracteres')
    .max(15, 'El número telefónico debe contener máximo 15 caracteres')
    .required('El número telefónico es requerido')
    .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i, 'El número telefónico no es válido'),
  birthday: string()
    .default(new Date().toISOString().split('T')[0])
    .required('La fecha de nacimiento es requerida'),
  address: string()
    .min(4, 'La dirección debe contener al menos 4 caracteres')
    .max(255, 'La dirección debe contener máximo 255 caracteres')
    .required('La dirección es requerida'),
  biography: string()
    .max(1024, 'La biografía debe contener máximo 1024 caracteres')
    .default('')
    .notRequired(),
  email: string()
    .email('El email debe ser válido')
    .max(100, 'El email debe contener máximo 100 caracteres')
    .required('El email es requerido'),
  password: string()
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .max(16, 'La contraseña debe contener máximo 16 caracteres')
    .required('La contraseña es requerida')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es requerida'),
  idRole: string()
    .default('626aef37b4a9510568d6036d')
    .max(24, 'El id de rol debe contener máximo 24 caracteres')
    .required('El rol es requerido'),
  literaryGenres: array()
    .min(1, 'Debe seleccionar al menos una preferencia')
    .required('Las preferencias son requeridas')
}).required()

export const registerDefaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  birthday: new Date()
    .toISOString()
    .split('T')[0]
    .split('-'),
  email: '',
  password: '',
  confirmPassword: '',
  biography: '',
  idRole: '626aef37b4a9510568d6036d', // id del rol de lector
  literaryGenres: []
}