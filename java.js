///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCIONES DE JAVASCRIPT :D

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var caracteristica, material, nombre, metodoParaCargar, canal, metodoParaMixto;
var etapa, subetapa;
var canalPorCv;
var cv, usuario, coop, metodoDeCarga, camion, user, idIngreso = 0,
    idBolson = 0;
var pesoT = 0,
    pesoEntradaG = 0,
    pesoSalidaG = 0,
    cantidad = 0,
    pesoTotalG = 0;
var elemento = 0;
var baseVerificar = { RD: "", GG: "", PV: "", VENTA: "", DESCARTE: "", MIXTA: "", CA: "" };
var idVer = false,
    pesoVer = false,
    patenteVer = false,
    fechaVer = false,
    horaVer = false;
var posicionCanal = 0,
    posicionEtapas = 0;
var datoPeso = [],
    datoPesoE = [],
    datoPesoS = [];
var datoEtapas = [],
    datoCanal = [],
    datoMaterialM = [],
    datoCaracteristicaM = [];
var datoPesoCanal = [],
    datoPesoECanal = [],
    datoPesoSCanal = [];
var datoPesoMaterial = [],
    datoPesoEMaterial = [],
    datoPesoSMaterial = [],
    cantidadMaterial = [],
    posicionMaterial = 0;
var datoPesoCara = [],
    datoPesoECara = [],
    datoPesoSCara = [],
    cantidadCara = [],
    posicionCara = [];
var datosEditables = [],
    datoEditableFinal = [];
var cantidadEtapa = [];
var cantidadCanal = [];
var listaDeID = [];
var datosCamion = [];
var datosBolson = [];
var datoComun = [];
var datoMaterial = [];
var datoCaracteristica = [];
var datoBolsonVieja = [],
    datoCamionVieja = [];
var banderaEgreso = false;

//////////////////////////////////////////VARIABLES PARA HACER CONEXIÓN CON GOOGLE////////////////////////////
var datoNombres = [];
var datoClaves = [];
var datoCV = [];
var datoCOOP = [];
var datoGeneral = [];
var datosEtapas = [];
var datoSubEtapas = [];
var datosMetodos = [];
var canales = [];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CLASE DE USUARIO///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Usuario {
    constructor() {
        this.usuario = document.getElementById('usuario').value;
        this.clave = document.getElementById('clave').value;
        console.log("Haz creado un usuario correctamente");
        this.entrar();
    }

    entrar() {
            var usua = this.usuario;
            for (var i = 0; i < datoNombres.length; i++) {
                if (datoNombres[i][0] == this.usuario) {
                    if (datoClaves[i][0] == this.clave) {
                        cv = datoCV[i][0];
                        coop = datoCOOP[i][0];
                        usuario = datoNombres[i][0];
                        repartirDatos();
                        document.getElementById("usuario").value = "";
                        document.getElementById("clave").value = "";
                        return colocarEscritorio();
                    } else {
                        validacion(false, "<p>La clave ingresada es invalida</p>", "aviso");
                        document.getElementById("usuario").value = "";
                        document.getElementById("clave").value = "";
                        return document.getElementById("usuario").focus();
                    }
                }
                document.getElementById("aviso").style.display = "none";
            }
            validacion(false, "<p>El nombre y/o clave no existe en nuestra base de datos.</p>", "aviso");
            document.getElementById("usuario").value = "";
            document.getElementById("clave").value = "";
            document.getElementById("usuario").focus();
        }
        //Realiza conexión con GOOGLE y muestra la pantalla correspondiente.
    conexionGoogle(canalRecibido, mixto) {
            console.log("-------------------------ENTRO EN CONEXION A GOOGLE------------------------------------------");
            console.log(canalRecibido);
            canal = canalRecibido;
            gestionarMetodos();
            console.log(metodoDeCarga);
            console.log(metodoDeCarga.length);
            if (metodoDeCarga.length == 2) {
                console.log("entro en el primer if");
                mostrarPantalla("elementos");
                var tipoCarga = [metodoDeCarga[0], metodoDeCarga[1]];
                console.log("-------------ACA MUESTRO LA VARIABLE TIPO CARGA--------------------");
                console.log(tipoCarga);
                setTimeout(function() {
                    colocarMenu(tipoCarga, 'divExtra', '', true)
                }, 2000);
            } else {
                if (mixto == undefined) {
                    mostrarPantalla("carga");
                } else {
                    document.getElementById("camion").style.display = "none";
                    document.getElementById("bolson").style.display = "inline";
                    document.getElementById("mixta").style.display = "none";
                    user.abrirMetodos();
                }
            }
            console.log("-------------------------SALIO DE CONEXION A GOOGLE------------------------------------------");
        }
        //Abre los metodos según el centro verde que opera
    abrirMetodos() {
            console.log("-------------------ENTRO A USER.ABRIRMETODOS------------------");
            console.log(metodoDeCarga);
            switch (metodoDeCarga) {
                case "cargaBolson":
                    metodoParaCargar = new cargaBolson();
                    camion = new Camion();
                    metodoParaCargar.abrir();
                    break;
                case "salidaMaterialE":
                    metodoParaCargar = new salidaMaterialE();
                    camion = new Camion();
                    metodoParaCargar.abrir();
                    break;
                case "entradaSalida":
                    var objeto = new entradaSalida();
                    objeto.alerta();
                    break;
                case "mixta":
                    console.log("entro en mixta");
                    metodoParaMixto = new mixta();
                    camion = new Camion();
                    metodoParaMixto.abrir();
                    break;
                    /*case "cargaBolsonIDREF":
                        var objeto = new cargaBolsonIDREF();
                        objeto.alerta();
                    break;
                    case "cantidadPeso":
                        var objeto = new cantidadPeso();
                        objeto.alerta();
                    break;
                    case "cargaBolsonNOMBREID":
                        var objeto = new cargaBolsonNOMBREID();
                        objeto.alerta();
                    break;
                    case "cantidadPesoASOC":
                        var objeto = new cantidadPesoASOC();
                        objeto.alerta();
                    break;
                    case "cargaBolsonASOC":
                        var objeto = new cargaBolsonASOC();
                        objeto.alerta();
                    break;
                    case "entradaSalidaASOC":
                        var objeto = new entradaSalidaASOC();
                        objeto.alerta();
                    break;*/
                default:
                    console.log("ENTRO EN DEFAULT, SIN METODO");
            }
        }
        //Verifica el id :D
    verificar() {
        if (!idVer && document.getElementById("id").value != "") {
            if (alertarCorreo("El id ingresado ¡No está asociado a ningún dato!")) {
                validacion(true, "<p>Se ha enviado el aviso al administrador, puedes seguir cargando.</p>", "validador");
                nombre = "N/E";
                metodoParaCargar.id.disabled;
                document.getElementById("botonCargar").focus();
                return idVer = true;
            } else {
                validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
                idVer = 3;
                document.getElementById("pesoEntrada").value = "";
                document.getElementById("id").value = "";
                console.log("ENTRO EN FALSE EN VERIFICAR")
                return document.getElementById("pesoEntrada").focus();
            }
        } else if (idVer && document.getElementById("id").value != "") {
            validacion(true, "<p>El id está asociado a: " + nombre + "</p>", "validador");
        }

        document.getElementById("botonCargar").disabled = !(idVer && pesoVer && idVer != 3);
    }

    verificarID(baseDeDatos) {
            document.getElementById("validador").style.display = "none";
            var id = document.getElementById("id").value;
            if (baseDeDatos != "RD" && baseDeDatos != "GG" && baseDeDatos != "PV" &&
                baseDeDatos != "MIXTA" && baseDeDatos != "CA" && baseDeDatos != "DESCARTE" &&
                baseDeDatos != "VENTA" && baseDeDatos != "") {
                compararID(id);
            } else { idVer = true; }
            if (idVer) {
                validacion(true, "<p>El id está asociado a: " + nombre + "</p>", "validador");
                return idVer = true;
            } else if (idVer == 1) {
                idVer = false;
                return validador.style.display = "none";
            } else {
                idVer = false;
                console.log("entro en false, en verificarID");
                return validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
            }
        }
        //Verificar el peso :D
    verificarPeso() {
            console.log("---------------ENTRO A VERIFICAR PESO--------------------");
            var tipo = canal;
            var pesoEntrada = document.getElementById("pesoEntrada").value;
            var pesoSalida = document.getElementById("pesoSalida").value;
            if (tipo != "VENTA" && tipo != "DESCARTE") {
                console.log("entro al if, porque " + tipo + "es distinto a venta o a descarte");
                this.verificar();
                var pesoVe = ejecutar(pesoEntrada, pesoSalida);
            } else {
                console.log("entro al else, porque " + tipo + "es una venta o descarte");
                var pesoEg = ejecutar(pesoSalida, pesoEntrada);
            }
            console.log(pesoEntrada);
            console.log(pesoSalida);
            var boton = document.getElementById("botonCargar");
            document.getElementById("validador").style.display = "none";
            var banderaPeso = false;
            switch (tipo) {
                case ("RD"):
                    banderaPeso = (pesoVe[0] > 0 && pesoVe[0] != "" && 250 >= pesoVe[0]);
                    break;
                case ("GG"):
                    banderaPeso = (pesoVe[0] > 0 && pesoVe[0] != "" && 5000 >= pesoVe[0]);
                    idVer = true;
                    nombre = "Grande Generadores";
                    break;
                case ("PV"):
                    banderaPeso = (pesoVe[0] > 0 && pesoVe[0] != "" && 150 >= pesoVe[0]);
                    break;
                case ("DESCARTE"):
                    if (pesoSalida == "") { return boton.disabled = true; }
                    banderaPeso = (pesoEg[0] > 0 && (pesoEntrada != ""));
                    idVer = true;
                    break;
                case ("VENTA"):
                    console.log(pesoEntrada);
                    console.log(pesoSalida);
                    if (pesoSalida == "") { return boton.disabled = true; }
                    banderaPeso = (pesoEg[0] > 0 && (pesoEntrada != ""));
                    console.log(pesoEg[0]);
                    console.log(pesoEntrada);
                    console.log(banderaPeso);
                    idVer = true;
                    break;
            }
            if (banderaPeso) {
                if (idVer && idVer != 3) {
                    validacion(true, "<p>El ID está asociado a: " + nombre + "</p>", "validador");
                } else {

                    validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
                }
            } else {
                validacion(false, "<p>¡Hubo un error en el peso!</p>", "validador");
            }
            pesoVer = banderaPeso;
            boton.disabled = !(idVer && pesoVer && idVer != 3);
        }
        //Verificar la fecha
    verificarFecha() {
            document.getElementById("validadorCamion").style.display = "none";
            //datos recibidos
            var fechaRecibida = document.getElementById("fecha").value;
            var fecha = new Date(fechaRecibida);
            //fecha actual
            var fechaActual = new Date();
            var diferenciaFecha = parseInt((fechaActual - fecha) / (1000 * 60 * 60 * 24));
            var boton = document.getElementById("boton");
            var banderaF = false;
            if (60 >= diferenciaFecha && diferenciaFecha > 5) { banderaF = "correo"; } else {
                banderaF = (5 >= diferenciaFecha && diferenciaFecha >= 0);
                fechaVer = (5 >= diferenciaFecha && diferenciaFecha >= 0);
            }
            switch (banderaF) {
                case 'correo':
                    if (alertarCorreo("Haz ingresado la siguiente fecha: " + fechaRecibida)) {
                        fechaVer = true;
                        document.getElementById("fecha").disabled = true;
                    } else {
                        validacion(false, "<p>¡La fecha ingresada, no es válida!</p>", "validadorCamion");
                        fechaVer = false;
                    }
                    break;
                case false:
                    validacion(false, "<p>¡La fecha ingresada, no es válida!</p>", "validadorCamion");
                    break;
            }
            return boton.disabled = !(fechaVer && horaVer && patenteVer);

        }
        //Verificar la hora D:
    verificarHora() {
            var hora = parseInt(document.getElementById("hora").value); //Variable para realizar operaciones matemáticas.
            var horaT = document.getElementById("hora").value; //Variable comparativa en texto.
            horaVer = (horaT != "00:00"); //Variable de la hora, para saber si fue cambiada
            var banderaT = (hora >= 6 && 16 > hora); //Variable de turnos, SI ES FALSE es 2, si es TRUE es 1
            document.getElementById("validadorCamion").style.display = "none";
            if (banderaT) {
                document.getElementById("turno").value = 1;
            } else {
                document.getElementById("turno").value = 2;
            }
            if (!horaVer) { validacion(false, "<p>¡Ocurrió un error con la hora!</p>", "validadorCamion") }
            return boton.disabled = !(horaVer && patenteVer && fechaVer);
        }
        //Verificar la patente :D
    verificarPatente() {
        var patente = document.getElementById("patente").value; //Obtengo el valor de la patente.
        var boton = document.getElementById("boton"); //El botón para activarlo en caso de ser verdadero, y desactivarlo en caso contrario.
        var banderaP = false;
        document.getElementById("validadorCamion").style.display = "none";
        switch (patente.length) {
            case (6):
                var uno = isNaN((patente.charAt(0) + patente.charAt(1) + patente.charAt(2))); //Primer parámetro (deben ser 3 letras).
                var dos = !isNaN((patente.charAt(3) + patente.charAt(4) + patente.charAt(5))); //Segundo Parámetro (deben ser 3 números).
                banderaP = (uno && dos);
                break;
            case (7):
                var uno = isNaN(patente.charAt(0) + patente.charAt(1));
                var dos = !isNaN((patente.charAt(2) + patente.charAt(3) + patente.charAt(4)));
                var tres = isNaN(patente.charAt(5) + patente.charAt(6));
                banderaP = (uno && dos && tres);
                break;
            case (0):
                banderaP = alertarCorreo("¡Haz ingresado una patente vacia!");
                if (banderaP) {
                    document.getElementById("patente").value = "SIN DATO";
                    document.getElementById("patente").disabled = true;
                }
                break;
        }
        if (!banderaP) {
            validacion(false, "¡No haz ingresado un valor válido en patente! Los valores válidos son: AB123CD ó ABC123", "validadorCamion");
        } else if (!horaVer || !fechaVer) {
            validacion(false, "<p>¡Algún dato ingresado es incorrecto!</p>", "validadorCamion");
        }
        patenteVer = banderaP;
        boton.disabled = !(banderaP && fechaVer && horaVer);
        document.getElementById("observacion").focus();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CLASE DE METODOS///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Metodo {
    constructor() {
        this.camion = document.getElementById('camion');
        this.carga = document.getElementById('bolson');
        this.mixta = document.getElementById('mixta');
        this.id = document.getElementById('id');
        this.nombre = document.getElementById('nombre');
        this.pesoentrada = document.getElementById('pesoEntrada');
        this.pesosalida = document.getElementById('pesoSalida');
        this.caracteristica = document.getElementById("caracteristicaDiv");
        this.material = document.getElementById("materialDiv");
        this.peso;
        this.etapa = document.getElementById('etapa');
        this.subetapa = document.getElementById('subetapa');
        this.pesoUnitario = document.getElementById('pesoUnitario');
        this.cantidad = document.getElementById('cantidad');
        this.pesoCanal;
        this.pesoEtapa;
        this.pesoMaterial;
        this.pesoCaracteristica;
        this.informacion;
        cargarListaDeID()
    }

    enviar() {
        console.log("-------VALOR DE LARGO DE DATO EDITABLE FINAL -----------");
        console.log(datoEditableFinal);
        console.log("EL LARGO DEL ARRAY " + datoEditableFinal.length)
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        if (dato.length > 1) {
            darCantidadCorrespondiente();
            camion.crearCamionParticipativo()
            console.log("ENTRO EN EL PRIMERO");
            camion.crearCamionCompuesto();
            console.log("ENTRO EN EL SEGUNDO");
        } else {
            camion.crearCamionUnico();
        }
        camion.crearBolson();
        camion.crearCamionParaVieja();
        console.log(datosBolson);
        console.log(datosCamion);
        google.script.run.envioDeDatos(datosCamion, datosBolson);
        google.script.run.enviarDatosVieja(datoBolsonVieja, datoCamionVieja);
        document.getElementById("botonEnviar").style.display = "inline";
        document.getElementById("botonContinuar").style.display = "none";
        document.getElementById("botonContinuar").disabled = true;
        document.getElementById("botonEnviar").disabled = true;
        document.getElementById("botonEnviarMixto").disabled = true;
        caracteristica = "";
        material = "";
        nombre = "";
        canal = "";
        metodoParaMixto = "";
        etapa = "";
        subetapa = "";
        metodoDeCarga = "";
        idIngreso = 0;
        idBolson = 0;
        elemento = 0;
        pesoT = 0;
        pesoEntradaG = 0;
        pesoSalidaG = 0;
        cantidad = 0;
        pesoTotalG = 0;
        idVer = false;
        pesoVer = false;
        patenteVer = false;
        fechaVer = false;
        horaVer = false;
        posicionCanal = 0;
        posicionEtapas = 0;
        posicionMaterial = 0;
        datoPeso = [];
        datoPesoE = [];
        datoPesoS = [];
        datoEtapas = [];
        datoCanal = [];
        datoMaterialM = [];
        datoPesoCanal = [];
        datoPesoECanal = [];
        datoPesoSCanal = [];
        datoPesoMaterial = [];
        datoPesoEMaterial = [];
        datoPesoSMaterial = [];
        cantidadEtapa = [];
        cantidadCanal = [];
        cantidadMaterial = [];
        datosEditables = [];
        datoEditableFinal = [];
        listaDeID = [];
        datosCamion = [];
        datosBolson = [];
        datoComun = [];
        datoBolsonVieja = [];
        datoCamionVieja = [];
        banderaEgreso = false;
        console.log("CULMINA LA CARGA EN AMBAS BASE DE DATOS");
        limpiar();
    }

    cargar(esOnoBolson) {
        console.log("----------ENTRO EN CARGAR SUPER ----------------")
        etapa = document.getElementById("etapa").value;
        subetapa = document.getElementById("subetapa").value;
        caracteristica = document.getElementById("caracteristica").value;
        material = document.getElementById("material").value;
        document.getElementById("botonEnviar").disabled = false;
        document.getElementById("botonContinuar").disabled = false;
        crearResumen("resumen", this.informacion);
        var etapaConcatenada = etapa + subetapa;
        console.log(this.peso[2]);
        this.pesoCanal = pesoPorCanal(this.peso[5], this.peso[3], this.peso[4]);
        this.pesoMaterial = pesoPorMaterial(this.peso[2], this.peso[0], this.peso[1]);
        this.pesoEtapa = pesoPorEtapa(etapaConcatenada, this.peso[2], this.peso[0], this.peso[1]);
        this.pesoCaracteristica = pesoPorCaracteristica(this.peso[2], this.peso[0], this.peso[1]);
        definirDatos(this.pesoCanal, this.pesoEtapa, this.pesoMaterial, this.pesoCaracteristica, caracteristica,
            material, subetapa, etapa, this.pesoUnitario.value, cantidad);
        validacion(true, "<p>Se ha cargado el bolsón correctamente</p>", "validador");
        idVer = false, pesoVer = false;
        document.getElementById("botonCargar").disabled = true;
        this.idDGREC = this.id.value;
        if (canal == "PV") { this.idDGREC = "PV-" + this.id.value; }
        datosEditables.push([this.id.value, this.peso[0], this.peso[1], this.peso[2],
            caracteristica, material, subetapa, etapa, nombre,
            idBolson, canal, this.idDGREC, this.pesoUnitario.value, cantidad, esOnoBolson
        ]);
        this.id.value = "";
        this.pesoentrada.value = "";
        this.pesosalida.value = "";
        console.log("--------------- COMIENZA EL MOSTRADO DEL PESO EN CARGA ------------------------------");
        console.log(pesoTotalG);
        console.log(pesoEntradaG);
        console.log(pesoSalidaG);
        console.log(datosEditables);
        console.log(datoEditableFinal);
        console.log("--------------- FINAL DEL MOSTRADO DEL PESO EN CARGA ------------------------------");
    }

}
class cargaBolson extends Metodo {
    abrir() {
        this.camion.style.display = "none";
        this.carga.style.display = "inline";
        this.mixta.style.display = "none";
        this.id.type = "number";
        this.id.setAttribute('oninput', 'user.verificarID("' + baseVerificar[canal] + '");');
        this.id.setAttribute('onblur', 'setTimeout(function(){user.verificar();},800);');
        this.id.setAttribute("autofocus", "true");
        this.id.value = "";
        this.idDGREC;
        this.pesoentrada.type = "number";
        this.pesoentrada.value = "";
        this.pesosalida.value = 0;
        this.pesoUnitario.value = "N/A";
        this.caracteristica.value = "Bolsones";
        this.material.value = "Mixto";
        this.cantidad = 0;
        cargarListaDeID();
        console.log(cv);
        document.getElementById('etapa').value = "";
        document.getElementById('subetapa').value = "";
        gestionarEtapas();
        document.getElementById("tablabolson").style.display = "inline";
        document.getElementById("caracteristica").value = "bolson";
        document.getElementById("material").value = "mixto";
        recibirBolson();
    }

    cargar() {
        recibirBolson();
        console.log("cargar en bolson: ");
        console.log(this.pesoentrada.value);
        console.log(this.pesosalida.value);
        this.peso = resolverPeso(this.pesoentrada.value, this.pesosalida.value, "ingreso");
        this.informacion = [this.id.value, nombre, this.peso[2]];
        this.id.focus();
        super.cargar("bolson");
        this.pesosalida.value = 0;
    }
}
class entradaSalida extends Metodo {
    abrir() {}
}
class cargaBolsonIDREF extends Metodo {
    abrir() {}
}
class cargaBolsonNOMBREID extends Metodo {
    abrir() {}
}
class cantidadPesoASOC extends Metodo {
    abrir() {}
}
class mixta extends Metodo {
    abrir() {
        this.mostrarCanales();
        document.getElementById("botonEnviar").style.display = "none";
        document.getElementById("botonContinuar").style.display = "inline";
        this.camion.style.display = "none";
        this.carga.style.display = "none";
        this.mixta.style.display = "inline";
    }

    continuar() {
        console.log("---------------- ENTRO EN CONTINUAR ------------------------");
        this.mixta.style.display = "inline";
        this.carga.style.display = "none";
        var link = document.getElementById(canal);
        var img = document.getElementById("imagen" + canal);
        console.log(canal);
        console.log(link);
        console.log(img);
        link.onclick = "";
        img.src = "http://carlitos.com.ar/DGREC/image/raoscuro.png"; //'"http://carlitos.com.ar/DGREC/image/'+canal+'.png"');
        document.getElementById("botonEnviarMixto").disabled = false;
        vaciarResumen();
        console.log("--------------------- SALIO DE CONTINUAR --------------------------------");
    }

    mostrarCanales() {
        console.log("-------------- ENTRO EN MOSTRARCANALES MIXTO----------------");
        console.log(canales);
        metodoParaMixto.agregarMenu(canales);
        console.log("----------------------SALIO DE MOSTRARCANALES MIXTO ----------------");
    }

    agregarMenu(array) {
        console.log("-------------------------ENTRO EN AGREGAR MENU EN MIXTO ------------------------------------");
        console.log(array);
        var div = document.getElementById("imagenMixto");
        for (var i = 0; array.length >= (1 + i); i++) {
            var valor = array[i];
            console.log("------VALOR DE CANAL: " + valor + "------ ")
            if (valor != "MIXTA" && valor != "VENTA" && valor != "DESCARTE") {
                var link = document.createElement('a');
                link.setAttribute('id', valor);
                var funcion = "user.conexionGoogle('" + valor + "','mixto');"
                link.setAttribute('onclick', funcion);
                var imagen = document.createElement('img');
                imagen.setAttribute('class', 'botonIngreso');
                imagen.setAttribute('id', 'imagen' + valor);
                imagen.setAttribute('alt', ('Boton del método' + valor));
                imagen.setAttribute('src', 'http://carlitos.com.ar/DGREC/image/rallamativo.png'); //'"http://carlitos.com.ar/DGREC/image/'+array[i][0]+'.png"');
                link.appendChild(imagen);
                div.appendChild(link);
            }
        }
        console.log("-------------------------SALIO DE AGREGAR MENU EN MIXTO ------------------------------------");
    }
}
class salidaMaterialE extends Metodo {
    abrir() {
        this.camion.style.display = "none";
        this.carga.style.display = "inline";
        this.mixta.style.display = "none";
        document.getElementById("ingreso").value = "Egreso";
        camion.ingreso = "Egreso"
        etapa = "N/A";
        subetapa = "N/A";
        this.etapa.value = "N/A";
        this.subetapa.value = "N/A";
        nombre = "N/E";
        this.id.value = "N/A";
        this.pesoentrada.value = 0;
        document.getElementById("tablapesomaterial").style.display = "inline";
        this.pesoUnitario.value = "N/A";
        this.pesosalida.type = "number";
        this.pesosalida.value = "";
        this.material.style.display = "inline";
        this.caracteristica.style.display = "inline";
        seleccionDeMateriales(datoMaterial, "materialDiv", "materialF");
        seleccionDeMateriales(datoCaracteristica, "caracteristicaDiv", "caracteristicaF");
        banderaEgreso = true;
    }

    cargar() {

        var materialR = document.getElementById("materialF").value;
        console.log(materialR);
        var caracteristicaR = document.getElementById("caracteristicaF").value;
        console.log(caracteristicaR);
        console.log("--------------CARGA DE MATERIAL SALIDA----------------------");
        console.log(materialR);
        console.log(caracteristicaR);
        this.peso = resolverPeso(this.pesosalida.value, this.pesoentrada.value, "egreso");
        this.informacion = [materialR, caracteristicaR, this.peso[2]];
        document.getElementById("material").value = materialR;
        document.getElementById("caracteristica").value = caracteristicaR;
        super.cargar("material");
        this.pesoentrada.value = 0;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CLASE DE CAMION////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Camion {
    constructor() {
        var recibirFecha = document.getElementById("fecha").value;
        this.fecha = ((recibirFecha.charAt(8) + recibirFecha.charAt(9)) + "/" + (recibirFecha.charAt(5) + recibirFecha.charAt(6)) + "/" + (recibirFecha.charAt(0) + recibirFecha.charAt(1) + recibirFecha.charAt(2) + recibirFecha.charAt(3)));
        this.anio = (recibirFecha.charAt(0) + recibirFecha.charAt(1) + recibirFecha.charAt(2) + recibirFecha.charAt(3));
        this.mes = (recibirFecha.charAt(5) + recibirFecha.charAt(6));
        this.dia = (recibirFecha.charAt(8) + recibirFecha.charAt(9));
        this.hora = document.getElementById("hora").value;
        this.patente = document.getElementById("patente").value;
        this.turno = document.getElementById("turno").value;
        this.observacion = document.getElementById("observacion").value;
        this.ingreso = document.getElementById("ingreso").value;
        this.bolsones = 0;
        this.cargas = 0;
        this.pesoSalida = 0;
        this.pesoEntrada = 0;
        this.pesoTotal = 0;
        recibirIngreso();
        this.tipoCamion = ['CAMION COMPUESTO', 'CAMION PARTICIPATIVO', 'CAMION ÚNICO', 'BOLSON'];
    }

    crearCamionUnico() {
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        if (metodoParaCargar.material.value == "") { metodoParaCargar.material.value == "Mixto" }
        if (metodoParaCargar.material.value == "") { metodoParaCargar.material.value == "Mixto" }
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        datosCamion.push([this.tipoCamion[2], usuario, fechaActual, idIngreso, coop, cv,
            this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
            this.patente, canal, metodoParaCargar.material.value, metodoParaCargar.caracteristica.value, cantidad,
            dato[0][6], scannerPeso(pesoEntradaG), scannerPeso(pesoSalidaG), scannerPeso(pesoTotalG), "N/A",
            this.observacion, dato[0][4], dato[0][3], dato[0][0],
            dato[0][0], dato[0][0], dato[0][0]
        ]);


    }
    crearCamionParaVieja() {
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        for (var i = 0; i < datoCanal.length; i++) {
            datoCamionVieja.push([this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso, this.patente,
                datoCanal[i][0], metodoParaCargar.material.value, metodoParaCargar.caracteristica.value,
                cantidad, "", pesoEntradaG, pesoSalidaG
            ]);
        }
        var dato = datosEditables.filter(elemento => elemento != null);
        for (var i = 0; i < dato.length; i++) {
            datoBolsonVieja.push([coop, cv, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
                this.patente, dato[i][10], this.observacion, etapa, dato[i][0], dato[i][3], pesoTotalG,
                subetapa, etapa + subetapa, dato[i][0], nombre, usuario, fechaActual, this.fecha
            ]);
        }
    }
    crearCamionCompuesto() {
        var valorCanal;
        var valorEtapa;
        var valorSub;
        var valorMaterial;
        var valorCaracteristica;
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        var participacion = crearParticipacion();
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        console.log("ACÁ ES PARTICIPACION " + participacion);
        if (participacion[0] == "") { valorCanal = canal; } else { valorCanal = participacion[0]; }
        if (participacion[1] == "") {
            valorEtapa = dato[0][4];
            valorSub = dato[0][3];
        } else {
            valorEtapa = participacion[1];
            valorSub = participacion[1];
        }
        if (participacion[2] == "") { valorMaterial = material; } else { valorMaterial = participacion[2] }
        if (participacion[3] == "") { valorCaracteristica = caracteristica; } else { valorCaracteristica = participacion[3] }

        datosCamion.push([this.tipoCamion[0], usuario, fechaActual, idIngreso, coop, cv,
            this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
            this.patente, dato[0][0], valorMaterial, "Bolson", cantidad,
            dato[0][6], scannerPeso(pesoEntradaG), scannerPeso(pesoSalidaG), scannerPeso(pesoTotalG), valorCanal,
            this.observacion, valorEtapa, valorSub, dato[0][0],
            dato[0][0], dato[0][0], dato[0][0]
        ]);
    }
    crearCamionParticipativo() {
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        for (var i = 0; i < dato.length; i++) {
            var pesoE;
            var pesoS;
            var peso;
            switch (dato[i][8]) {
                case "canal":
                    for (var j = 0; j < datoCanal.length; j++) {
                        if (datoCanal[j][0] == dato[i][5]) {
                            pesoE = scannerPeso(datoPesoECanal[j]);
                            pesoS = scannerPeso(datoPesoSCanal[j]);
                            peso = scannerPeso(datoPesoCanal[j]);
                        }
                    }
                    break;
                case "etapa":
                    for (var j = 0; j < datoEtapas.length; j++) {
                        if (datoEtapas[j][0] == dato[i][4] + dato[i][3]) {
                            pesoE = scannerPeso(datoPesoE[j]);
                            pesoS = scannerPeso(datoPesoS[j]);
                            peso = scannerPeso(datoPeso[j]);
                        }
                    }
                    break;
                case "material":
                    for (var j = 0; j < datoMaterialM.length; j++) {
                        if (datoMaterialM[j][0] == dato[i][2]) {
                            pesoE = scannerPeso(datoPesoEMaterial[j]);
                            pesoS = scannerPeso(datoPesoSMaterial[j]);
                            peso = scannerPeso(datoPesoMaterial[j]);
                        }
                    }
                    break;
                case "caracteristica":
                    for (var j = 0; j < datoCaracteristicaM.length; j++) {
                        if (datoCaracteristicaM[j][0] == dato[i][2]) {
                            pesoE = scannerPeso(datoPesoECara[j]);
                            pesoS = scannerPeso(datoPesoSCara[j]);
                            peso = scannerPeso(datoPesoCara[j]);
                        }
                    }
                    break;
            }
            datosCamion.push([this.tipoCamion[1], usuario, fechaActual, idIngreso, coop, cv,
                this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
                this.patente, dato[i][5], dato[i][2], dato[i][1],
                dato[i][7], dato[i][6], pesoE, pesoS, peso, scannerPeso(pesoTotalG),
                this.observacion, dato[i][4], dato[i][3], dato[i][0],
                dato[i][0], dato[i][0], dato[i][0]
            ]);
            console.log(peso);
            console.log(dato[i][7]);
            console.log("---------------- SE CREO UN DATO COMUN --------------------------------");
            datoComun.push([dato[i][5], dato[i][4],
                dato[i][3], peso, dato[i][8], dato[i][1], dato[i][2]
            ]);
        }
    }
    crearBolson() {
        var dato = datosEditables.filter(elemento => elemento != null);
        for (var i = 0; i < dato.length; i++) {
            if (dato[i][14] == "bolson") {
                var fechaHoy = new Date();
                var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
                var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
                var fechaActual = (fechaA + " " + horaA);
                datosBolson.push([this.tipoCamion[3], usuario, fechaActual, idIngreso, coop, cv,
                    this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
                    this.patente, dato[i][10], dato[i][5], dato[i][4],
                    cantidad, dato[i][12], dato[i][1],
                    dato[i][2], dato[i][3], scannerPeso(pesoTotalG), this.observacion,
                    dato[i][7], dato[i][6], dato[i][9], dato[i][0],
                    dato[i][11], dato[i][8]
                ]);
            }
        }
    }
    crearCamionUnicoEgreso() {
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        for (var i = 0; i < dato.length; i++) {
            datosCamion.push([this.tipoCamion[2], usuario, fechaActual, idIngreso, coop, cv,
                this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
                this.patente, canal, dato[i][2], dato[i][1], cantidad,
                dato[i][6], scannerPeso(pesoEntradaG), scannerPeso(pesoSalidaG), scannerPeso(pesoTotalG), scannerPeso(pesoTotalG),
                this.observacion, dato[i][0], dato[i][0], dato[i][0],
                dato[i][0], dato[i][0], dato[i][0]
            ]);
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////FUNCIONES DE JAVASCRIPT////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function seleccionDeMateriales(array, contenedor, tipo) {
    var div = document.getElementById(contenedor);
    var seleccion = document.createElement("SELECT");
    seleccion.setAttribute('id', tipo);
    for (var i = 0; array.length > i; i++) {
        var opcion = document.createElement("OPTION");
        seleccion.appendChild(opcion);
        opcion.innerHTML = array[i][0];
        opcion.setAttribute("value", array[i][0]);
    }
    div.appendChild(seleccion);
}

function cargarListaDeID() {
    console.log("------------entro en cargar lista de id -----------------");
    console.log(baseVerificar);
    var baseDeDatos = baseVerificar[canal];
    console.log(baseDeDatos);
    if (baseDeDatos != "RD" && baseDeDatos != "GG" && baseDeDatos != "PV" &&
        baseDeDatos != "MIXTA" && baseDeDatos != "CA" && baseDeDatos != "DESCARTE" &&
        baseDeDatos != "VENTA" && baseDeDatos != "") {
        google.script.run.withSuccessHandler(
            function(e) {
                listaDeID = e;
                console.log(listaDeID);
                console.log("Nombre " + listaDeID[1][0] + " ID " + listaDeID[1][1]);
            }
        ).darListaID(baseDeDatos);
    } else {
        nombre = "N/E";
        listaDeID = false;
    }

}

function compararID(id) {
    for (var i = 0; listaDeID.length > i; i++) {
        if (listaDeID[i][1] == id) {
            nombre = listaDeID[i][0];
            idVer = true;
            return user.verificar();
        } else {
            idVer = false;
            document.getElementById("botonCargar").disabled = true;
        }
    }
}

function clickear() {
    document.onkeyup = (function(e) {
        if (e.which == 13) {
            document.getElementById("botonCargar").click();
        }
    });

}

clickear();

function definirDatos(porCanal, porEtapa, porMaterial, porCara, caracteristica, material, subetapad, etapad, pesoun, cantidad) {

    if (porCanal && porEtapa && porMaterial && porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "definir"
        ]);
        condicionar();
        console.log("entro en el primer if");
    } else if (porCanal && !porEtapa && !porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "canal"
        ]);
        condicionar();
        console.log("entro en el segundo if");
    } else if (!porCanal && porEtapa && !porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "etapa"
        ]);
        condicionar();
        console.log("entro en el tercero if");
    } else if (!porCanal && !porEtapa && porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "material"
        ]);
        condicionar();
        console.log("entro en el cuarto if");
    } else if (porCanal && porEtapa && !porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "canal"
        ]);
        condicionar();
        console.log("entro en el segundo if");
    } else if (!porCanal && !porEtapa && porMaterial && porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "caracteristica"
        ]);
        condicionar();
        console.log("entro en el quinto if");
    } else if (!porCanal && !porEtapa && !porMaterial && porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "caracteristica"
        ]);
        condicionar();
        console.log("entro en el cuarto if");
    }
    console.log("NO ENTRO EN NINGUN IF");
    console.log(datoEditableFinal);
}

function condicionar() {
    var dato = datoEditableFinal.filter(elemento => elemento != null);
    var valor = (dato.length - 1);
    var etapasub = dato[valor][4] + dato[valor][3];
    var canal = dato[valor][5];
    var material = dato[valor][3];
    for (var i = 0; i < dato.length; i++) {
        var e = dato[i][4] + dato[i][3];
        var c = dato[i][5];
        var m = dato[i][3]
        if (dato[i][8] == "definir") {
            if (e != etapasub && c == canal) {
                dato[i][8] = "etapa";
            } else {
                dato[i][8] = "canal";
            }
        } else if (dato[i][8] == "canal") {
            if (e != etapasub && c == canal && m == material) {
                dato[i][8] = "etapa"
            } else if (e == etapasub && c == canal && m != material) {
                dato[i][8] = "material";
            }
        }
        console.log("tipo despues de condicionar" + dato[i][8]);
    }

}

function crearParticipacion() {
    console.log("--------------------------ENTROOOOOOOOO-----------------------");
    var banderaCanal = false;
    var banderaEtapa = false;
    var banderaMaterial = false;
    var banderaCara = false;
    var resultadoCanal = "";
    var resultadoEtapa = "";
    var resultadoMaterial = "";
    var resultadoCara = "";
    console.log("EL LARGO DE DATO COMUN " + datoComun.length);
    for (var i = 0; datoComun.length > i; i++) {
        console.log("CREANDO PARTICIPACION: ")
        console.log(datoComun);
        switch (datoComun[i][4]) {
            case "canal":
                console.log("ENTRO A CANAL");
                //for(var g = 0; g < datoCanal.length; g++){
                if (datoCanal[i][0] == datoComun[i][0]) {
                    if (!banderaCanal) {
                        resultadoCanal = (datoComun[i][0] + datoCanal[i][1]);
                        banderaCanal = true;
                    } else {
                        resultadoCanal = resultadoCanal + ('-' + datoComun[i][0] + datoCanal[i][1]);
                    }
                }
                //}
                break;
            case "etapa":
                console.log("ENTRO A ETAPA");
                if (datoComun[i][1] != "N/A") { var conca = datoComun[i][1] + datoComun[i][2]; } else { var onca = "" };
                //for(var h = 0; h < datoEtapas.length; h++){
                if (datoEtapas[i][0] == conca) {
                    if (!banderaEtapa) {
                        resultadoEtapa = ((conca + datoEtapas[i][1]));
                        banderaEtapa = true;
                    } else {
                        resultadoEtapa = resultadoEtapa + ('-' + (conca + datoEtapas[i][1]));
                    }
                }
                break;
            case "caracteristica":
                console.log("ENTRO A CARACTERISTICA");
                //for(var g = 0; g < datoCanal.length; g++){
                if (datoCaracteristicaM[i][0] == datoComun[i][0]) {
                    if (!banderaCara) {
                        resultadoCara = (datoComun[i][0] + datoCaracteristicaM[i][1]);
                        banderaCara = true;
                    } else {
                        resultadoCara = resultadoCara + ('-' + datoComun[i][0] + datoCaracteristicaM[i][1]);
                    }
                }
                break;
            case "material":
                console.log("ENTRO A MATERIAL");
                //for(var g = 0; g < datoCanal.length; g++){
                if (datoMaterial[i][0] == datoComun[i][6]) {
                    if (!banderaMaterial) {
                        resultadoMaterial = (datoComun[i][6]);
                        banderaMaterial = true;
                    } else {
                        resultadoMaterial = resultadoMaterial + ('-' + datoComun[i][6] + datoMaterial[i][1]);
                    }
                }
                break;
        }
        console.log("------------------- datos de los resultados de crear participacion ------------------------------");
        console.log("Canal: " + resultadoCanal);
        console.log("Etapa: " + resultadoEtapa);
    }
    return [resultadoCanal, resultadoEtapa];
}

function darCantidadCorrespondiente() {
    var dato = datoEditableFinal.filter(elemento => elemento != null);
    for (var i = 0; i < dato.length; i++) {
        console.log("VALOR primario DE CANTIDAD EN FINAL " + dato[i][7] + "LA I VALE: " + i);
        if (dato[i][8] == "etapa") {
            dato[i][7] = cantidadEtapa[i];
        } else {
            dato[i][7] = cantidadCanal[i];
        }
        console.log("VALOR ACTUAL DE CANTIDAD EN FINAL " + dato[i][7] + "LA I VALE: " + i);
        console.log("Array de cantidad de etapas " + cantidadEtapa);
        console.log("Array de cantidad de canal " + cantidadCanal);
    }
}

function pesoPorCanal(peso, pesoEntrada, pesoSalida) {
    console.log("-------------------ENTRO EN PESO POR CANAL------------------------");
    var bandera = true;
    for (var i = 0; i < datoCanal.length; i++) {
        if (datoCanal[i][0] == canal) {
            datoPesoCanal[i] = parseFloat(datoPesoCanal[i]) + peso;
            datoPesoECanal[i] = parseFloat(datoPesoECanal[i]) + pesoEntrada;
            datoPesoSCanal[i] = parseFloat(datoPesoSCanal[i]) + pesoSalida;
            datoCanal[i][1] = parseFloat(datoCanal[i][1]) + peso;
            cantidadCanal[i] = (cantidadCanal[i] + 1);
            console.log("CANTIDAD DE CANAL " + cantidadCanal[i]);
            bandera = false;
        }
    }
    if (bandera) {
        datoPesoCanal.push(peso);
        datoPesoECanal.push(pesoEntrada);
        datoPesoSCanal.push(pesoSalida);
        datoCanal.push([canal, peso, posicionCanal]);
        cantidadCanal.push(1);
        posicionCanal++;
    }
    console.log(datoPesoECanal);
    console.log(datoPesoCanal);
    console.log("Bandera canal " + bandera);
    console.log("-------------------SALIO DE PESO POR CANAL------------------------");
    return bandera;

}

function pesoPorMaterial(peso, pesoEntrada, pesoSalida) {
    console.log("-------------------ENTRO EN PESO POR MATERIAL------------------------");
    var bandera = true;
    for (var i = 0; i < datoMaterialM.length; i++) {
        if (datoMaterialM[i][0] == material) {
            datoPesoMaterial[i] = parseFloat(datoPesoMaterial[i]) + peso;
            datoPesoEMaterial[i] = parseFloat(datoPesoEMaterial[i]) + pesoEntrada;
            datoPesoSMaterial[i] = parseFloat(datoPesoSMaterial[i]) + pesoSalida;
            datoMaterialM[i][1] = parseFloat(datoMaterialM[i][1]) + peso;
            cantidadMaterial[i] = (cantidadMaterial[i] + 1);
            console.log("CANTIDAD DE Material " + cantidadMaterial[i]);
            bandera = false;
        }
    }
    if (bandera) {
        datoPesoMaterial.push(peso);
        datoPesoEMaterial.push(pesoEntrada);
        datoPesoSMaterial.push(pesoSalida);
        datoMaterialM.push([material, peso, posicionMaterial]);
        cantidadMaterial.push(1);
        posicionMaterial++;
    }
    console.log("Bandera Material " + bandera);
    console.log(datoPesoMaterial);
    console.log(datoPesoEMaterial);
    console.log("-------------------SALIO DE PESO POR MATERIAL------------------------");
    return bandera;

}

function pesoPorCaracteristica(peso, pesoEntrada, pesoSalida) {
    console.log("-------------------ENTRO EN PESO POR MATERIAL------------------------");
    var bandera = true;
    for (var i = 0; i < datoCaracteristicaM.length; i++) {
        if (datoCaracteristicaM[i][0] == caracteristica) {
            datoPesoCara[i] = parseFloat(datoPesoCara[i]) + peso;
            datoPesoECara[i] = parseFloat(datoPesoECara[i]) + pesoEntrada;
            datoPesoSCara[i] = parseFloat(datoPesoSCara[i]) + pesoSalida;
            datoCaracteristicaM[i][1] = parseFloat(datoCaracteristicaM[i][1]) + peso;
            cantidadCara[i] = (cantidadCara[i] + 1);
            console.log("CANTIDAD DE Caracteristica " + cantidadCara[i]);
            bandera = false;
        }
    }
    if (bandera) {
        datoPesoCara.push(peso);
        datoPesoECara.push(pesoEntrada);
        datoPesoSCara.push(pesoSalida);
        datoCaracteristicaM.push([caracteristica, peso, posicionCara]);
        cantidadCara.push(1);
        posicionCara++;
    }
    console.log("Bandera Caracteristica " + bandera);
    console.log(datoPesoCara);
    console.log(datoPesoECara);
    console.log("-------------------SALIO DE PESO POR Caracteristica------------------------");
    return bandera;

}

function pesoPorEtapa(etapa, peso, pesoEntrada, pesoSalida) {
    console.log("-------------------ENTRO EN PESO POR ETAPA------------------------");
    var bandera = true;
    for (var i = 0; i < datoEtapas.length; i++) {
        if (etapa == datoEtapas[i][0]) {
            datoPeso[i] = parseFloat(datoPeso[i]) + peso;
            datoPesoE[i] = parseFloat(datoPesoE[i]) + pesoEntrada;
            datoPesoS[i] = parseFloat(datoPesoS[i]) + pesoSalida;
            datoEtapas[i][1] = parseFloat(datoEtapas[i][1]) + peso;
            cantidadEtapa[i] = (cantidadEtapa[i] + 1);
            console.log("CANTIDAD DE ETAPA " + cantidadEtapa[i]);
            bandera = false;
        }
    }
    if (bandera) {
        datoPeso.push(peso);
        datoPesoE.push(pesoEntrada);
        datoPesoS.push(pesoSalida);
        datoEtapas.push([etapa, peso, posicionEtapas]);
        cantidadEtapa.push(1);
        posicionEtapas++;
    }
    console.log(datoPesoE);
    console.log(datoPeso);
    console.log("Bandera etapa " + bandera);
    console.log("-------------------SALIO DE PESO POR ETAPA------------------------");
    return bandera;

}

function crearResumen(resumen, datosextras) {
    var lista = document.getElementById(resumen);
    var fila = document.createElement("TR");
    fila.setAttribute("id", ("n" + elemento));
    for (var indices = 0; datosextras.length > indices; indices++) {
        var columna = document.createElement("TD");
        var textColumna = document.createTextNode(datosextras[indices]);
        columna.appendChild(textColumna);
        fila.appendChild(columna);
    }
    var btn = document.createElement("TD");
    btn.innerHTML = '<button onclick="eliminar(' + elemento + ',' + resumen + ')"> x </button>';
    fila.appendChild(btn);
    lista.appendChild(fila);
    cantidad++;
    elemento++;
}

function vaciarResumen() {
    for (var i = 0; i < elemento; i++) {
        var tr = document.getElementById("n" + i);
        if (tr != "null" && tr != undefined) {
            document.getElementById("resumen").removeChild(tr);
        }
    }
}

function eliminar(i, resumen) {
    console.log("------------------------ACA ENTRA A ELIMINAR------------------------------");
    var ultimo = document.getElementById("n" + i);
    var h = recorrerValor(i);
    console.log(resumen);
    console.log(ultimo);
    console.log(i);
    console.log(h);
    console.log(datoCanal[h[1]][1]);
    console.log(datoEtapas[h[0]][1])
    resumen.removeChild(ultimo);
    console.log("------------------MUESTRA DE DATOS PARA ACOMODAR PESO EN ELIMINAR----------------------");
    console.log(datosEditables);
    console.log(datosEditables[i]);
    console.log(datosEditables[i][1]);
    console.log(datosEditables[i][2]);
    console.log(datoPesoE[h[0]]);
    console.log(datoPesoECanal[h[1]]);
    console.log(datoPesoS[h[0]]);
    console.log(datoPesoSCanal[h[1]]);
    console.log(datoCanal[h[1]][1]);
    console.log(datoEtapas[h[0]][1]);
    console.log("AGREGADO DESPUÉS");
    console.log(datoPesoCanal[h[1]]);
    console.log(datoPeso[h[0]]);
    console.log("------------------COMIENZO ACOMODAR PESO EN ELIMINAR----------------------");
    pesoT = acomodarPeso(pesoT, (parseFloat(datosEditables[i][1]) - parseFloat(datosEditables[i][2])), "restar");
    pesoTotalG = acomodarPeso(pesoTotalG, (parseFloat(datosEditables[i][1]) - parseFloat(datosEditables[i][2])), "restar");
    pesoEntradaG = acomodarPeso(pesoEntradaG, parseFloat(datosEditables[i][1]), "restar");
    pesoSalidaG = acomodarPeso(pesoSalidaG, parseFloat(datosEditables[i][2]), "restar");
    datoPesoE[h[0]] = acomodarPeso(datoPesoE[h[0]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoECanal[h[1]] = acomodarPeso(datoPesoECanal[h[1]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoS[h[0]] = acomodarPeso(datoPesoS[h[0]], parseFloat(datosEditables[i][2]), "restar");
    datoPesoSCanal[h[1]] = acomodarPeso(datoPesoSCanal[h[1]], parseFloat(datosEditables[i][2]), "restar");
    datoCanal[h[1]][1] = acomodarPeso(datoCanal[h[1]][1], parseFloat(datosEditables[i][3]), "restar");
    datoEtapas[h[0]][1] = acomodarPeso(datoEtapas[h[0]][1], parseFloat(datosEditables[i][3]), "restar");
    console.log("LO AGREGADO DESPUÉS");
    datoPeso[h[0]] = acomodarPeso(datoPeso[h[0]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoCanal[h[1]] = acomodarPeso(datoPesoCanal[h[1]], parseFloat(datosEditables[i][1]), "restar");
    console.log("------------------FINAL DE ACOMODAR PESO EN ELIMINAR----------------------");
    datosEditables[i] = null;
    console.log("---------------------ACÁ MOSTRARÁ LOS DATOS EDITABLES----------------")
    console.log(datosEditables);
    cantidadCanal[h[1]]--;
    cantidadEtapa[h[0]]--;
    cantidad--;
    console.log(pesoTotalG);
    console.log(pesoT);
    console.log(datosEditables);
    console.log("------------------------ACA FINALIZAR A ELIMINAR------------------------------");
}

function recorrerValor(i) {
    console.log("----------- ACÁ COMIENZA RECORREVALOR -----------------");
    console.log(i);
    console.log(datosEditables);
    for (var j = 0; j < datoCanal.length; j++) {
        if (datoCanal[j][0] == datosEditables[i][10]) {
            for (var h = 0; h < datoEtapas.length; h++) {
                if (datoEtapas[h][0] == (datosEditables[i][7] + datosEditables[i][6])) {
                    return banderas = [datoEtapas[h][2], datoCanal[j][2]];
                }
            }
        }
    }
    console.log("-------------- ACÁ TERMINA RECORREVALOR---------------------");
}

function asignarMetodo(valor) {
    return metodoDeCarga = valor;
}

function colocarMenu(array, ingreso, egreso, metodo) {
    console.log("--------------------------ENTRA EN COLOCAR MENU-------------------------");
    console.log(array);
    console.log(ingreso);
    var div = document.getElementById(ingreso);
    var divDos = document.getElementById(egreso);
    console.log(div);
    for (var i = 0; array.length >= (i + 1); i++) {
        var valor = array[i];
        console.log("el valor va abajo...");
        console.log(valor);
        var link = document.createElement('a');
        if (egreso != "") {
            var funcion = "user.conexionGoogle('" + valor + "');";
        } else {
            console.log("Esté es el colocar menu, sin egreso. " + valor);
            var funcion = "asignarMetodo('" + valor + "'); mostrarPantalla('carga');";
        }
        console.log("la funcion va abajoo...");
        console.log(funcion);
        link.setAttribute('onclick', funcion);
        var imagen = document.createElement('img');
        imagen.setAttribute('class', 'botonIngreso');
        imagen.setAttribute('alt', ('"' + 'Boton del método ' + valor + '"'));
        imagen.setAttribute('src', 'http://carlitos.com.ar/DGREC/image/rallamativo.png'); //'"http://carlitos.com.ar/DGREC/image/'+array[i][0]+'.png"');
        link.appendChild(imagen);
        if (valor != 'DESCARTE' && valor != 'VENTA') {
            console.log("Coloca aqui :D ingreso ");
            console.log(div);
            div.appendChild(link);
            console.log(div);
        } else {
            console.log("Coloca aqui :D egresos" + divDos);
            divDos.appendChild(link);
        }

        console.log("--------------------------FIN DE COLOCAR MENU-------------------------");
    }

}

function mostrarPantalla(pantalla) {
    google.script.run.withSuccessHandler(function(e) {
        document.getElementById("pantalla").innerHTML = e;
    }).incluir(pantalla);
}

function gestionarEtapas() {
    if (canal == "RD") {
        if (datosEtapas.length > 1) {
            var div = document.getElementById("etapaDiv");
            div.innerHTML = "";
            div.style.display = "inline";
            var seleccion = document.createElement("select");
            seleccion.setAttribute("id", "etapa");
            seleccion.setAttribute("oninput", "gestionarSubEtapas();");
            for (var i = 0; datosEtapas.length > i; i++) {
                var opcion = document.createElement("OPTION");
                seleccion.appendChild(opcion);
                opcion.innerHTML = datosEtapas[i];
                opcion.setAttribute("value", datosEtapas[i]);
            }
            div.appendChild(seleccion);
        } else {
            document.getElementById("etapa").value = datosEtapas[0];
            console.log("ESTO ES GESTIONAR ETAPAS Y LA ETAPA ES: " + datosEtapas[0]);
        }
        gestionarSubEtapas();
    } else {
        document.getElementById("etapa").value = "N/A";
        document.getElementById("subetapa").value = "N/A";
    }
}

function gestionarSubEtapas() {
    var etapaJural = document.getElementById("etapa").value;
    for (var i = 0; i < datoSubEtapas.length; i++) {
        if (datoSubEtapas[i][0] == etapaJural) {
            var div = document.getElementById("subetapaDiv");
            div.innerHTML = "";
            if (datoSubEtapas.length > 1) {
                var input = document.createElement("select");
                input.setAttribute("id", "subetapa");
                for (var j = 0; datoSubEtapas.length > j; j++) {
                    console.log("CREO SUBETAPAS EN LA GESTION");
                    div.style.display = "inline";
                    var opcion = document.createElement("OPTION");
                    input.appendChild(opcion);
                    opcion.innerHTML = datoSubEtapas[j][0];
                    opcion.setAttribute("value", datoSubEtapas[j][0]);
                }
            } else {
                var input = document.createElement("INPUT");
                console.log("VER ACAAAAAAAA -.------.-.- " + datoSubEtapas[0][0]);
                input.setAttribute("id", "subetapa");
                input.setAttribute("type", "hidden");
                input.setAttribute("value", datoSubEtapas[0][0]);
            }
            div.appendChild(input);
            console.log("SUBETAPA DESDE EL INPUT " + document.getElementById("subetapa").value)
        }
    }
    console.log("ESTA GESTIONANDO A LAS SUBETAPAS")
}

function gestionarMetodos() {
    console.log("---------ENTRO EN GESTIONAR METODOS-------------");
    console.log(canal);
    for (var i = 0; i < canales.length; i++) {
        console.log(canales);
        console.log(canales[i]);
        if (canal == canales[i]) {
            if (datosMetodos[i][0] == 2) {
                metodoDeCarga = [datosMetodos[i][1], datosMetodos[i][2]];
                console.log("creo dos metodos");
            } else {
                metodoDeCarga = datosMetodos[i][1];
                console.log("creo un metodo");
            }
        }
    }
}

function colocarEscritorio() {
    console.log("-------------------------COLOCAR ESCRITORIO---------------------------------");
    mostrarPantalla("escritorio");
    console.log("Mostro el escritorio");
    console.log(canales);
    setTimeout(function() {
        console.log(document.getElementById("divIngreso"));
        console.log(document.getElementById("divEgreso"));
        colocarMenu(canales, 'divIngreso', 'divEgreso', false);
    }, 2000);
}

function resolverPeso(pesoMayor, pesoMenor, tipo) {
    var pesoM = parseFloat(pesoMayor);
    var pesom = parseFloat(pesoMenor);
    var pesoCM = (ejecutar(pesoM, pesom))[0];
    pesoTotalG = pesoTotalG + pesoCM;
    pesoT = pesoT + pesoCM;
    switch (tipo) {
        case "ingreso":
            pesoEntradaG = pesoEntradaG + pesoM;
            pesoSalidaG = pesoSalidaG + pesom;
            var pesoE = scannerPeso(pesoM);
            var pesoS = scannerPeso(pesom);
            var pesoC = scannerPeso(pesoCM);
            break;
        case "egreso":
            pesoEntradaG = pesoEntradaG + pesom;
            pesoSalidaG = pesoSalidaG + pesoM;
            var pesoE = scannerPeso(pesom);
            var pesoS = scannerPeso(pesoM);
            var pesoC = scannerPeso(pesoCM);
    }
    console.log("ESTO ES RESOLVER SUMA: ");
    console.log(pesoM);
    console.log(pesom)
    console.log(pesoCM);
    console.log("Acá va el pesoE " + pesoE);
    console.log("Acá va el pesoS " + pesoS);
    console.log("Acá va el pesoC " + pesoC);
    console.log("Acá va el pesoSalidaG " + pesoSalidaG);
    return [pesoE, pesoS, pesoC, pesoM, pesom, pesoCM];
}

function acomodarPeso(peso, pesoASumar, restar) {
    console.log("-----------------------------COMIENZO DE ACOMODAR PESO--------------------------------");
    console.log(peso);
    console.log(pesoASumar);
    console.log(restar);
    var primero = parseFloat(peso);
    if (restar == "restar") {
        primero -= parseFloat(pesoASumar);
    } else {
        primero += parseFloat(pesoASumar);
    }
    primero = scannerPeso(primero);
    console.log(primero);
    console.log("-----------------------------FIN DE ACOMODAR PESO--------------------------------");
    return primero;
}

function scannerPeso(pesoR) {
    var peso = pesoR.toString();
    var pesoNuevo = "";
    for (var i = 0; peso.length > i; i++) {
        if (peso.charAt(i) == ".") {
            pesoNuevo += ",";
        } else { pesoNuevo += peso.charAt(i) }
        console.log(pesoNuevo);
    }
    return pesoNuevo;
}

function ejecutar(pesoMayor, pesoMenor) {
    console.log("-----------------ACÁ ENTRA A EJECUTAR-----------------");
    console.log("Esto es el pesoMayor " + pesoMayor);
    console.log("Esto es el pesoMenor " + pesoMenor);
    var pesoFinal = (pesoMayor - pesoMenor);
    console.log("Esto es el pesoFinal " + pesoFinal);
    var array = [pesoFinal, (pesoFinal > 0)]
    console.log("-----------------ACÁ FINALIZA A EJECUTAR-----------------");
    return array;
}

function validacion(estado, texto, id) {
    var id = document.getElementById(id);
    if (estado) {
        id.style.display = " flex ";
        id.style.width = "100%";
        id.style.backgroundColor = "#04B404";
        id.style.color = "#fff";
        id.style.padding = "5px";
        id.style.paddingLeft = "1px";
        id.innerHTML = texto;
    } else {
        id.style.display = " flex ";
        id.style.width = "100%";
        id.style.backgroundColor = "#FA5858";
        id.style.color = "#fff";
        id.style.padding = "5px";
        id.style.paddingLeft = "1px";
        id.innerHTML = texto;
    }
}

function alertarCorreo(mensaje1) {
    var correo = "";
    var confirmacion = confirm(mensaje1 + "¿Desea continuar?");
    if (confirmacion) { correo = prompt("Por favor explique con detalle su motivo"); }
    if (correo != "" && correo != null) { google.script.run.enviarCorreo(correo, cv); }
    return (confirmacion && correo && correo != "");
}

function recibirIngreso() {
    google.script.run.withSuccessHandler(function(e) {
        idIngreso = e;
    }).darIngreso();

}

function cargarCanales() {
    console.log("-------------ENTRO AL CARGAR CANALES-------------");
    console.log(cv);
    google.script.run.withSuccessHandler(function(o) {
        console.log("-------------ENTRO AL SCRIPT DE GOOGLE-------------");
        canalPorCv = o;
        console.log(o);
        console.log("-------------SALIO AL SCRIPT DE GOOGLE-------------");
    }).darCanal(cv);
    console.log("-------------SALIO DEL CARGAR CANALES-------------");
}

function recibirBolson() {
    google.script.run.withSuccessHandler(function(e) {
        idBolson = e;
    }).darBolson();
}

function limpiar() {
    colocarEscritorio();
    camion = undefined;
    metodoParaCargar = undefined;
}

function repartirDatos() {
    //REPARTIR CANALES, METODOS Y BASE A VERIFICAR
    console.log("primer for");
    for (var a = 0; a < datoGeneral[6].length; a++) {
        if (datoGeneral[6][a][0] == cv) {
            console.log("entro al primer if");
            console.log(canales);
            canales.push(datoGeneral[7][a][0]);
            console.log(canales);
            if (datoGeneral[8][a][0] == 2) {
                console.log("entro al segundo if");
                datosMetodos.push([datoGeneral[8][a][0], datoGeneral[9][a][0], datoGeneral[10][a][0]]);
            } else { datosMetodos.push([datoGeneral[8][a][0], datoGeneral[9][a][0]]); }
            baseVerificar[datoGeneral[7][a][0]] = (datoGeneral[11][a][0]);
        }
    }
    console.log("comienza segundo for, termina primero");
    //BASE A VERIFICAR
    for (var b = 0; b < datoGeneral[12].length; b++) {
        if (datoGeneral[12][b][0] == cv) {
            datosEtapas.push(datoGeneral[13][b][0]);
            if (datoGeneral[14][b][0] != "null") { datoSubEtapas.push(datoGeneral[13][b][0], datoGeneral[14][b][0]); }
            if (datoGeneral[15][b][0] != "null") { datoSubEtapas.push(datoGeneral[13][b][0], datoGeneral[15][b][0]); }
            if (datoGeneral[16][b][0] != "null") { datoSubEtapas.push(datoGeneral[13][b][0], datoGeneral[16][b][0]); }
            if (datoGeneral[17][b][0] != "null") { datoSubEtapas.push(datoGeneral[13][b][0], datoGeneral[17][b][0]); }
        }
    }
}

function conectarGoogle() {
    google.script.run.withSuccessHandler(function(e) {
        datoNombres = e[0];
        datoClaves = e[1];
        datoCV = e[2];
        datoCOOP = e[3];
        datoMaterial = e[4];
        datoCaracteristica = e[5];
        datoGeneral = e;
    }).darBaseDeDato();

    setTimeout(function() {
        console.log(datoNombres);
        console.log(datoClaves);
        console.log(datoCV);
        console.log(datoCOOP);
        console.log(datoMaterial);
        console.log(datoCaracteristica);
        console.log(datoGeneral);

    }, 5000);
}

conectarGoogle();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCIONES DE JAVASCRIPT :D

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

google.script.run.withSuccessHandler(function(e) { document.getElementById("pantalla").innerHTML = e; }).incluir("principal");
google.script.run.withSuccessHandler(function(e) { document.head.innerHTML = e; }).incluir("estilos");