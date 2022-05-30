import { object, string, number } from 'yup'

export const reviewSchema = object({
  description: string()
    .required('La descripción de la review es requerida')
    .min(1, 'La descripción debe tener al menos 1 caracter')
    .max(1024, 'La descripción debe tener máximo 1024 caracteres'),
  rating: number()
    .required('La calificación de la review es requerida')
    .min(1, 'La calificación debe tener al menos 1 estrella')
    .max(5, 'La calificación debe tener máximo 5 estrellas'),
}).required()

export const reviewDefaultValues = {
  description: '',
  rating: 1,
}