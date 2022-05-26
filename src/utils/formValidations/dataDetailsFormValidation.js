import { object, string, array } from 'yup'

export const dataDetailsSchema = object({
  firstName: string()
    .min(2, 'El nombre debe contener al menos 2 caracteres')
    .max(40, 'El nombre debe contener máximo 40 caracteres')
    .notRequired(),
  lastName: string()
    .min(2, 'El apellido debe contener al menos 2 caracteres')
    .max(40, 'El apellido debe contener máximo 40 caracteres')
    .notRequired(),
  phone: string()
    .min(10, 'El número telefónico debe contener al menos 10 caracteres')
    .max(15, 'El número telefónico debe contener máximo 15 caracteres')
    .notRequired()
    .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i, 'El número telefónico no es válido'),
  address: string()
    .min(4, 'La dirección debe contener al menos 4 caracteres')
    .max(255, 'La dirección debe contener máximo 255 caracteres')
    .notRequired(),
  biography: string()
    .max(1024, 'La biografía debe contener máximo 1024 caracteres')
    .default('')
    .notRequired(),
  literaryGenres: array()
    .min(1, 'Debe seleccionar al menos una preferencia')
    .required('Las preferencias son requeridas')
}).required()

export const dataDetailsDefaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  biography: '',
  literaryGenres: []
}