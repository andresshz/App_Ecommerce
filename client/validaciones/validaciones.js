export function validaciones(values) {
    const errores = {};
    const email =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    if (!values.identificacion || !values.password || !values.passwordconfirm) {
      errores.required = true;
    }
    if (!email.test(values.identificacion)) {
      errores.email = true;
    }
  
    return errores;
  }

  export function validacionesLogin(values) {
    const errores = {};
    const email =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    if (!values.identificacion || !values.password) {
      errores.required = true;
    }
    
    if (!email.test(values.identificacion)) {
      errores.email = true;
    }
  
    return errores;
  }

