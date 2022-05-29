import { object, string } from 'yup'

export const commentSchema = object({
  description: string()
    .min(1, 'Debes escribir un comentario')
    .max(255, 'El comentario no puede tener más de 255 caracteres')
    .required('Debes escribir un comentario'),
}).required()

export const commentDefaultValue = {
  description: '',
}