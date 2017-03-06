var formElement=null;


var respCorrecta=null;
var respCorrecta1=null;

var resRadio=null;
var resRadio1=null;

var respuestaSelect=null;
var respuestaSelect1=null;
 
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    corregirText();
	corregirText1();
    corregirSelect();
	corregirSelect1();
    corregirCheckbox();
	corregirCheckbox1();
    presentarNota();
   }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/Andres1985/Examen/master/Preguntas_XML.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //Text
 //Recuperamos el título y la respuesta correcta de Input, guardamos la respuesta correcta
 var tituloInput=xmlDoc.getElementsByTagName("text")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 respCorrecta=xmlDoc.getElementsByTagName("answer")[0].innerHTML;
 
 //Text1
 //Recuperamos el título y la respuesta correcta de Input, guardamos la respuesta correcta
 var tituloInput1=xmlDoc.getElementsByTagName("text")[1].innerHTML;
 ponerDatosInputHtml1(tituloInput1);
 respCorrecta1= xmlDoc.getElementsByTagName("answer")[1].innerHTML;
 
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("text")[2].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("3").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("3").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);
 
 //SELECT1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect1=xmlDoc.getElementsByTagName("text")[3].innerHTML;
 var opcionesSelect1 = [];
 var nopt = xmlDoc.getElementById("4").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesSelect1[i] = xmlDoc.getElementById("4").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect1,opcionesSelect1);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);
 
 
 //multiple
 var tituloLabel=xmlDoc.getElementsByTagName("text")[4].innerHTML;
 var opcionesLabel = [];
 nopt = xmlDoc.getElementById("5").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesLabel[i] = xmlDoc.getElementById("5").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosLabelHtml(tituloLabel,opcionesLabel);
 respuestaLabel=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
 
 //Radio
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementsByTagName("text")[6].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("7").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("7").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioHtml(tituloRadio,opcionesRadio);
resRadio = xmlDoc.getElementById("7").getElementsByTagName('answer').length;
 
 //Radio1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio1 = xmlDoc.getElementsByTagName("text")[7].innerHTML;
 var opcionesRadio1 = [];
 var nopt1 = xmlDoc.getElementById("8").getElementsByTagName('option').length;
 for (i = 0; i < nopt1; i++) { 
    opcionesRadio1[i]=xmlDoc.getElementById("8").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioHtml1(tituloRadio1,opcionesRadio1);
resRadio1 = xmlDoc.getElementById("8").getElementsByTagName('answer').length;


 
 
 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("text")[8].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("9").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("9").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("9").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("9").getElementsByTagName("answer")[i].innerHTML;
 }


 //CHECKBOX
var tituloCheckbox1 = xmlDoc.getElementsByTagName("text")[9].innerHTML;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("10").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("10").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox1,opcionesCheckbox1);
 var nres = xmlDoc.getElementById("10").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
   respuestasCheckbox1[i]=xmlDoc.getElementById("10").getElementsByTagName("answer")[i].innerHTML;
 }
 
  
 
 
 
}



//****************************************************************************************************
//implementación de la corrección
//corregir text
function corregirText(){
  var text = document.getElementById("num").getElementsByTagName("input")[0].value;
  if (text==respCorrecta)
  {
    darRespuestaHtml("Pregunta 1: <b>Correcto!</b>");
    nota +=1;
  }
  else
  {
   darRespuestaHtml("Pregunta 1:: <b>Respuesta incorrecta</b>");
   
  }
}

function corregirText1(){
  var text = document.getElementById("num1").getElementsByTagName("input")[1].value;
  if (text==respCorrecta1)
  {
    darRespuestaHtml("Nº 2: <b>Correcto!</b>");
    nota +=1;
  }
  else
  {
  darRespuestaHtml("Nº 2: <b>Respuesta incorrecta</b>");
    
  }
}//Fin Text


//Corregir Select
function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Nº 3: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Nº 3: Incorrecto");
}

function corregirSelect1(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel1 = formElement.elements[2];  
  if (sel1.selectedIndex-1==respuestaSelect1) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Nº 4: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Nº 4: Incorrecto");
}//Fin de select

//Corregir Radio
function corregirRadio()
{
  var r=null;
  var opt = document.getElementById("radioDiv").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==resRadio) {darRespuestaHtml("Nº 5: <b>Correcto!</b>"); nota +=1;}
  else {darRespuestaHtml("Nº 5: <b>Respuesta incorrecta</b>");}
}

function corregirRadio1()
{
  var r=null;
  var opt = document.getElementById("radioDiv1").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==resRadio1) {darRespuestaHtml("Nº 5: <b>Correcto!</b>"); nota +=1;}
  else {darRespuestaHtml("Nº 5: <b>Respuesta incorrecta</b>");}
}

//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P7: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P7: "+i+" incorrecta");
    }   
   } 
  }
}

function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P8: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P8: "+i+" incorrecta");
    }   
   } 
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}

function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}

//Select
function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//Label
function ponerDatosLabelHtml(t,opt){
	document.getElementById("tituloLabel").innerHTML=t;
  var select = document.getElementsByTagName("label")[0];
 for (i = 0; i < opt.length; i++)
  { 
    option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
  }  
} 



//Radio
function ponerDatosRadioHtml(t,opt){
 var radioContainer=document.getElementById('radioDiv');
 document.getElementById('tituloRadio').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
	radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosRadioHtml1(t,opt){
 var radioContainer1=document.getElementById('radioDiv1');
 document.getElementById('tituloRadio1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
	radioContainer1.appendChild(input);
    radioContainer1.appendChild(label);
    radioContainer1.appendChild(document.createElement("br"));
 }  
}

//Checkbox
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer1=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer1.appendChild(input);
    checkboxContainer1.appendChild(label);
    checkboxContainer1.appendChild(document.createElement("br"));
 }  
}//Fin de 

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 3");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Responde la primera respuesta");
    return false;
   } else  if (f.elements[1].value=="") {
    f.elements[1].focus();
    alert("Responde la segunda pregunta");
    return false;
   } else if (f.elements[2].selectedIndex==0) {
    f.elements[2].focus();
    alert("Selecciona una opción");
    return false;
   }  else if (f.elements[3].selectedIndex==0) {
    f.elements[3].focus();
    alert("Selecciona una opción");
    return false;
   } else if (f.elements[6]==0) {    
    f.elements[6].focus();
    alert("Selecciona una opción del Radio");
    return false;
   } else if (f.elements[7]==0) {    
    f.elements[7].focus();
    alert("Selecciona una opción del Radio");
    return false;
   } else  if (!checked) {    
    document.getElementsByTagName("h3")[8].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else if (!checked) {    
    document.getElementsByTagName("h3")[9].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;
}
