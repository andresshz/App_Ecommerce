import sweetalert from 'sweetalert2'

export function Alerta(contenido, icon) {


  const alert = sweetalert.fire({
    title: contenido,
    confirmButtonText: "OK",
    icon: icon,
  });

  return alert;
}

export function AlertaConfirm(contenido, icon) {
  sweetalert
    .fire({
      title: contenido,
      confirmButtonText: "OK",
      icon: icon,
    })
    .then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
}

export function AlertaReturn(contenido, icon) {
  sweetalert
    .fire({
      title: contenido,
      confirmButtonText: "OK",
      icon: icon,
    })
    .then((result) => {
      if (result.isConfirmed) {

      }
    });
    return true
}