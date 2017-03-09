var formElement=null;

//Las variables de las respuestas Select
var respuestaSelect=null;
var respuestaSelect1=null;

//Las variables de las respuestas Radio tipo Array[]
var respuestasRadio=[];
var respuestasRadio1=[];

//Las variables de las respuestas texto
var text1 = null;
var text2 = null;

//Las variables de las respuestas Multiple[]
var respuestaMultiple = [];
var respuestaMultiple1 = [];

//Las variables de las respuestas Checkbox
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];

//Variable para saber la puntuacion conseguida en el test
var nota = 0;

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 



 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   
   inicializar();
   //Funciones para corregir las respuestas Text
   corregirText();
   corregirText1();
   
    //Funciones para corregir las respuestas checkbox
   corregirCheckbox(); 
   corregirCheckbox1()
   
   //Funciones para corregir las respuestas select
   corregirSelect();
   corregirSelect1();

   //Funciones para corregir las respuestas select
   corregirRadio();
   corregirRadio1();
  
  //Funciones para corregir las respuestas Multiple
   corregirMultiple();
   corregirMultiple1();
  
//Funcion para presentar la nota final
  presentarNota();
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/Andres1985/Examen/master/xml/Preguntas_XML.xml", true); //la ruta donde se encuentra el archivo.xml
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 
 //Pregunta TEXT 1
 //Recuperamos el título y la respuesta correcta de Input.
 var tituloSelect=xmlDoc.getElementById("1").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(tituloSelect); //llamamos al metodo  ponerDatosInputHtml() 
 text1=xmlDoc.getElementById('1').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 
  //Pregunta TEXT 2
 //Recuperamos el título y la respuesta correcta de Input.
 var tituloSelect=xmlDoc.getElementById("2").getElementsByTagName("text")[0].childNodes[0].nodeValue;
ponerDatostextHtml(tituloSelect); //llamamos al metodo ponerDatostextHtml() 
 text2=xmlDoc.getElementById('2').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 

 //Pregunta Select 1
 var tituloSelect=xmlDoc.getElementsByTagName("text")[2].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("3").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("3").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosSelectHtml() 
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);
 
 
 
 
 //Pregunta Select 2
 var tituloSelect=xmlDoc.getElementsByTagName("text")[3].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("4").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("4").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosSelectHtml1() 
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);
 
 
 //Pregunta CheckBox 1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("text")[8].childNodes[0].nodeValue;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("9").getElementsByTagName('option').length;
 for (var i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("9").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox); //llamamos al metodo ponerDatosCheckboxHtml() 
 var nres = xmlDoc.getElementById("9").getElementsByTagName('answer').length;
 for (var i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("9").getElementsByTagName("answer")[i].innerHTML;
 }

 //Pregunta CheckBox 2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementById("10").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("10").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("10").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox,opcionesCheckbox1); //llamamos al metodo ponerDatosCheckboxHtml1()
 var nres = xmlDoc.getElementById("10").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("10").getElementsByTagName("answer")[i].innerHTML;
 }


 

 
 //Pregunta MULTIPLE 1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("5").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("5").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("5").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultiHtml(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosMultiHtml()
   var nresp = xmlDoc.getElementById("5").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestaMultiple[i] = parseInt(xmlDoc.getElementById("5").getElementsByTagName("answer")[i].childNodes[0].nodeValue); 
	}

 
//Pregunta MULTIPLE 2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("6").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("6").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("6").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultiHtml1(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosMultiHtml1()
   var nresp = xmlDoc.getElementById("6").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestaMultiple1[i] = parseInt(xmlDoc.getElementById("6").getElementsByTagName("answer")[i].childNodes[0].nodeValue); 
	}

 
 //Pregunta Radio 1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
  var tituloRadio = xmlDoc.getElementsByTagName("text")[6].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("7").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
   opcionesRadio[i]=xmlDoc.getElementById("7").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosradio(tituloRadio,opcionesRadio); //llamamos al metodo  //llamamos al metodo ponerDatosradio()
 var nres = xmlDoc.getElementById("7").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio[i]=xmlDoc.getElementById("7").getElementsByTagName("answer")[i].innerHTML;
 }
  
 //Pregunta Radio 2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
  var tituloRadio1 = xmlDoc.getElementsByTagName("text")[7].innerHTML;
 var opcionesRadio1 = [];
 var nopt = xmlDoc.getElementById("8").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
   opcionesRadio1[i]=xmlDoc.getElementById("8").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosradio1(tituloRadio1,opcionesRadio1); //llamamos al metodo ponerDatosradio1()
 var nres = xmlDoc.getElementById("8").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1[i]=xmlDoc.getElementById("8").getElementsByTagName("answer")[i].innerHTML;
 }

}

//****************************************************************************************************
//implementación de la corrección

//Corregir text 1
function corregirText(){
  var s =formElement.elements[0].value;   
  
  if (s.toLowerCase() == text1.toLowerCase()) {
	  darRespuestaHtml("1ª Pregunta Text: ¡Correcto!");
	  nota +=1;
  }
  else {
    darRespuestaHtml("1ª Pregunta Text: Incorrecto");
  }
}


//Corregir text 2
function corregirText1(){
 var s = formElement.elements[1].value;     
  if (s.toLowerCase()==text2.toLowerCase()) {
  darRespuestaHtml("2ª Pregunta Text: ¡Correcto!");
  nota +=1;
  }
    else { darRespuestaHtml("2ª Pregunta Text: Incorrecto");
  }
}



//Corregir select 1

  function corregirSelect(){
  var sel = formElement;  
  if (sel.sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("1ª Pregunta Select: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("1ª Pregunta Select: Incorrecto");
}


//Corregir select 2
  
  function corregirSelect1(){
  var sel1 = formElement;  
  if (sel1.sel1.selectedIndex-1==respuestaSelect1) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("2ª Pregunta Select: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("2ª Pregunta Select: Incorrecto");
}

//Corregir Radio 1
function corregirRadio(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio1.length; i++) {  //"radio1" es el nombre asignado a todos los Radio 1
   if (f.radio1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio[j])
		 escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0; //dividido por el número de respuestas correctas   
     darRespuestaHtml("1ª Pregunta Radio: correcta");    
    } else {  
     darRespuestaHtml("1ª Pregunta Radio:  incorrecta");
    }   
   } 
  }
}
//Corregir Radio 2
function corregirRadio1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio2.length; i++) {  //"radio2" es el nombre asignado a todos los Radio 2
   if (f.radio2[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio1.length; j++) {
     if (i==respuestasRadio1[j])
		 escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0; //dividido por el número de respuestas correctas   
     darRespuestaHtml("2ª Pregunta Radio:  correcta");    
    } else {  
     darRespuestaHtml("2ª Pregunta Radio: incorrecta");
    } 
	
   } 
  }
}
  
 //Corregir Multiple 1
function corregirMultiple(){
  //Para cada opción mira si está seleccionada, si está seleccionada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.mult.length; i++) {  //"mult" es el nombre asignado a todos los multiple 1
   if (f.mult[i].selected) {
    escorrecta[i]=false; 
    for (j = 0; j < respuestaMultiple.length; j++) {
     if (i==respuestaMultiple[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
	if (escorrecta[i]) {
     nota +=1.0/respuestaMultiple.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("1ª Pregunta Multiple : "+i+" correcta");    
    } else {
     nota -=1.0/respuestaMultiple.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("1ª Pregunta Multiple: "+i+" incorrecta");
    }   
   } 
  }
}


 //Corregir Multiple 2
function corregirMultiple1(){
  //Para cada opción mira si está seleccionada, si está seleccionada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.mult1.length; i++) {  //"mult1" es el nombre asignado a todos los Multiple 2
   if (f.mult1[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaMultiple1.length; j++) {
     if (i==respuestaMultiple1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("2ª Pregunta Multiple : "+i+" correcta");    
    } else {
     nota -=1.0/respuestaMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("2ª Pregunta Multiple: "+i+" incorrecta");
    }   
   } 
  }
}
  
  
//Corregir Checkbox 1
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"checkbox1" es el nombre asignado a todos los checkbox 1
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("1ª pregunta  CheckBox: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("1ª pregunta  CheckBox: "+i+" incorrecta");
    }   
   } 
  }
}

//Corregir Checkbox 2
function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color1.length; i++) {  //"checkbox2" es el nombre asignado a todos los checkbox 2
   if (f.color1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("2ª pregunta  CheckBox:"+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("2ª pregunta  CheckBox: "+i+" incorrecta");
    }   
   } 
  }
}





//****************************************************************************************************


// PONER DATOS TEXT 1 en el documento HTML
function ponerDatosInputHtml(t){
 document.getElementById("text").innerHTML = t;
}

// PONER DATOS TEXT 2 en el documento HTML
function ponerDatostextHtml(t){
 document.getElementById("text1").innerHTML = t;
}


//PONER DATOS SELECT 1 en el documento HTML

function ponerDatosSelectHtml(t,opt){
  document.getElementById("select").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//PONER DATOS SELECT 2 en el documento HTML
function ponerDatosSelectHtml1(t,opt){
  document.getElementById("select1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}


//PONER DATOS CHECKBOX 1 en el documento HTML
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkbox1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 checkboxContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//PONER DATOS CHECKBOX 2 en el documento HTML
function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkbox2');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 checkboxContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color1"+i);
    input.type="checkbox";
    input.name="color1";
    input.id="color_1"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//PONER DATOS RADIO 1 en el documento HTML
function ponerDatosradio(t,opt){
 var radioContainer=document.getElementById('radio');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio1_"+i);
    input.type="radio";
    input.name="radio1";
    input.id="radio1_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	
 }  
}


//PONER DATOS RADIO 2 en el documento HTML
function ponerDatosradio1(t,opt){
 var radioContainer=document.getElementById('radio1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio2_"+i);
    input.type="radio";
    input.name="radio2";
    input.id="radio2_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	
 }  
}


//PONER DATOS MULTIPLE 1 en el documento HTML
function ponerDatosMultiHtml(t,opt){
  document.getElementById("multiple").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//PONER DATOS MULTIPLE 1 en el documento HTML
function ponerDatosMultiHtml1(t,opt){
  document.getElementById("multiple1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var resDiv=document.getElementById('resultadosDiv');
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 resDiv.appendChild(p);
}



function presentarNota(){
   darRespuestaHtml("LA NOTA FINAL ES: "+nota+" PUNTOS SOBRE 10");
}


function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}


