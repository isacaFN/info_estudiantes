var estudiantes = [];

function agregar(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let cedula = document.getElementById("cedula").value;
    let fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    let sexo = document.getElementById("sexo").value;
    let direccion = document.getElementById("direccion").value;
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);
    let nota4 = Number(document.getElementById("nota4").value);

    if(nombre === ""){
        alert("El nombre es requerido");
    }else if(apellido === ""){
        alert("El apellido es requerido");
    }else if(cedula === ""){
        alert("El cedula es requerida");
    }else if(fechaNacimiento === ""){
        alert("La fecha de nacimiento es requerida");
    }else if(sexo === ""){
        alert("El sexo es requerido");
    }else if(direccion === ""){
        alert("La direccion es requerida");
    }else if(nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || nota4 <= 0){
        alert("las notas no pueden ser menores o iguales cero");
    }else{
        let totalNotas = nota1 + nota2 + nota3 + nota4;
        let promedio = totalNotas / 4;
        let estado = "";

        if(promedio < 10){
             estado = "REPROBADO";
        }
        else{
            estado = "APROBADO";
        }

        let fecha = new Date();
        let fecha1 = new Date(fechaNacimiento);
        let edad = fecha.getFullYear() - fecha1.getFullYear();


        let mesActual = fecha.getMonth();
        let mesNacimiento = fecha1.getMonth();
        let diaActual = fecha.getDate();
        let diaNacimiento = fecha1.getDate();

        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
            edad--; // Resta un año si el cumpleaños aún no ha llegado
        }

        const nuevoEstudiante = {
            "nombre": nombre,
            "apellido": apellido,
            "cedula": cedula,
            "fechaNacimiento": fechaNacimiento,
            "sexo": sexo,
            "direccion": direccion,
            "matematicas": nota1,
            "ingles": nota2,
            "historia": nota3,
            "biologia": nota4,
            "notas": promedio,
            "edad": edad,
            "estado": estado
        }

        estudiantes.push(nuevoEstudiante);

        mostrarEstudiantes();
        limpiarFormulario();
    }

}

function mostrarEstudiantes(){


    let output = "";

    for(let i in estudiantes){
        output += `<tr>
      <td>${estudiantes[i].nombre}</td>
      <td>${estudiantes[i].apellido}</td>
      <td>${estudiantes[i].cedula}</td>
      <td>${estudiantes[i].edad}</td>
      <td>${estudiantes[i].notas}</td>
      <td> 
        <div class="contenedor-boton-eliminar">
            <button class="boton-eliminar" onclick="eliminar(${i})" title="Eliminar registro">x</button>
            <button class="boton-mostrar" onclick="mostrarRegistro(${i})" title="Mostrar registro completo">👁</button>
        </div>
      </td>
    </tr>
    `;
        }


        document.getElementById("cuerpotabla").innerHTML = output;

}

function limpiarFormulario(){
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("fecha-nacimiento").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("nota1").value = "0";
    document.getElementById("nota2").value = "0";
    document.getElementById("nota3").value = "0";    
    document.getElementById("nota4").value = "0";
}

function eliminar(i){
    estudiantes.splice(i, 1);
    mostrarEstudiantes();
}

function mostrarRegistro(i){

    let mayor = "";
    if(estudiantes[i].edad < 18){
        mayor = "El estudiante es menor de edad";
    }else{
        mayor = "El estudiante es mayor de edad";
    }
    let mostrar = `<div class="contendor-modal">
                    <div class="modal"> 
                        <p><span>Nombre:</span> ${estudiantes[i].nombre}</p>
                        <p><span>Apellido:</span> ${estudiantes[i].apellido}</p>
                        <p><span>Cedula:</span> ${estudiantes[i].cedula}</p>
                        <p><span>Fecha de nacimiento:</span> ${estudiantes[i].fechaNacimiento}</p>
                        <p><span>Edad:</span> ${estudiantes[i].edad} años</p>
                        <p><span>Sexo:</span> ${estudiantes[i].sexo}</p>
                        <p><span>Direccion:</span> ${estudiantes[i].direccion}</p>
                        <br>
                        <p><span>Notas:</span></p>
                        <p><span>Matematicas:</span> ${estudiantes[i].matematicas}</p>
                        <p><span>Ingles:</span> ${estudiantes[i].ingles}</p>
                        <p><span>Historia:</span> ${estudiantes[i].historia}</p>
                        <p><span>Biologia:</span> ${estudiantes[i].biologia}</p>
                        <p><span>Promedio:</span> ${estudiantes[i].notas}</p>
                        <p><span>Estado:</span> ${estudiantes[i].estado}</p>
                        <br><br>
                        <p>${mayor}</p>
                    </div>
                </div>`;
                

                document.getElementById("modal-datos").innerHTML = mostrar;

                const contenedorModal = document.querySelector('.contendor-modal');

                contenedorModal.addEventListener('click', function(event) {
                    if (event.target === contenedorModal) {
                        contenedorModal.remove(); 
                    }
                });
}
