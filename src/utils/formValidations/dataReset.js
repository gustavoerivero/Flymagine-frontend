import { object, string } from 'yup'

export const restorePasswordSchema = object({
  email: string()
    .email('El email debe ser válido')
    .required('El email es requerido'),
}).required()

export const restorePasswordDefaultValue = {
  email: '',
}