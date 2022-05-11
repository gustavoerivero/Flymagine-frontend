import { object, string, ref } from 'yup'

export const registerSchema = object({
  firstName: string().min(2).max(40).required('El nombre debe contener entre 2 y 40 caracteres'),
  lastName: string().min(2).max(40).required('El apellido debe contener entre 2 y 40 caracteres'),
  phone: string().max(20).required('El teléfono es requerido').matches(/^\+91\d{10}$/),
  address: string().max(255).required('La dirección es requerida'),
  birthday: string().max(10).required('La fecha de nacimiento es requerida'),
  email: string().email().max(50)
    .required('El email es inválido')
    .matches(/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/),
  password: string().min(8).max(16)
    .required('La contraseña debe contener entre 8 y 16 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/),
  confirmPassword: string().required()
    .oneOf([ref('password')], 'Las contraseñas no coinciden'),
  biography: string().max(1024),
  idRole: string().max(24).required(),
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
  idRole: null,
}