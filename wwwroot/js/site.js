// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Write your JavaScript code.
let personaFisica = new Object();
let elementosReporteLista = '';
let crearXLS = [];
let xlsHeader = ["FechaRegistroEmpresa", "IdCliente", "IdEmpleado", "IdViaje",
    "Materno", "Nombre", "Paterno", "RFC", "RazonSocial", "Sucursal"];
checUser();

function cerrarSesion() {
   document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
   });
    ocultarDiv();
    limpiarCampos();
   checUser();
}

function checUser() {
    if (readCookie("Authorization") != null) {
        document.getElementById("btnCrud").removeAttribute("hidden");
        document.getElementById("IdExcel").removeAttribute("hidden");
        document.getElementById("btnCerrarSesion").removeAttribute("hidden");
    } else {
        document.getElementById("btnCrud").setAttribute("hidden", "hidden");
        document.getElementById("IdExcel").setAttribute("hidden", "hidden");
        document.getElementById("btnCerrarSesion").setAttribute("hidden", "hidden");
    }
}

$(document).on('submit', '#Login', function (e) {
    e.preventDefault();
    data = {
        'Username': document.getElementById('NombreId').value,
        'Password': document.getElementById('ClaveId').value,
    }
    $.ajax({
        beforeSend: function () {
            $('#Login button[type=submit]').prop('disabled', true);
        },
        crossDomain: true,
        type: 'POST',
        method: 'POST',
        url: "https://api.toka.com.mx/candidato/api/login/authenticate",
        data: data,
        dataType: 'json',
        success: function (data) {
            alert('Bienvenido');
            document.cookie = "Authorization=" + data.Data;
            checUser();
            limpiarCampos();
        },
        error: function () {
            alert("Datos no enviados Error");
            limpiarCampos();
        },
        complete: function () {
            $('#Login button[type=submit]').prop('disabled', false);
        }
    });
});

$(document).on('submit', '#LoginCrear', function (e) {
    e.preventDefault();
    data = {
        "fechaRegistro": new Date(),
        "fechaActualizacion": new Date(),
        "nombre": document.getElementById("NombreCrear").value,
        "apellidoPaterno": document.getElementById("APaterno").value,
        "apellidoMaterno": document.getElementById("AMaterno").value,
        "rfc": document.getElementById("RFC").value,
        "fechaNacimiento": document.getElementById("FNacimiento").value,
        "usuarioAgrega": 1,
        "activo": true
    }
    $.ajax({
        beforeSend: function () {
            $('#LoginCrear button[type=submit]').prop('disabled', true);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: "https://localhost:44335/api/person",
        data: JSON.stringify(data),
        success: function (data) {
            alert('!Registrado!');
            limpiarCampos();
            ocultarDiv();
            checUser();
        },
        error: function () {
            alert("Datos no enviados Error");
            document.getElementById("btnCrud").setAttribute("hidden", "hidden");
            document.getElementById("IdExcel").setAttribute("hidden", "hidden");
        },
        complete: function () {
            $('#LoginCrear button[type=submit]').prop('disabled', false);
        }
    });
});

function buscarPersona() {
    $.ajax({
        beforeSend: function () {
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: "https://localhost:44335/api/person/" + document.getElementById("NombreAct").value,
        data: "",
        success: function (data) {
            if (data != undefined) {
                crearPersonaObjt(data);
                document.getElementById("APaternoAct").value = data.apellidoPaterno;
                document.getElementById("AMaternoAct").value = data.apellidoMaterno;
                document.getElementById("RFCAct").value = data.rfc;
                document.getElementById("FNacimientoAct").value = data.fechaNacimiento;
            } else {
                alert('!No existe usuario!');
                limpiarCampos();
            }
        },
        error: function () {
            alert("Datos no enviados Error");
        },
        complete: function () {
        }
    });
}

$(document).on('submit', '#LoginActualizar', function (e) {
    e.preventDefault();
    personaFisica.nombre = document.getElementById("NombreAct").value;
    personaFisica.fechaActualizacion = new Date();
    personaFisica.apellidoPaterno = document.getElementById("APaternoAct").value;
    personaFisica.apellidoMaterno = document.getElementById("AMaternoAct").value;
    personaFisica.rfc = document.getElementById("RFCAct").value;
    personaFisica.fechaNacimiento = document.getElementById("FNacimientoAct").value;
    $.ajax({
        beforeSend: function () {
            $('#LoginActualizar button[type=submit]').prop('disabled', true);
        },
        type: 'PUT',
        contentType: 'application/json',
        url: "https://localhost:44335/api/person/" + personaFisica.idPersonaFisica,
        data: JSON.stringify(personaFisica),
        success: function (data) {
            alert('!Actualizado!');
            limpiarCampos();
            ocultarDiv();
        },
        error: function () {
            alert("Datos no enviados Error");
        },
        complete: function () {
            $('#LoginActualizar button[type=submit]').prop('disabled', false);
        }
    });
});

$(document).on('submit', '#LoginConsultar', function (e) {
    e.preventDefault();
    $.ajax({
        beforeSend: function () {
            $('#LoginConsultar button[type=submit]').prop('disabled', true);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: "https://localhost:44335/api/person/" + document.getElementById("NombreCon").value,
        data: '',
        success: function (data) {
            if (data != undefined) {
                document.getElementById("APaternoCon").value = data.apellidoPaterno;
                document.getElementById("AMaternoCon").value = data.apellidoMaterno;
                document.getElementById("RFCCon").value = data.rfc;
                document.getElementById("FNacimientoCon").value = data.fechaNacimiento;
            } else {
                alert('!No existe usuario!');
                limpiarCampos();
            }
        },
        error: function () {
            alert("Datos no enviados Error");
        },
        complete: function () {
            $('#LoginConsultar button[type=submit]').prop('disabled', false);
        }
    });
});

function eliminarUsuario() {
    $.ajax({
        beforeSend: function () {
            $('#LoginEliminar button[type=submit]').prop('disabled', true);
        },
        type: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        url: "https://localhost:44335/api/person/" + personaFisica.idPersonaFisica,
        data: '',
        success: function (data) {
            alert('!Eliminado!');
            limpiarCampos();
        },
        error: function () {
            alert("Datos no enviados Error");
        },
        complete: function () {
            $('#LoginEliminar button[type=submit]').prop('disabled', false);
        }
    });
}

function buscarPersonaEli() {
    $.ajax({
        beforeSend: function () {
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: "https://localhost:44335/api/person/" + document.getElementById("NombreEli").value,
        data: "",
        success: function (data) {
            if (data != undefined) {
                crearPersonaObjt(data);
                document.getElementById("APaternoEli").value = data.apellidoPaterno;
                document.getElementById("AMaternoEli").value = data.apellidoMaterno;
                document.getElementById("RFCEli").value = data.rfc;
                document.getElementById("FNacimientoEli").value = data.fechaNacimiento;
            } else {
                alert('!No existe usuario!');
                limpiarCampos();
            }
        },
        error: function () {
            alert("Datos no enviados Error");
        },
        complete: function () {
        }
    });
}


function buscarReportes() {
    $.ajax({
        beforeSend: function () {
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: "https://api.toka.com.mx/candidato/api/customers",
        data: "",
        headers: {
            'Authorization': readCookie("Authorization")
        },
        success: function (data) {
            elementosReporteLista = data.Data;
            crearTabla();
        },
        error: function () {
            alert("Datos no enviados Error");
        },
        complete: function () {
        }
    });
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function verDiv(_option) {
    ocultarDiv();
    switch (_option) {
        case 'crear':
            document.getElementById("LoginCrear").removeAttribute("hidden");
            break;
        case 'actualizar':
            document.getElementById("LoginActualizar").removeAttribute("hidden");
            break;
        case 'consultar':
            document.getElementById("LoginConsultar").removeAttribute("hidden");
            break;
        case 'eliminar':
            document.getElementById("LoginEliminar").removeAttribute("hidden");
            break;
    }
}

function ocultarDiv() {
    document.getElementById("LoginCrear").setAttribute("hidden", "hidden");
    document.getElementById("LoginActualizar").setAttribute("hidden", "hidden");
    document.getElementById("LoginConsultar").setAttribute("hidden", "hidden");
    document.getElementById("LoginEliminar").setAttribute("hidden", "hidden");
}

function crearPersonaObjt(_personDict) {
    personaFisica.activo = _personDict.activo;
    personaFisica.apellidoMaterno = _personDict.apellidoMaterno;
    personaFisica.apellidoPaterno = _personDict.apellidoPaterno;
    personaFisica.fechaActualizacion = _personDict.fechaActualizacion;
    personaFisica.fechaNacimiento = _personDict.fechaNacimiento;
    personaFisica.fechaRegistro = _personDict.fechaRegistro;
    personaFisica.idPersonaFisica = _personDict.idPersonaFisica;
    personaFisica.nombre = _personDict.nombre;
    personaFisica.rfc = _personDict.rfc;
    personaFisica.usuarioAgrega = _personDict.usuarioAgrega;
}

function limpiarCampos() {
    let nombreCampos = ["NombreCrear", "APaterno", "AMaterno", "RFC", "FNacimiento", "NombreAct",
        "APaternoAct", "AMaternoAct", "RFCAct", "FNacimientoAct", "NombreCon", "APaternoCon", "AMaternoCon",
        "RFCCon", "FNacimientoCon", "NombreEli", "APaternoEli", "APaternoEli", "AMaternoEli", "RFCEli", "FNacimientoEli"
    ];
    for (i = 0; i < nombreCampos.length; i++) {
        document.getElementById(nombreCampos[i]).value = "";
    }
}


var estado = {
    'tablaReporte': '',

    'pagina': 1,
    'renglones': 20,
    'window': 500,
}

function paginacion(tablaReporte, pagina, renglones) {

    var inicio = (pagina - 1) * renglones
    var final = inicio + renglones

    var datos = tablaReporte.slice(inicio, final)

    var paginas = Math.round(tablaReporte.length / renglones);

    return {
        'tablaReporte': datos,
        'paginas': paginas,
    }
}

function paginaBotones(paginas) {
    var paginacionDiv = document.getElementById('pagination-wrapper')

    paginacionDiv.innerHTML = ''

    var izquierda = (estado.pagina - Math.floor(estado.window / 2))
    var derecha = (estado.pagina + Math.floor(estado.window / 2))

    if (izquierda < 1) {
        izquierda = 1
        derecha = estado.window
    }

    if (derecha > paginas) {
        izquierda = paginas - (estado.window - 1)

        if (izquierda < 1) {
            izquierda = 1
        }
        derecha = paginas
    }



    for (var pagina = izquierda; pagina <= derecha; pagina++) {
        paginacionDiv.innerHTML += `<button value=${pagina} class="page btn btn-sm btn-info">${pagina}</button>`
    }

    if (estado.pagina != 1) {
        paginacionDiv.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + paginacionDiv.innerHTML
    }

    if (estado.pagina != paginas) {
        paginacionDiv.innerHTML += `<button value=${paginas} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function () {
        $('#table-body').empty()

        estado.pagina = Number($(this).val())

        crearTabla()
    })

}


function crearTabla() {
    var tablaInfo = $('#table-body')
    estado.tablaReporte = elementosReporteLista;
    var data = paginacion(estado.tablaReporte, estado.pagina, estado.renglones)
    var lista = data.tablaReporte

    for (var i = 1 in lista) {
        var row = `<tr>
                  <td>${lista[i].FechaRegistroEmpresa}</td>
                  <td>${lista[i].IdCliente}</td>
                  <td>${lista[i].IdEmpleado}</td>
                  <td>${lista[i].IdViaje}</td>
                  <td>${lista[i].Materno}</td>
                  <td>${lista[i].Nombre}</td>
                  <td>${lista[i].Paterno}</td>
                  <td>${lista[i].RFC}</td>
                  <td>${lista[i].RazonSocial}</td>
                  <td>${lista[i].Sucursal}</td>
                  `
        tablaInfo.append(row)
    }
    paginaBotones(data.paginas)
}

function crearExcel() {
    let listaElementosExcel = JSON.parse(JSON.stringify(elementosReporteLista));
    crearXLS.push(xlsHeader);
    $.each(listaElementosExcel, function (index, value) {
        var insertarRenglonData = [];
        $.each(value, function (ind, val) {

            insertarRenglonData.push(val);
        });
        crearXLS.push(insertarRenglonData);
    });

    var nombreArchivo = "Reporte_XLSX.xlsx";

    var ws_name = "Tonny";

    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(crearXLS);

    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    XLSX.writeFile(wb, nombreArchivo);
    $('#table-body').innerHTML = '';
    crearTabla();
}