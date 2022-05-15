import { object, string } from 'yup'

export const dataBasicSchema = object({
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
  address: string()
    .min(4, 'La dirección debe contener al menos 4 caracteres')
    .max(255, 'La dirección debe contener máximo 255 caracteres')
    .required('La dirección es requerida'),
}).required()

export const dataBasicDefaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
}