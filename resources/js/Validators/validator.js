//este me'todo permite validar el mime de una imagen y 
//su extensio'n de imagen
export function validateImage(image) {
  if(!image)
    return {success:false,msg:"No se ha seleccionado una nueva imagen"};
  const validMimeTypes = ['image/jpeg', 'image/png'];
  const validExtensions = ['jpg', 'jpeg', 'png'];
  const fileType = image.type;
  const fileExtension = image.name.split('.').pop().toLowerCase();
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB


  if (!validMimeTypes.includes(fileType)) {
    return {success:false,msg:"El archivo debe ser de tipo imagen"};
  }

  if (!validExtensions.includes(fileExtension)) {
    return {success:false,msg:"La imagen debe ser de extensión .jpg .jpeg .png"};
  }

  if (image.size > maxSizeInBytes) {
    return { success: false, msg: "La imagen no debe pesar más de 10MB" };
  }

  return {success:true,msg:"La imagen cumple todos los requerimientos"};
  }