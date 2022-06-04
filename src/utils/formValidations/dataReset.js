import { object, string } from 'yup'

export const restorePasswordSchema = object({
  email: string().email().required(),
}).required()

export const restorePasswordDefaultValue = {
  email: '',
}