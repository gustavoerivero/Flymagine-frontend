import React from 'react'
import { VStack, Text } from 'native-base'

const Genesis = () => {
  return (
    <VStack>
      <Text bold fontSize={'md'}>
        v1.0.0: Genesis || 04062022
      </Text>
      <VStack ml={3} >
        <Text fontSize={'sm'}>
          - Es posible registrarse como usuario de la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - La contraseña del usuario se encuentra encriptada
        </Text>
        <Text fontSize={'sm'}>
          - Al registrarse como usuario, se permite escoger entre dos tipos de usuario: <Text italic>Lector</Text> o <Text italic>Escritor</Text>
        </Text>
        <Text fontSize={'sm'}>
          - Es posible iniciar sesión como usuario de la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Es posible recuperar la contraseña de un usuario mediante un correo electrónico
        </Text>
        <Text fontSize={'sm'}>
          - Es posible hacer publicaciones en la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Es posible ver las publicaciones de otros usuarios
        </Text>
        <Text fontSize={'sm'}>
          - Es posible adjuntar imágenes en publicaciones
        </Text>
        <Text fontSize={'sm'}>
          - Es posible realizar comentarios en las publicaciones
        </Text>
        <Text fontSize={'sm'}>
          - Es posible publicar libros si el usuario posee el rol de <Text italic>Escritor</Text>
        </Text>
        <Text fontSize={'sm'}>
          - Es posible realizar reviews a los libros que se encuentran registrados en la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Es posible gestionar los datos de usuario de la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Es posible gestionar las publicaciones, comentarios, libros y/o reviews realizadas por el usuario
        </Text>
        <Text fontSize={'sm'}>
          - Es posible reaccionar a las publicaciones, comentarios y/o reviews registradas en la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Es posible indicar si un libro es favorito por el usuario o no
        </Text>
        <Text fontSize={'sm'}>
          - Es posible indicar si se está interesado en un libro (por leer), si se está leyendo o si ya se ha leído
        </Text>
        <Text fontSize={'sm'}>
          - Es posible realizar búsquedas en la aplicación por nombres de usuarios, por nombres de libros o por etiquetas en publicaciones
        </Text>
        <Text fontSize={'sm'}>
          - Es posible seguir o dejar de seguir a otros usuarios
        </Text>
        <Text fontSize={'sm'}>
          - En el Feed de la aplicación, se mostrarán todas las publicaciones tanto del usuario como de los usuarios que sigue
        </Text>
        <Text fontSize={'sm'}>
          - Solo se permite eliminar o modificar publicaciones que se hayan realizado por el usuario en un periodo de 24 horas posterior a la fecha de publicación
        </Text>
      </VStack>
    </VStack>
  )
}

export default Genesis