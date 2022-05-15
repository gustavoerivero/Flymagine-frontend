import { object, string, array } from 'yup'

export const dataDetailsSchema = object({
  biography: string()
    .max(1024, 'La biografía debe contener máximo 1024 caracteres')
    .default('')
    .notRequired(),
  literaryGenres: array()
    .min(1, 'Debe seleccionar al menos una preferencia')
    .required('Las preferencias son requeridas')
}).required()

export const dataDetailsDefaultValues = {
  biography: '',
  literaryGenres: []
}