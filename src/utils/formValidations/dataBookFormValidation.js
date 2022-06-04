import { object, string, array } from 'yup'

export const registerBookSchema = object({
  name: string()
    .min(2, 'El nombre debe contener al menos 2 caracterer')
    .max(255, 'El nombre debe contener máximo 255 caracteres')
    .required('El nombre es requerido'),
  synopsis: string()
    .min(2, 'La sipnosis debe contener al menos 2 caracteres')
    .max(1024, 'La sipnosis debe contener máximo 1024 caracteres')
    .required('La sipnosis es requerida'),
  photo: string()
    .min(1, 'La foto debe contener al menos 1 caracter')
    .max(1024, 'La foto debe contener máximo 1024 caracteres')
    .required('La foto es requerida'),
  creationDate: string()
    .default(new Date().toISOString().split('T')[0])
    .required('La fecha de creación es requerida'),
  document: string()
    .min(1, 'El documento debe contener al menos 1 caracter')
    .max(1024, 'El documento debe contener máximo 1024 caracteres')
    .required('El documento es requerido'),
  literaryGenres: array()
    .min(1, 'Debe seleccionar al menos un género literario')
    .required('Los géneros literarios son requeridos')
}).required()

export const registerBookDefaultValues = {
  name: '',
  synopsis: '',
  photo: '',
  creationDate: new Date()
    .toISOString()
    .split('T')[0]
    .split('-'),
  document: '',
  literaryGenres: []
}