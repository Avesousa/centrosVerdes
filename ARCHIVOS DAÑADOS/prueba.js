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
var elementoCargado = 0;
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
var banderamacar = false;
var botonParaClickear = "botonIngresar";
var cargaDeCamion = ('<div class="cargaDeDatos">'+
'<!-- Titulo -->'+
'<div class="tituloDeCargas">'+
'  <h1>Datos del camión</h1>'+
'</div>'+
'<div class="cajaDeInput">'+
'<div id = "validadorCamion" class = "divValidacion"></div>'+
'<div style="width: 100%;">'+
'  <h3>Fecha</h3>'+
'  <input type="date"  name="fecha" id="fecha" class = "fecha" onblur ="user.verificarFecha();" autofocus><br>'+
'</div>'+
'  <!-- FORMULARIO: HORA-->'+
'<div>'+
'  <h3>Hora</h3>'+
'  <input type="time" name="hora" id="hora" value="00:00" class="hora" onblur ="user.verificarHora();">'+
'</div>'+
'<!-- FORMULARIO: TURNO-->'+
'<div>'+
'<h3>Patente</h3>'+
'<input type="text" name="patente" id="patente" class="patente" placeholder="AA123AA" maxlength = "7" title="Deberás ingresar valores de patente ejemplo: AA123AA ó AAA123" onblur ="user.verificarPatente();"><br>'+
'</div><br>'+
'<h3>Observación</h3>'+
'<textarea type="text" name="observacion" id="observacion"></textarea><br>'+
'<!-- Datos por default-->'+
'<input type="hidden"  name="turno" id="turno" value="2">'+
'<input type="hidden" name="ingreso" id="ingreso" value="Ingreso">'+
'<button id="botonSeguir" class="efecto botongra" name="btn1" onClick ="user.abrirMetodos()" disabled>Siguiente</button>'+
'</div>'+
'</div>');
var cargaDeContenido = ('<div class="cargaDeDatos">'+
'  <div class="tituloDeCargas">'+
'    <h1>Cargas</h1>'+
'  </div>'+
'  <div class="cajaDeInput">'+
'      <div id ="validador" class = "divValidacion"></div>'+
'      <div id="etapaDiv"><input id="etapa" type="hidden" name="etapa" onblur="gestionarSubEtapa()"><br></div>'+
'      <div id="subetapaDiv"><input id="subetapa" type="hidden" name="subEtapa"><br></div>  '+
'      <div id="materialDiv"><input id="material" type="hidden" name="material"></div>'+
'      <div id="caracteristicaDiv"><input type="hidden"  id="caracteristica" name="caracteristica"></div>'+
'      <!-- FIJAR QUE ES LO QUE NECESITA CAMBIAR PARA VERIFICAR NOMBRE E ID-->'+
'      <input type="hidden" name="NOMBRERD" id="nombre" placeholder = "Nombre del recolector">'+
'      <input type="hidden" name="IDRD" id="id" min = "1" max ="4" placeholder = "ID del recolector">'+
'      <input type="hidden" name="peso" id="pesoEntrada" placeholder = "Peso de bolsón" oninput="user.verificarPeso();" value="0">'+
'      <input type="hidden" name="cantidad" id="cantidad" placeholder = "Cantidad de caracteristica" value="0">'+
'      <input type="hidden" name="peso" id="pesoSalida" placeholder = "Peso de Salida" oninput="user.verificarPeso();" value="0">'+
'      <input type="hidden" name="peso" id="pesoUnitario" placeholder = "Peso Unitario" oninput="user.verificarPeso();" value="0">'+
'      <!-- DATOS POR DEFAULT-->'+
'      <button id="botonCargar" class="efecto botongra" name="btn1" onClick="metodoParaCargar.cargar();" disabled>Cargar</button>'+
'  <div class="resumenBolson">'+
'    <table id="resumen">'+
'    <tr id="tablabolson">'+
'      <th>ID</th>'+
'      <th>Nombre</th>'+
'      <th>Peso</th>'+
'    </tr>'+
'    <tr id="tablapesomaterial">'+
'      <th>Material</th>'+
'      <th>Caracteristica</th>'+
'      <th>Peso</th>'+
'    </tr>'+
'    </table> '+
'    <button disabled id="botonEnviar" class="efecto botongra" name="btn1" onClick="metodoParaCargar.enviar()">Enviar</button>'+
'    <button disabled id="botonContinuar" class="efecto botongra" name="btn1" onClick="metodoParaMixto.continuar()" style="display:none">Continuar</button>'+
'    </div>'+
'  </div>'+
'</div>'+ 
'</div>');
var cargaDeElementos = '<div class="contenedor">'+
'<div class="cajaDeInput">'+
'  <div class="tipoDeDato" id="divIngresoE">'+
'    <h3>Ingreso</h3>'+
'  </div>'+
'</div>'+
'</div>';
var cargaMixta = '<div class="contenedor" id="mixta">'+
'<div class="cargaDeDatos">'+
'  <div class="tituloDeCargas">'+
'    <h1>Selecciona el canal de recolección</h1>'+
'  </div>'+
'  <div id="imagenMixto" class="cajaDeInput">'+
'  </div>'+
'  <button id="botonEnviarMixto" disabled class="efecto botongra" name="btn1" onClick="metodoParaMixto.enviar()">Enviar</button>'+
'</div> '+
'</div>  '
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
                    document.getElementById("bolson").style.display = "inline";
                    document.getElementById("mixta").style.display = "none";
                    user.abrirMetodos();
                }
            }
        }
        //Abre los metodos según el centro verde que opera
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
                case "entradaSalida":
                    var objeto = new entradaSalida();
                    objeto.alerta();
                    break;
                case "mixta":
                    metodoParaMixto = new mixta();
                    camion = new Camion();
                    metodoParaMixto.abrir();
                    break;
                default:
                    alert("No consiguió un método para ejecutar");
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
                return validacion(false, "<p>El ID ingresado no está asociado en la base de datos.</p>", "validador");
            }
        }
        //Verificar el peso :D
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
                    banderaPeso = (pesoVe[0] > 0 && pesoVe[0] != "" && 150 >= pesoVe[0]);
                    break;
                case ("DESCARTE"):
                    if (pesoSalida == "") { return boton.disabled = true; }
                    banderaPeso = (pesoEg[0] > 0 && (pesoEntrada != ""));
                    idVer = true;
                    break;
                case ("VENTA"):
                    if (pesoSalida == "") { return boton.disabled = true; }
                    banderaPeso = (pesoEg[0] > 0 && (pesoEntrada != ""));
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

        }
        //Verificar la hora D:
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
        }
        //Verificar la patente :D
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
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        definirBanderas();
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
        document.getElementById("botonEnviar").style.display = "inline";
        document.getElementById("botonContinuar").style.display = "none";
        document.getElementById("botonContinuar").disabled = true;
        document.getElementById("botonEnviar").disabled = true;
        document.getElementById("botonEnviarMixto").disabled = true;
        limpiar();
    }

    cargar(esOnoBolson) {
        etapa = document.getElementById("etapa").value;
        subetapa = document.getElementById("subetapa").value;
        caracteristica = document.getElementById("caracteristica").value;
        material = document.getElementById("material").value;
        document.getElementById("botonEnviar").disabled = false;
        document.getElementById("botonContinuar").disabled = false;
        crearResumen("resumen", this.informacion);
        var etapaConcatenada = etapa + subetapa;
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
        this.mixta.style.display = "inline";
        this.carga.style.display = "none";
        var link = document.getElementById(canal);
        var img = document.getElementById("imagen" + canal);
        link.onclick = "";
        img.src = "http://carlitos.com.ar/DGREC/image/raoscuro.png"; //'"http://carlitos.com.ar/DGREC/image/'+canal+'.png"');
        document.getElementById("botonEnviarMixto").disabled = false;
        vaciarResumen();
    }

    mostrarCanales() {
        metodoParaMixto.agregarMenu(canales);
    }

    agregarMenu(array) {
    
        var div = document.getElementById("imagenMixto");
        for (var i = 0; array.length >= (1 + i); i++) {
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
                imagen.setAttribute('src', 'http://carlitos.com.ar/DGREC/image/rallamativo.png'); //'"http://carlitos.com.ar/DGREC/image/'+array[i][0]+'.png"');
                link.appendChild(imagen);
                div.appendChild(link);
            }
        }
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
        var caracteristicaR = document.getElementById("caracteristicaF").value;
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
        var valorParticipacion = "";
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        var participacion = crearParticipacion();
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        if (participacion[0] == "") { valorCanal = canal; valorParticipacion = "N/A";} else { valorCanal = participacion[0];valorParticipacion += participacion[0];}
        if (participacion[1] == "") {valorEtapa = "N/A";valorSub = "N/A"; valorParticipacion = "N/A";
        } else {valorEtapa = participacion[1];valorSub = participacion[1]; valorParticipacion += participacion[1]}
        if (participacion[2] == "") { valorMaterial = material; valorParticipacion = "N/A"; } else { valorMaterial = participacion[4];valorParticipacion += participacion[2]; }
        if (participacion[3] == "") { valorCaracteristica = caracteristica; valorParticipacion = "N/A";} else { valorCaracteristica = participacion[5];valorParticipacion += participacion[3]; }
        datosCamion.push([this.tipoCamion[0], usuario, fechaActual, idIngreso, coop, cv,
            this.fecha, this.anio, this.mes, this.dia, this.turno, this.hora, this.ingreso,
            this.patente, valorCanal, valorMaterial, valorCaracteristica, cantidad,
            dato[0][6], scannerPeso(pesoEntradaG), scannerPeso(pesoSalidaG), scannerPeso(pesoTotalG), valorParticipacion,
            this.observacion, valorEtapa, valorSub, dato[0][0],
            dato[0][0], dato[0][0], dato[0][0]
        ]);
    }
    crearCamionParticipativo() {
        console.log("*********************CREAR CAMION PARTICIPATIVO************************");
        var fechaHoy = new Date();
        var fechaA = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear());
        var horaA = (fechaHoy.getHours() + ":" + fechaHoy.getMinutes());
        var fechaActual = (fechaA + " " + horaA);
        var dato = datoEditableFinal.filter(elemento => elemento != null);
        if(banderamacar){
            var datoEditable = datosEditables.filter(elemento => elemento != null);
        }
        console.log("-----------------DATOS IMPORTANTES DE CAMION PARTICIPATIVO ------------------------");
        console.log(dato);
        console.log(datoMaterialM);
        console.log(datoCaracteristicaM);
        console.log(datoPesoEMaterial + " datoPesoEMaterial");
        console.log(datoPesoSMaterial + " datoPesoSMaterial");
        console.log(datoPesoMaterial + " datoPesoMaterial");
        console.log(datoPesoECara + " datoPesoECara");
        console.log(datoPesoSCara + " datoPesoSCara");
        console.log(datoPesoCara + " datoPesoCara");
        console.log("-----------------DATOS IMPORTANTES DE CAMION PARTICIPATIVO ------------------------");
        for (var i = 0; i < dato.length; i++) {
            switch (dato[i][8]) {
                case "canal":
                    ayudador(datoPesoECanal,datoPesoSCanal,datoPesoCanal,datoCanal,dato[i],5,10,datoEditable,fechaActual);
                    break;
                case "etapa":
                    ayudador(datoPesoE,datoPesoS,datoEtapas,datoPeso,dato[i],4,10,datoEditable,fechaActual,7,6);
                    break;
                case "material":
                console.log("ENTRO MATERIAL");
                    ayudador(datoPesoEMaterial,datoPesoSMaterial,datoPesoMaterial,datoMaterialM,dato[i],2,5,datoEditable,fechaActual);
                    console.log(datosCamion);
                    console.log(datoComun);
                    break;
                case "caracteristica":
                console.log("ENTRO CARACTERISTICA");
                    ayudador(datoPesoECara,datoPesoSCara,datoPesoCara,datoCaracteristicaM,dato[i],1,4,datoEditable,fechaActual);
                    console.log(datosCamion);
                    console.log(datoComun);
                    break;
            }
            console.log("+++++++datocomun++++++++++");
            console.log(datoComun);
            console.log("+++++++datocomun++++++++++");
        }
        console.log("*********************SALIO DE CAMION PARTICIPATIVO************************");

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
function definirBanderas(){
    for(var i = 0; i < datoEditableFinal.length; i++){
        if(datoEditableFinal[i][8] != datoEditableFinal[i+1][8]){
            return banderamacar = true;
        }
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
    } else if(!porCanal && !porEtapa && !porMaterial && !porCara){
        datoEditableFinal.push(["N/A", caracteristica, material,
            subetapad, etapad, canal, pesoun, cantidad, (datoEditableFinal[datoEditableFinal.length-1][8])
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
    console.log("**************** CREAR PARTICIPACION *****************************");
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
        console.log(datoComun);
        console.log(datoMaterialM);
        console.log(datoCaracteristicaM);
        switch (datoComun[i][4]) {
            case "canal":
                var r = ayudarACrearParticipacion(datoComun[i][0],datoCanal,banderaCanal,resultadoCanal);
                banderaCanal = r[1];
                resultadoCanal = r[0];
                break;
            case "etapa":
                if (datoComun[i][1] != "N/A") { var conca = datoComun[i][1] + datoComun[i][2]; } else { var onca = "" };
                var r = ayudarACrearParticipacion(conca,datoEtapas,banderaEtapa,resultadoEtapa);
                banderaEtapa = r[1];
                resultadoEtapa = r[0];
                break;
            case "caracteristica":
                var r = ayudarACrearParticipacion(datoComun[i][5],datoCaracteristicaM,banderaCara,resultadoCara);
                banderaEtapa = r[1];
                resultadoEtapa = r[0];
                resultadoCaraReducido = "VARIOS-COMPUESTO";
                break;
            case "material":
                var r = ayudarACrearParticipacion(datoComun[i][6],datoMaterialM,banderaMaterial,resultadoMaterial);
                banderaEtapa = r[1];
                resultadoEtapa = r[0];
                resultadoMaterialReducido = "MIXTO-COMPUESTO";
                break;
        }
    }
    console.log("************* SALIDA DE CREAR PARTICIPACIÓN ***********************");
    console.log(resultadoMaterial);
    console.log(resultadoMaterial);
    return [resultadoCanal,resultadoEtapa,resultadoMaterial,resultadoCara,
            resultadoMaterialReducido,resultadoCaraReducido];
}

function ayudarACrearParticipacion(valor,array,bandera,resultadoAnterior){
    var resultado = "";
    for(var i = 0; array.length > i; i++){
        if(valor == array[i][0]){
            if(!bandera){
                resultado = (valor + array[i][1]);
                bandera = true;
                return [resultado,bandera]
            } else {
                resultado = resultadoAnterior + ('-' + valor + array[i][1]);
                return [resultado,bandera];
            }
        }
    }

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

function pesoPorCanal(peso, pesoEntrada, pesoSalida) {
    var bandera = true;
    for (var i = 0; i < datoCanal.length; i++) {
        if (datoCanal[i][0] == canal) {
            datoPesoCanal[i] = parseFloat(datoPesoCanal[i]) + peso;
            datoPesoECanal[i] = parseFloat(datoPesoECanal[i]) + pesoEntrada;
            datoPesoSCanal[i] = parseFloat(datoPesoSCanal[i]) + pesoSalida;
            datoCanal[i][1] = parseFloat(datoCanal[i][1]) + peso;
            cantidadCanal[i] = (cantidadCanal[i] + 1);
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
    return bandera;

}

function pesoPorMaterial(peso, pesoEntrada, pesoSalida) {
    var bandera = true;
    for (var i = 0; i < datoMaterialM.length; i++) {
        if (datoMaterialM[i][0] == material) {
            datoPesoMaterial[i] = parseFloat(datoPesoMaterial[i]) + peso;
            datoPesoEMaterial[i] = parseFloat(datoPesoEMaterial[i]) + pesoEntrada;
            datoPesoSMaterial[i] = parseFloat(datoPesoSMaterial[i]) + pesoSalida;
            datoMaterialM[i][1] = parseFloat(datoMaterialM[i][1]) + peso;
            cantidadMaterial[i] = (cantidadMaterial[i] + 1);
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
    return bandera;

}

function pesoPorCaracteristica(peso, pesoEntrada, pesoSalida) {
    var bandera = true;
    for (var i = 0; i < datoCaracteristicaM.length; i++) {
        if (datoCaracteristicaM[i][0] == caracteristica) {
            datoPesoCara[i] = parseFloat(datoPesoCara[i]) + peso;
            datoPesoECara[i] = parseFloat(datoPesoECara[i]) + pesoEntrada;
            datoPesoSCara[i] = parseFloat(datoPesoSCara[i]) + pesoSalida;
            datoCaracteristicaM[i][1] = parseFloat(datoCaracteristicaM[i][1]) + peso;
            cantidadCara[i] = (cantidadCara[i] + 1);
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
    return bandera;

}

function pesoPorEtapa(etapa, peso, pesoEntrada, pesoSalida) {
    var bandera = true;
    for (var i = 0; i < datoEtapas.length; i++) {
        if (etapa == datoEtapas[i][0]) {
            datoPeso[i] = parseFloat(datoPeso[i]) + peso;
            datoPesoE[i] = parseFloat(datoPesoE[i]) + pesoEntrada;
            datoPesoS[i] = parseFloat(datoPesoS[i]) + pesoSalida;
            datoEtapas[i][1] = parseFloat(datoEtapas[i][1]) + peso;
            cantidadEtapa[i] = (cantidadEtapa[i] + 1);
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
    return bandera;

}

function crearResumen(resumen, datosextras) {
    var lista = document.getElementById(resumen);
    var fila = document.createElement("TR");
    fila.setAttribute("id", ("n" + elementoCargado));
    for (var indices = 0; datosextras.length > indices; indices++) {
        var columna = document.createElement("TD");
        var textColumna = document.createTextNode(datosextras[indices]);
        columna.appendChild(textColumna);
        fila.appendChild(columna);
    }
    var btn = document.createElement("TD");
    btn.innerHTML = '<button onclick="eliminar(' + elementoCargado + ',' + resumen + ')"> x </button>';
    fila.appendChild(btn);
    lista.appendChild(fila);
    cantidad++;
    elementoCargado++;
}

function vaciarResumen() {
    for (var i = 0; i < elementoCargado; i++) {
        var tr = document.getElementById("n" + i);
        if (tr != "null" && tr != undefined) {
            document.getElementById("resumen").removeChild(tr);
        }
    }
}

function eliminar(i, resumen) {
    var ultimo = document.getElementById("n" + i);
    var h = recorrerValor(i);
    resumen.removeChild(ultimo);
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
    datoPeso[h[0]] = acomodarPeso(datoPeso[h[0]], parseFloat(datosEditables[i][1]), "restar");
    datoPesoCanal[h[1]] = acomodarPeso(datoPesoCanal[h[1]], parseFloat(datosEditables[i][1]), "restar");
    datosEditables[i] = null;
    cantidadCanal[h[1]]--;
    cantidadEtapa[h[0]]--;
    cantidad--;
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
        imagen.setAttribute('src', 'http://carlitos.com.ar/DGREC/image/rallamativo.png'); //'"http://carlitos.com.ar/DGREC/image/'+array[i][0]+'.png"');
        link.appendChild(imagen);
        if (valor != 'DESCARTE' && valor != 'VENTA') {
            div.appendChild(link);
        } else {
            divDos.appendChild(link);
        }
    }
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
            document.getElementById("camion").style.display = "inline";
            botonParaClickear = "botonSeguir";
            clickear();
        break;
    }
    document.getElementById(pantalla).style.display = "inline";
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
                    div.style.display = "inline";
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
    google.script.run.withSuccessHandler(function(o) {
        canalPorCv = o;
    }).darCanal(cv);
}

function recibirBolson() {
    google.script.run.withSuccessHandler(function(e) {
        idBolson = e;
    }).darBolson();
}

function ayudador(apesoE,apesoS,apeso,array,compuesto,n,nc,datoEditable,fecha,no,nco){
    console.log("*********ENTRO A AYUDADOR************");
    console.log("compuesto");
    console.log(compuesto);
    console.log(datoEditable);
    var pesoE,pesoS, peso;
    var razon = compuesto[n];
    var finalDato = datoEditableFinal.filter(elemento => elemento != null);
    if(no != undefined){
        razon = compuesto[n] + compuesto[no];
    }
    for(var i = 0; array.length > i; i++ ){
        if(razon == array[i][0]){
            if(datoEditable != undefined){
                for(var j = 0; j < datoEditable.length; j++){
                    pesoE = datoEditable[j][1];
                    pesoS = datoEditable[j][2];
                    if(pesoE > pesoS){
                        peso = pesoE-pesoS;
                    } else {
                        peso = pesoS-pesoE;
                    }
                    for(var h = 0; h < datosCamion.length; h++){
                        finalRazon = datosCamion[h][nc];
                        if(nco != undefined){finalRazon = datosCamion[h][nc] + datosCamion[h][nco]}
                        if(finalRazon == array[i][0]){
                            datosCamion[h][19] += pesoE;
                            datosCamion[h][20] += pesoS;
                            datoComun[h][4] += peso;
                            return datosCamion[h][21] += peso;
                        } 
                    }
                }
                
            } else{
                pesoE = scannerPeso(apesoE[i]);
                pesoS = scannerPeso(apesoS[i]);
                peso = scannerPeso(apeso[i]);
            }
            datoComun.push([finalDato[i][5], finalDato[i][4],
            finalDato[i][3], peso, finalDato[i][8], finalDato[i][1], finalDato[i][2]
            ]);
            console.log("**********SALIO DEL AYUDADOR****************");
            return datosCamion.push([camion.tipoCamion[1], usuario, fecha, idIngreso, coop, cv,
            camion.fecha, camion.anio, camion.mes, camion.dia, camion.turno, camion.hora, camion.ingreso,
            camion.patente, finalDato[5], finalDato[2], finalDato[1],
            finalDato[7], finalDato[6], pesoE, pesoS, peso, scannerPeso(pesoTotalG),
            camion.observacion, finalDato[4], finalDato[3], finalDato[0],
            finalDato[0], finalDato[0], finalDato[0]
            ]);
        }
    }
}

function limpiar() {
    document.getElementById("elementos").style.display = "none";
    document.getElementById("carga").style.display = "none";
    document.getElementById("mixta").style.display = "none";
    document.getElementById("mixta").innerHTML = cargaMixta;
    document.getElementById("bolson").innerHTML = cargaDeContenido;
    document.getElementById("camion").innerHTML = cargaDeCamion;
    document.getElementById("elementos").innerHTML = cargaDeElementos;
    caracteristica = "", material = "", nombre = "", metodoDeCarga = "";
    etapa = "", subetapa = "", canal = "", canalPorCv = "";
    metodoParaCargar = undefined; metodoParaMixto = undefined; camion = undefined;
    elementoCargado = 0, idIngreso = 0, idBolson = 0;
    pesoT = 0, pesoEntradaG = 0,pesoSalidaG = 0,cantidad = 0,pesoTotalG = 0;
    idVer = false,pesoVer = false,patenteVer = false,fechaVer = false,horaVer = false, banderaEgreso = false;
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
        document.getElementById("tablapesomaterial"),
        document.getElementById("tablabolson"),
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
        datoGeneral = e;
        document.getElementById("ingreso-principal").style.display = "inline";
        console.log(datoNombres);
        console.log(datoClaves);
        console.log(datoCV);
        console.log(datoCOOP);
        console.log(datoMaterial);
        console.log(datoCaracteristica);
        console.log(datoGeneral);
    }).darBaseDeDato();
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
