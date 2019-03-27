  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCIONES DE JAVASCRIPT :D

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var caracteristica, material, nombre, nombreAsignado, metodoParaCargar, canal, metodoParaMixto;
var etapa, subetapa;
var canalPorCv;
var cv, usuario, coop, metodoDeCarga, camion, user, idIngreso = 0,idBolson = 0;
var pesoT = 0,pesoEntradaG = 0,pesoSalidaG = 0,cantidad = 0,pesoTotalG = 0;
var elementoCargado = 0;
var baseVerificar = { RD: "", GG: "", PV: "", VENTA: "", DESCARTE: "", MIXTA: "", CA: "" };
var idVer = false,pesoVer = false,patenteVer = false,fechaVer = false,horaVer = false;
var posicionCanal = 0,posicionEtapas = 0,posicionMaterial = 0,posicionCara = [];
var datoEtapas = [],datoCanal = [],datoMaterialM = [],datoCaracteristicaM = [];
var datoPeso = [],datoPesoE = [],datoPesoS = [];
var datoPesoCanal = [],datoPesoECanal = [],datoPesoSCanal = [];
var datoPesoMaterial = [],datoPesoEMaterial = [],datoPesoSMaterial = [];
var datoPesoCara = [],datoPesoECara = [],datoPesoSCara = [];
var datosEditables = [],datoEditableFinal = [],cantidadCara = [],cantidadMaterial = [];
var cantidadEtapa = [],cantidadCanal = [];
var listaDeID = [];
var datosCamion = [],datosBolson = [],datoComun = [];
var datoMaterial = [],datoCaracteristica = [], datoDelPesoPorMaterial = [];
var datoBolsonVieja = [],datoCamionVieja = [];
var banderaEgreso = false;
var banderaMixto = false;
var rebote = false; var reboteC = "";
var botonParaClickear = "botonIngresar";
var cantidadCargas = 0;
var banderaDeCargas = 0;
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

////////////////////////////////////////////VARIABLES DEL CANDADO////////////////////////////////////////////////
var candado = false;
var fechaCandado = "";
var horaCandado = "";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CLASE DE USUARIO///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Usuario {
    constructor() {
        this.usuario = document.getElementById('usuario').value;
        this.clave = document.getElementById('clave').value;
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
        }//Realiza conexión con GOOGLE y muestra la pantalla correspondiente.
    conexionGoogle(canalRecibido, mixto) {
            canal = canalRecibido;
            gestionarMetodos();
            if (metodoDeCarga.length == 2) {
                var tipoCarga = [metodoDeCarga[0], metodoDeCarga[1]];
                setTimeout(function() {
                    colocarMenu(tipoCarga, 'divIngresoE', '');
                    mostrarPantalla("elementos");
                }, 1000);
            } else {
                if (mixto == undefined) {
                    mostrarPantalla("carga");
                } else {
                    document.getElementById("camion").style.display = "none";
                    document.getElementById("bolson").style.display = "block";
                    document.getElementById("mixta").style.display = "none";
                    user.abrirMetodos();
                }
            }
        }//Abre los metodos según el centro verde que opera
    abrirMetodos() {
            botonParaClickear = "botonCargar";
            clickear();
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
                case "cantidadPesoE":
                    metodoParaCargar = new cantidadPesoE();
                    camion = new Camion();
                    metodoParaCargar.abrir();
                    break;
                case "entradaSalidaE":
                    metodoParaCargar = new entradaSalidaE();
                    camion = new Camion();
                    metodoParaCargar.abrir();
                    break;
                case "mixta":
                    metodoParaMixto = new mixta();
                    camion = new Camion();
                    metodoParaMixto.abrir();
                    break;
                case "cargaBolsonNombre":
                    metodoParaCargar = new cargaBolsonNombre();
                    camion = new Camion();
                    metodoParaCargar.abrir();
                    break;
                case "salidaE":
                    metodoParaCargar = new salidaE();
                    camion = new Camion();
                    metodoParaCargar.abrir();
                    break;
                default:
                    alert("No consiguió un método para ejecutar");
            }
            hacerRebote(camion.patente,camion.anio,camion.mes,camion.dia,camion.turno);
        }//Verifica el id :D
    verificar() {
        var idIngresado = document.getElementById("id").value;
        if (!idVer && idIngresado != "") {
            if (alertarCorreo("El id ingresado ¡No está asociado a ningún dato!",true,idIngresado)) {
                validacion(true, "<p>Se ha enviado el aviso al administrador, puedes seguir cargando.</p>", "validador");
                metodoParaCargar.id.disabled;
                document.getElementById("botonCargar").focus();
                return idVer = true;
            } else {
                validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
                idVer = 3;
                document.getElementById("pesoEntrada").value = "";
                document.getElementById("id").value = "";
                return document.getElementById("pesoEntrada").focus();
            }
        } else if (idVer && document.getElementById("id").value != "") {
            validacion(true, "<p>El id está asociado a: " + nombre + "</p>", "validador");
        }

        document.getElementById("botonCargar").disabled = !(idVer && pesoVer && idVer != 3);
    }//Verifica por segunda vez el id
    verificarID(baseDeDatos) {
            document.getElementById("validador").style.display = "none";
            var id = document.getElementById("id").value;
            if(id != ""){
                if(id != "0"){
                    if (baseDeDatos != "RD" && baseDeDatos != "GG" && baseDeDatos != "PV" &&
                        baseDeDatos != "MIXTA" && baseDeDatos != "CA" && baseDeDatos != "DESCARTE" &&
                        baseDeDatos != "VENTA" && baseDeDatos != "") {
                        compararID(id);
                    } else { idVer = true; }
                } else {
                    idVer = true;
                    nombre = "Id no recordado";
                }
                if (idVer) {
                    validacion(true, "<p>El id está asociado a: " + nombre + "</p>", "validador");
                    return idVer = true;
                } else if (idVer == 1) {
                    idVer = false;
                    return validador.style.display = "none";
                } else {
                    idVer = false;
                    return validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
                }
            }
        }//Verificar el peso :D
    verificarPeso() {
            var tipo = canal;
            var pesoEntrada = document.getElementById("pesoEntrada").value;
            var pesoSalida = document.getElementById("pesoSalida").value;
            if (tipo != "VENTA" && tipo != "DESCARTE") {
                this.verificar();
                var pesoVe = ejecutar(pesoEntrada, pesoSalida);
            } else {
                var pesoEg = ejecutar(pesoSalida, pesoEntrada);
            }
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
                    banderaPeso = (pesoVe[0] > 0 && pesoVe[0] != "" && 250 >= pesoVe[0]);
                    break;
                case ("DESCARTE"):
                    if (pesoSalida == "") { return boton.disabled = true; }
                    banderaPeso = (pesoEg[0] > 0 && (pesoEntrada != ""));
                    idVer = true;
                    var ventaDescarte = true;
                    break;
                case ("VENTA"):
                    if (pesoSalida == "") { return boton.disabled = true; }
                    banderaPeso = (pesoEg[0] > 0 && (pesoEntrada != ""));
                    idVer = true;
                    var ventaDescarte = true;
                    break;
            }
            if (banderaPeso) {
                if(!ventaDescarte){
                    if (idVer && idVer != 3) {
                        validacion(true, "<p>El ID está asociado a: " + nombre + "</p>", "validador");
                    } else {
    
                        validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
                    }
                }
            } else {
                validacion(false, "<p>¡Hubo un error en el peso!</p>", "validador");
            }
            pesoVer = banderaPeso;
            boton.disabled = !(idVer && pesoVer && idVer != 3);
        }//Verificar la fecha
    verificarFecha() {
            document.getElementById("validadorCamion").style.display = "none";
            //datos recibidos
            var fechaRecibida = document.getElementById("fecha").value;
            var fecha = new Date(fechaRecibida);
            //fecha actual
            var fechaActual = new Date();
            var diferenciaFecha = parseInt((fechaActual - fecha) / (1000 * 60 * 60 * 24));
            var boton = document.getElementById("botonSeguir");
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

        }//Verificar la hora D:
    verificarHora() {
            var hora = parseInt(document.getElementById("hora").value); //Variable para realizar operaciones matemáticas.
            var horaT = document.getElementById("hora").value; //Variable comparativa en texto.
            var boton = document.getElementById("botonSeguir");
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
        }//Verificar la patente :D
    verificarPatente() {
        var patente = document.getElementById("patente").value; //Obtengo el valor de la patente.
        var boton = document.getElementById("botonSeguir"); //El botón para activarlo en caso de ser verdadero, y desactivarlo en caso contrario.
        var banderaP = false;
        document.getElementById("validadorCamion").style.display = "none";
        switch (patente.length) {
            case (6):
                var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)) && isNaN(patente.charAt(2))); //Primer parámetro (deben ser 3 letras).
                var dos = !isNaN((patente.charAt(3) + patente.charAt(4) + patente.charAt(5))); //Segundo Parámetro (deben ser 3 números).
                banderaP = (uno && dos);
                break;
            case (7):
                var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)));
                var dos = !isNaN((patente.charAt(2) + patente.charAt(3) + patente.charAt(4)));
                var tres = (isNaN(patente.charAt(5)) && isNaN(patente.charAt(6)));
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
            validacion(false, "<p>¡No haz ingresado un valor válido en patente! Los valores válidos son: AB123CD ó ABC123</p>", "validadorCamion");
        } else if (!horaVer || !fechaVer) {
            validacion(false, "<p>¡Algún dato ingresado es incorrecto!</p>", "validadorCamion");
        }
        patenteVer = banderaP;
        boton.disabled = !(banderaP && fechaVer && horaVer);
        document.getElementById("observacion").focus();
    }//verificar Cantidad :Ddocument.getElementById("caracteristica").value = "Bolsones";
    verificarCantidad(){
        var boton = document.getElementById("botonCargar");
        var cantidad = metodoParaCargar.cantidad.value;
        boton.disabled = !(cantidad > 0 && cantidad != "");
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
        this.elemento = document.getElementById('elementos');
        this.id = document.getElementById('id');
        this.nombre = document.getElementById('nombre');
        this.pesoentrada = document.getElementById('pesoEntrada');
        this.pesosalida = document.getElementById('pesoSalida');
        this.caracteristica = document.getElementById("caracteristicaDiv");
        this.material = document.getElementById("materialDiv");
        this.estadisticaMixta = document.getElementById("seccionEstadistica");
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
        this.camion.style.display = "none";
        this.elemento.style.display = "none";
        this.cantidadBandera = 1;
        this.estadisticaMixta.style.display = "none";
        darValoresHolder();
        cargarListaDeID()
    }
    enviar() {
        var confirmacion = confirm(usuario + " ¿Deseas ya enviar los datos?");
        if(confirmacion){
            if(rebote){reboteC = "SI";}
            else{reboteC = "NO";}
            var dato = datoEditableFinal.filter(elemento => elemento != null);
            console.log(dato);
            if (dato.length > 1) {
                darCantidadCorrespondiente();
                camion.crearCamionParticipativo()
                camion.crearCamionCompuesto();
            } else {
                camion.crearCamionUnico();
            }
            camion.crearBolson();
            camion.crearCamionParaVieja();
            google.script.run.envioDeDatos(datosCamion, datosBolson);
            google.script.run.enviarDatosVieja(datoBolsonVieja, datoCamionVieja);
            document.getElementById("botonEnviar").style.display = "block";
            document.getElementById("botonContinuar").style.display = "none";
            document.getElementById("botonContinuar").disabled = true;
            document.getElementById("botonEnviar").disabled = true;
            document.getElementById("botonEnviarMixto").disabled = true;
            limpiar();
            alert("¡Se ha cargado EXITOSAMENTE el camión!");
        }
    }
    cargar(esOnoBolson) {
        etapa = document.getElementById("etapa").value;
        subetapa = document.getElementById("subetapa").value;
        caracteristica = document.getElementById("caracteristica").value;
        material = document.getElementById("material").value;
        document.getElementById("botonEnviar").disabled = false;
        document.getElementById("botonContinuar").disabled = false; 
        crearResumen(this.informacion);
        var etapaConcatenada = etapa + subetapa;
        this.pesoCanal = pesoPorCanal(this.peso[5], this.peso[3], this.peso[4],this.cantidadBandera);
        this.pesoMaterial = pesoPorMaterial(this.peso[2], this.peso[0], this.peso[1],this.cantidadBandera);
        this.pesoEtapa = pesoPorEtapa(etapaConcatenada, this.peso[2], this.peso[0], this.peso[1],this.cantidadBandera);
        this.pesoCaracteristica = pesoPorCaracteristica(this.peso[2], this.peso[0], this.peso[1],this.cantidadBandera);
        definirDatos(this.pesoCanal, this.pesoEtapa, this.pesoMaterial, this.pesoCaracteristica, caracteristica,
            material, subetapa, etapa, this.pesoUnitario.value, cantidad);
            validacion(true, "<p>Se ha cargado el bolsón correctamente</p>", "validador");
            idVer = false, pesoVer = false;
            document.getElementById("botonCargar").disabled = true;
            this.idDGREC = this.id.value;
            if (canal == "PV") { this.idDGREC = "PV-" + this.id.value; }
            datosEditables.push([this.id.value, this.peso[0], this.peso[1], this.peso[2],
                caracteristica, material, subetapa, etapa, nombre,
                idBolson, canal, this.idDGREC, this.pesoUnitario.value, cantidad, esOnoBolson,banderaDeCargas
            ]);
            cantidadCargas++;
            banderaDeCargas = 0;
            this.id.value = "";
            this.pesoentrada.value = "";
            this.pesosalida.value = "";
            cambiarBoton();
            clickear();
            document.getElementById("cantidadMostrado").innerHTML = cantidadCargas;
            document.getElementById("pesoMostrado").innerHTML = (Math.round(pesoT * 100) / 100) + "KG";
    }}
class cargaBolson extends Metodo {
    abrir() {
        this.carga.style.display = "block";
        this.mixta.style.display = "none";
        this.id.type = "number";
        this.id.setAttribute('oninput', 'user.verificarID("' + baseVerificar[canal] + '"); cambiarBoton(); clickear();');
        this.id.setAttribute('onblur', 'setTimeout(function(){user.verificar();},800);');
        this.id.setAttribute("autofocus", "true");
        this.id.value = "";
        this.idDGREC;
        this.pesoentrada.type = "number";
        this.pesoentrada.value = "";
        this.pesoentrada.placeholder = "Peso de Bolsón(KG)";
        this.pesosalida.value = 0;
        this.pesoUnitario.value = "N/A";
        this.caracteristica.value = "Bolsones";
        this.material.value = "Mixto";
        this.cantidad = 0;
        cargarListaDeID();
        this.id.focus();
        document.getElementById('etapa').value = "";
        document.getElementById('subetapa').value = "";
        gestionarEtapas();
        document.getElementById("tablaResumen").innerHTML = tablaB;
        document.getElementById("caracteristica").value = "Bolsones";
        document.getElementById("material").value = "mixto";
        recibirBolson();
        document.getElementById("mostradorPeso").style.display = "block";
        document.getElementById("mostradorCantidad").style.display = "block";
    }
    cargar() {
        recibirBolson();
        this.peso = resolverPeso(this.pesoentrada.value, this.pesosalida.value, "ingreso");
        this.informacion = [this.id.value, nombre, (Math.round(this.peso[2] * 100) / 100)+"KG"];
        this.id.focus();
        super.cargar("bolson");
        this.pesosalida.value = 0;
    }
}
class cargaBolsonNombre extends Metodo {
    abrir() {
        this.carga.style.display = "block";
        this.mixta.style.display = "none";
        this.nombre.type = "text";
        this.nombre.setAttribute("oninput","metodoParaCargar.verificarNombre();");
        this.nombre.focus();
        this.id.value = "N/A";
        this.idDGREC = "N/A";
        this.pesoentrada.type = "number";
        this.pesoentrada.value = "";
        this.pesoentrada.placeholder = "Peso de Bolsón(KG)";
        this.pesosalida.value = 0;
        this.pesoUnitario.value = "N/A";
        this.caracteristica.value = "Bolsones";
        this.material.value = "Mixto";
        this.cantidad = 0;
        cargarListaDeID();
        this.nombre.focus();
        document.getElementById('etapa').value = "";
        document.getElementById('subetapa').value = "";
        gestionarEtapas();
        document.getElementById("tablaResumen").innerHTML = tablaBN;
        document.getElementById("caracteristica").value = "Bolsones";
        document.getElementById("material").value = "mixto";
        recibirBolson();
        document.getElementById("mostradorPeso").style.display = "block";
        document.getElementById("mostradorCantidad").style.display = "block";
    }
    cargar() {
        recibirBolson();
        nombre = this.nombre.value;
        this.peso = resolverPeso(this.pesoentrada.value, this.pesosalida.value, "ingreso");
        this.informacion = [nombre, (Math.round(this.peso[2] * 100) / 100)+"KG"];
        this.nombre.focus();
        super.cargar("bolson");
        this.pesosalida.value = 0;
        this.nombre.value = "";
    }
    verificarNombre(){
        if(this.nombre.value != ""){
            idVer = true;
        }else{
            idVer = false;
        }
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
        this.carga.style.display = "none";
        this.mixta.style.display = "block";
        banderaMixto = true;
        this.mostrarCanales();
        document.getElementById("botonEnviar").style.display = "none";
        document.getElementById("botonContinuar").style.display = "block";
    }
    continuar() {
        var confirmacion = confirm("¿Deseas continuar agregando más canales?");
        if(confirmacion){     
            this.mixta.style.display = "block";
            this.carga.style.display = "none";
            this.estadisticaMixta.style.display = "block";
            var link = document.getElementById(canal);
            var img = document.getElementById("imagen" + canal);
            link.onclick = "";
            img.src = "http://carlitos.com.ar/DGREC/image/"+canal+".png";
            img.onmouseover = "";
            img.onmouseout = "";
            document.getElementById("botonEnviarMixto").disabled = false;
            botonParaClickear = "botonEnviar";
            var estadistica = [canal,cantidadCargas,pesoT];
            this.crearTabla(estadistica);
            pesoT = 0;
            cantidadCargas = 0;
            document.getElementById("cantidadMostrado").innerHTML = 0;
            document.getElementById("pesoMostrado").innerHTML = 0 + "KG";
            vaciarResumen();
        }
    }
    mostrarCanales() {
        metodoParaMixto.agregarMenu(canales);
    }
    crearTabla(datos){
        var divPrincipal = document.getElementById("seccionEstadistica");
        var divCargas = document.createElement("DIV");
        divCargas.setAttribute("class","cargoMixto");
        var tabla = document.createElement("TABLE");
        var filaPrincipal = document.createElement("TR");
        var colCanal = document.createElement("TD");
        colCanal.setAttribute("rowspan","2");
        colCanal.innerText = datos[0];
        var colCantidad = document.createElement("TD");
        colCantidad.innerHTML = datos[1];
        var filaSecundaria = document.createElement("TR");
        var colPeso = document.createElement("TD");
        colPeso.innerHTML= (Math.round(datos[2] * 100) / 100) + "KG";
        filaPrincipal.appendChild(colCanal);
        filaPrincipal.appendChild(colCantidad);
        filaSecundaria.appendChild(colPeso);
        tabla.appendChild(filaPrincipal);
        tabla.appendChild(filaSecundaria);
        divCargas.appendChild(tabla);
        divPrincipal.appendChild(divCargas);
        validacion(true,"<p>Peso total " + Math.round(pesoTotalG * 100) / 100 + "</p>", "validadorMixto");
      }
    agregarMenu(array) {
        var div = document.getElementById("imagenMixto");
        for (var i = 0; array.length > i; i++) {
            var valor = array[i];
            if (valor != "MIXTA" && valor != "VENTA" && valor != "DESCARTE") {
                var link = document.createElement('a');
                link.setAttribute('id', valor);
                var funcion = "user.conexionGoogle('" + valor + "','mixto');"
                link.setAttribute('onclick', funcion);
                var imagen = document.createElement('img');
                imagen.setAttribute('class', 'botonIngreso');
                imagen.setAttribute('id', 'imagen' + valor);
                imagen.setAttribute('alt', ('Boton del método' + valor));
                imagen.setAttribute('src', 'http://carlitos.com.ar/DGREC/image/'+valor+'on.png'); //'"http://carlitos.com.ar/DGREC/image/'+array[i][0]+'.png"');
                imagen.setAttribute('onMouseOver','hacerHover("'+valor+'",this,"")');
                imagen.setAttribute('onMouseOut','hacerHover("'+valor+'",this,"on")');
                link.appendChild(imagen);
                div.appendChild(link);
            }
        }
    }
}
class salidaMaterialE extends Metodo {
    abrir() {
        this.carga.style.display = "block";
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
        document.getElementById("tablaResumen").innerHTML = tablaM;
        this.pesoUnitario.value = "N/A";
        this.pesosalida.type = "number";
        this.pesosalida.value = "";
        this.pesosalida.placeholder = "Peso de Material(KG)";
        this.pesosalida.focus();
        this.material.style.display = "block";
        document.getElementById("caracteristica").value = "A Granel";
        seleccionDeMateriales(datoMaterial, "materialDiv", "materialF");
        banderaEgreso = true;
        document.getElementById("mostradorPeso").style.display = "block";
    }
    cargar() {
        var materialR = document.getElementById("materialF").value;
        this.peso = resolverPeso(this.pesosalida.value, this.pesoentrada.value, "egreso");
        this.informacion = [materialR, (Math.round(this.peso[2] * 100) / 100)+"KG"];
        document.getElementById("material").value = materialR;
        this.pesosalida.focus();
        super.cargar("material");
        this.pesoentrada.value = 0;
    }
}
class cantidadPesoE extends Metodo{
    abrir() {
        this.carga.style.display = "block";
        this.mixta.style.display = "none";
        document.getElementById("ingreso").value = "Egreso";
        camion.ingreso = "Egreso";
        etapa = "N/A";
        subetapa = "N/A";
        this.etapa.value = "N/A";
        this.subetapa.value = "N/A";
        nombre = "N/E";
        this.id.value = "N/A";
        this.pesoentrada.value = 0;
        document.getElementById("tablaResumen").innerHTML = tablaMC;
        this.pesosalida.value = 0;
        this.cantidad.value = "";
        this.cantidad.type = "number";
        this.cantidad.setAttribute('oninput','user.verificarCantidad(); cambiarBoton(); clickear();');
        this.cantidad.focus();
        this.material.style.display = "block";
        this.caracteristica.style.display = "block";
        document.getElementById("caracteristica").value = "Bolsones";
        seleccionDeMateriales(datoMaterial, "materialDiv", "materialF");
        seleccionDeMateriales (datoCaracteristica, "caracteristicaDiv", "caracteristicaF" );
        banderaEgreso = true;
        document.getElementById("mostradorPeso").style.display = "block";
    }
    cargar() {
        this.pesosalida.value = this.multiplicarPeso();
        var materialR = document.getElementById("materialF").value;
        var caracteristicaR = document.getElementById("caracteristicaF").value;
        this.peso = resolverPeso(this.pesosalida.value, this.pesoentrada.value, "egreso");
        this.informacion = [materialR, this.cantidad.value, (Math.round(this.peso[2] * 100) / 100)+"KG"];
        this.cantidadBandera = parseInt(this.cantidad.value);
        cantidad += parseInt(this.cantidadBandera)-1;
        banderaDeCargas = (this.cantidadBandera-1);
        document.getElementById("material").value = materialR;
        document.getElementById("caracteristica").value = materialR;
        super.cargar("material");
        this.pesoentrada.value = 0;
        this.pesosalida.value = 0;
        this.cantidad.value = "";
        this.cantidad.focus();
    }
    multiplicarPeso(){
        var materialR = document.getElementById("materialF").value;
        var caracteristicaR = document.getElementById("caracteristicaF").value;
        var datos = datoDelPesoPorMaterial.filter(elemento => elemento[0] == materialR);
        var datosDos = datos.filter(elemento => elemento[1] == caracteristicaR);
        this.pesoUnitario = datosDos[0][2];
        return this.cantidad.value * parseFloat(datosDos[0][2]);
    }
}
class entradaSalidaE extends Metodo{
    abrir() {
        this.carga.style.display = "block";
        this.mixta.style.display = "none";
        document.getElementById("ingreso").value = "Egreso";
        camion.ingreso = "Egreso"
        etapa = "N/A";
        subetapa = "N/A";
        this.etapa.value = "N/A";
        this.subetapa.value = "N/A";
        nombre = "N/E";
        this.id.value = "N/A";
        this.pesoentrada.value = "";
        this.pesosalida.value = "";
        document.getElementById("tablaResumen").innerHTML = tablaMC;
        this.cantidad.value = 0;
        this.pesoentrada.type = "number";
        this.pesosalida.type = "number";
        this.pesoentrada.focus();
        document.getElementById("caracteristica").value = "Bolsones";
        document.getElementById("material").value = "Mixto";
        banderaEgreso = true;
        document.getElementById("mostradorPeso").style.display = "block";
    }
    cargar() {
        this.peso = resolverPeso(this.pesosalida.value, this.pesoentrada.value, "egreso");
        this.informacion = [caracteristica, material, (Math.round(this.peso[2] * 100) / 100)+"KG"];
        super.cargar("material");
        this.pesoentrada.focus();
    }
}
class salidaE extends Metodo{
    abrir() {
        this.carga.style.display = "block";
        this.mixta.style.display = "none";
        document.getElementById("ingreso").value = "Egreso";
        var boton = document.getElementById("botonCargar");
        camion.ingreso = "Egreso"
        etapa = "N/A";
        subetapa = "N/A";
        this.etapa.value = "N/A";
        this.subetapa.value = "N/A";
        nombre = "N/E";
        this.id.value = "N/A";
        this.pesoentrada.value = 0;
        this.pesosalida.value = "";
        document.getElementById("tablaResumen").style.display = "none";
        document.getElementById("botonEnviar").style.display = "none";
        document.getElementById("datosParaAgregar").style.width = "100%";
        boton.disabled = false;
        this.cantidad.value = 0;
        this.pesosalida.type = "number";
        this.pesoentrada.focus();
        document.getElementById("caracteristica").value = "A Granel";
        document.getElementById("material").value = "Mixto";
        banderaEgreso = true;
        document.getElementById("mostradorPeso").style.display = "block";
    }
    cargar() {
        this.peso = resolverPeso(this.pesosalida.value, this.pesoentrada.value, "egreso");
        super.cargar("material");
        super.enviar();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CLASE DE CAMION////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Camion {
    constructor() {
        this.recibirFecha = document.getElementById("fecha").value;
        this.fecha = ((this.recibirFecha.charAt(8) + this.recibirFecha.charAt(9)) + "/" + (this.recibirFecha.charAt(5) + this.recibirFecha.charAt(6)) + "/" + (this.recibirFecha.charAt(0) + this.recibirFecha.charAt(1) + this.recibirFecha.charAt(2) + this.recibirFecha.charAt(3)));
        this.anio = (this.recibirFecha.charAt(0) + this.recibirFecha.charAt(1) + this.recibirFecha.charAt(2) + this.recibirFecha.charAt(3));
        this.mes = (this.recibirFecha.charAt(5) + this.recibirFecha.charAt(6));
        this.dia = (this.recibirFecha.charAt(8) + this.recibirFecha.charAt(9));
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
        if (metodoParaCargar.caracteristica.value == "") { metodoParaCargar.caracteristica.value == "Bolsones" }
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        datosCamion.push([this.tipoCamion[2], usuario, fechaActual, idIngreso, coop, cv,
            this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
            this.patente, reboteC, canal, dato[0][2], dato[0][1], cantidad,
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
        var horaParaVieja;
        var canalVieja;
        var largo = 1;
        var dato = datosEditables.filter(elemento => elemento != null);
        var datoFinal = datoEditableFinal.filter(elemento => elemento != null);
        if(datoMaterialM.length > 1){canalVieja = canal; largo = datoMaterialM.length;}
        else{largo = datoCanal.length}
        for (var i = 0; i < largo; i++) {
            if(i != 0){horaParaVieja = "";
            } else { horaParaVieja = this.hora}
            if(dato[i][10] == "RD"){canalVieja = "RA"}
            else{canalVieja = dato[i][10]}
            datoCamionVieja.push([this.anio, this.mes, this.dia, this.turno, horaParaVieja, this.ingreso, this.patente,
                canalVieja, datoFinal[i][2],datoFinal[i][1],cantidad, "", pesoEntradaG, pesoSalidaG
            ]);
        }
        for (var i = 0; i < dato.length; i++) {
            datoBolsonVieja.push([coop, cv, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
                this.patente, canalVieja, this.observacion, etapa, dato[i][0], dato[i][3], pesoTotalG,
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
        var valorParticipacion = "N/A";
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        var participacion = crearParticipacion();
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        if (participacion[0] == "") { valorCanal = canal; } else { valorCanal = participacion[0];valorParticipacion = participacion[0];}
        if (participacion[1] == "") {valorEtapa = "N/A";valorSub = "N/A";
        } else {valorEtapa = participacion[1];valorSub = participacion[1];}
        if (participacion[2] == "") { valorMaterial = material; } else { valorMaterial = participacion[4];valorParticipacion = participacion[2]; }
        if (participacion[3] == "") { valorCaracteristica = caracteristica; } else { valorCaracteristica = participacion[5];valorParticipacion = participacion[3]; }

        datosCamion.push([this.tipoCamion[0], usuario, fechaActual, idIngreso, coop, cv,
            this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
            this.patente, reboteC, valorCanal, valorMaterial, valorCaracteristica, cantidad,
            dato[0][6], scannerPeso(pesoEntradaG), scannerPeso(pesoSalidaG), scannerPeso(pesoTotalG), valorParticipacion,
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
                this.patente, reboteC, dato[i][5], dato[i][2], dato[i][1],
                dato[i][7], dato[i][6], pesoE, pesoS, peso, scannerPeso(pesoTotalG),
                this.observacion, dato[i][4], dato[i][3], dato[i][0],
                dato[i][0], dato[i][0], dato[i][0]
            ]);
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
                    this.patente, reboteC, dato[i][10], dato[i][5], dato[i][4],
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
                this.patente, reboteC, canal, dato[i][2], dato[i][1], cantidad,
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

function darValoresHolder(){
    var canalExpresado = canal;
    var texto;
    switch (canalExpresado) {
        case 'GG':
            textonombre = "Nombre del GG";
            textoid = "ID del GG";    
            break;
        case 'RD':
            textonombre = "Nombre del Recuperador";
            textoid = "ID del Recuperador";    
            break;
        case 'PV': 
            textonombre = "Nombre del punto verde";
            textoid = "ID del Punto Verde";
            break;
        case 'CA':
            textonombre = "Dirección de campana";
            textoid = "ID de la campana";
            break;
        default: 
            return;
    }
    document.getElementById("id").placeholder = textoid;
    document.getElementById("nombre").placeholder = textonombre;
}
function cambiarBoton(){
    var btnCargar = document.getElementById("botonCargar");
    if(btnCargar.disabled){
        if(!banderaMixto){
            botonParaClickear = "botonEnviar";
        } else{
            botonParaClickear = "botonContinuar";
        }
    } else{
        botonParaClickear = "botonCargar";
    }
}
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
    var baseDeDatos = baseVerificar[canal];
    if (baseDeDatos != "RD" && baseDeDatos != "GG" && baseDeDatos != "PV" &&
        baseDeDatos != "MIXTA" && baseDeDatos != "CA" && baseDeDatos != "DESCARTE" &&
        baseDeDatos != "VENTA" && baseDeDatos != "") {
        google.script.run.withSuccessHandler(
            function(e) {
                listaDeID = e;
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
            document.getElementById(botonParaClickear).click();
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
    } else if (porCanal && !porEtapa && !porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "canal"
        ]);
        condicionar();
    } else if (!porCanal && porEtapa && !porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "etapa"
        ]);
        condicionar();
    } else if (!porCanal && !porEtapa && porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "material"
        ]);
        condicionar();
    } else if (porCanal && porEtapa && !porMaterial && !porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "canal"
        ]);
        condicionar();
    } else if (!porCanal && !porEtapa && porMaterial && porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "caracteristica"
        ]);
        condicionar();
    } else if (!porCanal && !porEtapa && !porMaterial && porCara) {
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, "caracteristica"
        ]);
        condicionar();
    }

}
function condicionar() {
    var dato = datoEditableFinal.filter(elemento => elemento != null);
    var valor = (dato.length - 1);
    var etapasub = dato[valor][4] + dato[valor][3];
    var canal = dato[valor][5];
    var material = dato[valor][2];
    var cara = dato[valor][1];
    for (var i = 0; i < dato.length; i++) {
        var e = dato[i][4] + dato[i][3];
        var c = dato[i][5];
        var m = dato[i][2];
        var ca = dato[i][1];
        if (dato[i][8] == "definir") {
            if (e != etapasub && c == canal) {
                dato[i][8] = "etapa";
            } else if(e == etapasub && c == canal) {
                dato[i][8] = "canal";
            } else if(e == etapasub && c == canal && (m != material || ca != cara) && ca != cara){
                dato[i][8] = "caracteristica";
            } else if(e == etapasub && c == canal && m != material){
                dato[i][8] = "material";
            }
        } else if (dato[i][8] == "canal") {
            if (e != etapasub && c == canal && m == material) {
                dato[i][8] = "etapa"
            }else if(e == etapasub && (m != material || ca != cara) && ca != cara){
                dato[i][8] = "caracteristica";
            } else if (e == etapasub && c == canal && m != material) {
                dato[i][8] = "material";
            }
        }
    }

}
function crearParticipacion() {
    var banderaCanal = false;
    var banderaEtapa = false;
    var banderaMaterial = false;
    var banderaCara = false;
    var resultadoCanal = "";
    var resultadoEtapa = "";
    var resultadoMaterial = "";
    var resultadoCara = "";
    var resultadoMaterialReducido = "";
    var resultadoCaraReducido = "";
    for (var i = 0; datoComun.length > i; i++) {
        switch (datoComun[i][4]) {
            case "canal":
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
                if (datoComun[i][1] != "N/A") { var conca = datoComun[i][1] + datoComun[i][2]; } else { var onca = "" };
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
                if (datoCaracteristicaM[i][0] == datoComun[i][0]) {
                    if (!banderaCara) {
                        resultadoCara = (datoComun[i][0] + datoCaracteristicaM[i][1]);
                        banderaCara = true;
                    } else {
                        resultadoCara = resultadoCara + ('-' + datoComun[i][0] + datoCaracteristicaM[i][1]);
                    }
                }
                resultadoCaraReducido = "VARIOS-COMPUESTO";
                break;
            case "material":
                if (datoMaterialM[i][0] == datoComun[i][6]) {
                    if (!banderaMaterial) {
                        resultadoMaterial = (datoComun[i][6] + datoMaterialM[i][1]);
                        banderaMaterial = true;
                    } else {
                        resultadoMaterial = resultadoMaterial + ('-' + datoComun[i][6] + datoMaterialM[i][1]);
                    }
                }
                resultadoMaterialReducido = "MIXTO-COMPUESTO";
                break;
        }
    }
    return [resultadoCanal,resultadoEtapa,resultadoMaterial,resultadoCara,
            resultadoMaterialReducido,resultadoCaraReducido];
}
function darCantidadCorrespondiente() {
    var dato = datoEditableFinal.filter(elemento => elemento != null);
    for (var i = 0; i < dato.length; i++) {
        var valor = dato[i][8];
        if (valor == "etapa") {
            dato[i][7] = cantidadEtapa[i];
        } else if (valor == "canal"){
            dato[i][7] = cantidadCanal[i];
        }else if (valor == "caracteristica"){
            dato[i][7] = cantidadCara[i];
        } else {
            dato[i][7] = cantidadMaterial[i];
        }
    }
}
function pesoPorCanal(peso, pesoEntrada, pesoSalida,cantidad) {
    var bandera = true;
    for (var i = 0; i < datoCanal.length; i++) {
        if (datoCanal[i][0] == canal) {
            datoPesoCanal[i] = parseFloat(datoPesoCanal[i]) + peso;
            datoPesoECanal[i] = parseFloat(datoPesoECanal[i]) + pesoEntrada;
            datoPesoSCanal[i] = parseFloat(datoPesoSCanal[i]) + pesoSalida;
            datoCanal[i][1] = parseFloat(datoCanal[i][1]) + peso;
            cantidadCanal[i] = (cantidadCanal[i] + cantidad);
            bandera = false;
        }
    }
    if (bandera) {
        datoPesoCanal.push(peso);
        datoPesoECanal.push(pesoEntrada);
        datoPesoSCanal.push(pesoSalida);
        datoCanal.push([canal, peso, posicionCanal]);
        cantidadCanal.push(cantidad);
        posicionCanal++;
    }
    return bandera;

}
function pesoPorMaterial(peso, pesoEntrada, pesoSalida,cantidad) {
    var bandera = true;
    for (var i = 0; i < datoMaterialM.length; i++) {
        if (datoMaterialM[i][0] == material) {
            datoPesoMaterial[i] = parseFloat(datoPesoMaterial[i]) + peso;
            datoPesoEMaterial[i] = parseFloat(datoPesoEMaterial[i]) + pesoEntrada;
            datoPesoSMaterial[i] = parseFloat(datoPesoSMaterial[i]) + pesoSalida;
            datoMaterialM[i][1] = parseFloat(datoMaterialM[i][1]) + peso;
            cantidadMaterial[i] = (cantidadMaterial[i] + cantidad);
            bandera = false;
        }
    }
    if (bandera) {
        datoPesoMaterial.push(peso);
        datoPesoEMaterial.push(pesoEntrada);
        datoPesoSMaterial.push(pesoSalida);
        datoMaterialM.push([material, peso, posicionMaterial]);
        cantidadMaterial.push(cantidad);
        posicionMaterial++;
    }
    return bandera;

}
function pesoPorCaracteristica(peso, pesoEntrada, pesoSalida,cantidad) {
    var bandera = true;
    for (var i = 0; i < datoCaracteristicaM.length; i++) {
        if (datoCaracteristicaM[i][0] == caracteristica) {
            datoPesoCara[i] = parseFloat(datoPesoCara[i]) + peso;
            datoPesoECara[i] = parseFloat(datoPesoECara[i]) + pesoEntrada;
            datoPesoSCara[i] = parseFloat(datoPesoSCara[i]) + pesoSalida;
            datoCaracteristicaM[i][1] = parseFloat(datoCaracteristicaM[i][1]) + peso;
            cantidadCara[i] = (cantidadCara[i] + cantidad);
            bandera = false;
        }
    }
    if (bandera) {
        datoPesoCara.push(peso);
        datoPesoECara.push(pesoEntrada);
        datoPesoSCara.push(pesoSalida);
        datoCaracteristicaM.push([caracteristica, peso, posicionCara]);
        cantidadCara.push(cantidad);
        posicionCara++;
    }
    return bandera;

}
function pesoPorEtapa(etapa, peso, pesoEntrada, pesoSalida,cantidad) {
    var bandera = true;
    for (var i = 0; i < datoEtapas.length; i++) {
        if (etapa == datoEtapas[i][0]) {
            datoPeso[i] = parseFloat(datoPeso[i]) + peso;
            datoPesoE[i] = parseFloat(datoPesoE[i]) + pesoEntrada;
            datoPesoS[i] = parseFloat(datoPesoS[i]) + pesoSalida;
            datoEtapas[i][1] = parseFloat(datoEtapas[i][1]) + peso;
            cantidadEtapa[i] = (cantidadEtapa[i] + cantidad);
            bandera = false;
        }
    }
    if (bandera) {
        datoPeso.push(peso);
        datoPesoE.push(pesoEntrada);
        datoPesoS.push(pesoSalida);
        datoEtapas.push([etapa, peso, posicionEtapas]);
        cantidadEtapa.push(cantidad);
        posicionEtapas++;
    }
    return bandera;

}
function crearResumen(datosextras) {
    if(datosextras){
        var listaBolson = document.getElementById("tablaResumen");
        var fila = document.createElement("TR");
        fila.setAttribute("id", ("n" + elementoCargado));
        for (var indices = 0; datosextras.length > indices; indices++) {
            var columna = document.createElement("TD");
            var textColumna = document.createTextNode(datosextras[indices]);
            columna.appendChild(textColumna);
            fila.appendChild(columna);
        }
        var btn = document.createElement("TD");
        btn.setAttribute("class","botonBorrar")
        btn.innerHTML = '<button onclick="eliminar(' + elementoCargado +')"> x </button>';
        fila.appendChild(btn);
        cantidad++;
        elementoCargado++;
        listaBolson.appendChild(fila);
    }
}
function vaciarResumen() {
    for (var i = 0; i < elementoCargado; i++) {
        var tr = document.getElementById("n" + i);
        if (tr != "null" && tr != undefined) {
            document.getElementById("resumen").removeChild(tr);
        }
    }
}
function eliminar(i) {
    var ultimo = document.getElementById("n" + i);
    var h = recorrerValor(i);
    var lb = document.getElementById("tablaResumen");
    lb.removeChild(ultimo);
    pesoT = acomodarPeso(pesoT, (parseFloat(datosEditables[i][3])), "restar");
    pesoTotalG = acomodarPeso(pesoTotalG, (parseFloat(datosEditables[i][3])), "restar");
    pesoEntradaG = acomodarPeso(pesoEntradaG, parseFloat(datosEditables[i][1]), "restar");
    pesoSalidaG = acomodarPeso(pesoSalidaG, parseFloat(datosEditables[i][2]), "restar");
    datoPesoE[h[0]] = acomodarPeso(datoPesoE[h[0]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoECanal[h[1]] = acomodarPeso(datoPesoECanal[h[1]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoS[h[0]] = acomodarPeso(datoPesoS[h[0]], parseFloat(datosEditables[i][2]), "restar");
    datoPesoSCanal[h[1]] = acomodarPeso(datoPesoSCanal[h[1]], parseFloat(datosEditables[i][2]), "restar");
    datoCanal[h[1]][1] = acomodarPeso(datoCanal[h[1]][1], parseFloat(datosEditables[i][3]), "restar");
    datoEtapas[h[0]][1] = acomodarPeso(datoEtapas[h[0]][1], parseFloat(datosEditables[i][3]), "restar");
    datoPeso[h[0]] = acomodarPeso(datoPeso[h[0]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoCanal[h[1]] = acomodarPeso(datoPesoCanal[h[1]], parseFloat(datosEditables[i][1]), "restar");
    if(datosEditables[i][15] > 1){
        cantidad =- datosEditables[i][13];
    } else{ 
        cantidad--;
    }
    cantidadCargas--;
    document.getElementById("cantidadMostrado").innerHTML = cantidadCargas;
    document.getElementById("pesoMostrado").innerHTML = (Math.round(pesoT * 100) / 100) + "KG";
    datosEditables[i] = null;
    cantidadCanal[h[1]]--;
    cantidadEtapa[h[0]]--;
}
function recorrerValor(i) {
    for (var j = 0; j < datoCanal.length; j++) {
        if (datoCanal[j][0] == datosEditables[i][10]) {
            for (var h = 0; h < datoEtapas.length; h++) {
                if (datoEtapas[h][0] == (datosEditables[i][7] + datosEditables[i][6])) {
                    return banderas = [datoEtapas[h][2], datoCanal[j][2]];
                }
            }
        }
    }
}
function asignarMetodo(valor) {
    return metodoDeCarga = valor;
}
function colocarMenu(array, ingreso, egreso) {
    var div = document.getElementById(ingreso);
    var divDos = document.getElementById(egreso);
    for (var i = 0; array.length >= (i + 1); i++) {
        var valor = array[i];
        var link = document.createElement('a');
        if (egreso != "") {
            var funcion = "user.conexionGoogle('" + valor + "');";
        } else {
            var funcion = "asignarMetodo('" + valor + "'); mostrarPantalla('carga');";
        }
        link.setAttribute('onclick', funcion);
        var imagen = document.createElement('img');
        imagen.setAttribute('class', 'botonIngreso');
        imagen.setAttribute('alt', ('"' + 'Boton del método ' + valor + '"'));
        imagen.setAttribute('src', 'http://carlitos.com.ar/DGREC/image/'+valor+'on'+'.png');
        imagen.setAttribute('onMouseOver','hacerHover("'+valor+'",this,"")');
        imagen.setAttribute('onMouseOut','hacerHover("'+valor+'",this,"on")');
        link.appendChild(imagen);
        if (valor != 'DESCARTE' && valor != 'VENTA') {
            div.appendChild(link);
        } else {
            divDos.appendChild(link);
        }
    }
}
function verificarCandado(){
    if(candado){
        var fechaC = document.getElementById("fecha");
        fechaC.value = fechaCandado;
        fechaC.disabled = true;
        document.getElementById("candado").innerHTML = '<img src="'+
        'http://carlitos.com.ar/DGREC/image/CANDADOtrue.png" alt="candado cerrado" style="width: 60px;">';
        fechaVer = true;
        document.getElementById("hora").focus();
    }
}
function hacerHover(metodo,casilla,valor){
    casilla.src = "http://carlitos.com.ar/DGREC/image/"+metodo+valor+".png";
}
function mostrarPantalla(pantalla) {
    switch (pantalla) {
        case "escritorio":
            document.getElementById("carga").style.display = "none";
            document.getElementById("ingreso-principal").style.display = "none";
            document.getElementById("elementos").style.display = "none";
            document.getElementById("botonIngresar").disabled = true;
        break;
        case "elementos":
            document.getElementById("escritorio").style.display = "none";
            document.getElementById("carga").style.display = "none";
        break;
        case "carga":
            document.getElementById("escritorio").style.display = "none";
            document.getElementById("elementos").style.display = "none";
            document.getElementById("camion").style.display = "block";
            botonParaClickear = "botonSeguir";
            verificarCandado();
            clickear();
        break;
    }
    document.getElementById(pantalla).style.display = "block";
}
function gestionarEtapas() {
    if (canal == "RD") {
        if (datosEtapas.length > 1) {
            var div = document.getElementById("etapaDiv");
            div.innerHTML = "";
            div.style.display = "block";
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
                    div.style.display = "block";
                    var opcion = document.createElement("OPTION");
                    input.appendChild(opcion);
                    opcion.innerHTML = datoSubEtapas[j][0];
                    opcion.setAttribute("value", datoSubEtapas[j][0]);
                }
            } else {
                var input = document.createElement("INPUT");
                input.setAttribute("id", "subetapa");
                input.setAttribute("type", "hidden");
                input.setAttribute("value", datoSubEtapas[0][1]);
            }
            div.appendChild(input);
        }
    }
}
function gestionarMetodos() {
    metodoDeCarga = [];
    for (var i = 0; i < canales.length; i++) {
        if (canal == canales[i]) {
            if (datosMetodos[i][0] == 2) {
                metodoDeCarga = [datosMetodos[i][1], datosMetodos[i][2]];
            } else {
                metodoDeCarga = datosMetodos[i][1];
            }
        }
    }
}
function colocarEscritorio() {
    mostrarPantalla("escritorio");
    colocarMenu(canales, 'divIngreso', 'divEgreso');
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
            pesoE = pesoM;
            pesoS = pesom;
            pesoC = pesoCM;
            break;
        case "egreso":
            pesoEntradaG = pesoEntradaG + pesom;
            pesoSalidaG = pesoSalidaG + pesoM;
            pesoE = pesom;
            pesoS = pesoM;
            pesoC = pesoCM;
    }
    return [pesoE, pesoS, pesoC, pesoM, pesom, pesoCM];
}
function acomodarPeso(peso, pesoASumar, restar) {
    var primero = parseFloat(peso);
    if (restar == "restar") {
        primero -= parseFloat(pesoASumar);
    } else {
        primero += parseFloat(pesoASumar);
    }
    return primero;
}
function scannerPeso(pesoR) {
    var peso = pesoR.toString();
    var pesoNuevo = "";
    for (var i = 0; peso.length > i; i++) {
        if (peso.charAt(i) == ".") {
            pesoNuevo += ",";
        } else { pesoNuevo += peso.charAt(i) }
    }
    return pesoNuevo;
}
function ejecutar(pesoMayor, pesoMenor) {
    var pesoFinal = (pesoMayor - pesoMenor);
    var array = [pesoFinal, (pesoFinal > 0)];
    return array;
}
function validacion(estado, texto, id) {
    var id = document.getElementById(id);
    if (estado) {
        id.style.display = " flex ";
        id.style.backgroundColor = "#04B404";
        id.innerHTML = texto;
    } else {
        id.style.display = " flex ";
        id.style.backgroundColor = "#FA5858";
        id.innerHTML = texto;
    }
}
function alertarCorreo(mensaje1,valor,id) {
    var nombreRe;
	var correo = "";
    var mensaje;
    var texto = "";
    var confirmacion = confirm(usuario + " " + mensaje1 + " ¿Desea continuar?");
    if(valor && confirmacion){
        mensaje = usuario + " por favor, ingrese Nombre y Apellido del Recuperador "+
        "que esta asociado al id "+id+" que intentas ingresar.";
        texto = "<p>" + usuario + " ha intentado cargar id " +
        "el cual genero un error de busquéda en la base de datos.</p>"+
        "<p>El id ingresado es: " + id + "</p>"+
        "<p>El nombre del Recuperado ingresado es: ";
        nombreRe = prompt(mensaje); 
        nombre = nombreRe;
        correo = texto+nombre;
        console.log(correo);
    } else if(!valor && confirmacion){
        mensaje = usuario + " por favor explique con detalle su motivo";
        correo = prompt(mensaje);
    }
    if (correo != "" && correo != null) { google.script.run.enviarCorreo(correo, cv); }
	return (confirmacion && correo && correo != "");
}
function recibirIngreso() {
    google.script.run.withSuccessHandler(function(e) {
        idIngreso = e;
    }).darIngreso();

}
function cargarCanales() {
    google.script.run.withSuccessHandler(function(o) {
        canalPorCv = o;
    }).darCanal(cv);
}
function recibirBolson() {
    google.script.run.withSuccessHandler(function(e) {
        idBolson = e;
    }).darBolson();
}
function limpiar() {
    document.getElementById("seccionEstadistica").innerHTML ="";
    document.getElementById("validadorMixto").innerHTML ="";
    document.getElementById("mixta").innerHTML = cargaMixta;
    document.getElementById("bolson").innerHTML = cargaDeContenido;
    document.getElementById("camion").innerHTML = cargaDeCamion;
    document.getElementById("elementos").innerHTML = cargaDeElementos;
    document.getElementById("cantidadMostrado").innerHTML = 0;
    document.getElementById("pesoMostrado").innerHTML = 0 + "KG";
    caracteristica = "", material = "", nombre = "", metodoDeCarga = "";
    etapa = "", subetapa = "", canal = "", canalPorCv = "";
    metodoParaCargar = undefined; metodoParaMixto = undefined; camion = undefined;
    elementoCargado = 0, idIngreso = 0, idBolson = 0; cantidadCargas = 0; banderaDeCargas = 0;
    pesoT = 0, pesoEntradaG = 0,pesoSalidaG = 0,cantidad = 0,pesoTotalG = 0;
    idVer = false,pesoVer = false,patenteVer = false,fechaVer = false,horaVer = false, 
    banderaMixto = false, banderaEgreso = false, rebote = false; reboteC = "";
    posicionCanal = 0,posicionEtapas = 0; posicionMaterial = 0;
    datoPeso = [],datoPesoE = [],datoPesoS = [];
    datoEtapas = [],datoCanal = [],datoMaterialM = [],datoCaracteristicaM = [];
    datoPesoCanal = [],datoPesoECanal = [],datoPesoSCanal = [];
    datoPesoMaterial = [],datoPesoEMaterial = [],datoPesoSMaterial = [],cantidadMaterial = [],
    datoPesoCara = [],datoPesoECara = [],datoPesoSCara = [],cantidadCara = [],posicionCara = [];cantidadCanal = [], cantidadEtapa = [];
    datosEditables = [],datoEditableFinal = [], listaDeID = [];
    datosCamion = [], datosBolson = [], datoComun = [];
    datoBolsonVieja = [],datoCamionVieja = []; 
    mostrarPantalla("escritorio");
    colocarTodoEnNone();
}
function colocarTodoEnNone(){
    var array = [
        document.getElementById("bolson"),
        document.getElementById("egreso"),
        document.getElementById("etapaDiv"),
        document.getElementById("subetapaDiv"),
        document.getElementById("materialDiv"),
        document.getElementById("caracteristicaDiv"),
        document.getElementById("elementos"),
        document.getElementById("carga"),
        document.getElementById("mixta"),
        document.getElementById("mostradorPeso"),    
        document.getElementById("mostradorCantidad")
    ];
    for(var i = 0; i < array.length; i++){
        if(array[i] != null){
            array[i].style.display = "none";
        }
    }
}

function repartirDatos() {
    //REPARTIR CANALES, METODOS Y BASE A VERIFICAR
    for (var a = 0; a < datoGeneral[6].length; a++) {
        if (datoGeneral[6][a][0] == cv) {
            canales.push(datoGeneral[7][a][0]);
            if (datoGeneral[8][a][0] == 2) {
                datosMetodos.push([datoGeneral[8][a][0], datoGeneral[9][a][0], datoGeneral[10][a][0]]);
            } else { datosMetodos.push([datoGeneral[8][a][0], datoGeneral[9][a][0]]); }
            baseVerificar[datoGeneral[7][a][0]] = (datoGeneral[11][a][0]);
        }
    }
    //BASE A VERIFICAR
    for (var b = 0; b < datoGeneral[12].length; b++) {
        if (datoGeneral[12][b][0] == cv) {
            datosEtapas.push(datoGeneral[13][b][0]);
            if (datoGeneral[14][b][0] != "null") { datoSubEtapas.push([datoGeneral[13][b][0], datoGeneral[14][b][0]]); }
            if (datoGeneral[15][b][0] != "null") { datoSubEtapas.push([datoGeneral[13][b][0], datoGeneral[15][b][0]]); }
            if (datoGeneral[16][b][0] != "null") { datoSubEtapas.push([datoGeneral[13][b][0], datoGeneral[16][b][0]]); }
            if (datoGeneral[17][b][0] != "null") { datoSubEtapas.push([datoGeneral[13][b][0], datoGeneral[17][b][0]]); }
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
        datoDelPesoPorMaterial = e[18];
        datoGeneral = e;
        document.getElementById("ingreso-principal").style.display = "block";
    }).darBaseDeDato();
}
function hacerRebote(patente,anio,mes,dia,turno){
    google.script.run.withSuccessHandler(function(e){
        rebote = e;
        return rebote;
    }).realizarRebote(patente,anio,(parseInt(mes)-1),dia,turno);
}
function hacerCandado(div){
    var fechaC = document.getElementById("fecha");
    if(candado){
        fechaC.value = "";
        fechaC.disabled = false;
        fechaCandado = "";
        candado = false;
        var tipo = "llamativo";
        fechaVer = false;
    } else if(fechaVer){
        fechaCandado = fechaC.value;
        fechaC.disabled = true;
        alert("Se han guardado valores de fecha, para cargas posteriores");
        candado = true;
        var tipo = "oscuro";
    }else{
        return alert("¡No puedes guardar valores de fecha, cuando estos esté vacios, o tiene error!")
    }
    div.innerHTML = '<img src="'+
    'http://carlitos.com.ar/DGREC/image/CANDADO'+candado+'.png" style="width: 60px;" alt="candado con respecto al guardado">';

}
function hacerMayuscula(div){
    return div.value = div.value.toUpperCase()
}
conectarGoogle();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCIONES DE JAVASCRIPT :D

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

/////////////////VARIABLES CON HTML//////////////////////////
var cargaDeCamion = ('<h1 class="tituloEscritorio cargaTitulo">Carga de datos: CAMIÓN</h1>'+
    '<div class="contenidoCarga">'+
    '<div id = "validadorCamion" class = "divValidacion"></div>'+
    '<div class="inputCamion">'+
    '<div>'+
    '<a id="candado" onclick="hacerCandado(this)"><img src="http://carlitos.com.ar/DGREC/image/CANDADOfalse.png" style="width: 60px;" alt=""></a>'+
    '</div>'+
    '<div>'+
    '<h3 class="tituloInput">Fecha</h3>'+
    '<input type="date"  name="fecha" id="fecha" class = "fecha" onblur ="user.verificarFecha();" autofocus><br>'+
    '</div>'+
    '<div>'+
    '<h3 class="tituloInput">Hora</h3>'+
    '<input type="time" name="hora" id="hora" value="00:00" class="hora" onblur ="user.verificarHora();">'+
    '</div>'+
    '<div>'+
    '<h3 class="tituloInput">Patente</h3>'+
    '<input type="text" name="patente" id="patente" class="patente" placeholder="AA123AA" maxlength = "7" title="Deberás ingresar valores de patente ejemplo: AA123AA ó AAA123" oninput="hacerMayuscula(this);" onblur ="user.verificarPatente();"><br>'+
    '</div>'+
    '</div>'+
    '<h3 class="tituloInput">Observación</h3>'+
    '<textarea type="text" class="observacion" name="observacion" id="observacion" oninput="hacerMayuscula(this);"></textarea><br>'+
    '<input type="hidden"  name="turno" id="turno" value="2">'+
    '<input type="hidden" name="ingreso" id="ingreso" value="Ingreso">'+
    '<button id="botonSeguir" class="botonCargar boton" name="btn1" onClick ="user.abrirMetodos()" disabled>Siguiente</button>'+
    '</div>');
var cargaDeContenido = ('<h1 class="tituloEscritorio cargaTitulo">Carga de datos:</h1>'+
    '<div class="mostrador" id="mostrador">'+
    '<div id="mostradorCantidad" class="contador">'+
    '<p>Cantidad:</p>'+
    '<p id="cantidadMostrado">0</p>'+
    '</div>'+
    '<div id="mostradorPeso" class="contador">'+
    '<p>Peso total:</p>'+
    '<p id="pesoMostrado">0,00</p>'+
    '</div><br><br>'+
    '</div>'+
    '<div class="contenidoCarga">'+
    '<div id ="validador" class = "divValidacion"></div>'+
    '<div class="seccionBolsonSelect">'+
    '<div id="etapaDiv">'+
    '<input id="etapa" type="hidden" name="etapa" onblur="gestionarSubEtapa()"><br>'+
    '</div>'+
    '<div id="subetapaDiv">'+
    '<input id="subetapa" type="hidden" name="subEtapa"><br>'+
    '</div>  '+
    '<div id="materialDiv">'+
    '<input id="material" type="hidden" name="material">'+
    '</div>'+
    '<div id="caracteristicaDiv">'+
    '<input type="hidden"  id="caracteristica" name="caracteristica">'+
    '</div>'+
    '</div>'+
    '<br>'+
    '<div class="seccionBolson" id="datosParaAgregar">'+
    '<!-- FIJAR QUE ES LO QUE NECESITA CAMBIAR PARA VERIFICAR NOMBRE E ID-->'+
    '<input type="hidden" name="NOMBRERD" id="nombre" placeholder = "Nombre del recolector">'+
    '<input type="hidden" name="IDRD" id="id" min = "1" max ="4" placeholder = "ID del recolector">'+
    '<input type="hidden" name="peso" id="pesoEntrada" placeholder = "Peso de entrada(KG)" oninput="user.verificarPeso(); cambiarBoton(); clickear();" value="0">'+
    '<input type="hidden" name="cantidad" id="cantidad" placeholder = "Cantidad" value="0" >'+
    '<input type="hidden" name="peso" id="pesoSalida" placeholder = "Peso de Salida(KG)" oninput="user.verificarPeso(); cambiarBoton(); clickear();" value="0">'+
    '<input type="hidden" name="peso" id="pesoUnitario" placeholder = "Peso Unitario(KG)" oninput="user.verificarPeso(); cambiarBoton(); clickear();" value="0">'+
    '<button id="botonCargar" class="boton botonCargar" name="btn1" onClick="metodoParaCargar.cargar();" disabled>Cargar</button>'+
    '</div>'+
    '<div class="seccionBolson">'+
    '<table id="tablaResumen">'+
    '</table>'+
    '<button disabled id="botonEnviar" class="boton botonCargar" name="btn1" onClick="metodoParaCargar.enviar()">Enviar</button>'+
    '<button disabled id="botonContinuar" class="boton botonCargar" name="btn1" onClick="metodoParaMixto.continuar()">Continuar</button>'+
    '</div>'+
    '</div>');
var cargaDeElementos = ('<div>'+
    '<div class="caja">'+
    '<div id="divIngresoE">'+
    '<h1 class="tituloEscritorio">Seleccione el método de carga</h1>'+
    '</div>'+
    '</div>'+
    '</div>');
var cargaMixta = ('<h1 class="tituloEscritorio cargaTitulo">Seleccione canal de Recolección</h1>'+
    '<div id="seccionEstadistica" class="seccionEstadistica">'+
    '</div>'+
    '<div id="validadorMixto" class="mostradorPeso">'+
    '</div>'+
    '<div class="contenidoCarga">'+
    '<div id="imagenMixto" class="cajaMixta">'+
    '</div>'+
    '<button id="botonEnviarMixto" disabled class="boton" name="btn1" onClick="metodoParaMixto.enviar()">Enviar</button>'+
    '</div>');
var tablaMC = ('<tr>'+
'<td>Material</td>'+
'<td>Caracteristica</td>'+
'<td>Peso</td>'+
'</tr>');
var tablaM = ('<tr>'+
'<td>Material</td>'+
'<td>Peso</td>'+
'</tr>');
var tablaB = ('<tr>'+
'<td>ID</td>'+
'<td>NOMBRE</td>'+
'<td>PESO</td>'+
'</tr>');
var tablaBN = ('<tr>'+
'<td>NOMBRE</td>'+
'<td>PESO</td>'+
'</tr>');