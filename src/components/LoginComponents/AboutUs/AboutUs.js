import React from 'react'
import { VStack, Text } from 'native-base'

const AboutUs = () => {
  return (
    <VStack>
      <Text bold fontSize={'md'}>
        Thoteam
      </Text>
      <VStack mx={3} space={2} >
        <Text fontSize={'sm'} textAlign='justify'>
          Thoteam ~ (<Text italic>Thot</Text> del dios egipcio de la sabiduría,
          la escritura jeroglífica, la ciencia, la magia, las artes, el juicio y los muertos, mientras que, <Text italic>team</Text>
          , del inglés, es una palabra que significa equipo, grupo, equipo de trabajo, grupo de trabajo).
        </Text>
        <Text fontSize={'sm'} textAlign='justify'>
          Este grupo nace de la mano de estudiantes de la carrera de Ingeniería en Informática de la
          Universidad Centroccidental "Lisandro Alvarado" (<Text italic>UCLA</Text>) en Venezuela el 06 de marzo del 2022,
          bajo los integrantes <Text bold>Luis Valladares</Text>, <Text bold>José Rivero</Text> y <Text bold>Gustavo Rivero</Text>.
        </Text>
        <Text fontSize={'sm'} textAlign='justify'>
          Asimismo, Thoteam es formado con el propósito de elaborar una red social en forma de aplicación móvil,
          que permita a los usuarios registrarse, iniciar sesión, crear publicaciones, comentar, compartir,
          y mucho más, esto con el propósito de atender a lo solicitado por el programa de la asignatura de
          Laboratorio III (<Text italic >9832</Text>). Es así como nace el proyecto <Text bold italic>Flymagine</Text>.
        </Text>
        <Text fontSize={'sm'} textAlign='justify'>
          De esta forma, el proyecto <Text italic>Flymagine</Text> da inicio este mismo día, con José Rivero elaborando
          principalmente la documentación y el backend de la aplicación, Luis Valladares enfocado en el frontend y
          Gustavo Rivero como líder del equipo, aportando en los diferentes roles que se desempeñan en el proyecto.
        </Text>
        <Text fontSize={'sm'} textAlign='justify'>
          Durante el desarrollo del proyecto, se recibe el apoyo del ingeniero en informática <Text bold>Simón Velasquez </Text>
          al inicio del proyecto para determinar la mejor estructura del backend a implementar en el proyecto. De igual manera,
          del graduando de ingeniería en informática de la promoción número 62 <Text bold>Dany Karam</Text> al final de la primera versión de <Text italic>Flymagine </Text>
          para exportar la <Text italic>apk</Text> del proyecto.
        </Text>
        <Text fontSize={'sm'} textAlign='justify'>
          Así, se logra exponer la primera versión del proyecto el día <Text italic>04</Text> de <Text italic>junio</Text> del <Text italic>2022</Text>,
          en las instalaciones del Decanato de Ciencias y Tecnología (<Text italic>DCYT</Text>) de la <Text italic>UCLA</Text>. El profesor
          encargado para evaluar el proyecto fue el ingeniero en informática <Text bold>Jorge Chiquin</Text>, quien
          evaluó el proyecto con una nota de <Text italic>45</Text>/<Text italic>60</Text> en la evaluación de la asignatura de Laboratorio III.
          Esto debido a que el proyecto tenía detalles en cuanto a performance, seguridad en el servidor y velocidad de respuesta sin el uso de spinners.
        </Text>
        <Text fontSize={'sm'} textAlign='justify'>
          Sin embargo, el proyecto pese a tener detalles, el integrante de <Text italic>Thoteam</Text>, Gustavo Rivero,
           decide continuar con el desarrollo del proyecto, para que el mismo pueda ser utilizado tanto como portafolio personal y,
           de tener buena receptividad, poder ser desplegado y publicado para que los usuarios puedan utilizarlo.
        </Text>
      </VStack>
    </VStack>
  )
}

export default AboutUs