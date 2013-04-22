
function sposta_cursore( soglia, nextId, resetNext){
/*******************************************************************************************
  
	Funzione per spostare il focus sul prossimo elemento.
	(es. dopo aver inserito il giorno della data il focus passa sul campo mese della data )

	IN:
	* Caso oggetto di input campo di testo
		soglia 		->	Numero di caratteri contenuti nel value necessari per cambiare focus
		nextId		->  Id LOCALE del prossimo elemento su cui si spostare il focus
		resetNext	->  Resetta il valore nel prossimo elemento quando si sposta il focus	
	(es. campo di testo soglia = 2 , nextId = born_mm_1 )
	* Caso oggetto di input select/option
		soglia 		->	Numero di caratteri contenuti nel value necessari per cambiare focus
		nextId		->  Id COMPLETO del prossimo elemento su cui si sposta il focus
		resetNext	->  Resetta il valore nel prossimo elemento quando si sposta il focus
	 
	RETVAL:
		Nessuno se il numero di caratteri nel value è sufficiente il focus viene spostato.
 *******************************************************************************************/			
	
	var currentElement = document.activeElement;
	
	// nel caso che il campo è un select passo un booleano
	if ( soglia == true ) {
			
		var sposta = document.getElementById(nextId);
		sposta.focus();
		
		if ( resetNext )
			sposta.value = "";
	}
	// nel caso che è un campo di testo passo un numero
	else if ( !isNaN(soglia) ) {
	
		var charsInCurrEle = currentElement.value.length;
		
		if( charsInCurrEle >= soglia ){
	
			var newId = currentElement.form.id+":"+nextId;
			
			var sposta = document.getElementById(newId);
			sposta.focus();
			
			if ( resetNext )
				sposta.value = "";
		}
		
	}
	
}

function validaNomeCognome( elemNomeCognome, idErrorPicture, styleTextError, styleImgError) {
/**********************************************************************
Questa funzione valida il campo nome e cognome digitato da web.

IN:
	elemNomeCognome	->	il componente di testo che contiene il codice fiscale
	idErrorPicture	->	id COMPLETO dell'immagine che mostra l'errore lato utente
	styleTextError	-> 	lo stile di errore da applicare/rimuovere al testo
	styleImgError	->	lo stile di errore da applicare/rimuovere all'immagine

RETVAL:
	nessuno inserisce o disinserisce lo stile di errore sull'immagine e colora il campo di testo
**********************************************************************/				

	var value = elemNomeCognome.value;

	var className = elemNomeCognome.className;

	var contieneCifreNumeriche = new RegExp("\\d+").test(value);
	var contieneGiaErrore = new RegExp(""+styleTextError+"").test(className);
	
	if (contieneCifreNumeriche){
		if(!contieneGiaErrore){
			className += " " + styleTextError;
			gestisciImmagineErrore( idErrorPicture, styleImgError, true);	
		}
	}
	else {
		className = className.replace( styleTextError, "");
		gestisciImmagineErrore( idErrorPicture, styleImgError, false);
	}
	elemNomeCognome.className = className;
}

function validaCodiceFiscale( elemCF, idErrorPicture, styleTextError, styleImgError){
/***************************************************************************************
Questa funzione valida il codice fiscale presente nell'elemento di testo.
Se il codice fiscale non è corretto inserisce lo style di errore nell'immagine passata.

IN:
	elemCF			->	il componente di testo che contiene il codice fiscale
	idErrorPicture	->	id COMPLETO dell'immagine che mostra l'errore lato utente
	styleTextError	-> 	lo stile di errore da applicare/rimuovere al testo
	styleImgError	->	lo stile di errore da applicare/rimuovere all'immagine

RETVAL :
	nessuno inserisce o disinserisce lo stile di errore sull'immagine e colora il campo di testo
***************************************************************************************/	
	
	var length = elemCF.value.length;
	var className = elemCF.className;
	var contieneGiaErrore = new RegExp(""+styleTextError+"").test(className);
	
	if(length < 16){
		if(!contieneGiaErrore){
			className += " " + styleTextError;
			gestisciImmagineErrore( idErrorPicture, styleImgError, true);			
		}
	}
	else{
		className = className.replace( styleTextError, "");
		gestisciImmagineErrore( idErrorPicture, styleImgError, false);
	}
	
	elemCF.className = className;
}

function gestisciImmagineErrore( idErrorPicture, styleImgError, visualizzaErrore) {
/***************************************************************************************
Questa funzione applica lo style di errore ad un oggetto passato a seconda di un booleano.
(es. mostrare o nascondere un'immagine a seconda di un booleano inserendo o rimuovendo una classe di stile)

IN:
	idErrorPicture	 ->		id COMPLETO dell'immagine che mostra l'errore lato utente
	styleImgError	 -> 	lo stile di errore da applicare/rimuovere all'immagine
	visualizzaErrore ->  	se true rimuove lo stile di errore altrimenti lo inserisce

RETVAL :
	nessuno inserisce o disinserisce lo stile di errore sull'immagine
***************************************************************************************/

	var img_err = document.getElementById(idErrorPicture);
	var className = img_err.className;
	
	if( visualizzaErrore )
		className = className.replace( styleImgError, "");
	else
		className = styleImgError;
		
	img_err.className = className;
}

function validaCap( elemCAP, styleTextError) {
/**********************************************************************
IN:
	elemCAP			-> campo di testo che contiene il CAP
	styleTextError	-> stile di errore da applicare/rimuovere al campo di testo

RETVAL:
colora in campo CAP nel caso di valore mal formattato
**********************************************************************/		

	var value = elemCAP.value;

	var valid = new RegExp("[0-9]{5}").test(value);

	gestisciSfondoErroreTesto( elemCAP, styleTextError, valid);

}

function validaEmail( elemMail, idErrorPicture, styleTextError, styleImgError) {
/**********************************************************************
IN:
	elemMail		->	elemento di testo che contiene l'e-mail
	idErrorPicture	->	id COMPLETO dell'immagine che mostra l'errore lato utente
	styleTextError	-> 	lo stile di errore da applicare/rimuovere al testo
	styleImgError	->	lo stile di errore da applicare/rimuovere all'immagine

RETVAL:
colora in campo E-mail nel caso di valore mal formattato
**********************************************************************/			

	var value = elemMail.value;

	var valid = new RegExp("^[A-Za-z0-9-_]+(\\.[A-Za-z0-9-_]+)*@[a-zA-Z0-9-_]+(\\.[A-Za-z0-9-_]+)*\\.[a-zA-Z]{2,}$").test(value);

	gestisciSfondoErroreTesto( elemMail, styleTextError, valid);
	gestisciImmagineErrore( idErrorPicture, styleImgError, !valid);

}		

function validaTelefono( elemTelef, idErrorPicture, styleTextError, styleImgError) {
/**********************************************************************
IN:
	elemTelef		->	elemento di testo che contiene il telefono
	idErrorPicture	->	id COMPLETO dell'immagine che mostra l'errore lato utente
	styleTextError	-> 	lo stile di errore da applicare/rimuovere al testo
	styleImgError	->	lo stile di errore da applicare/rimuovere all'immagine

RETVAL:
colora in campo telefono nel caso di valore mal formattato
**********************************************************************/			

	var value = elemTelef.value;

	var valid = new RegExp("^[0-9]*$").test(value);

	gestisciSfondoErroreTesto( elemTelef, styleTextError, valid);
	gestisciImmagineErrore( idErrorPicture, styleImgError, !valid);	
}		

function validaCodiceFis( elemCF, idErrorPicture, styleTextError, styleImgError) {
/**********************************************************************
IN:
	elemCF			->	elemento di testo che contiene il codice fiscale
	idErrorPicture	->	id COMPLETO dell'immagine che mostra l'errore lato utente
	styleTextError	-> 	lo stile di errore da applicare/rimuovere al testo
	styleImgError	->	lo stile di errore da applicare/rimuovere all'immagine

RETVAL:
colora in campo codice fiscale nel caso di valore mal formattato
**********************************************************************/			

	var value = textElement.value;

	var valid = new RegExp("[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]").test(value);

	gestisciSfondoErroreTesto( elemCF, styleTextError, valid);
	gestisciImmagineErrore( idErrorPicture, styleImgError, !valid);		
}		

function gestisciSfondoErroreTesto( textElement, styleTextError, isCorrect) {
/**********************************************************************
Questa funzione colora il campo di testo segnalando una condizione di errore.
Se isCorrect è false applica lo stile styleTextError a textElement altrimenti
lo rimuove.

IN:
	textElement 	->	elemento di testo da colorare
	styleTextError 	->	stile di errore da applicare/rimuovere
	isCorrect		->	indica se l'elemento è in errore o meno

RETVAL:
Colora il campo di testo e riporta un booleano uguale ad isCorrect
**********************************************************************/			

	var className = textElement.className;
	var validElement = false;
	var contieneGiaErrore = new RegExp(""+styleTextError+"").test(className);
	
	if ( isCorrect ) {
		className = className.replace( styleTextError, "");
		validElement = true;
	}
	else if(!contieneGiaErrore)
		className += " " + styleTextError;

	textElement.className = className;	

	return validElement;
}	

function isHoliday(data) {
/**********************************************************************
IN:
L'oggetto data da valuatare

RETVAL:
ritorna true se il giorno è festivo per lo Stato Italiano 
**********************************************************************/			

	var resp = false;

	if ( data.getDay() == "Sunday" )
		resp = true;
	else if ( isItalyHoliday(data) )
		resp = true;

	return resp;
}

function isItalyHoliday(value) {
/**********************************************************************
IN:
L'oggetto data da valuatare

RETVAL:
ritorna true se il giorno è festivo per lo stato Italiano
**********************************************************************/				

	var holidays = new Array();
	
	holidays[0] = new Date(1978, 0, 1);
	holidays[1] = new Date(1978, 3, 25);
	holidays[2] = new Date(1978, 4, 1);
	holidays[3] = new Date(1978, 5, 2);
	holidays[4] = new Date(1978, 7, 15);
	holidays[5] = new Date(1978, 10, 1);
	holidays[6] = new Date(1978, 11, 8);
	holidays[7] = new Date(1978, 11, 25);
	holidays[8] = new Date(1978, 11, 26);

	for (i=0; i<holidays.length; i++)
		if ( 
				value.getMonth() == holidays[i].getMonth() &&
				value.getDate() == holidays[i].getDate()
			) {
				return true;
			}

	return false;
}

function isValidDay(value) {
/**********************************************************************
IN:
Il testo contenuto nel campo giorno

RETVAL:
ritorna true se il giorno è valido oppure "GG"
**********************************************************************/				

	var resp = false;

	if ( value == "GG" )
		resp = true; 
	else if ( isNaN(value) || value > 31 )
		resp = false; 
	else
		resp = true;  

	return resp;
}

function isValidMonth(value) {
/**********************************************************************
IN:
Il testo contenuto nel campo mese

RETVAL:
ritorna true se il mese è valido oppure "MM"
**********************************************************************/			

	var resp = false;

	if ( value == "MM" )
		resp = true;
	else if ( isNaN(value) || value > 12 )
		resp = false;
	else
		resp = true;

	return resp;		
}

function isValidYear(value) {
/**********************************************************************
IN:
Il testo contenuto nel campo anno

RETVAL:
ritorna true se l'anno è valido oppure "AAAA"
**********************************************************************/			

	var resp = false;

	if ( value == "AAAA" )
		resp = true;
	else if ( isNaN(value) )
		resp = false;
	else
		resp = true;

	return resp;		
}

function validaGiorno( textElement, styleTextError) {
/**********************************************************************
IN:
	textElement 	-> Il campo di testo del giorno digitato da interfaccia web
	styleTextError	-> lo stile da applicare all'elemento in caso di errore

RETVAL:
colora il campo di testo se viene inserito un valore non valido
**********************************************************************/		

	var value = textElement.value;

	gestisciSfondoErroreTesto( textElement, styleTextError, isValidDay(value));
}

function validaMese( textElement, styleTextError) {
/**********************************************************************
IN:
	textElement 	-> Il campo di testo del mese digitato da interfaccia web
	styleTextError	-> lo stile da applicare all'elemento in caso di errore

RETVAL:
colora il campo di testo se viene inserito un valore non valido
**********************************************************************/			

	var value = textElement.value;

	gestisciSfondoErroreTesto( textElement, styleTextError, isValidMonth(value));	
}	

function Eta(dataNascita) {
/**********************************************************************
IN:
	La data da valutare

RETVAL:
	ritona gli anni completi trascorsi dalla data passata ad oggi
**********************************************************************/		

	var anni;
	var dataControllo = new Date();
	anni = dataControllo.getFullYear() - dataNascita.getFullYear();
	anni -= ( ( dataControllo < new Date( dataControllo.getFullYear(),dataNascita.getMonth() , dataNascita.getDate() )  ) ? 1 : 0 );
	return anni;
}

function getProvCap( ajaxURL, elemNomeComune, idElemProvincia, idElemCap, giorno, mese, anno){
/**********************************************************************
Questo methodo utilizza AJAX per risolvere la provincia ed il cap di 
un dato comune passato in ingresso.
Inoltre questo metodo inserisce il valore della provincia e cap all'interno
di campi testo passati in ingresso.

IN:
	ajaxURL			->	Ajax Url dell'applicazione
	elemNomeComune	->	elemento di testo che contiene il comune
	idElemProvincia	->	elemento di testo che conterrà la provincia
	idElemCap		->	elemento di testo che conterrà il cap (opzionale)

RETVAL:
	nessuno risolve la provincia ed il cap e li inserisce dentro gli elementi di testo
**********************************************************************/	
	var giornoV = '';
	if(giorno){
		giornoV = document.getElementById(giorno).value;
	}
	var meseV = '';
	if(mese){
		meseV = document.getElementById(mese).value;
	}
	var annoV = '';
	if(anno){
		annoV = document.getElementById(anno).value;
	}
	
	$.ajax({
		type: "POST",
		url: ajaxURL,
		dataType: "xml",
		data: 	{	'ajax.request.param' : "<xml><idRequest>GetProvinciaCap</idRequest><comune>"+elemNomeComune.value+"</comune><giorno>"+giornoV+"</giorno><mese>"+meseV+"</mese><anno>"+annoV+"</anno></xml>",
					'ajax.request.type' : "XML",
					'ajax.response.type' : "XML"
				},
				
		success: function(val){

			//prende la provincia dalla xml
			var provinciaAjax = val.getElementsByTagName("PROVINCIA")[0].childNodes[0].nodeValue;
			
			//creo il riferimento all'input text con id = idpro
			var provincia = document.getElementById(idElemProvincia);
			
			//salvo il valore
			provincia.value = provinciaAjax;

			if( idElemCap != null ){
			
				var capAjax = val.getElementsByTagName("CAP")[0].childNodes[0].nodeValue;
				
				var cap = document.getElementById(idElemCap);
				
				cap.value = capAjax;
			}					

		},
		
		error: function(val){

		}
	});
}

function aggiornaCodiceFiscalePending( ajaxURL, elementCF){
/**********************************************************************
Questo methodo utilizza AJAX per aggiornare su sistema remoto il valore 
del codice fiscale durante l'inserimento

IN:
	ajaxURL			->	Ajax Url dell'applicazione
	elementCF		->	elemento di testo che contiene il codice fiscale

RETVAL:
	nessuno 
**********************************************************************/	

	$.ajax({
		type: "POST",
		url: ajaxURL,
		dataType: "xml",
		data: 	{	'ajax.request.param' : "<xml><idRequest>UpdateCodiceFiscalePending</idRequest><codiceFiscale>"+elementCF.value+"</codiceFiscale></xml>",
					'ajax.request.type' : "XML",
					'ajax.response.type' : "XML"
				}
	});
}
