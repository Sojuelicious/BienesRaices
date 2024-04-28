import { Dropzone } from 'dropzone'

Dropzone.options.imagen = {
  dictDefaultMessage: 'Seleccione o arrastra aqui tus imagenes',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Archivo',
  dictMaxFilesExceeded: 'El Limite es 1 Archivo'
}
