

let diagnostic, deviceOS;
let cameraDeniedAlwaysAtLeastOnce = false;

var application = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDevReady, false);
    },

    onDevReady: function() {
		

		window.resolveLocalFileSystemURL(cordova.file.dataDirectory+'/'+G_DiaryFolderName+'/'+G_DataFolderName+'/exdata.data', function (fileEntry){fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				var decoder = new TextDecoder();
                var content = decoder.decode(this.result);

                G_Content = content;
                //alert(G_Content);
                if (content != 'undefined' && content !== undefined && content != null && content != 'null' && content != ''){
					
					var ks = content.split(/\r?\n/);
					//ORDER IN WHICH ELEMENTS ARE TAKE IS VERY IMPORTANT AS THIS IS THE SAME ORDER IN WHICH THEY ARE ADDED
					if (ks[0]!=null && ks[0]!='null'){localStorage.setItem("G_selectedExpenseList",ks[0]);}
					if (ks[1]!=null && ks[1]!='null'){localStorage.setItem("G_selectedIncomeList",ks[1]);}
					if (ks[2]!=null && ks[2]!='null'){localStorage.setItem("G_NumberOfAppStarts",ks[2]);}
					if (ks[3]!=null && ks[3]!='null'){localStorage.setItem("G_SelectedPassword",ks[3]);}
					if (ks[4]!=null && ks[4]!='null'){localStorage.setItem("G_SelectedCurrency",ks[4]);}
					if (ks[5]!=null && ks[5]!='null'){localStorage.setItem("G_selectedCurrencyFormat",ks[5]);}
					if (ks[6]!=null && ks[6]!='null'){localStorage.setItem("G_SelectedFirstDayOfWeek",ks[6]);}
					if (ks[7]!=null && ks[7]!='null'){localStorage.setItem("G_InitialScreenPassed",ks[7]);}
					if (ks[8]!=null && ks[8]!='null'){localStorage.setItem("G_EveryDayReminderHour",ks[8]);}
					if (ks[9]!=null && ks[9]!='null'){localStorage.setItem("G_EveryDayReminderEnabled",ks[9]);}
					if (ks[10]!=null && ks[10]!='null'){localStorage.setItem("G_RemindersList",ks[10]);}
					if (ks[11]!=null && ks[11]!='null'){localStorage.setItem("G_PasswordRecoveryEmail",ks[11]);}
					if (ks[12]!=null && ks[12]!='null'){localStorage.setItem("G_FullEntryList",ks[12]);}
					if (ks[13]!=null && ks[13]!='null'){localStorage.setItem("G_CurrentLanguage",ks[13]);}
					if (ks[14]!=null && ks[14]!='null'){localStorage.setItem("G_FullImageListDiary",ks[14]);}
					if (ks[15]!=null && ks[15]!='null'){localStorage.setItem("PRIVACYPOLICYSCREEN",ks[15]);}
					
					

				}
				application.DoDeviceReady('deviceready');
			};
			reader.readAsArrayBuffer(file);
		});}, function(e){			
					application.DoDeviceReady('deviceready');
			});	
		  

		
		document.addEventListener("backbutton", navigateBack, true);
		
		//full screen related
		function successFunction(){
		    //console.log("It worked!");
		}
		function errorFunction(error){
		    //console.log(error);
		}
		function trace(value){
		    //console.log(value);
		}

    },
    DoDeviceReady: function(id) {  
		    //StatusBar.hide();

		       //temporar pentru testare diagnostic
                diagnostic = cordova.plugins.diagnostic; // alias to shorter namespace
                diagnostic.getDeviceOSVersion(function(osDetails){
                    deviceOS = osDetails;
                })

		
		
			if (localStorage.getItem("G_CurrentLanguage") !== undefined && localStorage.getItem("G_CurrentLanguage") != null){
				G_CurrentLanguage = localStorage.getItem("G_CurrentLanguage");
				translateToCODE(G_CurrentLanguage,0);
			}else{
				if(G_IsDebugging  == 0){
					
					var navigatorLanguageFull = (navigator.language).toUpperCase();
					var navigatorLanguage = navigator.language.split("-");
					var phoneLanguage = navigatorLanguage[0];
					G_CurrentLanguage = phoneLanguage.toUpperCase();
					if (G_CurrentLanguage == 'EN' || G_CurrentLanguage == 'RO' ||  G_CurrentLanguage == 'PT' || G_CurrentLanguage == 'ES' || G_CurrentLanguage == 'FR' || G_CurrentLanguage == 'RU' || G_CurrentLanguage == 'TH' || G_CurrentLanguage == 'DE' || G_CurrentLanguage == 'EL' || G_CurrentLanguage == 'IT' || G_CurrentLanguage == 'JA' || G_CurrentLanguage == 'HI' || G_CurrentLanguage == 'MS' || G_CurrentLanguage == 'ID' || G_CurrentLanguage == 'TR' || G_CurrentLanguage == 'UK' || G_CurrentLanguage == 'NL' || G_CurrentLanguage == 'KO' || G_CurrentLanguage == 'PL'  || G_CurrentLanguage == 'ZH' || G_CurrentLanguage == 'VI'  || G_CurrentLanguage == 'BG'  || G_CurrentLanguage == 'HU'  /*    */){
						translateToCODE(G_CurrentLanguage,0);
					}else{
						G_CurrentLanguage = 'EN';
						translateToCODE(G_CurrentLanguage,0);							
					}
					
					//set currency and first day based on language
					if (G_CurrentLanguage == 'EN'){
						G_SelectedFirstDayOfWeek = 1;
						G_SelectedCurrency = 106;
					}else if (G_CurrentLanguage == 'RO'){
						G_SelectedFirstDayOfWeek = 2;
						G_SelectedCurrency = 87;
					}else if (G_CurrentLanguage == 'RU'){
						G_SelectedFirstDayOfWeek = 2;
						G_SelectedCurrency = 89;
					}else if (G_CurrentLanguage == 'ES'){
						G_SelectedFirstDayOfWeek = 2;					
						if (navigatorLanguageFull == 'ES-MX'){
							G_SelectedCurrency = 70;
						}else{
							G_SelectedCurrency = 30;
						}
					}else if (G_CurrentLanguage == 'PT'){
						G_SelectedFirstDayOfWeek = 1;					
						if (navigatorLanguageFull == 'PT-BR'){
							G_SelectedCurrency = 14;
						}else{
							G_SelectedCurrency = 30;
						}
					}else if (G_CurrentLanguage == 'FR'){
						G_SelectedFirstDayOfWeek = 2;					
						if (navigatorLanguageFull == 'FR-CA'){
							G_SelectedCurrency = 19;
						}else{
							G_SelectedCurrency = 30;
						}
					}else if (G_CurrentLanguage == 'TH'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 100;					
					}else if (G_CurrentLanguage == 'DE'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 30;					
					}else if (G_CurrentLanguage == 'EL'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 30;					
					}else if (G_CurrentLanguage == 'IT'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 30;					
					}else if (G_CurrentLanguage == 'HI'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 46;					
					}else if (G_CurrentLanguage == 'JA'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 51;					
					}else if (G_CurrentLanguage == 'MS'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 71;					
					}else if (G_CurrentLanguage == 'ID'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 43;					
					}else if (G_CurrentLanguage == 'TR'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 101;					
					}else if (G_CurrentLanguage == 'UK'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 105;					
					}else if (G_CurrentLanguage == 'NL'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 30;					
					}else if (G_CurrentLanguage == 'KO'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 57;					
					}else if (G_CurrentLanguage == 'PL'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 84;					
					}else if (G_CurrentLanguage == 'ZH'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 22;					
					}else if (G_CurrentLanguage == 'VI'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 110;					
					}else if (G_CurrentLanguage == 'BG'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 10;					
					}else if (G_CurrentLanguage == 'HU'){
						G_SelectedFirstDayOfWeek = 2;					
						G_SelectedCurrency = 42;					
					}
					/**/else{
						G_SelectedFirstDayOfWeek = 1;
						G_SelectedCurrency = 106;
					}
					
				}else{
					translateToCODE(G_CurrentLanguage,0);	
				}
			}
			
			
			//////////////////////////
			// PRIVACY POLICY CONSENT
			//////////////////////////
			
			if (localStorage.getItem("PRIVACYPOLICYSCREEN") !== undefined && localStorage.getItem("PRIVACYPOLICYSCREEN") != null ){	
				//localStorage.setItem("PRIVACYPOLICYSCREEN",null);
			}else{
				$('#confPrivacyPolicy').show();
			}
			/////////////////////////////////
			// END OF PRIVACY POLICY CONSENT
			/////////////////////////////////
			
			
		
			//get expense list from localstorage
			G_selectedExpenseList = G_expenseList;		
			if (localStorage.getItem("G_selectedExpenseList") !== undefined && localStorage.getItem("G_selectedExpenseList") != null){
				var expenseListJSONString = localStorage.getItem("G_selectedExpenseList");
				var objList = JSON.parse(expenseListJSONString);
				G_selectedExpenseList = objList.G_selectedExpenseList;			
			}else{
				localStorage.setItem("G_selectedExpenseList",JSON.stringify({G_selectedExpenseList: G_selectedExpenseList}));				
				writeLocalStorageToFile();
				
			}

			
			//get income list from localstorage
			G_selectedIncomeList = G_incomeList;		
			if (localStorage.getItem("G_selectedIncomeList") !== undefined && localStorage.getItem("G_selectedIncomeList") != null){
				var incomeListJSONString = localStorage.getItem("G_selectedIncomeList");
				var objList = JSON.parse(incomeListJSONString);
				G_selectedIncomeList = objList.G_selectedIncomeList;			
			}else{
				localStorage.setItem("G_selectedIncomeList",JSON.stringify({G_selectedIncomeList: G_selectedIncomeList}));
				writeLocalStorageToFile();
			}
			
			//get currency from local storage
			if (localStorage.getItem("G_SelectedCurrency") !== undefined && localStorage.getItem("G_SelectedCurrency") != null ){
				G_SelectedCurrency = parseInt(localStorage.getItem("G_SelectedCurrency"));			
			}
			
			//get info on first setup screen
			if (localStorage.getItem("G_InitialScreenPassed") !== undefined && localStorage.getItem("G_InitialScreenPassed") != null ){
				G_InitialScreenPassed = parseInt(localStorage.getItem("G_InitialScreenPassed"));			
			}
			
			//get first day of week from local storage
			if (localStorage.getItem("G_SelectedFirstDayOfWeek") !== undefined && localStorage.getItem("G_SelectedFirstDayOfWeek") != null){
				G_SelectedFirstDayOfWeek = parseInt(localStorage.getItem("G_SelectedFirstDayOfWeek"));			
			}
			
			//get password
			if (localStorage.getItem("G_SelectedPassword") !== undefined && localStorage.getItem("G_SelectedPassword") != null){
				G_SelectedPassword = localStorage.getItem("G_SelectedPassword");			
			}
			
			//get password recovery email
			if (localStorage.getItem("G_PasswordRecoveryEmail") !== undefined && localStorage.getItem("G_PasswordRecoveryEmail") != null){
				G_PasswordRecoveryEmail = localStorage.getItem("G_PasswordRecoveryEmail");			
			}
			
			
			//get full entry list from localstorage
			if (localStorage.getItem("G_FullEntryList") !== undefined && localStorage.getItem("G_FullEntryList") != null){
				var fullEntryListJSONString = localStorage.getItem("G_FullEntryList");	
	
				var BSTRING = '';
				if (fullEntryListJSONString.substring(0, 17) == '{"G_FullEntryList'){
					BSTRING = fullEntryListJSONString;				
				}else{
					BSTRING = CryptoJS.AES.decrypt(fullEntryListJSONString, G_K);	
					BSTRING = BSTRING.toString(CryptoJS.enc.Utf8);
				}
						
				var objList = JSON.parse(BSTRING);
				G_FullEntryList = objList.G_FullEntryList;			
			}
			
			//get full image list from localstorage
			if (localStorage.getItem("G_FullImageListDiary") !== undefined && localStorage.getItem("G_FullImageListDiary") != null){
				var fullImageListJSONString = localStorage.getItem("G_FullImageListDiary");			
				var objList = JSON.parse(fullImageListJSONString);
				G_FullImageListDiary = objList.G_FullImageListDiary;			
			}

			
			
			//get reminder list from localstorage		
			if (localStorage.getItem("G_RemindersList") !== undefined && localStorage.getItem("G_RemindersList") != null){
				var remindersListJSONString = localStorage.getItem("G_RemindersList");
				var objList = JSON.parse(remindersListJSONString);
				G_RemindersList = objList.G_RemindersList;			
			}
			
			//daily reminder
			if (localStorage.getItem("G_EveryDayReminderHour") !== undefined && localStorage.getItem("G_EveryDayReminderHour") != null){
				G_EveryDayReminderHour = parseInt(localStorage.getItem("G_EveryDayReminderHour"));			
			}
			if (localStorage.getItem("G_EveryDayReminderEnabled") !== undefined && localStorage.getItem("G_EveryDayReminderEnabled") != null){
				G_EveryDayReminderEnabled = parseInt(localStorage.getItem("G_EveryDayReminderEnabled"));			
			}
	
	
			
			//currency format
			if (localStorage.getItem("G_selectedCurrencyFormat") !== undefined && localStorage.getItem("G_selectedCurrencyFormat") != null){
				G_selectedCurrencyFormat = localStorage.getItem("G_selectedCurrencyFormat");			
			}
			if(G_selectedCurrencyFormat == 1){
				G_d = ',';
				G_t = '.';			
			}else{
				G_d = '.';
				G_t = ',';			
			}
			
			
			
			if (localStorage.getItem("G_NumberOfAppStarts") !== undefined && localStorage.getItem("G_NumberOfAppStarts") != null){
				G_NumberOfAppStarts = parseInt(localStorage.getItem("G_NumberOfAppStarts"));
			}
			
			G_TimeSinceAppStarted = new Date();

			if(G_InitialScreenPassed == 0){
				showInitialScreen();
			}else{
				
				G_NumberOfAppStarts = G_NumberOfAppStarts + 1;
				localStorage.setItem("G_NumberOfAppStarts",G_NumberOfAppStarts);
				//writeLocalStorageToFile();
				
				if (G_NumberOfAppStarts > G_MessageOccurances){
					$('#wantMoreCategories').hide();				
				}
				
				
				if (G_SelectedPassword != ''){
					doLogin();
					//initiateApp();
				}else{
					initiateApp();
				}
			}
			

			
			if (G_IsDebugging == 0){
				createFolders();
			}
			
			if (G_IsDebugging == 0){			
				//setupAllReminders();
				//setTimeout(function(){navigator.splashscreen.hide(); },3000);
				if (G_EnableAnalytics == 1){
					//analytics is disabled as it is not supported anymore by google
					//analytics.startTrackerWithId('UA-86884262-1');
				}
			}
		
			
		
    }, 
};

////////////////////////////////////////////////////////////////////////////////
////////////// AdMob / Ads (Desativado / Removido)
////////////////////////////////////////////////////////////////////////////////

async function requestGDPRPermisionIfRequired() {
    return;
}

function initApp() {
    return;
}

function prepareOrLoadInterstitialIfTime() {
    return;
}

////////////////////////////////////////////////////////////////////////////////
////////////// Fim da seção de anúncios
////////////////////////////////////////////////////////////////////////////////


var Screen = {
	current: "mainscreen",    
	$mainscreen: $("#mainscreen"), 
	$loginscreen : $("#loginscreen"),  
	$entryscreen : $("#entryscreen"),  
	$settingsscreen : $("#settingsscreen"),	 
	$settingsdetailsscreen : $("#settingsdetailsscreen"),	
	$colorpickerscreen : $("#colorpickerscreen"),	
	$iconpickerscreen : $("#iconpickerscreen"),	
	$chooseexpensecategories : $("#chooseexpensecategories"),
	$addnotescreen : $("#addnotescreen"),
	$pickdatescreen : $("#pickdatescreen"),	
	$chartscreen : $("#chartscreen"),
	$categoriesgroupedtransactions : $("#categoriesgroupedtransactions"),
	$customtimeframepicker : $("#customtimeframepicker"),
	$neweditreminder : $("#neweditreminder"),
	$initialsetupscreen : $("#initialsetupscreen"),
	$privacypolicy : $("#privacypolicy"),
	
	gotoPage: function(scr){
        var that = this;
        this.current = scr;
        if (scr === "mainscreen"){
			G_currentScreen = "mainscreen";
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();	
			that.$settingsdetailsscreen.hide();	
			that.$iconpickerscreen.hide();
			that.$colorpickerscreen.hide();
			that.$addnotescreen.hide();	
			that.$chooseexpensecategories.hide();
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();	
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','0px');
			that.$mainscreen.show();
			if (G_IsDebugging == 0 && G_EnableAnalytics == 1){
				//analytics.trackView('Main Screen');
			}
			
			prepareOrLoadInterstitialIfTime();
			
        }else if (scr === "entryscreen"){	
			G_currentScreen = "entryscreen";					
			that.$mainscreen.hide();
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$iconpickerscreen.hide();
			that.$colorpickerscreen.hide();
			that.$addnotescreen.hide();	
			that.$chooseexpensecategories.hide();
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();		
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$entryscreen.show();	
			if (G_IsDebugging == 0 && G_EnableAnalytics == 1){
				//analytics.trackView('Entry Screen');
			}
			
			prepareOrLoadInterstitialIfTime();
			
        }else if (scr === "settingsscreen"){	
			G_currentScreen = "settingsscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsdetailsscreen.hide();
			that.$iconpickerscreen.hide();
			that.$colorpickerscreen.hide();
			that.$addnotescreen.hide();	
			that.$chooseexpensecategories.hide();
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();	
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','0px');
			that.$settingsscreen.show();
			if (G_IsDebugging == 0 && G_EnableAnalytics == 1){
				//analytics.trackView('Settings Screen');
			}
			
			prepareOrLoadInterstitialIfTime();
			
        }else if (scr === "settingsdetailsscreen"){	
			G_currentScreen = "settingsdetailsscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$iconpickerscreen.hide();
			that.$colorpickerscreen.hide();
			that.$addnotescreen.hide();	
			that.$chooseexpensecategories.hide();
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();	
			that.$neweditreminder.hide();	
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			$('body').css('padding-bottom','65px');
			scrollTop();
			that.$settingsdetailsscreen.show();
			
			prepareOrLoadInterstitialIfTime();
			
			
        }else if (scr === "colorpickerscreen"){	
			G_currentScreen = "colorpickerscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$iconpickerscreen.hide();
			that.$addnotescreen.hide();	
			that.$chooseexpensecategories.hide();
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();		
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$colorpickerscreen.show();		
			$('#closeColorPicker').show();
        }else if (scr === "iconpickerscreen"){	
			G_currentScreen = "iconpickerscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();	
			that.$addnotescreen.hide();	
			that.$chooseexpensecategories.hide();
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();	
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$iconpickerscreen.show();
			$('#closeIconPicker').show();
        }else if (scr === "chooseexpensecategories"){	
			G_currentScreen = "chooseexpensecategories";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$addnotescreen.hide();		
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();	
			that.$neweditreminder.hide();		
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$chooseexpensecategories.show();		
        }else if (scr === "addnotescreen"){	
			G_currentScreen = "addnotescreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$pickdatescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$addnotescreen.show();			
        }else if (scr === "pickdatescreen"){	
			G_currentScreen = "pickdatescreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();		
			that.$chartscreen.hide();	
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$pickdatescreen.show();
        }else if (scr === "chartscreen"){	
			G_currentScreen = "chartscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$categoriesgroupedtransactions.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$chartscreen.show();
			if (G_IsDebugging == 0 && G_EnableAnalytics == 1){
				//analytics.trackView('Chart Screen');
			}
			
			prepareOrLoadInterstitialIfTime();
			
			
        }else if (scr === "categoriesgroupedtransactions"){	
			G_currentScreen = "categoriesgroupedtransactions";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$chartscreen.hide();
			that.$customtimeframepicker.hide();		
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$categoriesgroupedtransactions.show();		
        }else if (scr === "customtimeframepicker"){	
			G_currentScreen = "customtimeframepicker";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$chartscreen.hide();
			that.$categoriesgroupedtransactions.hide();		
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$customtimeframepicker.show();					
        }else if (scr === "neweditreminder"){	
			G_currentScreen = "neweditreminder";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$chartscreen.hide();
			that.$categoriesgroupedtransactions.hide();	
			that.$customtimeframepicker.hide();	
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();	
			scrollTop();
			$('body').css('padding-bottom','65px');
			that.$neweditreminder.show();	
			if (G_IsDebugging == 0 && G_EnableAnalytics == 1){
				//analytics.trackView('New and Edit Reminder Screen');
			}			
        }else if (scr === "loginscreen"){	
			G_currentScreen = "loginscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$chartscreen.hide();
			that.$categoriesgroupedtransactions.hide();	
			that.$customtimeframepicker.hide();	
			that.$neweditreminder.hide();
			that.$initialsetupscreen.hide();
			that.$privacypolicy.hide();		
			scrollTop();
			$('body').css('padding-bottom','0px');
			that.$loginscreen.show();										
        }else if (scr === "initialsetupscreen"){	
			G_currentScreen = "initialsetupscreen";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$chartscreen.hide();
			that.$categoriesgroupedtransactions.hide();	
			that.$customtimeframepicker.hide();	
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$privacypolicy.hide();			
			scrollTop();
			$('body').css('padding-bottom','0px');
			that.$initialsetupscreen.show();										
        }else if (scr === "privacypolicy"){	
			G_currentScreen = "privacypolicy";					
			that.$mainscreen.hide();
			that.$entryscreen.hide();	
			that.$settingsscreen.hide();
			that.$settingsdetailsscreen.hide();
			that.$colorpickerscreen.hide();
			that.$iconpickerscreen.hide();
			that.$chooseexpensecategories.hide();	
			that.$addnotescreen.hide();			
			that.$pickdatescreen.hide();
			that.$chartscreen.hide();
			that.$categoriesgroupedtransactions.hide();	
			that.$customtimeframepicker.hide();	
			that.$neweditreminder.hide();
			that.$loginscreen.hide();
			that.$initialsetupscreen.hide();
			scrollTop();
			$('body').css('padding-bottom','0px');
			
			that.$privacypolicy.show();
													
        }		
		
		
		
	},
};

function showMainScreenAddButtons(){
	
	$('#reviewMainScreenActionPanel').show();
	$('#mainScreenAddIncomeButton').show();
	$('#mainScreenAddExpenseButton').show();
	$('#showSettingsScreen').hide();
	$('#hideMainScreenAddButtons').show();
	$('#showMainScreenAddButtons').hide();
	
	G_VisibleMainScreenAddButtons = 1;
}

function hideMainScreenAddButtons(){
	$('#reviewMainScreenActionPanel').hide();
	$('#mainScreenAddIncomeButton').hide();
	$('#mainScreenAddExpenseButton').hide();
	$('#showSettingsScreen').show();
	$('#hideMainScreenAddButtons').hide();
	$('#showMainScreenAddButtons').show();
	
	G_VisibleMainScreenAddButtons = 0;
}

function navigateBack(){
	//console.log(G_currentScreen);
	if ($('#gallery').is(":visible")){
		
		$("#closeGalley").click();		
	}else{
		if (G_currentScreen == 'settingsscreen'){		
			if(G_DeleteAllAppData == 1){
				closeResetAppDataConfirmation();
			}else{
				prepareAndShowMainScreen();		
			}
		}else if (G_currentScreen == 'entryscreen'){
			if (G_DeleteEntryConfirmation == 1 || G_DeleteImageConfirmation == 1 || G_ChooseImageConfirmation == 1){
				closeDeleteTransaction();
				closeDeleteImageConfirmation();
				closeImagePickerConfirmation();
			}else if (G_AddTransactionBarConfirmation == 1){
				closeEntryScreenAddButtons();
			}else if (!($('#transactionChooseCategory').is(':visible')) && ($('.amountInput').is(':visible'))){
				
				closeAddTransaction();
			}else if ($('#transactionChooseCategory').is(':visible')){
				 //order is very important - should be always before close closeDayTransaction() function
				closeDayTransaction();			
			}else {
				resetEntryUsedVariables();
				prepareAndShowMainScreen();			
			}
		}else if (G_currentScreen == 'privacypolicy'){
				Screen.gotoPage('settingsscreen');
		}else if (G_currentScreen == 'settingsdetailsscreen'){
			if (G_DeleteIncomeCategoryConfirmation == 1){
				closeDeleteIncomeCategory()
			}else if (G_DeleteExpenseCategoryConfirmation == 1){
				closeDeleteExpenseCategory()
			}else if ($('#addNewExpenseContainer').is(':visible') ){ 
				closeNewExpense();
			}else if ($('#addNewIncomeContainer').is(':visible') ){ 
				closeNewIncome();
			}else{
				if (G_CurrentDetailsScreen == 'reminders'){
					setupAllReminders();
					G_CurrentDetailsScreen = '';
					Screen.gotoPage('settingsscreen');
				}else if (G_CurrentDetailsScreenFromInit == 'choosecurrencyfrominit' && G_CurrentDetailsScreen == 'choosecurrency'){
					showInitialScreen();
					G_CurrentDetailsScreen = '';
					G_CurrentDetailsScreenFromInit = '';
				}else if (G_CurrentDetailsScreen == 'choosecurrency'){
					G_CurrentDetailsScreen = '';
					Screen.gotoPage('settingsscreen');
				}else{
					Screen.gotoPage('settingsscreen');
				}
			}
		}else if (G_currentScreen == 'chooseexpensecategories'){
			Screen.gotoPage('entryscreen');
		}else if (G_currentScreen == 'addnotescreen'){
			Screen.gotoPage('entryscreen');
		}else if (G_currentScreen == 'pickdatescreen'){
			Screen.gotoPage('entryscreen');
		}else if (G_currentScreen == 'customtimeframepicker'){
			Screen.gotoPage('chartscreen');
		}else if (G_currentScreen == 'neweditreminder'){
			if (G_DeleteExpenseCategoryConfirmation == 1){
				closeConfirmDeleteReminder();
			}else{
				Screen.gotoPage('settingsdetailsscreen');
			}
		}else if (G_currentScreen == 'loginscreen'){
			if (G_ResetLoginPasswordConfirmation == 1){
				closeForgotPassword();
			}else{
				if (G_ExitConfirmationScreen == 0){
					showConfirmExitApp();
				}else{
					closeConfirmExitApp();
				}
			}
		}else if (G_currentScreen == 'categoriesgroupedtransactions'){
			if (G_PreviousScreen == 'mainscreen'){
				Screen.gotoPage('mainscreen');
			}else if (G_PreviousScreen == 'chartscreen'){
				Screen.gotoPage('chartscreen');
			}
		}	
		else if (G_currentScreen == 'chartscreen'){
			if (G_ChoseTimeFrameBar == 1){
				closeTimeFramePicker();
			}else{
				prepareAndShowMainScreen();
	//			Screen.gotoPage('mainscreen');
			}
		}else if (G_currentScreen == 'iconpickerscreen' || G_currentScreen == 'colorpickerscreen'){
			Screen.gotoPage('settingsdetailsscreen');
			$('#closeColorPicker').hide();
			$('#closeIconPicker').hide();		
		}else if (G_TodayMonth != G_chosenMonth){
			G_chosenMonth = G_TodayMonth;
			G_chosenYear = G_TodayYear;
			setCurrentPrevAndNextDates(0);				
		}else if (G_VisibleMainScreenAddButtons == 1){
			hideMainScreenAddButtons();
		}else{
			if (G_ExitConfirmationScreen == 0){
				showConfirmExitApp();
			}else{
				closeConfirmExitApp();
			}
		}
	}
	
}


function quitApp(){
	navigator.app.exitApp();
}

function showConfirmExitApp(){
	G_ExitConfirmationScreen = 1;
	$('#confirmExitContainer').show();
}

function closeConfirmExitApp(){
	G_ExitConfirmationScreen = 0;
	$('#confirmExitContainer').hide();
}

function prepareAndShowMainScreen(){
	//console.log('asd');
	loadMainScreenCalendar();
	initiateChartScreen();	
	doShowTodayTransactions();

	if (G_NumberOfAppStarts == 0 && G_ChartType == ''){
		G_ChartType = 'balance'
	}
	
	if (G_ChartType == ''){;
		showSummaryChartTab('expense');	
	}else{
		showSummaryChartTab(G_ChartType);
	}
	hideMainScreenAddButtons();
	Screen.gotoPage('mainscreen');
}

function prepareAndShowDatePicker(){
	loadDatePickerCalendar();
	Screen.gotoPage('pickdatescreen');	
	//Screen.gotoPage('mainscreen');
}


function loadMainScreenCalendar(){
	var monthEntryList = [];
	var todayDate = dateToInt(G_today);
	/*for (var i=0; i<G_FullEntryList.length; i++){
		if (G_FullEntryList[i]['monthNr'] == G_chosenMonth){
			monthEntryList.push(G_FullEntryList[i]);
		}		
	}*/
	
	
	G_currentMonthDays = get42DaysOnSelectedMonth(G_chosenMonth,G_chosenYear,G_SelectedFirstDayOfWeek);
	//console.log(G_currentMonthDays);
	
	for (var i=0; i<G_FullEntryList.length; i++){
		for (var k=0; k<G_currentMonthDays.length; k++){
			if (G_FullEntryList[i]['dateKey'] == G_currentMonthDays[k]['calendarID']){
				monthEntryList.push(G_FullEntryList[i]);
			}	
		}
	}
	
	//console.log(monthEntryList);
	
	
	// Set calendar header based on first day of week
	if (G_SelectedFirstDayOfWeek == 1){
		for (var i = 0; i<7; i++){		
			$('#DayOfWeek'+(i+1)).html(translate(G_dayShortNames[i]))
		}		
	}else{
		for (var i = 0; i<6; i++){		
			$('#DayOfWeek'+(i+1)).html(translate(G_dayShortNames[i+1]))
		}
		$('#DayOfWeek7').html(translate(G_dayShortNames[0]))
	}
	
	var selectedDayIndicator = '';
	var incomeIndicator = '';
	var expenseIndicator = '';
	var entryListDayID = -1;
	//console.log(G_currentMonthDays);
	for (var i = 0; i < 42; i++){
		incomeIndicator = '';
		expenseIndicator = '';
		for (var j = 0; j<monthEntryList.length; j++){
			
			if (G_currentMonthDays[i]['calendarID'] == monthEntryList[j]['dateKey']){				
				//income indicator
				if(monthEntryList[j]['nrIncomeTransaction'] > 0 && monthEntryList[j]['nrExpenseTransaction'] > 0){
					incomeIndicator = '<img src="images/both.png" height="4px" style="position:absolute; left:50%; margin-left:-7px; margin-top:7px; top:50%; ">';
				}else{				
					//income indicator
					if(monthEntryList[j]['nrExpenseTransaction'] > 0){
						incomeIndicator = '<img src="images/justexpense.png" height="4px" style="position:absolute; left:50%; margin-left:-7px; margin-top:7px; top:50%; ">';
						//expenseIndicator = '<img src="images/has_expense_icon.png" height="7px" style="position:absolute; left:50%; margin-left:0px; margin-top:7px; top:50%; ">';
					}
					if(monthEntryList[j]['nrIncomeTransaction'] > 0){
						incomeIndicator = '<img src="images/justincome.png" height="4px" style="position:absolute; left:50%; margin-left:-7px; margin-top:7px; top:50%; ">';
						//expenseIndicator = '<img src="images/has_expense_icon.png" height="7px" style="position:absolute; left:50%; margin-left:0px; margin-top:7px; top:50%; ">';
					}
				}
			}			
		}
		
		
		//today indicator
		
		if(G_currentMonthDays[i]['calendarID'] == todayDate){
			G_TodaysCalendarID = i;
			selectedDayIndicator = ' style="background-color:#FFF9C4;" ';
		}else{
			selectedDayIndicator = '';
		}
		
		
		$('#transactionDay'+i).removeClass();
		if (((i+1)%7) == 0){
			if (G_chosenMonth == G_currentMonthDays[i]['monthOfYear']){
				$('#transactionDay'+i).html('<div '+selectedDayIndicator+'>' + incomeIndicator + expenseIndicator + G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#transactionDay'+i).addClass('lastCell');
			}else{
				$('#transactionDay'+i).html('<div '+selectedDayIndicator+'>' + incomeIndicator + expenseIndicator +G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#transactionDay'+i).addClass('otherMonthCellLast');
			}
		}else{
			if (G_chosenMonth == G_currentMonthDays[i]['monthOfYear']){
				$('#transactionDay'+i).html('<div '+selectedDayIndicator+'>' + incomeIndicator + expenseIndicator +G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#transactionDay'+i).addClass('normalCell');
			}else{
				$('#transactionDay'+i).html('<div '+selectedDayIndicator+'>' + incomeIndicator + expenseIndicator +G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#transactionDay'+i).addClass('otherMonthCell');
			}
		}
	}
}

function loadDatePickerCalendar(){
	G_currentMonthDays = get42DaysOnSelectedMonth(G_chosenMonth,G_chosenYear,G_SelectedFirstDayOfWeek);
	//console.log(G_currentMonthDays);
	// Set calendar header based on first day of week
	if (G_SelectedFirstDayOfWeek == 1){
		for (var i = 0; i<7; i++){		
			$('#pickerDayOfWeek'+(i+1)).html(translate(G_dayShortNames[i]))
		}		
	}else{
		for (var i = 0; i<6; i++){		
			$('#pickerDayOfWeek'+(i+1)).html(translate(G_dayShortNames[i+1]))
		}
		$('#pickerDayOfWeek7').html(translate(G_dayShortNames[0]))
	}
	
	//console.log(G_currentMonthDays);
	var selectedDayIndicator = '';
	for (var i = 0; i < 42; i++){
		if(G_currentMonthDays[i]['calendarID'] == G_SelectedDay){
			selectedDayIndicator = '<img src="images/calendar_selected_day.png" width="28px" style="position:absolute; top:50%; left:50%; margin-left:-14px; margin-top:-14px;  ">';
		}else{
			selectedDayIndicator = '';
		}
		$('#pickertransactionDay'+i).removeClass();
		if (((i+1)%7) == 0){
			if (G_chosenMonth == G_currentMonthDays[i]['monthOfYear']){
				$('#pickertransactionDay'+i).html('<div>'+selectedDayIndicator+G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#pickertransactionDay'+i).addClass('lastCell');
			}else{
				$('#pickertransactionDay'+i).html('<div>'+selectedDayIndicator+G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#pickertransactionDay'+i).addClass('otherMonthCellLast');
			}
		}else{
			if (G_chosenMonth == G_currentMonthDays[i]['monthOfYear']){
				$('#pickertransactionDay'+i).html('<div>'+selectedDayIndicator+G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#pickertransactionDay'+i).addClass('normalCell');
			}else{
				$('#pickertransactionDay'+i).html('<div>'+selectedDayIndicator+G_currentMonthDays[i]['dayOfMonth']+'</div>');
				$('#pickertransactionDay'+i).addClass('otherMonthCell');
			}
		}
	}
}

////////////////
//LOGIN RELATED
///////////////
function doLogin(){
	$('html').css('background-color','#3f5c6b');
	$('#loginbackgroundimage').show();
	$('#loginPassHolderSection').show();
	$('#loginkeypad').show();
	
	$('#loginRecoveryEmail').val('');
	$('#resetPasswordEmailContainer').hide();
	$('#closeOrResetLoginPassword').hide();	
	$('#forgotPasswordLabel').hide();
	clearLoginPass();
	Screen.gotoPage('loginscreen');	
}

function loginPressKey(key){
	G_TypedPassword = G_TypedPassword + key.toString();
	$('#loginpassCode'+G_TypedPassword.length).html('<img src="images/asterixicon.png" width="20px;" style="padding-top:3px;">');
	if(G_TypedPassword.length == 4){
		if (md5(G_TypedPassword) == G_SelectedPassword){
			showSuccessMessage(translate('trSuccesLogin'),2500);
			clearLoginPass();
			initiateApp();
		}else{
			showFailMessage(translate('trIncorrectPassword'),2500);
			$('#forgotPasswordLabel').show();
			clearLoginPass();
		}
	}
}

function clearLoginPass(){
	G_TypedPassword = '';
	$('#loginpassCode1').html('');
	$('#loginpassCode2').html('');
	$('#loginpassCode3').html('');
	$('#loginpassCode4').html('');
}

function goToForgotPassword(){
	G_ResetLoginPasswordConfirmation = 1;
	$('#loginbackgroundimage').hide();
	$('#loginPassHolderSection').hide();
	$('#loginkeypad').hide();
	
	$('#loginRecoveryEmail').val('');
	$('#resetPasswordEmailContainer').show();
	$('#closeOrResetLoginPassword').show();	
	$('#forgotPasswordLabel').hide();
	clearLoginPass();
}

function closeForgotPassword(){
	G_ResetLoginPasswordConfirmation = 0;
	$('#loginbackgroundimage').show();
	$('#loginPassHolderSection').show();
	$('#loginkeypad').show();
	
	$('#loginRecoveryEmail').val('');
	$('#resetPasswordEmailContainer').hide();
	$('#closeOrResetLoginPassword').hide();	
	$('#forgotPasswordLabel').hide();
	clearLoginPass();
}

function doResetLoginPassword(){
	var newPass = (Math.floor(Math.random()*9000) + 1000).toString();
	var email = (($('#loginRecoveryEmail').val()).trim()).toLowerCase();
	
	
	
	if(G_PasswordRecoveryEmail == email){
		
		var URL = G_ServerURL+'restore/loginreset.php?action=reset';
		var data = 'email='+email+'&toSendPassword='+newPass;

		
		var response = '';
		var req = new XMLHttpRequest();
		req.open("POST", URL, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.setRequestHeader("Content-length", data.length);
		req.setRequestHeader("Connection", "close");
		req.onreadystatechange = function onResult(){
				if (this.readyState == 4 && this.status == 200){
					response = this.responseText;
					var objList = JSON.parse(response);	
					if(objList.status == 'Success'){
						G_SelectedPassword = md5(newPass);						
						localStorage.setItem("G_SelectedPassword",G_SelectedPassword);
						writeLocalStorageToFile();
						
						showSuccessMessage(translate('trPasswordResetMessage'),5000);
						closeForgotPassword();
					}else{
						showFailMessage(translate('trPasswordResetProblem'),5000);						
					}
				}else if (this.readyState == 4 && this.status == 0){
					showFailMessage(translate('trInternetErrorMessage'),4000);
				}else{
					
				}		
		};
		req.send(data);		
		
	}else{
		showFailMessage(translate('trNotSameEmail'), 4000);
		$('#loginRecoveryEmail').val('');
	}
}

///////////////////
//END LOGIN RELATED
///////////////////


////////////////////////
//INITIAL SETUP RELATED
////////////////////////

function showInitialScreen(){
	
	//prepare initial screen with details
	$('#setupChoosenCurrency').html('<span><strong>'+G_currencyList[G_SelectedCurrency]['code']+'</strong> - '+G_currencyList[G_SelectedCurrency]['name']+'</span>');
	localStorage.setItem("G_SelectedCurrency",G_SelectedCurrency);
	writeLocalStorageToFile();
	
	setupchooseCurrencyFormat(G_selectedCurrencyFormat);
	setupchooseFirstDayOfWeek(G_SelectedFirstDayOfWeek);
	
	
	Screen.gotoPage('initialsetupscreen');
}



function setupchooseCurrencyFormat(id){
	if (id == 1){	
		$('#setupcurrencyFormatChoose1').css('background-color', '#FFEFBC');
		$('#setupcurrencyFormatChoose1CheckIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');		

		$('#setupcurrencyFormatChoose2').css('background', 'none');
		$('#setupcurrencyFormatChoose2CheckIcon').html('');		
	}else{
		$('#setupcurrencyFormatChoose1').css('background', 'none');
		$('#setupcurrencyFormatChoose1CheckIcon').html('');

		$('#setupcurrencyFormatChoose2').css('background-color', '#FFEFBC');
		$('#setupcurrencyFormatChoose2CheckIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');
	}
	
	G_selectedCurrencyFormat = id;
	
	if(G_selectedCurrencyFormat == 1){
		G_d = ',';
		G_t = '.';
		
	}else{
		G_d = '.';
		G_t = ',';
		
	}
	localStorage.setItem("G_selectedCurrencyFormat",G_selectedCurrencyFormat);	
	writeLocalStorageToFile();
}

function setupchooseFirstDayOfWeek(id){
	if (id == 1){	
		$('#setupfirstDayOfWeekChooseSunday').css('background-color', '#FFEFBC');
		$('#setupfirstDaySundayCheckIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');

		$('#setupfirstDayOfWeekChooseMonday').css('background', 'none');
		$('#setupfirstDayMondayCheckIcon').html('');	
	}else{
		$('#setupfirstDayOfWeekChooseSunday').css('background', 'none');
		$('#setupfirstDaySundayCheckIcon').html('');

		$('#setupfirstDayOfWeekChooseMonday').css('background-color', '#FFEFBC');
		$('#setupfirstDayMondayCheckIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');
	}
	
	G_SelectedFirstDayOfWeek = id;
		
	localStorage.setItem("G_SelectedFirstDayOfWeek",G_SelectedFirstDayOfWeek);
	writeLocalStorageToFile();
}


function continueAfterInitialScreen(){
	G_InitialScreenPassed = 1;
	localStorage.setItem("G_InitialScreenPassed",G_InitialScreenPassed);
	writeLocalStorageToFile();
	
	initiateApp()
}


////////////////////////
//INITIATE APP
///////////////////////
function initiateApp(){
	/* get year and month for top  */	
	$('html').css('background-color','#F3F3F3');
	
	//console.log(G_NumberOfAppStarts);


    if (G_IsDebugging == 0){
        setupAllReminders();

        //analytics.startTrackerWithId('UA-49956744-26');
    }
	
	G_chosenMonth = G_today.getMonth()+1;
	G_chosenYear = G_today.getFullYear();
	
	setCurrentPrevAndNextDates(0 /*month incrementation not required on application start*/);
	G_SelectedDay = dateToInt(G_today);
	
	
	//Screen.gotoPage('iconpickerscreen');
	
	prepareAndShowMainScreen();
	//showTransactionsForCategory(4);
	//doSelectCalendarDay(3);
	//showCustomTimeFramePicker();
	
	//prepareAndShowDatePicker();
	//showPassword();
	//showExpenseCategories();
	//addNewExpenseCategory();
	//initiateChartScreen();
	//showReminders();
}



/* ----------------------------------------------------------------------------------------------------------------
---------------------------------------------SETTINGS DETAILS actions and functions--------------------------------
 ---------------------------------------------------------------------------------------------------------------- */
 
function pickColor(color){	
	//reset previous cell
	$('#selColor'+G_selectedColor).css('background-color','#FFF'); 
	$('#selColor'+color).css('background-color','#FFF9C4'); 
	G_selectedColor = color;	
	if (G_CategoriesAction == 'newExpense' || G_CategoriesAction == 'editExpense'){
		$('#expenseColorIndicator').removeClass();
		$('#expenseColorIndicator').addClass('colorsRoundBoder '+ color);
		navigateBack();
	}else if (G_CategoriesAction == 'newIncome' || G_CategoriesAction == 'editIncome'){
		$('#incomeColorIndicator').removeClass();
		$('#incomeColorIndicator').addClass('colorsRoundBoder '+ color);
		navigateBack();
	}
}

function pickIcon(icon){	
	//reset previous cell
	$('#selIcon'+G_selectedIcon).css('background-color','#FFF'); 
	$('#selIcon'+icon).css('background-color','#FFF9C4'); 
	G_selectedIcon = icon;	
	if (G_CategoriesAction == 'newExpense' || G_CategoriesAction == 'editExpense'){
		$('#expenseIconIndicator').html('<img src="images/categories/dark/'+icon+'.png" width="27px;" />');		
		navigateBack();
	}else if (G_CategoriesAction == 'newIncome' || G_CategoriesAction == 'editIncome'){
		$('#incomeIconIndicator').html('<img src="images/categories/dark/'+icon+'.png" width="27px;" />');		
		navigateBack();
	}
}
 
function hideAllPreviousScreens(){
	$('#incomeCategories').hide();
	$('#expenseCategories').hide();
	$('#reminders').hide();
	$('#currency').hide();
	$('#firstDayOfWeek').hide();
	$('#currencyFormat').hide();
	$('#language').hide();
	$('#password').hide();
}

/////////////////
//EXPENSE RELATED
/////////////////

function expenseListObjects(whatToDo){
	if (whatToDo == 'show'){
		$('#tableListOfExpenses').show();
		$('#newExpenseCategory').show();
		$('#expenseCategoriesHeader').show();
		$('#expenseFooter').show();
		
		$('#addNewExpenseContainer').hide();
		$('#saveOrCloseNewExpense').hide();
		
	}else if (whatToDo == 'hide'){
		$('#tableListOfExpenses').hide();
		$('#newExpenseCategory').hide();
		$('#expenseCategoriesHeader').hide();
		$('#expenseFooter').hide();
		
		$('#addNewExpenseContainer').show();
		$('#saveOrCloseNewExpense').show();
	}
}

function showExpenseCategories(){
	hideAllPreviousScreens();
	
	
	//prepare list of expenses
	//console.log(G_selectedIncomeList);	
	var html = '';
	for (var i = 0; i<G_selectedExpenseList.length; i++){
		html = html 
			+'<tr>'								
				+'<td  align="left" valign="middle" width="55px" style="padding-left:7px"><div class="roundAroundIcons '+G_selectedExpenseList[i]['color']+'"> <img src="images/categories/'+G_selectedExpenseList[i]['img']+'" width="25"/></div></td>'
				+'<td valign="middle"><span>'+translate(G_selectedExpenseList[i]['name'])+'</span></td>'
				+'<td valign="middle" align="center" width="55px" class="expense_edit_category" id="expenseC'+i+'"><div class="colorIndicator rounded innershadowedit"><img src="images/edit_gray.png" width="22px" align="absmiddle" /></div></td>'				
			+'</tr>';
	}
	
	//fill list of incomes
	$('#tableListOfExpenses').html(html);	
	$('.expense_edit_category').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); editExistingExpenseCategory(this.id) });	
	
	Screen.gotoPage('settingsdetailsscreen');
	expenseListObjects('show');
	$('#expenseCategories').show();
}

function addNewExpenseCategory(){
	
	//reset last picked color
	$('#screenLabelAddNewExpense').html(translate('trNewExpenseCategory'));
	$('#deleteExpenseCategoryIcon').hide();
	$('#selColor'+G_selectedColor).css('background-color','#FFF');
	$('#selIcon'+G_selectedIcon).css('background-color','#FFF');
	$('#expenseColorIndicator').removeClass();
	$('#expenseIconIndicator').html('');
	
	expenseListObjects('hide');
	G_selectedcategoryName = '';
	G_selectedColor = '';
	G_selectedIcon = '';
	$('#newExpenseCategoryName').val('');
	G_CategoriesAction = 'newExpense';
	
}

function editExistingExpenseCategory(id){
	var eID = parseInt(id.replace("expenseC", ""));
	G_SelectedExpenseCategoryID = eID;

	
	//prepare data for edit
	$('#screenLabelAddNewExpense').html(translate('trEditExpenseCategory'));
	$('#deleteExpenseCategoryIcon').show();
	$('#selColor'+G_selectedExpenseList[eID]['color']).css('background-color','#FFF9C4');
	$('#selIcon'+G_selectedExpenseList[eID]['img'].replace('.png','')).css('background-color','#FFF9C4');
	$('#expenseColorIndicator').addClass('colorsRoundBoder '+G_selectedExpenseList[eID]['color']);
	$('#expenseIconIndicator').html('<img src="images/categories/dark/'+G_selectedExpenseList[eID]['img']+'" width="27px;">');
	
	expenseListObjects('hide');
	G_selectedcategoryName = translate(G_selectedExpenseList[eID]['name']);
	G_selectedColor = G_selectedExpenseList[eID]['color'];
	G_selectedIcon = G_selectedExpenseList[eID]['img'].replace('.png','');
	$('#newExpenseCategoryName').val(G_selectedcategoryName);
	G_CategoriesAction = 'editExpense';
}


function closeNewExpense(){
	
	expenseListObjects('show');
	//reset last picked color
	resetNewAndEditExpenseScreen();
}

function resetNewAndEditExpenseScreen(){
	$('#selColor'+G_selectedColor).css('background-color','#FFF');
	$('#selIcon'+G_selectedIcon).css('background-color','#FFF');
	$('#expenseColorIndicator').removeClass();
	$('#expenseIconIndicator').html('');
}

/*
var G_selectedcategoryName = '';
var G_selectedColor = '';
var G_selectedIcon = '';
*/
function saveNewExpense(){
	
	G_selectedcategoryName = $('#newExpenseCategoryName').val();	
	G_selectedcategoryName = G_selectedcategoryName.trim();	
	G_selectedcategoryName = capitalizeFirstLetter(G_selectedcategoryName);
	
	var categoryItem = {
		'code':'',
		'color':'',
		'img':'',
		'name':'',
	}
	if(G_selectedcategoryName != ''){
		if (G_selectedColor != ''){
			if (G_selectedIcon != ''){
				//save new expense category
				if (G_CategoriesAction == 'newExpense'){
					//verify if name already exists
					var categoryExists = 0;
					for(var i = 0; i< G_selectedExpenseList.length; i++){
						if ((translate(G_selectedExpenseList[i]['name'])).toLowerCase() == G_selectedcategoryName.toLowerCase()){
							categoryExists = 1;
						}
					}
					if (categoryExists == 0){		
						var dateCode1 = new Date();								
						categoryItem['code'] = dateCode1.getTime(); //(G_selectedcategoryName.toLowerCase()).replace(/ /g,'');
						categoryItem['color'] = G_selectedColor;
						categoryItem['img'] = G_selectedIcon+'.png';
						categoryItem['name'] = G_selectedcategoryName;
						
						G_selectedExpenseList.push(categoryItem);
						//sort and save to local storage						
						G_selectedExpenseList.sort(function(a,b) {
							 if ( a.name < b.name )
								return -1;
							 if ( a.name > b.name )
								return 1;		
						});
						localStorage.setItem("G_selectedExpenseList",JSON.stringify({G_selectedExpenseList: G_selectedExpenseList}));
						writeLocalStorageToFile();
						
						
						//saved, go back to settings page
						showSuccessMessage(translate('trSuccessfullySave'),2500);
						showExpenseCategories();	
						resetNewAndEditExpenseScreen();
						

					}else{
						showFailMessage(translate('trCategoryAlreadyExists'),4000);
					}					
				}
				
				
				//save existing expense category
				if (G_CategoriesAction == 'editExpense'){
					//verify if name already exists
					var categoryExists = 0;
					for(var i = 0; i< G_selectedExpenseList.length; i++){
						if (translate((G_selectedExpenseList[i]['name']).toLowerCase()) == G_selectedcategoryName.toLowerCase() && G_SelectedExpenseCategoryID != i){
							categoryExists = 1;
						}
					}
					if (categoryExists == 0){											
						categoryItem['code'] = G_selectedExpenseList[G_SelectedExpenseCategoryID]['code'] //(G_selectedcategoryName.toLowerCase()).replace(/ /g,'');
						categoryItem['color'] = G_selectedColor;
						categoryItem['img'] = G_selectedIcon+'.png';
						categoryItem['name'] = G_selectedcategoryName;
						
						G_selectedExpenseList[G_SelectedExpenseCategoryID] = categoryItem;
						//sort and save to local storage						
						G_selectedExpenseList.sort(function(a,b) {
							 if ( a.name < b.name )
								return -1;
							 if ( a.name > b.name )
								return 1;		
						});
						localStorage.setItem("G_selectedExpenseList",JSON.stringify({G_selectedExpenseList: G_selectedExpenseList}));
						writeLocalStorageToFile();
						
						//saved, go back to settings page
						showSuccessMessage(translate('trSuccessfullySave'),2500);
						showExpenseCategories();	
						resetNewAndEditExpenseScreen();
						
						//console.log(categoryItem);
					}else{
						showFailMessage(translate('trCategoryAlreadyExists'),4000);
					}					
				}						
							
			}else{
				showFailMessage(translate('trChooseIcon'),3000);
			}
		}else{
			showFailMessage(translate('trChooseColor'),3000);
		}
	}else{
		showFailMessage(translate('trChooseName'),3000);
	}
	
}

/////////////////
//INCOME RELATED
/////////////////

function incomeListObjects(whatToDo){
	if (whatToDo == 'show'){
		$('#tableListOfIncomes').show();
		$('#newIncomeCategory').show();
		$('#incomeCategoriesHeader').show();
		$('#incomeFooter').show();
		
		$('#addNewIncomeContainer').hide();
		$('#saveOrCloseNewIncome').hide();
		
	}else if (whatToDo == 'hide'){
		$('#tableListOfIncomes').hide();
		$('#newIncomeCategory').hide();
		$('#incomeCategoriesHeader').hide();
		$('#incomeFooter').hide();
		
		$('#addNewIncomeContainer').show();
		$('#saveOrCloseNewIncome').show();
	}
}

function showIncomeCategories(){
	hideAllPreviousScreens();
	
	
	//prepare list of incomes
	//console.log(G_selectedIncomeList);	
	var html = '';
	for (var i = 0; i<G_selectedIncomeList.length; i++){
		html = html 
			+'<tr>'										
				+'<td  align="left" valign="middle" width="55px" style="padding-left:7px"><div class="roundAroundIcons '+G_selectedIncomeList[i]['color']+'"> <img src="images/categories/'+G_selectedIncomeList[i]['img']+'" width="25"/></div> </td>'
				+'<td valign="middle"><span>'+translate(G_selectedIncomeList[i]['name'])+'</span></td>'
				+'<td valign="middle" align="center" width="55px" class="income_edit_category" id="incomeC'+i+'"><div class="colorIndicator rounded innershadowedit"><img src="images/edit_gray.png" width="22px" align="absmiddle" /></div></td>'						
			+'</tr>';
	}
	
	//fill list of incomes
	$('#tableListOfIncomes').html(html);
	$('.income_edit_category').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); editExistingIncomeCategory(this.id) });
	
	Screen.gotoPage('settingsdetailsscreen');
	incomeListObjects('show');
	$('#incomeCategories').show();	
}

function addNewIncomeCategory(){
	
	//reset last picked color and icond	
	$('#screenLabelAddNewIncome').html(translate('trNewIncomeCategory'));
	$('#deleteIncomeCategoryIcon').hide();
	$('#selColor'+G_selectedColor).css('background-color','#FFF');
	$('#selIcon'+G_selectedIcon).css('background-color','#FFF');
	$('#incomeColorIndicator').removeClass();
	$('#incomeIconIndicator').html('');
	
	
	incomeListObjects('hide');
	G_selectedcategoryName = '';
	G_selectedColor = '';
	G_selectedIcon = '';
	$('#newIncomeCategoryName').val('');
	G_CategoriesAction = 'newIncome';
	
}

function editExistingIncomeCategory(id){
	var eID = parseInt(id.replace("incomeC", ""));
	
	G_SelectedIncomeCategoryID = eID;
	//alert(eID);
	//console.log(G_selectedIncomeList);
	
	//prepare data for edit
	$('#screenLabelAddNewIncome').html(translate('trEditIncomeCategory'));
	$('#deleteIncomeCategoryIcon').show();
	$('#selColor'+G_selectedIncomeList[eID]['color']).css('background-color','#FFF9C4');
	$('#selIcon'+G_selectedIncomeList[eID]['img'].replace('.png','')).css('background-color','#FFF9C4');
	$('#incomeColorIndicator').addClass('colorsRoundBoder '+G_selectedIncomeList[eID]['color']);
	$('#incomeIconIndicator').html('<img src="images/categories/dark/'+G_selectedIncomeList[eID]['img']+'" width="27px;">');
	
	incomeListObjects('hide');
	G_selectedcategoryName = translate(G_selectedIncomeList[eID]['name']);
	G_selectedColor = G_selectedIncomeList[eID]['color'];
	G_selectedIcon = G_selectedIncomeList[eID]['img'].replace('.png','');
	$('#newIncomeCategoryName').val(G_selectedcategoryName);
	G_CategoriesAction = 'editIncome';
}


function closeNewIncome(){
	incomeListObjects('show');
	//reset last picked color
	resetNewAndEditIncomeScreen();
}

function resetNewAndEditIncomeScreen(){
	$('#selColor'+G_selectedColor).css('background-color','#FFF');
	$('#selIcon'+G_selectedIcon).css('background-color','#FFF');
	$('#incomeColorIndicator').removeClass();
	$('#incomeIconIndicator').html('');
}

/*
var G_selectedcategoryName = '';
var G_selectedColor = '';
var G_selectedIcon = '';
*/
function saveNewIncome(){
	
	G_selectedcategoryName = $('#newIncomeCategoryName').val();	
	G_selectedcategoryName = G_selectedcategoryName.trim();	
	G_selectedcategoryName = capitalizeFirstLetter(G_selectedcategoryName);
	var categoryItem = {
		'code':'',
		'color':'',
		'img':'',
		'name':'',
	}
	if(G_selectedcategoryName != ''){
		if (G_selectedColor != ''){
			if (G_selectedIcon != ''){
				//save new expense category
				if (G_CategoriesAction == 'newIncome'){
					//verify if name already exists
					var categoryExists = 0;
					for(var i = 0; i< G_selectedIncomeList.length; i++){
						if (translate((G_selectedIncomeList[i]['name']).toLowerCase()) == G_selectedcategoryName.toLowerCase()){
							categoryExists = 1;
						}
					}
					if (categoryExists == 0){	
						var dateCode2 = new Date();									
						categoryItem['code'] = dateCode2.getTime();//(G_selectedcategoryName.toLowerCase()).replace(/ /g,'');
						categoryItem['color'] = G_selectedColor;
						categoryItem['img'] = G_selectedIcon+'.png';
						categoryItem['name'] = G_selectedcategoryName;
						
						G_selectedIncomeList.push(categoryItem);
						//sort and save to local storage						
						G_selectedIncomeList.sort(function(a,b) {
							 if ( a.name < b.name )
								return -1;
							 if ( a.name > b.name )
								return 1;		
						});
						localStorage.setItem("G_selectedIncomeList",JSON.stringify({G_selectedIncomeList: G_selectedIncomeList}));
						writeLocalStorageToFile();
						
						//saved, go back to settings page
						showSuccessMessage(translate('trSuccessfullySave'),2500);
						showIncomeCategories();	
						resetNewAndEditIncomeScreen();
						
						//console.log(categoryItem);
					}else{
						showFailMessage(translate('trCategoryAlreadyExists'),4000);
					}					
				}
				
				
				//save existing expense category
				if (G_CategoriesAction == 'editIncome'){
					//verify if name already exists
					var categoryExists = 0;
					for(var i = 0; i< G_selectedIncomeList.length; i++){
						if (translate((G_selectedIncomeList[i]['name']).toLowerCase()) == G_selectedcategoryName.toLowerCase() && G_SelectedIncomeCategoryID != i){
							categoryExists = 1;
						}
					}
					if (categoryExists == 0){											
						categoryItem['code'] = G_selectedIncomeList[G_SelectedIncomeCategoryID]['code'];//(G_selectedcategoryName.toLowerCase()).replace(/ /g,'');
						categoryItem['color'] = G_selectedColor;
						categoryItem['img'] = G_selectedIcon+'.png';
						categoryItem['name'] = translate(G_selectedcategoryName);
						
						G_selectedIncomeList[G_SelectedIncomeCategoryID] = categoryItem;
						//sort and save to local storage						
						G_selectedIncomeList.sort(function(a,b) {
							 if ( a.name < b.name )
								return -1;
							 if ( a.name > b.name )
								return 1;		
						});
						localStorage.setItem("G_selectedIncomeList",JSON.stringify({G_selectedIncomeList: G_selectedIncomeList}));
						writeLocalStorageToFile();
						
						//saved, go back to settings page
						showSuccessMessage(translate('trSuccessfullySave'),2500);
						showIncomeCategories();	
						resetNewAndEditIncomeScreen();
						
						//console.log(categoryItem);
					}else{
						showFailMessage(translate('trCategoryAlreadyExists'),4000);
					}					
				}
				
							
			}else{
				showFailMessage(translate('trChooseIcon'),3000);
			}
		}else{
			showFailMessage(translate('trChooseColor'),3000);
		}
	}else{
		showFailMessage(translate('trChooseName'),3000);
	}
	
}



//income and expense - categories deletion
function showDeleteIncomeCategory(){
	$('#confirmIncomeCategoryDelete').show();
	G_DeleteIncomeCategoryConfirmation = 1;

}

function showDeleteExpenseCategory(){
	$('#confirmExpenseCategoryDelete').show();
	G_DeleteExpenseCategoryConfirmation = 1;
}

function doDeleteIncomeCategory(){
	//check if category was ever used
	if(G_selectedIncomeList.length > 1){
		var	wasUsed = 0;
		for (var i=0; i<G_FullEntryList.length; i++){
			for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
				if (G_FullEntryList[i]['transactionList'][j]['transactionCategoryCode'] == G_selectedIncomeList[G_SelectedIncomeCategoryID]['code']){
					wasUsed = 1;
				}
			}
		}
		if(wasUsed == 1){
			showFailMessage(translate('trDeleteCategoryFailMessage'),6000);
		}else{
			//delete category and save to localStorage
			G_selectedIncomeList.splice(G_SelectedIncomeCategoryID,1);
			G_selectedIncomeList.sort(function(a,b) {
				 if ( a.name < b.name )
					return -1;
				 if ( a.name > b.name )
					return 1;		
			});
			localStorage.setItem("G_selectedIncomeList",JSON.stringify({G_selectedIncomeList: G_selectedIncomeList}));
			writeLocalStorageToFile();
			
			//save
			showSuccessMessage(translate('trDeleteCategorySuccess'),2500);
			
			//go back to initial list
			showIncomeCategories();	
			resetNewAndEditIncomeScreen();
		}
	}else{
		showFailMessage(translate('trDeleteLastCategoryMessage'),5000);
	}
	
	closeDeleteIncomeCategory();
}

function doDeleteExpenseCategory(){
	//check if category was ever used
	if(G_selectedExpenseList.length > 1){
		var	wasUsed = 0;
		for (var i=0; i<G_FullEntryList.length; i++){
			for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
				if (G_FullEntryList[i]['transactionList'][j]['transactionCategoryCode'] == G_selectedExpenseList[G_SelectedExpenseCategoryID]['code']){
					wasUsed = 1;
				}
			}
		}
		if(wasUsed == 1){
			showFailMessage(translate('trDeleteCategoryFailMessage'),6000);
		}else{
			//delete category and save to localStorage
			G_selectedExpenseList.splice(G_SelectedExpenseCategoryID,1);
			G_selectedExpenseList.sort(function(a,b) {
				 if ( a.name < b.name )
					return -1;
				 if ( a.name > b.name )
					return 1;		
			});
			localStorage.setItem("G_selectedExpenseList",JSON.stringify({G_selectedExpenseList: G_selectedExpenseList}));
			writeLocalStorageToFile();
			//save
			showSuccessMessage(translate('trDeleteCategorySuccess'),2500);
			
			//go back to initial list
			showExpenseCategories();	
			resetNewAndEditExpenseScreen();
			
			
		}
	}else{
		showFailMessage(translate('trDeleteLastCategoryMessage'),5000);
	}
	
	closeDeleteExpenseCategory();
}

function closeDeleteIncomeCategory(){
	$('#confirmIncomeCategoryDelete').hide();
	G_DeleteIncomeCategoryConfirmation = 0;
}

function closeDeleteExpenseCategory(){
	$('#confirmExpenseCategoryDelete').hide();
	G_DeleteExpenseCategoryConfirmation = 0;
}




/////////////////////
//REMINDER RELATED
/////////////////////

function setupAllReminders(){

   /*var permissions = cordova.plugins.permissions;
   permissions.hasPermission(permissions.POST_NOTIFICATIONS, function( status ){
     if ( status.hasPermission ) {
       console.log("POST_NOTIFICATIONS is turned ON ");
     }
     else {
       console.log("POST_NOTIFICATIONS is turned OFF ");
     }
   });*/
  //permissions.requestPermission(permissions.POST_NOTIFICATIONS,  console.log(' Permission is turned on'),  console.log(' Permission is not turned on'));



   /*cordova.plugins.notification.local.hasPermission(function (granted) { if (granted != true) {
        cordova.plugins.notification.local.schedule({
                                title: translate('trDailyReminderTitle'),
                                text: translate('trDailyReminderMessage'),
                                smallIcon: "res://ic_stat_add_alert"

                            });
    } });*/

    if (G_IsDebugging == 0){
        cordova.plugins.notification.local.cancelAll(function() {
             // Notifications were cancelled
        }, reminderCallBack);
    }


	var remindersArray = [];
	var remindersListCopy = [];
	remindersListCopy = G_RemindersList.slice(0);

	var oneReminderItem = {
	   id: 0,
	   title: translate('trDailyReminderTitle'),
	   text: '',
	   trigger: {every :'' ,firstAt: G_today},
	   sound: ''
	}


	var totayReminder = {
	   'name':translate('trDailyReminderMessage'),
	   'repeatNumber': 1,
	   'repeatPeriod':'day',
	   'atTime':G_EveryDayReminderHour,
	   'startingFrom': dateToInt(G_today)
	}

	if (G_EveryDayReminderEnabled == 1){
	   //add daily reminder to list
	   remindersListCopy.push(totayReminder);
	}



	var firstAtDateTime = intToDate(dateToInt(G_today));
	var reminderText = 'Nothing else';
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var diffDays = 0;
	for (var i = 0; i < remindersListCopy.length; i++){
	   reminderText = 'Nothing else';
	   firstAtDateTime = intToDate(remindersListCopy[i]['startingFrom']);
	   firstAtDateTime.increaseTime(remindersListCopy[i]['atTime']);
	   reminderText = (remindersListCopy[i]['name']).substring(0,100);

	   if (remindersListCopy[i]['repeatPeriod'] == 'day'){

	       oneReminderItem = {
	           id: i,
	           title: translate('trDailyReminderTitle'),
	           text: reminderText,
	           trigger: { every: { hour: parseInt(remindersListCopy[i]['atTime']), minute: 0 } },
	           smallIcon: 'res://ic_stat_add_alert',
	           sound: ''
	       }
	   }else if (remindersListCopy[i]['repeatPeriod'] == 'week'){

	       oneReminderItem = {
	           id: i,
	           title: translate('trDailyReminderTitle'),
	           text: reminderText,
	           trigger: { every: { weekday : (firstAtDateTime.getDay() ), hour: parseInt(remindersListCopy[i]['atTime']), minute: 0 } },
	           smallIcon: 'res://ic_stat_add_alert',
	           sound: ''
	       }

	   }else if (remindersListCopy[i]['repeatPeriod'] == 'month'){
	       oneReminderItem = {
	           id: i,
	           title: translate('trDailyReminderTitle'),
	           text: reminderText,
	           trigger: { every: { day : (firstAtDateTime.getDate() ), hour: parseInt(remindersListCopy[i]['atTime']), minute: 0 } },
	           smallIcon: 'res://ic_stat_add_alert',
	           sound: ''
	       }
	   }

	         //exemplu de reminder
	         //trigger: { every: { day:1, hour: 20, minute: 0 } }, //mont
	         //trigger: { every: { weekday:1, hour: 20, minute: 0 } },//week
	         //trigger: { every: { hour: 20, minute: 0 } },//day




	   remindersArray.push(oneReminderItem);
	}


	//console.log(remindersArray);
	if (G_IsDebugging == 0){
	   if (remindersArray.length > 0){
	       cordova.plugins.notification.local.schedule(remindersArray);
	   }
	}

}

function reminderCallBack(){
}

function changeTimeOfTheDayForDailyReminder(direction){
	if (direction == -1 && G_EveryDayReminderHour > 1){
		G_EveryDayReminderHour = G_EveryDayReminderHour - 1;
	}else if (direction == 1 && G_EveryDayReminderHour < 24 ){
		G_EveryDayReminderHour = G_EveryDayReminderHour + 1;
	}else if (direction == -1 && G_EveryDayReminderHour == 1){
		G_EveryDayReminderHour = 24;
	}else if (direction == 1 && G_EveryDayReminderHour == 24){
		G_EveryDayReminderHour = 1;
	}
	$('#dailyReminderHour').html(G_EveryDayReminderHour);
	localStorage.setItem("G_EveryDayReminderHour",G_EveryDayReminderHour);
	writeLocalStorageToFile();
}


function showHideDailyReminder(){
	if (G_EveryDayReminderEnabled == 1){
		$('#dailyReminderDetailsContainer').hide();
		$('#dailyReminderCheckIcon').attr('src','images/empty_check_icon.png');
		$('#dailyReminderHour').html(G_EveryDayReminderHour);
		G_EveryDayReminderEnabled = 0;
	}else{
		$('#dailyReminderDetailsContainer').show();
		$('#dailyReminderCheckIcon').attr('src','images/full_check_icon.png');
		$('#dailyReminderHour').html(G_EveryDayReminderHour);
		G_EveryDayReminderEnabled = 1;		
	}
	localStorage.setItem("G_EveryDayReminderEnabled",G_EveryDayReminderEnabled);
	writeLocalStorageToFile();
}



function showReminders(){
	//console.log(G_RemindersList);
	hideAllPreviousScreens();
	G_CurrentDetailsScreen = 'reminders';
	
	//the daily reminder
	if (G_EveryDayReminderEnabled == 1){
		$('#dailyReminderDetailsContainer').show();
		$('#dailyReminderCheckIcon').attr('src','images/full_check_icon.png');
		$('#dailyReminderHour').html(G_EveryDayReminderHour);
	}else{
		$('#dailyReminderDetailsContainer').hide();
		$('#dailyReminderCheckIcon').attr('src','images/empty_check_icon.png');
		$('#dailyReminderHour').html(G_EveryDayReminderHour);
	}
	
	
	//list of other reminders	
	if(G_RemindersList.length > 0){
		$('#mesageForNoOtherReminders').hide();
		$('#tableListOfReminders').show();
		
	}else{
		$('#mesageForNoOtherReminders').show();
		$('#tableListOfReminders').hide();
	}
	var reminderListHtml = '';
		
	for (var i=0; i < G_RemindersList.length; i++){
		var StartingFromDate = intToDate(G_RemindersList[i]['startingFrom']);
		var sf = StartingFromDate.getMonthShortName() + ' ' +StartingFromDate.getDate()+' ' +StartingFromDate.getFullYear();
		reminderListHtml = reminderListHtml +
			'<tr>'+
				'<td valign="middle" height="65px;">'+
					'<div style="padding-left:14px;">'+G_RemindersList[i]['name']+'<br />'+
						'<span style="font-size:13px; color:#ff9600; line-height:14px;"><span>'+translate('trReminderEvery')+' </span><span>'+translate(G_repeatingPeriodsDef[G_RemindersList[i]['repeatPeriod']])+'</span><span>, '+translate('trReminderAt')+' </span><span>'+G_RemindersList[i]['atTime']+':00</span></span><br />'+
						'<span style="font-size:13px; color:#ff9600; line-height:14px;"><span>'+translate('trStartingFrom')+' </span><span>'+sf+'</span></span>'+
					'</div></td>'+
				'<td valign="middle" align="center" width="55px" class="reminder_edit" id="editReminder'+i+'">'+
					'<div class="colorIndicator rounded innershadowedit" style="padding-top:10px; padding-bottom:10px;"><img src="images/edit_gray.png" width="22px" align="absmiddle"></div>'+
				'</td>'+
			'</tr>';
	}
	$('#tableListOfReminders').html(reminderListHtml);
	$('.reminder_edit').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); editReminderWithID(parseInt(((this.id).replace('editReminder',''))))});
	
	Screen.gotoPage('settingsdetailsscreen');	
	$('#reminders').show();
}

function addNewReminder(){
	resetReminderForNewReminder();
	G_ReminderAction = 'new';
	Screen.gotoPage('neweditreminder');
	$('#headerLabelEditAddReminder').html(translate('trAddNewReminder'));
}

function editReminderWithID(id){
	//console.log(id);
	$('#headerLabelEditAddReminder').html(translate('trEditReminder'));
	resetReminderForNewReminder();
	G_ReminderAction = 'edit';

	G_SelectedReminderID = id;
	G_ReminderName = G_RemindersList[id]['name'];
	G_ReminderRepeatsEveryNumber = G_RemindersList[id]['repeatNumber'];
	G_ReminderRepeatsEveryPeriod = G_RemindersList[id]['repeatPeriod']; // available values : day | week | month
	G_ReminderTimeOfTheDay = G_RemindersList[id]['atTime'];
	G_ReminderStartDate = intToDate(G_RemindersList[id]['startingFrom']);
	
	setReminderValuesBasedOnVariables();
	refreshStartDateReminder();
	
	//show The correct buttons
	$('#addNewReminderBottomButtons').hide();
	$('#editReminderBottomButtons').show();
	$('#deleteReminderIcon').show();
	
	Screen.gotoPage('neweditreminder');	
}

function resetReminderForNewReminder(){
	$('#addNewReminderBottomButtons').show();
	$('#editReminderBottomButtons').hide();
	$('#deleteReminderIcon').hide();
	G_SelectedReminderID = -1;
	
	
	//variables that are used in the add/edit reminder
	G_ReminderName = '';
	G_ReminderRepeatsEveryNumber = 1;
	G_ReminderRepeatsEveryPeriod = 'day'; // available values : day | week | month
	G_ReminderTimeOfTheDay = 12;
	G_ReminderStartDate = new Date();
	
	setReminderValuesBasedOnVariables();
	refreshStartDateReminder();
	
}

function setReminderValuesBasedOnVariables(){
	$('#reminderName').val(G_ReminderName);
	$('#repeatsEveryText').html(G_ReminderRepeatsEveryNumber);
	$('#reminderTimeOfTheDayValue').html(G_ReminderTimeOfTheDay);	
	doSelectRepeatsEveryPeriod(G_ReminderRepeatsEveryPeriod);
	
}

function refreshStartDateReminder(){
	//display start and end date
	//start date 
	var startDateDay = G_ReminderStartDate.getDate();
	var startDateMonth = G_ReminderStartDate.getMonth();
	var startDateYear = G_ReminderStartDate.getFullYear();
	

	
	//show
	$('#reminderstartDateDay').html(startDateDay);
	$('#reminderstartDateMonth').html(translate(G_monthShortNames[startDateMonth]));
	$('#reminderstartDateYear').html(startDateYear);
}

function doSelectRepeatsEveryPeriod(level){
	
	$('#repeatsEveryDayButton').css('background-color','#FFF');
	$('#repeatsEveryWeekButton').css('background-color','#FFF');
	$('#repeatsEveryMonthButton').css('background-color','#FFF');
	
	$('#repeatsEveryDayIcon').html('');
	$('#repeatsEveryWeekIcon').html('');
	$('#repeatsEveryMonthIcon').html('');
	
	if (level == 'day'){
		$('#repeatsEveryDayButton').css('background-color','#FFEFBC');
		$('#repeatsEveryDayIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');		
	}else if (level == 'week'){
		$('#repeatsEveryWeekButton').css('background-color','#FFEFBC');
		$('#repeatsEveryWeekIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');		
	}else if (level == 'month'){
		$('#repeatsEveryMonthButton').css('background-color','#FFEFBC');
		$('#repeatsEveryMonthIcon').html('<img align="absmiddle" src="images/full_check_icon.png" width="17px;">');		
	}
	
	G_ReminderRepeatsEveryPeriod = level;
}

function changeReminderStartDate(level,direction){
	if (level == 'day'){
		G_ReminderStartDate.setDate(G_ReminderStartDate.getDate() + direction);
	}else if (level == 'month'){
		G_ReminderStartDate.setMonth(G_ReminderStartDate.getMonth() + direction);
	}else if (level == 'year'){
		G_ReminderStartDate.setFullYear(G_ReminderStartDate.getFullYear() + direction);
	}
	refreshStartDateReminder();
}

function changeReminderRepeatNumber(direction){
	if (direction == -1 && G_ReminderRepeatsEveryNumber > 1){
		G_ReminderRepeatsEveryNumber = G_ReminderRepeatsEveryNumber - 1;
	}else if (direction == 1 && G_ReminderRepeatsEveryNumber < 50 ){
		G_ReminderRepeatsEveryNumber = G_ReminderRepeatsEveryNumber + 1;
	}
	$('#repeatsEveryText').html(G_ReminderRepeatsEveryNumber);
}

function changeReminderTimeOfTheDay(direction){
	if (direction == -1 && G_ReminderTimeOfTheDay > 1){
		G_ReminderTimeOfTheDay = G_ReminderTimeOfTheDay - 1;
	}else if (direction == 1 && G_ReminderTimeOfTheDay < 24 ){
		G_ReminderTimeOfTheDay = G_ReminderTimeOfTheDay + 1;
	}else if (direction == -1 && G_ReminderTimeOfTheDay == 1){
		G_ReminderTimeOfTheDay = 24;
	}else if (direction == 1 && G_ReminderTimeOfTheDay == 24){
		G_ReminderTimeOfTheDay = 1;
	}
	$('#reminderTimeOfTheDayValue').html(G_ReminderTimeOfTheDay);
}


function saveNewReminder(){
	
	G_ReminderName = $('#reminderName').val();	
	
	
	var reminderItem = {
		'name':'',
		'repeatNumber': 1,
		'repeatPeriod':'day',
		'atTime':12,
		'startingFrom':20160331
	}
	
	if(G_ReminderName != ''){		
		//save new expense category
			
									
		reminderItem['name'] = G_ReminderName;
		reminderItem['repeatNumber'] = G_ReminderRepeatsEveryNumber;
		reminderItem['repeatPeriod'] = G_ReminderRepeatsEveryPeriod;
		reminderItem['atTime'] = G_ReminderTimeOfTheDay;
		reminderItem['startingFrom'] = dateToInt(G_ReminderStartDate);
		
		
		G_RemindersList.push(reminderItem);
		//sort and save to local storage						
		G_RemindersList.sort(function(a,b) {
			 if ( a.name < b.name )
				return -1;
			 if ( a.name > b.name )
				return 1;		
		});
		localStorage.setItem("G_RemindersList",JSON.stringify({G_RemindersList: G_RemindersList}));
		writeLocalStorageToFile();
		
		//saved, go back to settings page
		showSuccessMessage(translate('trSuccessfullySave'),2500);
		showReminders();
		setupAllReminders();
		
	}else{
		showFailMessage(translate('trFillReminderTitle'),3000);
	}
}

function saveExistingReminder(){
	
	G_ReminderName = ($('#reminderName').val()).trim();	
	
	if(G_ReminderName != ''){		
		//save new expense category
			
									
		G_RemindersList[G_SelectedReminderID]['name'] = G_ReminderName;
		G_RemindersList[G_SelectedReminderID]['repeatNumber'] = G_ReminderRepeatsEveryNumber;
		G_RemindersList[G_SelectedReminderID]['repeatPeriod'] = G_ReminderRepeatsEveryPeriod;
		G_RemindersList[G_SelectedReminderID]['atTime'] = G_ReminderTimeOfTheDay;
		G_RemindersList[G_SelectedReminderID]['startingFrom'] = dateToInt(G_ReminderStartDate);
		
		

		//sort and save to local storage						
		G_RemindersList.sort(function(a,b) {
			 if ( a.name < b.name )
				return -1;
			 if ( a.name > b.name )
				return 1;		
		});
		localStorage.setItem("G_RemindersList",JSON.stringify({G_RemindersList: G_RemindersList}));
		writeLocalStorageToFile();
		
		//saved, go back to settings page
		showSuccessMessage(translate('trSuccessfullySave'),2500);
		showReminders();
		setupAllReminders();
		
	}else{
		showFailMessage(translate('trFillReminderTitle'),3000);
	}
}


function showConfirmDeleteReminder(){
	G_DeleteExpenseCategoryConfirmation = 1;
	$('#confirmReminderDelete').show();
	$('#editReminderBottomButtons').hide();
	
}
function closeConfirmDeleteReminder(){
	G_DeleteExpenseCategoryConfirmation = 0;
	$('#confirmReminderDelete').hide();
	$('#editReminderBottomButtons').show();
}

function deleteReminder(){
	G_RemindersList.splice(G_SelectedReminderID,1);
	localStorage.setItem("G_RemindersList",JSON.stringify({G_RemindersList: G_RemindersList}));
	writeLocalStorageToFile();
	showSuccessMessage(translate('trSuccessfullyDeleted'),2500);
	closeConfirmDeleteReminder();
	showReminders();
}


/////////////////////
//CURRENCY RELATED
/////////////////////
function showCurrency(){
	G_CurrentDetailsScreen = 'choosecurrency';
	var html = '';
	var iconUsed = 'empty_check_icon.png';
	var backgroundUsed = 'style="background:none;"';
	for (var i = 0; i<G_currencyList.length; i++){
		if (i == G_SelectedCurrency){
			iconUsed = 'full_check_icon.png';
			backgroundUsed = 'style="background-color: #FFEFBC;"';
			html = 
			'<tr >'+
				'<td '+backgroundUsed+' id="currencyLine'+i+'"><table cellpadding="0" cellspacing="0" width="100%" class="chooseCurrency" id="currency'+i+'"><tr>'+
				'<td valign="middle"><span><strong>'+G_currencyList[i]['code']+'</strong> - '+G_currencyList[i]['name']+'</span></td>'+
				'<td valign="middle" align="center" width="55px" >'+
					'<div class="currencyDiv"><img src="images/'+iconUsed+'" id="currencySelectedIcon'+i+'" width="25px" align="absmiddle"></div>'+
				'</td>'+
				'</tr></table>'+
			'</tr>' + html; 
		}else{
			iconUsed = 'empty_check_icon.png';
			backgroundUsed = 'style="background:none;"';
			html = html +
			'<tr>'+
				'<td '+backgroundUsed+' id="currencyLine'+i+'"><table cellpadding="0" cellspacing="0" width="100%" class="chooseCurrency" id="currency'+i+'"><tr>'+
					'<td valign="middle"><span><strong>'+G_currencyList[i]['code']+'</strong> - '+G_currencyList[i]['name']+'</span></td>'+
					'<td valign="middle" align="center" width="55px" >'+
						'<div class="currencyDiv"><img src="images/'+iconUsed+'" id="currencySelectedIcon'+i+'" width="25px" align="absmiddle"></div>'+
					'</td>'+
					'</tr></table>'+
			'</tr>'; 
		}
		
		
		
	}
	
	//fill list of incomes
	$('#tableListOfCurrencies').html(html);
	$('.chooseCurrency').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseCurrency(parseInt((this.id).replace('currency',''))) });
	hideAllPreviousScreens();
	Screen.gotoPage('settingsdetailsscreen');
	$('#currency').show();
}

function chooseCurrency(id){
	//alert(G_SelectedCurrency);
	if(G_SelectedCurrency != id){
		$('#currencySelectedIcon'+id).attr('src','images/full_check_icon.png');
		$('#currencySelectedIcon'+G_SelectedCurrency).attr('src','images/empty_check_icon.png')
		$('#currencyLine'+G_SelectedCurrency).css('background', 'none');
		$('#currencyLine'+id).css('background-color', '#FFEFBC');
		G_SelectedCurrency = id;
		
		localStorage.setItem("G_SelectedCurrency",G_SelectedCurrency);
		writeLocalStorageToFile();
		
		if (G_CurrentDetailsScreenFromInit == 'choosecurrencyfrominit'){
			//no message for initial screen
		}else{
			showSuccessMessage(translate('trCurrencySaved'),2500);
		}
		navigateBack();
	}
}

/////////////////////
//CURRENCY FORMAT RELATED
/////////////////////
function showCurrencyFormat(){
	if (G_selectedCurrencyFormat == 1){	
		$('#currencyFormatChoose1').css('background-color', '#FFEFBC');
		$('#currencyFormatChoose1CheckIcon').attr('src','images/full_check_icon.png');		

		$('#currencyFormatChoose2').css('background', 'none');
		$('#currencyFormatChoose2CheckIcon').attr('src','images/empty_check_icon.png');	
	}else{
		$('#currencyFormatChoose1').css('background', 'none');
		$('#currencyFormatChoose1CheckIcon').attr('src','images/empty_check_icon.png');

		$('#currencyFormatChoose2').css('background-color', '#FFEFBC');
		$('#currencyFormatChoose2CheckIcon').attr('src','images/full_check_icon.png');
	}
	
	
	
	
	hideAllPreviousScreens();
	Screen.gotoPage('settingsdetailsscreen');
	$('#currencyFormat').show();
}

function chooseCurrencyFormat(id){
	if (id == 1){	
		$('#currencyFormatChoose1').css('background-color', '#FFEFBC');
		$('#currencyFormatChoose1CheckIcon').attr('src','images/full_check_icon.png');		

		$('#currencyFormatChoose2').css('background', 'none');
		$('#currencyFormatChoose2CheckIcon').attr('src','images/empty_check_icon.png');		
	}else{
		$('#currencyFormatChoose1').css('background', 'none');
		$('#currencyFormatChoose1CheckIcon').attr('src','images/empty_check_icon.png');

		$('#currencyFormatChoose2').css('background-color', '#FFEFBC');
		$('#currencyFormatChoose2CheckIcon').attr('src','images/full_check_icon.png');
	}
	
	G_selectedCurrencyFormat = id;
	
	if(G_selectedCurrencyFormat == 1){
		G_d = ',';
		G_t = '.';
		
	}else{
		G_d = '.';
		G_t = ',';
		
	}
	//console.log()
		
	localStorage.setItem("G_selectedCurrencyFormat",G_selectedCurrencyFormat);
	writeLocalStorageToFile();
	
	showSuccessMessage(translate('trSuccessfullySave'),1200);
	navigateBack();
}

/////////////////////
//FIRST DAY OF WEEK RELATED
/////////////////////
function showFirstDayOfWeek(){
	if (G_SelectedFirstDayOfWeek == 1){	
		$('#firstDayOfWeekChooseSunday').css('background-color', '#FFEFBC');
		$('#firstDaySundayCheckIcon').attr('src','images/full_check_icon.png');

		$('#firstDayOfWeekChooseMonday').css('background', 'none');
		$('#firstDayMondayCheckIcon').attr('src','images/empty_check_icon.png');	
	}else{
		$('#firstDayOfWeekChooseSunday').css('background', 'none');
		$('#firstDaySundayCheckIcon').attr('src','images/empty_check_icon.png');

		$('#firstDayOfWeekChooseMonday').css('background-color', '#FFEFBC');
		$('#firstDayMondayCheckIcon').attr('src','images/full_check_icon.png');
	}
	
	
	
	
	hideAllPreviousScreens();
	Screen.gotoPage('settingsdetailsscreen');
	$('#firstDayOfWeek').show();
}

function chooseFirstDayOfWeek(id){
	if (id == 1){	
		$('#firstDayOfWeekChooseSunday').css('background-color', '#FFEFBC');
		$('#firstDaySundayCheckIcon').attr('src','images/full_check_icon.png');

		$('#firstDayOfWeekChooseMonday').css('background', 'none');
		$('#firstDayMondayCheckIcon').attr('src','images/empty_check_icon.png');	
	}else{
		$('#firstDayOfWeekChooseSunday').css('background', 'none');
		$('#firstDaySundayCheckIcon').attr('src','images/empty_check_icon.png');

		$('#firstDayOfWeekChooseMonday').css('background-color', '#FFEFBC');
		$('#firstDayMondayCheckIcon').attr('src','images/full_check_icon.png');
	}
	
	G_SelectedFirstDayOfWeek = id;
		
	localStorage.setItem("G_SelectedFirstDayOfWeek",G_SelectedFirstDayOfWeek);
	writeLocalStorageToFile();
	
	showSuccessMessage(translate('trSuccessfullySave'),1200);
	navigateBack();
}


/////////////////////
//LANGUAGE RELATED
/////////////////////
function showLanguage(){
	hideAllPreviousScreens();
	$('.languageIcon').attr('src','images/empty_check_icon.png');
	$('#iconLanguage'+G_CurrentLanguage).attr('src','images/full_check_icon.png');
	
	Screen.gotoPage('settingsdetailsscreen');
	$('#language').show();
}

function choosePreferredLanguage(code){
	translateToCODE(code,1);	
	$('.languageIcon').attr('src','images/empty_check_icon.png');
	$('#iconLanguage'+code).attr('src','images/full_check_icon.png');
	navigateBack();
}


////////////////////////////
//PASSWORD RELATED
////////////////////////////
function showPassword(){
	hideAllPreviousScreens();
	G_InsertedPassword = '';
	if (G_SelectedPassword == ''){
		$('#setPasswordTitle').html(translate('trSetPassword'));
		$('#passwordSmallDetails').html(translate('trTapToSetPassword'));
		$('#hasPasswordIcon').attr('src','images/unlocked.png');
		$('#passwordActionContainer').hide();
		$('#removeOrChangePasswordContainer').hide();
		$('#setNewPasswordContainer').hide();
	}else{
		$('#passwordActionContainer').show();
		$('#removeOrChangePasswordContainer').hide();
		$('#setNewPasswordContainer').hide();
		$('#setPasswordTitle').html(translate('trPassword'));
		$('#passwordSmallDetails').html('');
		$('#hasPasswordIcon').attr('src','images/locked.png');
	}
	
	Screen.gotoPage('settingsdetailsscreen');
	$('#password').show();
}

function prepareSetPassword(){
	//var G_SelectedPassword = '';
	//var G_PasswordRecoveryEmail = '';
	
	if (G_SelectedPassword == '' && !($('#setNewPasswordContainer').is(":visible")) ){
		G_InsertedPassword = '';
		$('#passwordRecoveryEmail').val('');
		$('#passCode1').val('');
		$('#passCode2').val('');
		$('#passCode3').val('');
		$('#passCode4').val('');
		
		$('#passwordActionContainer').hide();
		$('#removeOrChangePasswordContainer').hide();
		$('#setNewPasswordContainer').show();
		$('#setPasswordTitle').html('Set password');
		$('#passwordSmallDetails').html('');
		$('#hasPasswordIcon').attr('src','images/unlocked.png');
	}
}

function typeSetPassword(code){
	if(G_InsertedPassword.length < 4){
		G_InsertedPassword = G_InsertedPassword+code;
		
		if (G_InsertedPassword.length == 1){
			$('#passCode1').val(code);
		}else if (G_InsertedPassword.length == 2){
			$('#passCode2').val(code);
		}else if (G_InsertedPassword.length == 3){
			$('#passCode3').val(code);
		}else if (G_InsertedPassword.length == 4){
			$('#passCode4').val(code);
		}		
	}
}

function saveNewPassword(){
	var recoveryEmail = $('#passwordRecoveryEmail').val();
	recoveryEmail = (recoveryEmail.toLowerCase()).trim();
	recoveryEmail = recoveryEmail.replace(/ /g,'');
	
	if (recoveryEmail == '' || recoveryEmail.length < 5 || !validateEmail(recoveryEmail)){
		showFailMessage(translate('trTapValidEmail'),2500);
	}else if (G_InsertedPassword.length <4){
		showFailMessage(translate('trType4DigitPass'),2500);
	}else{
		G_SelectedPassword = md5(G_InsertedPassword);	
		G_PasswordRecoveryEmail = recoveryEmail;
		localStorage.setItem("G_SelectedPassword",G_SelectedPassword);

		
		localStorage.setItem("G_PasswordRecoveryEmail",G_PasswordRecoveryEmail);
		writeLocalStorageToFile();
		
		showSuccessMessage(translate('trPasswordSaved'),1800);
		showPassword();
		G_InsertedPassword = '';
	}
	
}

function setPasswordKeyboardClear(){
	G_InsertedPassword = '';
	$('#passCode1').val('');
	$('#passCode2').val('');
	$('#passCode3').val('');
	$('#passCode4').val('');
}



function closeSetPassword(){
	showPassword();
	G_InsertedPassword = '';
	$('#passwordRecoveryEmail').val('');
	$('#passCode1').val('');
	$('#passCode2').val('');
	$('#passCode3').val('');
	$('#passCode4').val('');
}




function changePassword(){
	$('#passwordActionContainer').hide();
	$('#removeOrChangePasswordContainer').show();
	$('#setNewPasswordContainer').hide();
	$('#setPasswordTitle').html(translate('tranChangePassword'));
	$('#confirmMessage').html(translate('trConfirmPasswordRemoval'));	
	$('#passwordSmallDetails').html('');
	$('#hasPasswordIcon').attr('src','images/locked.png');
	G_PasswordAction = 'change';
	G_InsertedPassword = '';
	$('#confirmpassCode1').val('');
	$('#confirmpassCode2').val('');
	$('#confirmpassCode3').val('');
	$('#confirmpassCode4').val('');
}

function removePassword(){
	$('#passwordActionContainer').hide();
	$('#removeOrChangePasswordContainer').show();
	$('#setNewPasswordContainer').hide();
	$('#setPasswordTitle').html(translate('trRemovePassword'));
	$('#confirmMessage').html(translate('trConfirmPasswordRemoval'));	
	$('#passwordSmallDetails').html('');
	$('#hasPasswordIcon').attr('src','images/locked.png');
	G_PasswordAction = 'remove';
	G_InsertedPassword = '';
	$('#confirmpassCode1').val('');
	$('#confirmpassCode2').val('');
	$('#confirmpassCode3').val('');
	$('#confirmpassCode4').val('');
}

function confirmPasswordKeyboardClear(){
	G_InsertedPassword = '';
	$('#confirmpassCode1').val('');
	$('#confirmpassCode2').val('');
	$('#confirmpassCode3').val('');
	$('#confirmpassCode4').val('');
}
 
function closeConfirmPassword(){
	showPassword();
	G_InsertedPassword = '';
	$('#confirmpassCode1').val('');
	$('#confirmpassCode2').val('');
	$('#confirmpassCode3').val('');
	$('#confirmpassCode4').val('');
}


function typeConfirmPassword(code){
	if(G_InsertedPassword.length < 4){
		G_InsertedPassword = G_InsertedPassword+code;
		
		if (G_InsertedPassword.length == 1){
			$('#confirmpassCode1').val(code);
		}else if (G_InsertedPassword.length == 2){
			$('#confirmpassCode2').val(code);
		}else if (G_InsertedPassword.length == 3){
			$('#confirmpassCode3').val(code);
		}else if (G_InsertedPassword.length == 4){
			$('#confirmpassCode4').val(code);
		}	
		//remove password
		if (G_InsertedPassword.length == 4 && md5(G_InsertedPassword) == G_SelectedPassword && G_PasswordAction == 'remove'){
			//console.log(G_InsertedPassword+ ' - ' + G_SelectedPassword);
			G_SelectedPassword = '';	
			G_PasswordRecoveryEmail = '';
			localStorage.setItem("G_SelectedPassword",G_SelectedPassword);

			
			localStorage.setItem("G_PasswordRecoveryEmail",G_PasswordRecoveryEmail);
			writeLocalStorageToFile();
			
			showSuccessMessage(translate('trSuccessRemovePass'),1800);
			showPassword();
			G_InsertedPassword = '';
		}else if (G_InsertedPassword.length == 4 && md5(G_InsertedPassword) == G_SelectedPassword && G_PasswordAction == 'change'){
			//console.log(G_InsertedPassword+ ' - ' + G_SelectedPassword);
			G_InsertedPassword = '';
			$('#passwordRecoveryEmail').val(G_PasswordRecoveryEmail);
			$('#passCode1').val('');
			$('#passCode2').val('');
			$('#passCode3').val('');
			$('#passCode4').val('');
			
			$('#passwordActionContainer').hide();
			$('#removeOrChangePasswordContainer').hide();
			$('#setNewPasswordContainer').show();
			$('#setPasswordTitle').html(translate('trSetPassword'));
			$('#passwordSmallDetails').html('');
			$('#hasPasswordIcon').attr('src','images/unlocked.png');				
		}else if(G_InsertedPassword.length == 4 && md5(G_InsertedPassword) != G_SelectedPassword){
			showFailMessage(translate('trIncorrectOldPassword'),1800);
			G_InsertedPassword = '';
			$('#confirmpassCode1').val('');
			$('#confirmpassCode2').val('');
			$('#confirmpassCode3').val('');
			$('#confirmpassCode4').val('');
		}
		
	}
}
////////////////////////////
//DATA RESET RELATED
////////////////////////////
function showResetAllData(){
	G_DeleteAllAppData = 1;	
	$('#confirmResetAppData').show();
}

function closeResetAppDataConfirmation(){	
	G_DeleteAllAppData = 0;	
	$('#confirmResetAppData').hide();
}


function yesResetApplicationData(){
	localStorage.clear();
	closeResetAppDataConfirmation();
	showSuccessMessage(translate('trAllAppDataDeleted'),3000);
	
	G_InitialScreenPassed = 0;
	G_SelectedCurrency = 106;
	G_SelectedFirstDayOfWeek = 1;
	G_SelectedPassword = '';
	G_PasswordRecoveryEmail = '';
	G_FullEntryList = [];
	G_RemindersList = [];
	G_EveryDayReminderHour = 20;
	G_EveryDayReminderEnabled = 1;
	G_selectedCurrencyFormat = 1;
	G_NumberOfAppStarts = 0;

    G_Content = '';
    writeLocalStorageToFileWhenAllDataIsErased();

	application.DoDeviceReady()
}

function showRateApp(){
	
	$('#askForReviewPanel').hide();
	window.open("market://details?id=com.smartexpenditure", "_system");
	//alert('rateApp');
}

/* ----------------------------------------------------------------------------------------------------------------
---------------------------------------------Chart summary actions and functions--------------------------------
 ---------------------------------------------------------------------------------------------------------------- */
function initiateChartScreen(){	
	//alert('aici');
	var currentDate = intToDate(dateToInt(G_today));
	
	var todaySelectedYear = currentDate.getFullYear();
	var todaySelectedMonth = currentDate.getMonth() + 1;
	
	
	
	if (todaySelectedMonth == G_chosenMonth && todaySelectedYear == G_chosenYear){
		G_ChartSelectedWeek = currentDate.getWeekNumber();
		G_ChartSelectedMonth = currentDate.getMonth() + 1;
		G_ChartSelectedYear = currentDate.getFullYear();
	}else{
		G_ChartSelectedWeek = (intToDate(parseInt(G_chosenYear+pad(G_chosenMonth.toString(),2)+'01'))).getWeekNumber();
		G_ChartSelectedMonth = G_chosenMonth;
		G_ChartSelectedYear = G_chosenYear;
	}
	
	
	
	//console.log (G_ChartSelectedWeek + ' - ' + G_ChartSelectedMonth + ' - ' +G_ChartSelectedYear );

}

function prepareGraphNavigationBottom(){
	//alert('asd');
	if (G_SelectedTimeFrame == 'weekly'){
		
		var weekStartDate = getDateOfISOWeek(G_ChartSelectedWeek,G_ChartSelectedYear);
		
		var nrOfDaysToRemove = 4;
		if (G_SelectedFirstDayOfWeek == 1){
			weekStartDate.setDate(weekStartDate.getDate() - 1);
			nrOfDaysToRemove = 3;
		}else{
			weekStartDate = weekStartDate;	
			nrOfDaysToRemove = 4;
		}		
		var weekEndDate = new Date(weekStartDate);		
		weekEndDate.setDate(weekEndDate.getDate() + 6);
		
		
		var nextWeekFirstDay = new Date(weekEndDate);
		nextWeekFirstDay.setDate(nextWeekFirstDay.getDate() + nrOfDaysToRemove);
		
		var prevWeekDay = new Date(weekStartDate);		
		prevWeekDay.setDate(prevWeekDay.getDate() - nrOfDaysToRemove);
		
		//console.log(weekStartDate + ' - ' +nextWeekFirstDay + ' - ' + prevWeekDay);		
		
		G_ChartSelectedNextWeek = nextWeekFirstDay.getWeekNumber();
		G_ChartSelectedNextMonth = nextWeekFirstDay.getMonth() + 1;
		G_ChartSelectedNextYear = nextWeekFirstDay.getFullYear();
		
		G_ChartSelectedPrevWeek = prevWeekDay.getWeekNumber();
		G_ChartSelectedPrevMonth = prevWeekDay.getMonth() + 1;
		G_ChartSelectedPrevYear = prevWeekDay.getFullYear();
		
		
		//console.log(prevWeekDay+' - '+G_ChartSelectedPrevYear + ' - ' +G_ChartSelectedPrevWeek);		
		
		$('#chartNextLabel').html(G_ChartSelectedNextYear+'<br>'+translate('Week')+' '+G_ChartSelectedNextWeek);
		$('#chartPrevLabel').html(G_ChartSelectedPrevYear+'<br>'+translate('Week')+' '+G_ChartSelectedPrevWeek);
		$('#detailsHeaderTimeFrame').html(G_ChartSelectedYear+', '+translate('Week')+' '+G_ChartSelectedWeek+' ('+weekStartDate.getDate()+' '+weekStartDate.getMonthShortName()+' -> '+weekEndDate.getDate()+' '+weekEndDate.getMonthShortName()+')');
		
		//console.log(weekStartDate + ' - ' + G_ChartSelectedPrevWeek+' - '+ G_ChartSelectedNextWeek);		
	}else if (G_SelectedTimeFrame == 'monthly'){
		if (G_ChartSelectedMonth == 1){
			G_ChartSelectedNextMonth = G_ChartSelectedMonth + 1;
			G_ChartSelectedNextYear = G_ChartSelectedYear;
			
			G_ChartSelectedPrevMonth = 12;
			G_ChartSelectedPrevYear = G_ChartSelectedYear - 1;
		}else if (G_ChartSelectedMonth == 12){
			G_ChartSelectedNextMonth = 1;
			G_ChartSelectedNextYear = G_ChartSelectedYear + 1;
			
			G_ChartSelectedPrevMonth = G_ChartSelectedMonth - 1;
			G_ChartSelectedPrevYear = G_ChartSelectedYear;
		}else {
			G_ChartSelectedNextMonth = G_ChartSelectedMonth + 1;
			G_ChartSelectedNextYear = G_ChartSelectedYear
			
			G_ChartSelectedPrevMonth = G_ChartSelectedMonth - 1;
			G_ChartSelectedPrevYear = G_ChartSelectedYear;
		}
		//G_ChartSelectedPrevWeek = (intToDate(parseInt(G_ChartSelectedYear+pad(G_ChartSelectedMonth.toString(),2)+'01'))).getWeekNumber();
		if (G_ChartSelectedMonth != ((intToDate(dateToInt(G_today))).getMonth() + 1)){
			G_ChartSelectedWeek = (intToDate(parseInt(G_ChartSelectedYear+pad(G_ChartSelectedMonth.toString(),2)+'01'))).getWeekNumber();
		}else{
			G_ChartSelectedWeek = (intToDate(dateToInt(G_today))).getWeekNumber();
		}

		
		
		$('#chartNextLabel').html(translate(G_monthShortNames[G_ChartSelectedNextMonth-1])+'<br>'+G_ChartSelectedNextYear);
		$('#chartPrevLabel').html(translate(G_monthShortNames[G_ChartSelectedPrevMonth-1])+'<br>'+G_ChartSelectedPrevYear);
		$('#detailsHeaderTimeFrame').html(translate(G_monthFullNames[G_ChartSelectedMonth-1])+ ' ' + G_ChartSelectedYear);
		
	}else if (G_SelectedTimeFrame == 'yearly'){
		
		if (G_ChartSelectedYear != ((intToDate(dateToInt(G_today))).getFullYear())){
			G_ChartSelectedMonth = 1;
		}else{
			G_ChartSelectedMonth = ((intToDate(dateToInt(G_today))).getMonth() + 1);
		}
		
		
		
		if (G_ChartSelectedYear != ((intToDate(dateToInt(G_today))).getFullYear())){
			G_ChartSelectedWeek = (intToDate(parseInt(G_ChartSelectedYear+pad(G_ChartSelectedMonth.toString(),2)+'01'))).getWeekNumber();
		}else{
			G_ChartSelectedWeek = (intToDate(dateToInt(G_today))).getWeekNumber();
		}
		
		//console.log(G_ChartSelectedMonth + ' - '+ G_ChartSelectedWeek);
		
		G_ChartSelectedNextYear = G_ChartSelectedYear + 1;
		G_ChartSelectedPrevYear = G_ChartSelectedYear - 1;
		$('#chartNextLabel').html(G_ChartSelectedNextYear);
		$('#chartPrevLabel').html(G_ChartSelectedPrevYear);
		$('#detailsHeaderTimeFrame').html(G_ChartSelectedYear);
	}else if (G_SelectedTimeFrame == 'custom'){
		var oneDay = 24*60*60*1000;
		var dayDiff = Math.round(Math.abs((G_CustomEndDate.getTime() - G_CustomStartDate.getTime())/(oneDay)));
		
		
		G_CustomNextStartDate = new Date(G_CustomEndDate);
		G_CustomNextEndDate = new Date(G_CustomEndDate);
		
		G_CustomPrevStartDate = new Date(G_CustomStartDate);
		G_CustomPrevEndDate = new Date(G_CustomStartDate);
		
		G_CustomNextStartDate.setDate(G_CustomNextStartDate.getDate()+1);
		G_CustomNextEndDate.setDate(G_CustomNextEndDate.getDate()+(dayDiff+1));
		
		G_CustomPrevStartDate.setDate(G_CustomPrevStartDate.getDate()-(dayDiff+1));
		G_CustomPrevEndDate.setDate(G_CustomPrevEndDate.getDate()-1);
		
		
				
		$('#chartNextLabel').html('<span style="font-size:12px;">'+G_CustomNextStartDate.getMonthShortName() + ' ' +G_CustomNextStartDate.getDate()+' ' +G_CustomNextStartDate.getFullYear()+'</span><br><span style="font-size:12px;">'+G_CustomNextEndDate.getMonthShortName() + ' ' +G_CustomNextEndDate.getDate()+' ' +G_CustomNextEndDate.getFullYear()+'</span>');
		$('#chartPrevLabel').html('<span style="font-size:12px;">'+G_CustomPrevStartDate.getMonthShortName() + ' ' +G_CustomPrevStartDate.getDate()+' ' +G_CustomPrevStartDate.getFullYear()+'</span><br><span style="font-size:12px;">'+G_CustomPrevEndDate.getMonthShortName() + ' ' +G_CustomPrevEndDate.getDate()+' ' +G_CustomPrevEndDate.getFullYear()+'</span>');
		$('#detailsHeaderTimeFrame').html('<span style="font-size:14px;">'+G_CustomStartDate.getMonthShortName() + ' ' +G_CustomStartDate.getDate()+' ' +G_CustomStartDate.getFullYear()+'</span><br><span style="font-size:14px;">'+G_CustomEndDate.getMonthShortName() + ' ' +G_CustomEndDate.getDate()+' ' +G_CustomEndDate.getFullYear()+'</span>');
	}
	
	//display Charts
	if (G_ChartType == 'expense'){
		generateAndPopulateExpenseChart();
	}else if (G_ChartType == 'income'){
		generateAndPopulateIncomeChart();
	}else if (G_ChartType == 'balance'){
		generateAndPopulateBalanceChart();
	}
	
}

function chartNavigateInTime(direction){
	if (G_SelectedTimeFrame == 'custom'){
		if (direction == 1){
			G_CustomStartDate = G_CustomNextStartDate;
			G_CustomEndDate = G_CustomNextEndDate;
		}else if (direction == -1){
			G_CustomStartDate = G_CustomPrevStartDate;
			G_CustomEndDate = G_CustomPrevEndDate;
		}		
	}else{
		if (direction == 1){
			G_ChartSelectedWeek = G_ChartSelectedNextWeek;
			G_ChartSelectedMonth = G_ChartSelectedNextMonth;
			G_ChartSelectedYear = G_ChartSelectedNextYear;
		}else if (direction == -1){
			G_ChartSelectedWeek = G_ChartSelectedPrevWeek;
			G_ChartSelectedMonth = G_ChartSelectedPrevMonth;
			G_ChartSelectedYear = G_ChartSelectedPrevYear;
		}
	}
	prepareGraphNavigationBottom();
}



function fillInChart(transactionList,totalAmount,firstAmount,numberOfTransactions){
	var htmlChartCategoriesList = '';
	var htmlChartCategoriesAmountList = '';
	
	var catName = '';
	var catCode = -1;
	var selCat = [];	
	var style='';
	//left column in chart
	for (var i=0; i < transactionList.length; i++){
		style='';
		selCat = [];
		if (G_ChartType == 'expense'){
			selCat.push(G_selectedExpenseList[getCategoryID('expense',transactionList[i]['transactionCategoryCode'])]);
		}else if (G_ChartType == 'income'){
			selCat.push(G_selectedIncomeList[getCategoryID('income',transactionList[i]['transactionCategoryCode'])]);
		}
		
		if (i == (transactionList.length-1)){
			style='style="border-bottom:none;"';
		}
		
		catName = translate(selCat[0]['name']);
		catCode = selCat[0]['code'];
		if (catName.length > 15){
			catName = catName.substring(0, 13) + '...';
		}
		htmlChartCategoriesList = htmlChartCategoriesList+		
		'<table width="100%" cellpadding="0" cellspacing="0" class="chartSpacing" '+style+' id="chartScreenChartCategory'+catCode+'">'+
			'<tr>'+
				'<td class="chartTextDetails" '+style+'>'+catName+'</td>'+
				'<td class="chartIconDetails"  align="right"><div class="roundAroundIconsSmall '+selCat[0]['color']+'"><img src="images/categories/'+selCat[0]['img']+'"></div></td>'+
			'</tr>'+
		'</table>';	
	}
	
	
	//right column in chart
	var width = '10%';
	var tPerc = 0;

	for (var i=0; i < transactionList.length; i++){
		selCat = [];
		if (G_ChartType == 'expense'){
			selCat.push(G_selectedExpenseList[getCategoryID('expense',transactionList[i]['transactionCategoryCode'])]);
		}else if (G_ChartType == 'income'){
			selCat.push(G_selectedIncomeList[getCategoryID('income',transactionList[i]['transactionCategoryCode'])]);
		}
		
		if (i==0){
			width = '100%';
		}else{
			width = (Math.round((transactionList[i]['transactionAmount'] * 100)/firstAmount)).toString() + '%';
		}
		//console.log(totalAmount);
		tPerc = (parseFloat((transactionList[i]['transactionAmount'] * 100)/totalAmount).toFixed(1)).toString();
		
		htmlChartCategoriesAmountList = htmlChartCategoriesAmountList+
			'<table width="100%" cellpadding="0" cellspacing="0" class="chartSpacingRight"><tr>'+                                       	
				'<td>'+
					'<div class="roundedDetails '+selCat[0]['color']+' chartBar" style="width:'+width+';">'+tPerc+'%</div>'+
					'<div class="graphText">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(transactionList[i]['transactionAmount']).formatMoney(2)+'</div>'+													  
				'</td>'+
			'</tr></table>';
	}
	
	$('#chartCategoriesList').html(htmlChartCategoriesList);
	$('#chartCategoriesAmountList').html(htmlChartCategoriesAmountList);
	$('#chartTotalNumberOfTransactions').html(numberOfTransactions);
	if (G_ChartType == 'expense'){
		$('#graphTotalAmountLabel').html(translate('trTotalExpenseAmount'));
	}else{
		$('#graphTotalAmountLabel').html(translate('trTotalIncomeAmount'));
	}
	
	$('#chartTotalAmount').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+parseFloat(totalAmount).formatMoney(2));
	
	$('.chartSpacing').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showTransactionsForCategory(parseInt((this.id).replace('chartScreenChartCategory',''))) });
	
	//show it
	$('#expenseAndIncomeChart').show();
	$('#noDataForTheChart').hide();
	$('#balanceChartContainer').hide();
	
}


function fillInExpenseChartMainScreen(transactionList,totalAmount,firstAmount,numberOfTransactions){
	var htmlChartCategoriesList = '';
	var htmlChartCategoriesAmountList = '';
	
	var catName = '';
	var catCode = -1;
	var selCat = [];
	var style='';
	//left column in chart
	var chartLength = 4;
	if(transactionList.length < 4){
		chartLength = transactionList.length;
	}
	for (var i=0; i < chartLength; i++){
		style='';
		selCat = [];
		
		selCat.push(G_selectedExpenseList[getCategoryID('expense',transactionList[i]['transactionCategoryCode'])]);		
		if (i == (chartLength-1)){
			style='style="border-bottom:none;"';
		}
		
		catName = translate(selCat[0]['name']);
		catCode = selCat[0]['code'];
		if (catName.length > 15){
			catName = catName.substring(0, 13) + '...';
		}
		htmlChartCategoriesList = htmlChartCategoriesList+		
		'<table width="100%" cellpadding="0" cellspacing="0" class="chartSpacing1" '+style+' id="mainScreenChartCategory'+catCode+'">'+
			'<tr>'+
				'<td class="chartTextDetails" '+style+'>'+catName+'</td>'+
				'<td class="chartIconDetails" align="right" ><div class="roundAroundIconsSmall '+selCat[0]['color']+'"><img src="images/categories/'+selCat[0]['img']+'"></div></td>'+
			'</tr>'+
		'</table>';	
	}
	
	
	//right column in chart
	var width = '10%';
	var tPerc = 0;

	for (var i=0; i < chartLength; i++){
		selCat = [];
		
		selCat.push(G_selectedExpenseList[getCategoryID('expense',transactionList[i]['transactionCategoryCode'])]);
		if (i==0){
			width = '100%';
		}else{
			width = (Math.round((transactionList[i]['transactionAmount'] * 100)/firstAmount)).toString() + '%';
		}
		//console.log(totalAmount);
		tPerc = (parseFloat((transactionList[i]['transactionAmount'] * 100)/totalAmount).toFixed(1)).toString();
		
		htmlChartCategoriesAmountList = htmlChartCategoriesAmountList+
			'<table width="100%" cellpadding="0" cellspacing="0" class="chartSpacingRight1"><tr>'+                                       	
				'<td>'+
					'<div class="roundedDetails '+selCat[0]['color']+' chartBar" style="width:'+width+';">'+tPerc+'%</div>'+
					'<div class="graphText">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(transactionList[i]['transactionAmount']).formatMoney(2)+'</div>'+													  
				'</td>'+
			'</tr></table>';
	}
	
	$('#expenseMainChartLeftColumn').html(htmlChartCategoriesList);
	$('#expenseMainChartRightColumn').html(htmlChartCategoriesAmountList);	
	$('.chartSpacing1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showTransactionsForCategory(parseInt((this.id).replace('mainScreenChartCategory',''))) });
	
	//show it if is not empty
	
	$('#expenseMainChartSample').hide();
	$('#expenseMessageOverlay').hide();
	$('#viewMoreExpense').show();
	$('#expenseMainChart').show();	
}


function fillInIncomeChartMainScreen(transactionList,totalAmount,firstAmount,numberOfTransactions){
	var htmlChartCategoriesList = '';
	var htmlChartCategoriesAmountList = '';
	
	var catName = '';
	var catCode = -1;
	var selCat = [];
	var style='';
	//left column in chart
	var chartLength = 4;
	if(transactionList.length < 4){
		chartLength = transactionList.length;
	}
	for (var i=0; i < chartLength; i++){
		style='';
		selCat = [];
		
		selCat.push(G_selectedIncomeList[getCategoryID('income',transactionList[i]['transactionCategoryCode'])]);		
		if (i == (chartLength-1)){
			style='style="border-bottom:none;"';
		}
		
		catName = translate(selCat[0]['name']);
		catCode = selCat[0]['code'];
		if (catName.length > 15){
			catName = catName.substring(0, 13) + '...';
		}
		htmlChartCategoriesList = htmlChartCategoriesList+		
		'<table width="100%" cellpadding="0" cellspacing="0" class="chartSpacing1" '+style+' id="mainScreenChartCategory'+catCode+'">'+
			'<tr>'+				
				'<td class="chartTextDetails" '+style+'>'+catName+'</td>'+
				'<td class="chartIconDetails"  align="right"><div class="roundAroundIconsSmall '+selCat[0]['color']+'"><img src="images/categories/'+selCat[0]['img']+'"><div></td>'+
			'</tr>'+
		'</table>';	
	}
	
	
	//right column in chart
	var width = '10%';
	var tPerc = 0;

	for (var i=0; i < chartLength; i++){
		selCat = [];
		
		selCat.push(G_selectedIncomeList[getCategoryID('income',transactionList[i]['transactionCategoryCode'])]);
		if (i==0){
			width = '100%';
		}else{
			width = (Math.round((transactionList[i]['transactionAmount'] * 100)/firstAmount)).toString() + '%';
		}
		//console.log(totalAmount);
		tPerc = (parseFloat((transactionList[i]['transactionAmount'] * 100)/totalAmount).toFixed(1)).toString();
		
		htmlChartCategoriesAmountList = htmlChartCategoriesAmountList+
			'<table width="100%" cellpadding="0" cellspacing="0" class="chartSpacingRight1"><tr>'+                                       	
				'<td>'+
					'<div class="roundedDetails '+selCat[0]['color']+' chartBar" style="width:'+width+';">'+tPerc+'%</div>'+
					'<div class="graphText">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(transactionList[i]['transactionAmount']).formatMoney(2)+'</div>'+													  
				'</td>'+
			'</tr></table>';
	}
	
	$('#incomeMainChartLeftColumn').html(htmlChartCategoriesList);
	$('#incomeMainChartRightColumn').html(htmlChartCategoriesAmountList);
	
	$('.chartSpacing1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showTransactionsForCategory(parseInt((this.id).replace('mainScreenChartCategory',''))) });	
	
	//show it if is not empty
	
	$('#incomeMainChartSample').hide();
	$('#incomeMessageOverlay').hide();
	$('#viewMoreIncome').show();
	$('#incomeMainChart').show();	
}

function generateAndPopulateExpenseChart(){
	var listOfTransactions = [];
	
	//make array with all transactions from the selected period
	if (G_SelectedTimeFrame == 'weekly'){
		var weekStartDate = getDateOfISOWeek(G_ChartSelectedWeek,G_ChartSelectedYear);
		
		var nrOfDaysToRemove = 4;
		if (G_SelectedFirstDayOfWeek == 1){
			weekStartDate.setDate(weekStartDate.getDate() - 1);
			nrOfDaysToRemove = 3;
		}else{
			weekStartDate = weekStartDate;	
			nrOfDaysToRemove = 4;
		}		
		var weekEndDate = new Date(weekStartDate);		
		weekEndDate.setDate(weekEndDate.getDate() + 6);		
		
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(weekStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(weekEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'monthly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'yearly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'custom'){			
		
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(G_CustomStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(G_CustomEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}
	
	
	var listOfFilteredTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'expense'){
			listOfFilteredTransactions.push(listOfTransactions[i]);
		}
	}
	
	if (listOfFilteredTransactions.length > 0){
	
		var totalNumberOfTransactions = listOfFilteredTransactions.length;
		
		listOfFilteredTransactions = DataGrouper.sum(listOfFilteredTransactions, ["transactionCategoryCode"]);
		listOfFilteredTransactions.sort(function(a,b) {
			 if ( a.transactionAmount < b.transactionAmount )
				return 1;
			 if ( a.transactionAmount > b.transactionAmount )
				return -1;		
		});
		
		var firstElementAmount = listOfFilteredTransactions[0]['transactionAmount'];
		var totalSum = (DataGrouper.sum(listOfFilteredTransactions, []))[0]['transactionAmount'];
	
		//console.log(totalSum);
		fillInChart(listOfFilteredTransactions,totalSum,firstElementAmount,totalNumberOfTransactions);
	}else{
		$('#noDataForTheChart').show();
		$('#expenseAndIncomeChart').hide();
		$('#balanceChartContainer').hide();
		
		//nothing to put in the chart	
	}	
}

function generateAndPopulateMainScreenIncomeChart(){
	var listOfTransactions = [];
	
	//make array with all transactions from the selected period
	
	for (var i=0; i < G_FullEntryList.length; i++){
		if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
			for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
				listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
			}
		}
	}
	
	var listOfFilteredTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'income'){
			listOfFilteredTransactions.push(listOfTransactions[i]);
		}
	}
	
	if (listOfFilteredTransactions.length > 0){
	
		var totalNumberOfTransactions = listOfFilteredTransactions.length;
		
		listOfFilteredTransactions = DataGrouper.sum(listOfFilteredTransactions, ["transactionCategoryCode"]);
		listOfFilteredTransactions.sort(function(a,b) {
			 if ( a.transactionAmount < b.transactionAmount )
				return 1;
			 if ( a.transactionAmount > b.transactionAmount )
				return -1;		
		});
		
		var firstElementAmount = listOfFilteredTransactions[0]['transactionAmount'];
		var totalSum = (DataGrouper.sum(listOfFilteredTransactions, []))[0]['transactionAmount'];
	
		//console.log(totalSum);
		fillInIncomeChartMainScreen(listOfFilteredTransactions,totalSum,firstElementAmount,totalNumberOfTransactions);
	}else{
		$('#viewMoreIncome').hide();
		$('#incomeMainChart').hide();
		$('#incomeMainChartSample').show();
		$('#incomeMessageOverlay').show();
	}	
}

function generateAndPopulateMainScreenExpenseChart(){
	var listOfTransactions = [];
	
	//make array with all transactions from the selected period
	
	for (var i=0; i < G_FullEntryList.length; i++){
		if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
			for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
				listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
			}
		}
	}
	
	var listOfFilteredTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'expense'){
			listOfFilteredTransactions.push(listOfTransactions[i]);
		}
	}
	
	if (listOfFilteredTransactions.length > 0){
	
		var totalNumberOfTransactions = listOfFilteredTransactions.length;
		
		listOfFilteredTransactions = DataGrouper.sum(listOfFilteredTransactions, ["transactionCategoryCode"]);
		listOfFilteredTransactions.sort(function(a,b) {
			 if ( a.transactionAmount < b.transactionAmount )
				return 1;
			 if ( a.transactionAmount > b.transactionAmount )
				return -1;		
		});
		
		var firstElementAmount = listOfFilteredTransactions[0]['transactionAmount'];
		var totalSum = (DataGrouper.sum(listOfFilteredTransactions, []))[0]['transactionAmount'];
	
		//console.log(totalSum);
		fillInExpenseChartMainScreen(listOfFilteredTransactions,totalSum,firstElementAmount,totalNumberOfTransactions);
	}else{
		$('#viewMoreExpense').hide();
		$('#expenseMainChart').hide();
		$('#expenseMainChartSample').show();
		$('#expenseMessageOverlay').show();
	}	
}





function generateAndPopulateIncomeChart(){
	var listOfTransactions = [];
	
	//make array with all transactions from the selected period
	if (G_SelectedTimeFrame == 'weekly'){
		var weekStartDate = getDateOfISOWeek(G_ChartSelectedWeek,G_ChartSelectedYear);
		
		var nrOfDaysToRemove = 4;
		if (G_SelectedFirstDayOfWeek == 1){
			weekStartDate.setDate(weekStartDate.getDate() - 1);
			nrOfDaysToRemove = 3;
		}else{
			weekStartDate = weekStartDate;	
			nrOfDaysToRemove = 4;
		}		
		var weekEndDate = new Date(weekStartDate);		
		weekEndDate.setDate(weekEndDate.getDate() + 6);		
		
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(weekStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(weekEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'monthly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'yearly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'custom'){
				
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(G_CustomStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(G_CustomEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	} 
	
	
	var listOfFilteredTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'income'){
			listOfFilteredTransactions.push(listOfTransactions[i]);
		}
	}
	
	if (listOfFilteredTransactions.length > 0){
	
		var totalNumberOfTransactions = listOfFilteredTransactions.length;
		
		listOfFilteredTransactions = DataGrouper.sum(listOfFilteredTransactions, ["transactionCategoryCode"]);
		listOfFilteredTransactions.sort(function(a,b) {
			 if ( a.transactionAmount < b.transactionAmount )
				return 1;
			 if ( a.transactionAmount > b.transactionAmount )
				return -1;		
		});
		
		var firstElementAmount = listOfFilteredTransactions[0]['transactionAmount'];
		var totalSum = (DataGrouper.sum(listOfFilteredTransactions, []))[0]['transactionAmount'];
	
		//console.log(totalSum);
		fillInChart(listOfFilteredTransactions,totalSum,firstElementAmount,totalNumberOfTransactions);
	}else{
		$('#noDataForTheChart').show();
		$('#expenseAndIncomeChart').hide();
		$('#balanceChartContainer').hide();
		
		//nothing to put in the chart	
	}
}

function generateAndPopulateBalanceChart(){
	$('#expenseAndIncomeChart').hide();
	$('#noDataForTheChart').hide();
	
	var listOfTransactions = [];
	
	//make array with all transactions from the selected period
	if (G_SelectedTimeFrame == 'weekly'){
		var weekStartDate = getDateOfISOWeek(G_ChartSelectedWeek,G_ChartSelectedYear);
		
		var nrOfDaysToRemove = 4;
		if (G_SelectedFirstDayOfWeek == 1){
			weekStartDate.setDate(weekStartDate.getDate() - 1);
			nrOfDaysToRemove = 3;
		}else{
			weekStartDate = weekStartDate;	
			nrOfDaysToRemove = 4;
		}		
		var weekEndDate = new Date(weekStartDate);		
		weekEndDate.setDate(weekEndDate.getDate() + 6);		
		
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(weekStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(weekEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'monthly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'yearly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'custom'){
			
		
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(G_CustomStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(G_CustomEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
				}
			}
		}
	}
	
	
	var listOfExpenseTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'expense'){
			listOfExpenseTransactions.push(listOfTransactions[i]);
		}
	}
	
	var listOfIncomeTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'income'){
			listOfIncomeTransactions.push(listOfTransactions[i]);
		}
	}
	
	
		
	var totalNumberOfExpenseTransactions = 0;
	var totalNumberOfIncomeTransactions = 0;
	var totalSumExpense = 0;
	var totalSumIncome = 0;
	
	totalNumberOfExpenseTransactions = listOfExpenseTransactions.length;
	totalNumberOfIncomeTransactions = listOfIncomeTransactions.length;
		
	if (listOfExpenseTransactions.length > 0){
		totalSumExpense = parseFloat((DataGrouper.sum(listOfExpenseTransactions, []))[0]['transactionAmount']).toFixed(2);
	}
	if (listOfIncomeTransactions.length > 0){
		totalSumIncome = parseFloat((DataGrouper.sum(listOfIncomeTransactions, []))[0]['transactionAmount']).toFixed(2);
	}
	
	var expenseWidth = '50%';
	if (totalSumExpense > 0){
		expenseWidth = (Math.round((parseInt(totalSumExpense)*100)/(parseInt(totalSumIncome) + parseInt(totalSumExpense)))).toString()+'%';
	}else if (totalSumIncome > 0){
		expenseWidth = '0%';
	}else{
		expenseWidth = '50%';
	}

	if (expenseWidth == '0%'){
		expenseWidth = '26px';
	}
	
	

	//show balance graph
	$('#balanceChartIncomeAmount').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(totalSumIncome)).formatMoney(2));
	$('#balanceChartExpenseAmount').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(totalSumExpense)).formatMoney(2));
	$('#chartBalanceFinal').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+ (parseFloat(totalSumIncome - totalSumExpense)).formatMoney(2));
	$('#chartBalanceNumberOfTransactions').html((parseFloat(totalNumberOfExpenseTransactions + totalNumberOfIncomeTransactions)).formatMoney(2));
	$('#expenseIndicatorChartBalance').attr('width',expenseWidth);
	
	$('#balanceChartContainer').show();
		
	
	
}

function generateAndPopulateMainScreenBalanceChart(){
	
	
	var listOfTransactions = [];
	
	
	for (var i=0; i < G_FullEntryList.length; i++){
		if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
			for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
				listOfTransactions.push(G_FullEntryList[i]['transactionList'][j]);
			}
		}
	}
	
	var listOfExpenseTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'expense'){
			listOfExpenseTransactions.push(listOfTransactions[i]);
		}
	}
	
	var listOfIncomeTransactions = [];
	for (var i=0; i<listOfTransactions.length; i++){
		if (listOfTransactions[i]['transactionType'] == 'income'){
			listOfIncomeTransactions.push(listOfTransactions[i]);
		}
	}
	
	
		
	var totalNumberOfExpenseTransactions = 0;
	var totalNumberOfIncomeTransactions = 0;
	var totalSumExpense = 0;
	var totalSumIncome = 0;
	
	totalNumberOfExpenseTransactions = listOfExpenseTransactions.length;
	totalNumberOfIncomeTransactions = listOfIncomeTransactions.length;
		
	if (listOfExpenseTransactions.length > 0){
		totalSumExpense = parseFloat((DataGrouper.sum(listOfExpenseTransactions, []))[0]['transactionAmount']).toFixed(2);
	}
	if (listOfIncomeTransactions.length > 0){
		totalSumIncome = parseFloat((DataGrouper.sum(listOfIncomeTransactions, []))[0]['transactionAmount']).toFixed(2);
	}
	
	var expenseWidth = '50%';
	if (totalSumExpense > 0){
		expenseWidth = (Math.round((parseInt(totalSumExpense)*100)/(parseInt(totalSumIncome) + parseInt(totalSumExpense)))).toString()+'%';
	}else if (totalSumIncome > 0){
		expenseWidth = '0%';
	}else{
		expenseWidth = '50%';
	}
	
	if (expenseWidth == '0%'){
		expenseWidth = '26px';
	}
	
	//console.log(expenseWidth);
	

	//show balance graph
	$('#mainScreenBalanceChartIncomeAmount').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(totalSumIncome)).formatMoney(2));
	$('#mainScreenBalanceChartExpenseAmount').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(totalSumExpense)).formatMoney(2));
	$('#mainScreenBalanceChartBalanceAmount').html(G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(totalSumIncome - totalSumExpense)).formatMoney(2));
	$('#expenseIndicatorBalanceChartMainScreen').attr('width',expenseWidth);
	

		
	
	
}



function viewExpenseChart(){
	//console.log('viewExpenseChart');
	G_ChartType = 'expense';
	$('#detailsHeaderTitle').html(translate('trExpenseDetails'));
	$('#showExpenseDetailsChartTab').css('border-bottom','3px solid #ff3c3c');
	$('#showIncomeDetailsChartTab').css('border-bottom','3px solid #3f5c6b');
	$('#showBalanceDetailsChartTab').css('border-bottom','3px solid #3f5c6b');
	prepareGraphNavigationBottom();
	Screen.gotoPage('chartscreen');
}

function viewIncomeChart(){
	//console.log('viewIncomeChart');
	G_ChartType = 'income';
	$('#detailsHeaderTitle').html(translate('trIncomeDetails'));
	$('#showIncomeDetailsChartTab').css('border-bottom','3px solid #21ca03');
	$('#showExpenseDetailsChartTab').css('border-bottom','3px solid #3f5c6b');
	$('#showBalanceDetailsChartTab').css('border-bottom','3px solid #3f5c6b');
	prepareGraphNavigationBottom();
	Screen.gotoPage('chartscreen');
	
}

function viewBalanceChart(){
	G_ChartType = 'balance';
	$('#detailsHeaderTitle').html(translate('trBalanceDetails'));
	$('#showBalanceDetailsChartTab').css('border-bottom','3px solid #F90');
	$('#showExpenseDetailsChartTab').css('border-bottom','3px solid #3f5c6b');
	$('#showIncomeDetailsChartTab').css('border-bottom','3px solid #3f5c6b');
	//console.log('viewBalanceChart');
	prepareGraphNavigationBottom();
}

function showTimeFramePicker(){
	$('#changeGranularityLevel').hide();
	$('#timeFrameOptionContainer').show();
	G_ChoseTimeFrameBar = 1;
}

function closeTimeFramePicker(){
	$('#changeGranularityLevel').show();
	$('#timeFrameOptionContainer').hide();
	G_ChoseTimeFrameBar = 0;
}

function chooseChartTimeFrame(timeframe){
	/*var currentDate = intToDate(dateToInt(G_today));
	
	G_ChartSelectedWeek = currentDate.getWeekNumber();
	G_ChartSelectedMonth = currentDate.getMonth() + 1;
	G_ChartSelectedYear = currentDate.getFullYear();*/
	
	if (timeframe == 'weekly'){
		G_SelectedTimeFrame = timeframe;
		$('#weekTimeFrameIconContainer').html('<img src="images/check_icon_white.png" width="22px">');
		$('#monthTimeFrameIconContainer').html('');
		$('#yearTimeFrameIconContainer').html('');
		$('#customTimeFrameIconContainer').html('');
		prepareGraphNavigationBottom();
	}else if (timeframe == 'monthly'){
		G_SelectedTimeFrame = timeframe;
		$('#weekTimeFrameIconContainer').html('');
		$('#monthTimeFrameIconContainer').html('<img src="images/check_icon_white.png" width="22px">');
		$('#yearTimeFrameIconContainer').html('');
		$('#customTimeFrameIconContainer').html('');
		prepareGraphNavigationBottom();
	}else if (timeframe == 'yearly'){
		G_SelectedTimeFrame = timeframe;
		$('#weekTimeFrameIconContainer').html('');
		$('#monthTimeFrameIconContainer').html('');
		$('#yearTimeFrameIconContainer').html('<img src="images/check_icon_white.png" width="22px">');
		$('#customTimeFrameIconContainer').html('');
		prepareGraphNavigationBottom();
	}else if (timeframe == 'custom'){
		
		showCustomTimeFramePicker(timeframe);
	}	
	closeTimeFramePicker();
}

function showCustomTimeFramePicker(prevTimeFrame){
	//console.log(G_SelectedTimeFrame)
	if (G_SelectedTimeFrame != 'custom'){
		G_CustomStartDate = new Date(G_today.getFullYear(), G_today.getMonth(), 1);
		G_CustomEndDate = new Date(G_today.getFullYear(), G_today.getMonth() + 1, 0);
	}
	
	G_SelectedTimeFrame = prevTimeFrame;
	
	refreshStartAndEndDate(G_CustomStartDate,G_CustomEndDate);
	
	Screen.gotoPage('customtimeframepicker');
}

function refreshStartAndEndDate(startDate, endDate){
	//display start and end date
	//start date 
	var startDateDay = startDate.getDate();
	var startDateMonth = startDate.getMonth();
	var startDateYear = startDate.getFullYear();
	
	//end date 
	var endDateDay = endDate.getDate();
	var endDateMonth = endDate.getMonth();
	var endDateYear = endDate.getFullYear();
	
	//show
	$('#startDateDay').html(startDateDay);
	$('#startDateMonth').html(translate(G_monthShortNames[startDateMonth]));
	$('#startDateYear').html(startDateYear);
	
	$('#endDateDay').html(endDateDay);
	$('#endDateMonth').html(translate(G_monthShortNames[endDateMonth]));
	$('#endDateYear').html(endDateYear);
}

function changeStartDate(level,direction){
	if (level == 'day'){
		G_CustomStartDate.setDate(G_CustomStartDate.getDate() + direction);
	}else if (level == 'month'){
		G_CustomStartDate.setMonth(G_CustomStartDate.getMonth() + direction);
	}else if (level == 'year'){
		G_CustomStartDate.setFullYear(G_CustomStartDate.getFullYear() + direction);
	}
	refreshStartAndEndDate(G_CustomStartDate,G_CustomEndDate);
}

function changeEndDate(level,direction){
	if (level == 'day'){
		G_CustomEndDate.setDate(G_CustomEndDate.getDate() + direction);
	}else if (level == 'month'){
		G_CustomEndDate.setMonth(G_CustomEndDate.getMonth() + direction);
	}else if (level == 'year'){
		G_CustomEndDate.setFullYear(G_CustomEndDate.getFullYear() + direction);
	}
	refreshStartAndEndDate(G_CustomStartDate,G_CustomEndDate);
}

function doChooseTimeFrame(){
	 if (G_CustomStartDate < G_CustomEndDate){
		 G_SelectedTimeFrame = 'custom'; 
		 prepareGraphNavigationBottom();
		 Screen.gotoPage('chartscreen');
		 $('#weekTimeFrameIconContainer').html('');
		 $('#monthTimeFrameIconContainer').html('');
		 $('#yearTimeFrameIconContainer').html('');
		 $('#customTimeFrameIconContainer').html('<img src="images/check_icon_white.png" width="22px">');
	 }else{
		 showFailMessage(translate('trEndDateAfterStartDate'),3000);
	 }
}


function showTransactionsForCategory(categoryCode){	
	//console.log('Category code:'+ categoryCode+' | SelectedMonth: '+ G_ChartSelectedMonth+' | SelectedYear: '+ G_ChartSelectedYear+' | SelectedWeek: '+ G_ChartSelectedWeek+' | TimeFrame: '+ G_SelectedTimeFrame+' | Type: '+ G_ChartType+' | PrevScreen: '+ G_currentScreen);	
	G_PreviousScreen = G_currentScreen;
	
	//update header section
	if (G_ChartType == 'expense'){
		$('#categorylistHeaderTitle').html(translate(G_selectedExpenseList[getCategoryID('expense',categoryCode)]['name']));
		$('#orangeListHeader').html(translate(G_selectedExpenseList[getCategoryID('expense',categoryCode)]['name'])+' - '+translate('trTransactions'));

		$("#categorylistHeaderIconContainer").attr('class', 'roundAroundIcons '+G_selectedExpenseList[getCategoryID('expense',categoryCode)]['color']);		
		$('#categorylistHeaderIcon').attr('src','images/categories/'+G_selectedExpenseList[getCategoryID('expense',categoryCode)]['img']);
	}else if (G_ChartType == 'income'){
		$('#categorylistHeaderTitle').html(translate(G_selectedIncomeList[getCategoryID('income',categoryCode)]['name']));
		$('#orangeListHeader').html(translate(G_selectedIncomeList[getCategoryID('income',categoryCode)]['name'])+' '+translate('trTransactions'));
		$('#categorylistHeaderIcon').attr('src','images/categories/'+G_selectedIncomeList[getCategoryID('income',categoryCode)]['img']);
	}
	
	//load Date interval indicator
	if (G_SelectedTimeFrame == 'weekly'){
		var weekStartDate = getDateOfISOWeek(G_ChartSelectedWeek,G_ChartSelectedYear);
		
		var nrOfDaysToRemove = 4;
		if (G_SelectedFirstDayOfWeek == 1){
			weekStartDate.setDate(weekStartDate.getDate() - 1);
			nrOfDaysToRemove = 3;
		}else{
			weekStartDate = weekStartDate;	
			nrOfDaysToRemove = 4;
		}		
		var weekEndDate = new Date(weekStartDate);		
		weekEndDate.setDate(weekEndDate.getDate() + 6);
		$('#timeIntervalIndicator').html(G_ChartSelectedYear+', '+translate('Week')+' '+G_ChartSelectedWeek+' ('+weekStartDate.getDate()+' '+weekStartDate.getMonthShortName()+' -> '+weekEndDate.getDate()+' '+weekEndDate.getMonthShortName()+')');
		
		
	}else if (G_SelectedTimeFrame == 'monthly'){		
		$('#timeIntervalIndicator').html(translate(G_monthFullNames[G_ChartSelectedMonth-1])+ ' ' + G_ChartSelectedYear);		
	}else if (G_SelectedTimeFrame == 'yearly'){		
		$('#timeIntervalIndicator').html(G_ChartSelectedYear);
	}else if (G_SelectedTimeFrame == 'custom'){
		$('#timeIntervalIndicator').html('<span style="font-size:12px;">'+G_CustomStartDate.getMonthShortName() + ' ' +G_CustomStartDate.getDate()+' ' +G_CustomStartDate.getFullYear()+'</span><span style="font-size:12px;"> -> '+G_CustomEndDate.getMonthShortName() + ' ' +G_CustomEndDate.getDate()+' ' +G_CustomEndDate.getFullYear()+'</span>');
	}
	
	
	
	//prepare list
	var listWithTransactionsForCategory = [];
	var temp_BlankTransaction =[];
	

	
	if (G_SelectedTimeFrame == 'weekly'){
		var weekStartDate = getDateOfISOWeek(G_ChartSelectedWeek,G_ChartSelectedYear);
		
		var nrOfDaysToRemove = 4;
		if (G_SelectedFirstDayOfWeek == 1){
			weekStartDate.setDate(weekStartDate.getDate() - 1);
			nrOfDaysToRemove = 3;
		}else{
			weekStartDate = weekStartDate;	
			nrOfDaysToRemove = 4;
		}		
		var weekEndDate = new Date(weekStartDate);		
		weekEndDate.setDate(weekEndDate.getDate() + 6);		
		
		//console.log(weekStartDate + ' - ' + weekEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(weekStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(weekEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					if (G_FullEntryList[i]['transactionList'][j]['transactionCategoryCode'] == categoryCode){				
						
						temp_BlankTransaction = [];
						temp_BlankTransaction['dateKey'] = G_FullEntryList[i]['dateKey'];
						temp_BlankTransaction['transactionAmount'] = G_FullEntryList[i]['transactionList'][j]['transactionAmount'];
						temp_BlankTransaction['transactionKey'] = G_FullEntryList[i]['transactionList'][j]['transactionKey'];
						if (G_FullEntryList[i]['transactionList'][j]['transactionNote'] != ''){
							temp_BlankTransaction['transactionNote'] = G_FullEntryList[i]['transactionList'][j]['transactionNote'];
						}else{
							temp_BlankTransaction['transactionNote'] = '';
						}
						
						listWithTransactionsForCategory.push(temp_BlankTransaction);
					}
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'monthly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['monthNr'] == G_ChartSelectedMonth && G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					if (G_FullEntryList[i]['transactionList'][j]['transactionCategoryCode'] == categoryCode){				
						
						temp_BlankTransaction = [];
						temp_BlankTransaction['dateKey'] = G_FullEntryList[i]['dateKey'];
						temp_BlankTransaction['transactionAmount'] = G_FullEntryList[i]['transactionList'][j]['transactionAmount'];
						temp_BlankTransaction['transactionKey'] = G_FullEntryList[i]['transactionList'][j]['transactionKey'];
						if (G_FullEntryList[i]['transactionList'][j]['transactionNote'] != ''){
							temp_BlankTransaction['transactionNote'] = G_FullEntryList[i]['transactionList'][j]['transactionNote'];
						}else{
							temp_BlankTransaction['transactionNote'] = '';
						}
						
						listWithTransactionsForCategory.push(temp_BlankTransaction);
					}
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'yearly'){
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['yearNr'] == G_ChartSelectedYear){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					if (G_FullEntryList[i]['transactionList'][j]['transactionCategoryCode'] == categoryCode){				
						
						temp_BlankTransaction = [];
						temp_BlankTransaction['dateKey'] = G_FullEntryList[i]['dateKey'];
						temp_BlankTransaction['transactionAmount'] = G_FullEntryList[i]['transactionList'][j]['transactionAmount'];
						temp_BlankTransaction['transactionKey'] = G_FullEntryList[i]['transactionList'][j]['transactionKey'];
						if (G_FullEntryList[i]['transactionList'][j]['transactionNote'] != ''){
							temp_BlankTransaction['transactionNote'] = G_FullEntryList[i]['transactionList'][j]['transactionNote'];
						}else{
							temp_BlankTransaction['transactionNote'] = '';
						}
						
						listWithTransactionsForCategory.push(temp_BlankTransaction);
					}
				}
			}
		}
	}else if (G_SelectedTimeFrame == 'custom'){		
		
		//console.log(G_CustomStartDate + ' - ' + G_CustomEndDate);
		for (var i=0; i < G_FullEntryList.length; i++){
			if (G_FullEntryList[i]['dateKey'] >= dateToInt(G_CustomStartDate) && G_FullEntryList[i]['dateKey'] <= dateToInt(G_CustomEndDate)){
				for (var j=0; j<G_FullEntryList[i]['transactionList'].length; j++){
					if (G_FullEntryList[i]['transactionList'][j]['transactionCategoryCode'] == categoryCode){				
						
						temp_BlankTransaction = [];
						temp_BlankTransaction['dateKey'] = G_FullEntryList[i]['dateKey'];
						temp_BlankTransaction['transactionAmount'] = G_FullEntryList[i]['transactionList'][j]['transactionAmount'];
						temp_BlankTransaction['transactionKey'] = G_FullEntryList[i]['transactionList'][j]['transactionKey'];
						if (G_FullEntryList[i]['transactionList'][j]['transactionNote'] != ''){
							temp_BlankTransaction['transactionNote'] = G_FullEntryList[i]['transactionList'][j]['transactionNote'];
						}else{
							temp_BlankTransaction['transactionNote'] = '';
						}
						
						listWithTransactionsForCategory.push(temp_BlankTransaction);
					}
				}
			}
		}
	}
	
	//sort before display
	listWithTransactionsForCategory.sort(function(a,b) {
		 if ( a.dateKey < b.dateKey )
			return -1;
		 if ( a.dateKey > b.dateKey )
			return 1;		
	});
	
	var htmlToDisplay = '';
	var curentInc = 0;
	var prevInc = 0;
	var nextDateKey = -1;
	var prevDateKey = -1;
	var sMonth = 0;
	var sDay = 0;
	var sYear = 0;
	var sDate = new Date();
	var viewCategoryLeft = 'viewCategoryTransactionExpenseListLeftSide';
	var viewCategoryRight = 'viewCategoryTransactionExpenseListRightSide';
	var noteVewTransactionClass = 'expenseNoteViewTransaction';
	var dayBorderSeparator = 'border-bottom:3px solid #FFE0E0;';
	var marginTop = 'style="margin-top:6px;"';
	var transactionNote = '';
	
	if (G_ChartType == 'expense'){
		viewCategoryLeft = 'viewCategoryTransactionExpenseListLeftSide';
		viewCategoryRight = 'viewCategoryTransactionExpenseListRightSide';
		noteVewTransactionClass = 'expenseNoteViewTransaction';
	}else if (G_ChartType == 'income'){
		viewCategoryLeft = 'viewCategoryTransactionIncomeListLeftSide';
		viewCategoryRight = 'viewCategoryTransactionIncomeListRightSide';
		noteVewTransactionClass = 'incomeNoteViewTransaction';
	}
	
	var listWithEntryKeys = [];
	var imageListHTML = '';
	
	for (var i=0; i < listWithTransactionsForCategory.length; i++){
		if (listWithTransactionsForCategory[i]['transactionNote'] == ''){
			transactionNote = '<span style="color:#999">'+translate('trNoAdditionalNote')+'</span>';
		}else{
			transactionNote = listWithTransactionsForCategory[i]['transactionNote'];
		}
		
		if (i == 0){
			
			marginTop = '';
		}else{
			marginTop = 'style="margin-top:6px;"';
		}
		
		curentInc = i+1;		
		if (curentInc < listWithTransactionsForCategory.length){
			nextDateKey = listWithTransactionsForCategory[i+1]['dateKey'];
		}else{
			nextDateKey = -1;
		}
		
		prevInc = i-1;
		if (prevInc >=0){
			prevDateKey = listWithTransactionsForCategory[prevInc]['dateKey'];
		}else{
			prevDateKey = -1;
		}
		
		sDate = intToDate(listWithTransactionsForCategory[i]['dateKey']);
		
		sDay = ((listWithTransactionsForCategory[i]['dateKey']).toString()).substring(6, 8);
		sMonth = sDate.getMonthShortName();
		sYear = sDate.getFullYear();
		

		if (i==0 || listWithTransactionsForCategory[i]['dateKey'] != prevDateKey){
			htmlToDisplay = htmlToDisplay +
			 '<table cellpadding="0" cellspacing="0" width="100%" class="expenseShadow" '+marginTop+'>'+
				'<tr>'+
					'<td class="'+viewCategoryLeft+' editButtonTransaction" align="center" valign="top" >'+
						'<table width="100%" cellpadding="0" cellspacing="0" height="100%">'+
							'<tr>'+
								'<td align="right" style="color:#333;">'+
									'<div style="font-size:19px;">'+sDay+'</div>'+
									'<div style="font-size:14px;">'+sMonth+'</div>'+
									'<div style="font-size:14px;">'+sYear+'</div>'+
								'</td>'+
							'</tr>'+
						'</table>'+
					'</td>'+
					'<td class="'+viewCategoryRight+'" valign="top">';
		}
			
			if (listWithTransactionsForCategory[i]['dateKey'] != nextDateKey){	
				dayBorderSeparator = 'border-bottom:0px;';
			}else{				
				if (G_ChartType == 'expense'){					
					dayBorderSeparator = 'border-bottom:3px solid #FFE0E0;';
				}else if (G_ChartType == 'income'){					
					dayBorderSeparator = 'border-bottom:3px solid #A5D09E;';
				}
			}
			
			imageListHTML = '';
			imageListHTML = getAllImagesForEntryKeyViewTimeLine(listWithTransactionsForCategory[i]['transactionKey']);
			if ( imageListHTML != '' && imageListHTML !== undefined){
				//do nothing
			}else{
				imageListHTML = '';
			}
			htmlToDisplay = htmlToDisplay + 				
					'<table width="100%" cellpadding="0" cellspacing="0" style="padding:2px 2px 2px 0px; '+dayBorderSeparator+' padding:0px 5px 0px 5px;">'+
						'<tr>'+
							'<td align="left" style="padding-left:5px;">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(listWithTransactionsForCategory[i]['transactionAmount']).formatMoney(2)+'</td>'+
						'</tr>'+
						'<tr>'+
							'<td align="left" class="'+noteVewTransactionClass+'" style="padding-top:4px; padding-bottom:4px;">'+translate('trNote')+'<br><em class="noteDetails">'+transactionNote+'</em></td>'+
						'</tr>'+
						'</tr>'+
							imageListHTML+
						'<tr>'+
					'</table>';
					listWithEntryKeys.push(listWithTransactionsForCategory[i]['transactionKey']);
					
		if (listWithTransactionsForCategory[i]['dateKey'] != nextDateKey){	
			htmlToDisplay = htmlToDisplay + 	
					'</td>'+				
			  '</tr>'+
			'</table>';
		}
	}
	
	$('#categoriesListFilteredByPeriod').html(htmlToDisplay);
	
	
	G_SelectedListOfImages = '';
	for (var j = 0; j<listWithEntryKeys.length; j++){
		for (var i = 0; i<G_FullImageListDiary.length; i++){
				if (G_FullImageListDiary[i]['entryKey'] == listWithEntryKeys[j]){
					G_SelectedListOfImages = G_SelectedListOfImages + G_FullImageListDiary[i]['imageName']+',';
				}
		}
	}


	
	if (G_SelectedListOfImages != ''){
		getThumbnail3TimeLine(0);
	}
	
	enableGallery();
	
	
	Screen.gotoPage('categoriesgroupedtransactions');
}

//////////////////////////
//charts for main screen
//////////////////////////


function showSummaryChartTab(tabCode){
	$('#showExpenseChartTab').removeClass();
	$('#showIncomeChartTab').removeClass();
	$('#showBalanceChartTab').removeClass();
	
	//hide everything
	$('#expenseMainChart').hide();
	$('#incomeMainChart').hide();
	$('#balanceMainChart').hide();
	
	$('#incomeMessageOverlay').hide();
	$('#expenseMessageOverlay').hide();
	$('#viewMoreExpense').hide();
	$('#viewMoreIncome').hide();
	$('#incomeMainChartSample').hide();
	$('#expenseMainChartSample').hide();
	
	//console.log('here');
	G_SelectedTimeFrame = 'monthly';
	chooseChartTimeFrame(G_SelectedTimeFrame);
	
	
	
	if (tabCode == 'expense'){
		G_ChartType = 'expense'; 
		$('#showExpenseChartTab').addClass('selectedTopMenuExpense');
		$('#showIncomeChartTab').addClass('paddingBottom');
		$('#showBalanceChartTab').addClass('paddingBottom');
		generateAndPopulateMainScreenExpenseChart();
		//$('#expenseMainChart').show();	 
	 
	}else if(tabCode == 'income'){
		G_ChartType = 'income';
		$('#showIncomeChartTab').addClass('selectedTopMenuIncome');
		$('#showExpenseChartTab').addClass('paddingBottom');
		$('#showBalanceChartTab').addClass('paddingBottom');
		generateAndPopulateMainScreenIncomeChart();
	 
	}else if(tabCode == 'balance'){
		G_ChartType = 'balance';
		$('#showBalanceChartTab').addClass('selectedTopMenuBalance');
		$('#showExpenseChartTab').addClass('paddingBottom');
		$('#showIncomeChartTab').addClass('paddingBottom');
		
		$('#viewMoreIncome').hide();
		$('#viewMoreExpense').hide();
		generateAndPopulateMainScreenBalanceChart();
		$('#balanceMainChart').show();
	}
}
 

/* ----------------------------------------------------------------------------------------------------------------
---------------------------------------------Calendar related actions and functions--------------------------------
 ---------------------------------------------------------------------------------------------------------------- */
function setCurrentPrevAndNextDates(increment){
	//curent year and month
	if (increment == 1){
		if (G_chosenMonth == 12){
			G_chosenMonth = 1;
			G_chosenYear = G_chosenYear + 1;
		}else{
			G_chosenMonth = G_chosenMonth + 1;
			G_chosenYear = G_chosenYear;
		}
	}
	if (increment == -1){
		if (G_chosenMonth == 1){
			G_chosenMonth = 12;
			G_chosenYear = G_chosenYear - 1;
		}else{
			G_chosenMonth = G_chosenMonth - 1;
			G_chosenYear = G_chosenYear;
		}
	}
		
	//prev year and month
	if (G_chosenMonth == 1){
		G_chosenPrevMonth = 12;
		G_chosenPrevYear = G_chosenYear - 1;
	}else{
		G_chosenPrevMonth = G_chosenMonth - 1;
		G_chosenPrevYear = G_chosenYear;
	}
	
	//next year and month
	if (G_chosenMonth == 12){
		G_chosenNextMonth = 1;
		G_chosenNextYear = G_chosenYear + 1;
	}else{
		G_chosenNextMonth = G_chosenMonth + 1;
		G_chosenNextYear = G_chosenYear;
	}
	
	initiateChartScreen();
	if ( G_currentScreen == 'mainscreen'){
		showSummaryChartTab(G_ChartType);
	}
	
	updateCalendarNavigationMenu();
	loadMainScreenCalendar();
	loadDatePickerCalendar();
	
	
}
function updateCalendarNavigationMenu(){
	$('#prevMonth').html(translate(G_monthShortNames[G_chosenPrevMonth-1]));
	$('#prevYear').html(G_chosenPrevYear);
	
	$('#currentSelectedMonth').html(translate(G_monthShortNames[G_chosenMonth-1]));
	$('#currentSelectedYear').html(G_chosenYear);
	$('#chartMonthAndYearIndicator').html(translate(G_monthFullNames[G_chosenMonth-1])+' ' +G_chosenYear);
	
	$('#nextMonth').html(translate(G_monthShortNames[G_chosenNextMonth-1]));
	$('#nextYear').html(G_chosenNextYear);
	
	$('#pickerprevMonth').html(translate(G_monthShortNames[G_chosenPrevMonth-1]));
	$('#pickerprevYear').html(G_chosenPrevYear);
	
	$('#pickercurrentSelectedMonth').html(translate(G_monthShortNames[G_chosenMonth-1]));
	$('#pickercurrentSelectedYear').html(G_chosenYear);
	
	$('#pickernextMonth').html(translate(G_monthShortNames[G_chosenNextMonth-1]));
	$('#pickernextYear').html(G_chosenNextYear);
}


function get42DaysOnSelectedMonth(month, year, weekFirstDay) {
	month = month-1;
		
	var date = new Date(year, month, 1);
	var dayOfWeek = date.getDay(); if (dayOfWeek == 0){dayOfWeek = 7;}
	
	var date = new Date(year, month, (-1 * (dayOfWeek-weekFirstDay)));
	var dayList = [];
	
	
	for (var i = 0; i<42; i++){
		var oneDay = [];
		oneDay['dayOfMonth'] = date.getDate();
		oneDay['monthOfYear'] = date.getMonth()+1;
		oneDay['calendarID'] = dateToInt(date);
		dayList.push(oneDay);
		date.setDate(date.getDate() + 1);
	}
	return dayList;
}




/* ----------------------------------------------------------------------------------------------------------------
--------------------------------------------- ENTRY PAGE DETAILS  -------------------------------------------------
 ---------------------------------------------------------------------------------------------------------------- */
 
 function doShowTodayTransactions(){
	var intDate = dateToInt(G_today);
	
	var entryDay = -1;intDate
	for (var i=0; i< G_FullEntryList.length; i++){
		if (G_FullEntryList[i]['dateKey'] == intDate){
			entryDay = i;
		}
	}
	
	var listWithEntryKeys = [];
	var html = '<div style="padding:10px; padding-top:50px; padding-bottom:50px; text-align:center; font-size:14px; color:#999;" id="mainScreenNoTransactionMessage">'+translate('trNoTransactionsForToday')+'</div>';
	var selectedDayTransactions = [];
	var imageListHTML = '';
	if (entryDay > -1){
		G_SelectedDayEntryArrayID = entryDay;
		G_SelectedDayEntry = G_FullEntryList[entryDay];
		//check if there are transactions
		if (G_FullEntryList[entryDay]['transactionList'].length > 0){
			selectedDayTransactions = G_FullEntryList[entryDay]['transactionList'];	
			//console.log(selectedDayTransactions);		
			html = '<table cellpadding="0" cellspacing="0" width="100%">';
			var categoryIcon = '';
			var categoryName = '';
			var catID = -1;
			var note = '';
			for (var i=(selectedDayTransactions.length -1); i >= 0; i--){
				catID = -1;
				if(selectedDayTransactions[i]['transactionNote'] == ''){
					note = '<span style="color:#999">'+translate('trNoAdditionalNote')+'</span>';
				}else{
					note = selectedDayTransactions[i]['transactionNote'];
				}
				
				if (selectedDayTransactions[i]['transactionType'] == 'expense'){
					for (var j = 0; j < G_selectedExpenseList.length; j++){
						if (G_selectedExpenseList[j]['code'] == selectedDayTransactions[i]['transactionCategoryCode']){
							catID = j;
						}
					}
					categoryIcon = 'images/categories/'+G_selectedExpenseList[catID]['img'];
					categoryName = translate(G_selectedExpenseList[catID]['name']);
					
					imageListHTML = '';
					//console.log('entrylkey:'+selectedDayEntries[i]['entryKey']);
					imageListHTML = getAllImagesForEntryKeyViewMainScreen(selectedDayTransactions[i]['transactionKey']);
					if ( imageListHTML != '' && imageListHTML !== undefined){
						//do nothing
					}else{
						imageListHTML = '';
					}
										
					html = html + '<tr>'
							+'<td align="center" style="padding:0px 0px 0px 0px; border-bottom:3px solid #E2E2E2;">'
								+'<table cellpadding="0" cellspacing="0" width="100%" >'
									+'<tr>'										
										+'<td class="expenseListLeftSideMain" valign="top">'
											+'<table width="100%" cellpadding="0" cellspacing="0" style="padding:2px 2px 2px 0px;">'
												+'<tr>'
													+'<td valign="center" align="left" width="35px" height="35px">'
														+'<div class="roundAroundIconsSmall '+G_selectedExpenseList[catID]['color']+'">'
															+'<img src="'+categoryIcon+'" height="18px">'
														+'</div>'
													+'</td>'
													+'<td align="left" >'+categoryName+'</td>'
													+'<td align="right" style="color:#ff3c3c;">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(selectedDayTransactions[i]['transactionAmount']).formatMoney(2)+'</td>'
												+'</tr>'
												+'<tr>'
													+'<td colspan="3" align="left" class="expenseNoteViewTransaction" >'+translate('trNote')+'<br><em class="noteDetails">'+note+'</em></td>'
												+'</tr>'
												+'</tr>'
													+imageListHTML 
												+'<tr>'
											+'</table>'
										+'</td> ' 										                                          
									+'</tr>'
								+'</table>'
							+'</td>'
						+'</tr>';
						listWithEntryKeys.push(selectedDayTransactions[i]['transactionKey']);
				}else if (selectedDayTransactions[i]['transactionType'] == 'income'){
					for (var j = 0; j < G_selectedIncomeList.length; j++){
						if (G_selectedIncomeList[j]['code'] == selectedDayTransactions[i]['transactionCategoryCode']){
							catID = j;
						}
					}	
					categoryIcon = 'images/categories/'+G_selectedIncomeList[catID]['img'];
					categoryName = translate(G_selectedIncomeList[catID]['name']);
					
					imageListHTML = '';
					//console.log('entrylkey:'+selectedDayEntries[i]['entryKey']);
					imageListHTML = getAllImagesForEntryKeyViewMainScreen(selectedDayTransactions[i]['transactionKey']);
					if ( imageListHTML != '' && imageListHTML !== undefined){
						//do nothing
					}else{
						imageListHTML = '';
					}
					
					html = html +'<tr>'
							+'<td align="center" style="padding:0px 0px 0px 0px; border-bottom:3px solid #E2E2E2;">'
								+'<table cellpadding="0" cellspacing="0" width="100%">'
									+'<tr>'										
										+'<td class="incomeListLeftSideMain" valign="top">'
											+'<table width="100%" cellpadding="0" cellspacing="0" style="padding:2px 2px 2px 0px;">'
												+'<tr>'
													+'<td valign="center" align="left" width="35px" height="35px">'
														+'<div class="roundAroundIconsSmall '+G_selectedIncomeList[catID]['color']+'">'
															+'<img src="'+categoryIcon+'" height="18px">'
														+'</div>'
													+'</td>'
													+'<td align="left" >'+categoryName+'</td>'
													+'<td align="right" style="color:#029200;">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(selectedDayTransactions[i]['transactionAmount']).formatMoney(2)+'</td>'
												+'</tr>'
												+'<tr>'
													+'<td colspan="3" align="left" class="incomeNoteViewTransaction" >'+translate('trNote')+'<br><em class="noteDetails">'+note+'</em></td>'
												+'</tr>'
												+'</tr>'
													+imageListHTML 
												+'<tr>'
											+'</table>'
										+'</td> '										                              
									+'</tr>'
								+'</table>'
							+'</td>'
						+'</tr>';
						listWithEntryKeys.push(selectedDayTransactions[i]['transactionKey']);
				}
			}
			html = html + '</table>';
			html = html + '<div style="padding:12px 10px 12px 10px; margin-top:1px;  background-color: #FFFACE;" >'+
								'<table style="font-size:16px;color: #30475e;" cellpadding="0" cellspacing="0" width="100%">'+
									'<tr>'+
										'<td align="left">'+translate('trTodaysBalance')+'</td>'+
										'<td align="right">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(G_FullEntryList[entryDay]['dayBalance'])).formatMoney(2)+'</td>'+
									'</tr>'+
								'</table>'+
			'</div>';
			
		}else{
			
		}
	}else{
		
	}
	$('#transactionListToday').html(html);
	
	
	G_SelectedListOfImages = '';
	for (var j = 0; j<listWithEntryKeys.length; j++){
		for (var i = 0; i<G_FullImageListDiary.length; i++){
				if (G_FullImageListDiary[i]['entryKey'] == listWithEntryKeys[j]){
					G_SelectedListOfImages = G_SelectedListOfImages + G_FullImageListDiary[i]['imageName']+',';
				}
		}
	}


	
	if (G_SelectedListOfImages != ''){
		getThumbnail3MainScreen(0);
	}
	
	enableGallery();
	
	$('#mainScreenNoTransactionMessage').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(G_TodaysCalendarID); });

}
 
 
 
 
function showViewEntryContainers(){
	$('#transactionChooseCategory').hide();
	$('#transactionDetailsNote').hide();
	$('#repetitiveTransactionNote').hide();	
	$('#transactionKeyBoardContainer').hide();
	$('#prevOrNextDayContainer').show();
	$('#saveOrCloseTransactionContainer').hide();
	$('#transactionAmmountInput').hide();
	$('#transactionList').show();
	$('#entryTransactionDelete').hide();
	$('#doAddPhoto').hide();
	
	
	
}

function showViewEntryEditTransaction(key){
	$('#imageListEditEntry').html('');
	$('#transactionActionContainer').hide();	
	$('#transactionListHeader').hide();
	$('#transactionActionContainerStep0').hide();
	G_AddTransactionBarConfirmation = 0;
	G_SelectedTransaction = [];
	G_NoteFirstView = 1;
	$('#entryPickDifferentDate').hide();
	$('#entryTransactionDelete').show();
	$('#doAddPhoto').show();
	//find and set the transaction
	for (var i=0; i<G_SelectedDayEntry['transactionList'].length; i++){
		if (G_SelectedDayEntry['transactionList'][i]['transactionKey'] == key){
			G_SelectedTransaction = G_SelectedDayEntry['transactionList'][i];
			G_SelectedTransactionArrayID = i;
			//console.log(G_SelectedTransaction);
		}
	}
	
	G_GENERALEntryKey = G_SelectedTransaction['transactionKey'];  
	
	var type = G_SelectedTransaction['transactionType'];
	
	$('#transactionAmountCalculation').html('');	
	var catID = -1;
	if (type == 'expense'){
		
		G_TransactionType = 'expense';	
		
		//Update hearder on choose page		
		$('#chooseCategoryIcon').html(translate('tranChooseExpenseCategories'));
		//$('#chooseTransactionCategoryIcon').attr('src','images/expense_categories_white.png');
		
		for (var i=0; i < G_selectedExpenseList.length; i++){
			if (G_selectedExpenseList[i]['code'] == G_SelectedTransaction['transactionCategoryCode']){
				catID = i;
			}
		}
		G_SelectedTransactionCategory = catID;
		var html = '<table cellpadding="0" cellspacing="0" width="100%" class="entrySelectedCategory" id="categorySelected'+i+'">'
					+'<tr>'										
						+'<td align="center" valign="middle" width="45px" style="padding-right:5px;"><div class="roundAroundIcons '+G_selectedExpenseList[G_SelectedTransactionCategory]['color']+'"><img src="images/categories/'+G_selectedExpenseList[G_SelectedTransactionCategory]['img']+'" width="25"/></div></td>'
						+'<td valign="middle"><span>'+translate(G_selectedExpenseList[G_SelectedTransactionCategory]['name'])+'</span></td>'
					+'</tr>'
				   +'</table>';
		$('#transactionCategoryName').html(html);
		$('#transactionCategoryAddEditIcon').html('<img src="images/edit_orange.png" width="30px;">');
		
		
	}else{
		
		G_TransactionType = 'income';
		
		//Update hearder on choose page		
		$('#chooseCategoryIcon').html(translate('tranIncomeCategoriesTitle'));
		//$('#chooseTransactionCategoryIcon').attr('src','images/income_categories_white.png');
		
		for (var i=0; i < G_selectedIncomeList.length; i++){
			if (G_selectedIncomeList[i]['code'] == G_SelectedTransaction['transactionCategoryCode']){
				catID = i;
			}
		}
		G_SelectedTransactionCategory = catID;
		var html = '<table cellpadding="0" cellspacing="0" width="100%" class="entrySelectedCategory" id="categorySelected'+i+'">'
					+'<tr>'				
						+'<td align="center" valign="middle" width="45px"  style="padding-right:5px;"><div class="roundAroundIcons '+G_selectedIncomeList[G_SelectedTransactionCategory]['color']+'"><img src="images/categories/'+G_selectedIncomeList[G_SelectedTransactionCategory]['img']+'" width="25"/></div></td>'
						+'<td valign="middle"><span>'+translate(G_selectedIncomeList[G_SelectedTransactionCategory]['name'])+'</span></td>'
					+'</tr>'
				   +'</table>';
		$('#transactionCategoryName').html(html);
		$('#transactionCategoryAddEditIcon').html('<img src="images/edit_orange.png" width="30px;">');
	}
	
	//fill in existing data
	G_TransactionAmount = G_SelectedTransaction['transactionAmount'];
	if (G_TransactionType == 'expense'){
		$('.amountInput').css('color','#ff0000');
		$('.amountInput').css('border','1px solid #ec949c');
		$('.amountInput').css('background-color','#fff4f5');
		$('.amountInput').css('-webkit-box-shadow','inset 0px 0px 6px 0px rgba(204, 0, 0, 0.5)');
		$('.amountInput').css('-moz-box-shadow','inset 0px 0px 6px 0px rgba(204, 0, 0,0.5)');
		$('.amountInput').css('-box-shadow','inset 0px 0px 6px 0px rgba(204, 0, 0,0.5)');	
		$('#backspaceButton').attr('src','images/backspace_red.png');	
		
		$('#transactionAmountValue').html(G_TransactionAmount+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}else{
		$('.amountInput').css('color','#00c108');
		$('.amountInput').css('border','1px solid #aee8b9');
		$('.amountInput').css('background-color','#f7ffee');
		$('.amountInput').css('-webkit-box-shadow','inset 0px 0px 6px 0px rgba(111, 187, 114, 0.5)');
		$('.amountInput').css('-moz-box-shadow','inset 0px 0px 6px 0px rgba(111, 187, 114,0.5)');
		$('.amountInput').css('-box-shadow','inset 0px 0px 6px 0px rgba(111, 187, 114,0.5)');
		$('#backspaceButton').attr('src','images/backspace_green.png');
		
		$('#transactionAmountValue').html(G_TransactionAmount+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}
		
	$('#transactionAmountCalculation').html('');
		
	G_SelectedTransactionNote = G_SelectedTransaction['transactionNote'];
	if (G_SelectedTransactionNote != ''){
		$('#transactionNote').html(translate('trNote')+' ');
		$('#transactionNoteContainer').show();
		$('#transactionNoteText').html(G_SelectedTransactionNote);
	}else{
		$('#transactionNote').html(translate('trAddNote'));
		$('#transactionNoteContainer').hide();
		$('#transactionNoteText').html('');
	}
	
	showImagesInEditEntryScreen();
	
	//show or hide containers
	$('#transactionChooseCategory').show();
	$('#transactionDetailsNote').show();
	if (G_NumberOfAppStarts > G_MessageOccurances){
		$('#repetitiveTransactionNote').hide();				
	}else{
		$('#repetitiveTransactionNote').show();
	}
	$('#transactionKeyBoardContainer').hide();
	$('#prevOrNextDayContainer').hide();
	$('#saveOrCloseTransactionContainer').show();
	$('#transactionAmmountInput').show();
	$('#transactionList').hide();
	

}

function showViewEntryAddTransaction(type){
	
	
	
	
	
	G_NoteFirstView = 1;
	var selDate = intToDate(G_SelectedDay);
	$('#entryCurrentMonthAndDay').html(selDate.getFullDayName()+', '+selDate.getMonthShortName()+' '+ selDate.getDate());
	$('#entryCurrentYear').html(selDate.getFullYear());
	
	//$('#transactionAmountValue').html('0 <span style="color:#30475E; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	$('#transactionAmountCalculation').html('');	
	$('#noteTextArea').val('');
	$('#transactionActionContainer').hide();
	$('#transactionListHeader').hide();
	$('#transactionActionContainerStep0').hide();
	G_AddTransactionBarConfirmation = 0;
	$('#entryPickDifferentDate').show();
	$('#doAddPhoto').show();
	
	$('#transactionNote').html(translate('trAddNote'));
	$('#transactionCategoryAddEditIcon').html('<img src="images/add_new.png" width="30px;">');
	
	if (type == 'expense'){
		$('.amountInput').css('color','#ff0000');
		$('.amountInput').css('border','1px solid #ec949c');
		$('.amountInput').css('background-color','#fff4f5');
		$('.amountInput').css('-webkit-box-shadow','inset 0px 0px 6px 0px rgba(204, 0, 0, 0.5)');
		$('.amountInput').css('-moz-box-shadow','inset 0px 0px 6px 0px rgba(204, 0, 0,0.5)');
		$('.amountInput').css('-box-shadow','inset 0px 0px 6px 0px rgba(204, 0, 0,0.5)');
		$('#backspaceButton').attr('src','images/backspace_red.png');
		
		$('#transactionAmountValue').html('0 <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}else{
		
		$('.amountInput').css('color','#00c108');
		$('.amountInput').css('border','1px solid #aee8b9');
		$('.amountInput').css('background-color','#f7ffee');
		$('.amountInput').css('-webkit-box-shadow','inset 0px 0px 6px 0px rgba(111, 187, 114, 0.5)');
		$('.amountInput').css('-moz-box-shadow','inset 0px 0px 6px 0px rgba(111, 187, 114,0.5)');
		$('.amountInput').css('-box-shadow','inset 0px 0px 6px 0px rgba(111, 187, 114,0.5)');
		$('#backspaceButton').attr('src','images/backspace_green.png');
		
		$('#transactionAmountValue').html('0 <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}
	
	if (type == 'expense'){
		$('#transactionCategoryName').html(translate('trChooseExpenseCat'));
		$('#chooseCategoryIcon').html(translate('tranSettingsExpenseCategories'));
		//$('#chooseTransactionCategoryIcon').attr('src','images/expense_categories_white.png');
	}else{		
		$('#transactionCategoryName').html(translate('trChooseIncomeCat'));
		$('#chooseCategoryIcon').html(translate('tranSettingsIncomeCategories'));
		//$('#chooseTransactionCategoryIcon').attr('src','images/categories_white.png');
	}
	
	//show or hide containers
	$('#transactionChooseCategory').show();
	$('#transactionDetailsNote').show();
	if (G_NumberOfAppStarts > G_MessageOccurances){
		$('#repetitiveTransactionNote').hide();				
	}else{
		$('#repetitiveTransactionNote').show();
	}
	$('#transactionKeyBoardContainer').hide();
	$('#prevOrNextDayContainer').hide();
	$('#saveOrCloseTransactionContainer').show();
	$('#transactionAmmountInput').show();
	$('#transactionList').hide();
	$('#transactionNoteContainer').hide();
}


function showViewEntryAddAmount(){
	$('#entryPickDifferentDate').hide();
	$('#doAddPhoto').hide();
	
	if (G_TransactionType == 'expense'){
		$('#transactionAmountValue').html(G_TransactionAmount+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}else{
		$('#transactionAmountValue').html(G_TransactionAmount+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}
	$('#transactionAmountCalculation').html('');
	G_TransactionAmountString = G_TransactionAmount.toString();
	
	//show or hide containers
	$('#transactionChooseCategory').hide();
	$('#transactionDetailsNote').hide();
	$('#repetitiveTransactionNote').hide();
	$('#transactionKeyBoardContainer').show();
	$('#prevOrNextDayContainer').hide();
	$('#saveOrCloseTransactionContainer').hide();
	$('#transactionAmmountInput').show();
}

function entryScreenShowAddBar(){
	
	$('#reviewMainScreenActionPanel').show();
	$('#transactionActionContainer').show();
	$('#transactionActionContainerStep0').hide();	
	$('#transactionActionContainerClose').show();
	
	G_AddTransactionBarConfirmation = 1;
}

function closeEntryScreenAddButtons(){
	$('#reviewMainScreenActionPanel').hide();
	$('#transactionActionContainer').hide();					
	$('#transactionActionContainerStep0').show();
	$('#transactionActionContainerClose').hide();
	
	G_AddTransactionBarConfirmation = 0;
}

function doShowDay(intDate){
	$('#imageListEditEntry').html('');
	$('#entryPickDifferentDate').hide();
	$('#doAddPhoto').hide();
	//$('#transactionActionContainer').show();
	$('#transactionActionContainer').hide();
	$('#transactionListHeader').show();
	$('#transactionActionContainerStep0').show();
	G_AddTransactionBarConfirmation = 0;
	//prepare page
	var thisDay = new Date(intToDate(intDate));
	var nextDay = new Date(intToDate(intDate));
	var prevDay = new Date(intToDate(intDate));
	
	nextDay.setDate(nextDay.getDate()+1);
	prevDay.setDate(prevDay.getDate()-1);
	
	G_NextDay = dateToInt(nextDay);
	G_PrevDay = dateToInt(prevDay);
	G_SelectedDay = dateToInt(thisDay);

	
	$('#entryCurrentMonthAndDay').html(thisDay.getFullDayName()+', '+thisDay.getMonthShortName()+' '+ thisDay.getDate());
	$('#entryCurrentYear').html(thisDay.getFullYear());
	$('#entryNextDay').html(nextDay.getMonthShortName()+ ' ' + nextDay.getDate());
	$('#entryPrevDay').html(prevDay.getMonthShortName()+ ' ' + prevDay.getDate())
	
	
	
	
	
	//logic for filling in the day transactions
	
	/*check if day exists in list*/
	//verify if day exists
	
	var listWithEntryKeys = [];
	var entryDay = -1;
	for (var i=0; i< G_FullEntryList.length; i++){
		if (G_FullEntryList[i]['dateKey'] == G_SelectedDay){
			entryDay = i;
		}
	}
	
	var html = '<div style="padding:10px; padding-top:50px; padding-bottom:50px; text-align:center; font-size:14px; color:#999; ">'+translate('trNoTransactionsOnThisDay')+'</div>';
	var selectedDayTransactions = [];
	if (entryDay > -1){
		var imageListHTML = '';
		G_SelectedDayEntryArrayID = entryDay;
		G_SelectedDayEntry = G_FullEntryList[entryDay];
		//check if there are transactions
		if (G_FullEntryList[entryDay]['transactionList'].length > 0){
			selectedDayTransactions = G_FullEntryList[entryDay]['transactionList'];	
			//console.log(selectedDayTransactions);		
			html = '<table cellpadding="0" cellspacing="0" width="100%">';
			var categoryIcon = '';
			var categoryName = '';
			var catID = -1;
			var note = '';
			for (var i=(selectedDayTransactions.length -1); i >= 0; i--){
				catID = -1;
				if(selectedDayTransactions[i]['transactionNote'] == ''){
					note = '<span style="color:#999">'+translate('trNoAdditionalNote')+'</span>';
				}else{
					note = selectedDayTransactions[i]['transactionNote'];
				}
				
				if (selectedDayTransactions[i]['transactionType'] == 'expense'){
					for (var j = 0; j < G_selectedExpenseList.length; j++){
						if (G_selectedExpenseList[j]['code'] == selectedDayTransactions[i]['transactionCategoryCode']){
							catID = j;
						}
					}
					categoryIcon = 'images/categories/'+G_selectedExpenseList[catID]['img'];
					categoryName = translate(G_selectedExpenseList[catID]['name']);
					
					imageListHTML = '';
					imageListHTML = getAllImagesForEntryKeyView(selectedDayTransactions[i]['transactionKey']);
					if ( imageListHTML != '' && imageListHTML !== undefined){
						//do nothing
					}else{
						imageListHTML = '';
					}
					
					console.log(imageListHTML);
					
										
					html = html + '<tr>'
							+'<td align="center" style="padding:0px 0px 2px 0px;">'
								+'<table cellpadding="0" cellspacing="0" width="100%" class="expenseShadow" >'
									+'<tr>'										
										+'<td class="expenseListLeftSide" valign="top">'
											+'<table width="100%" cellpadding="0" cellspacing="0" style="padding:2px 2px 2px 0px;">'
												+'<tr>'
													+'<td valign="center" align="left" width="35px" height="35px">'
														+'<div class="roundAroundIconsSmall '+G_selectedExpenseList[catID]['color']+'">'
															+'<img src="'+categoryIcon+'" height="18px">'
														+'</div>'
													+'</td>'
													+'<td align="left" >'+categoryName+'</td>'
													+'<td align="right" style="color:#ff3c3c;">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(selectedDayTransactions[i]['transactionAmount']).formatMoney(2)+'</td>'
												+'</tr>'
												+'<tr>'
													+'<td colspan="3" align="left" class="expenseNoteViewTransaction" >'+translate('trNote')+'<br><em class="noteDetails">'+note+'</em></td>'
												+'</tr>'
												+'</tr>'
													+imageListHTML 
												+'<tr>'
											+'</table>'
										+'</td> ' 
										+'<td class="expenseListRightSide editButtonTransaction"  align="center" valign="center" id="transactionKey'+selectedDayTransactions[i]['transactionKey']+'">'
											+'<table width="100%" cellpadding="0" cellspacing="0" height="100%">'												
												+'<tr>'
													+'<td align="center" >'
														+'<div>'
															+'<img src="images/edit_dark.png" width="20px;" />'
														+'</div>'
													+'</td>'
												+'</tr>'
											+'</table>'												
										+'</td>'                                           
									+'</tr>'
								+'</table>'
							+'</td>'
						+'</tr>';
						listWithEntryKeys.push(selectedDayTransactions[i]['transactionKey']);
				}else if (selectedDayTransactions[i]['transactionType'] == 'income'){
					for (var j = 0; j < G_selectedIncomeList.length; j++){
						if (G_selectedIncomeList[j]['code'] == selectedDayTransactions[i]['transactionCategoryCode']){
							catID = j;
						}
					}	
					/*console.log(selectedDayTransactions[i]['transactionCategoryCode']);
					console.log('len - ' + G_selectedIncomeList.length);
					console.log('cat - ' + catID);*/
					categoryIcon = 'images/categories/'+G_selectedIncomeList[catID]['img'];
					categoryName = translate(G_selectedIncomeList[catID]['name']);
					
					imageListHTML = '';
					imageListHTML = getAllImagesForEntryKeyView(selectedDayTransactions[i]['transactionKey']);
					if ( imageListHTML != '' && imageListHTML !== undefined){
						//do nothing
					}else{
						imageListHTML = '';
					}
					
					
					
					html = html +'<tr>'
							+'<td align="center" style="padding:0px 0px 2px 0px;">'
								+'<table cellpadding="0" cellspacing="0" width="100%" class="incomeShadow" >'
									+'<tr>'										
										+'<td class="incomeListLeftSide" valign="top">'
											+'<table width="100%" cellpadding="0" cellspacing="0" style="padding:2px 2px 2px 0px;">'
												+'<tr>'
													+'<td valign="center" align="left" width="35px" height="35px">'
														+'<div class="roundAroundIconsSmall '+G_selectedIncomeList[catID]['color']+'">'
															+'<img src="'+categoryIcon+'" height="18px">'
														+'</div>'
													+'</td>'
													+'<td align="left" >'+categoryName+'</td>'
													+'<td align="right" style="color:#029200;">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(selectedDayTransactions[i]['transactionAmount']).formatMoney(2)+'</td>'
												+'</tr>'
												+'<tr>'
													+'<td colspan="3" align="left" class="incomeNoteViewTransaction" >'+translate('trNote')+'<br><em class="noteDetails">'+note+'</em></td>'
												+'</tr>'
												+'</tr>'
													+imageListHTML 
												+'<tr>'
											+'</table>'
										+'</td> '
										+'<td class="incomeListRightSide editButtonTransaction"  align="center" valign="center" id="transactionKey'+selectedDayTransactions[i]['transactionKey']+'" >'
											+'<table width="100%" cellpadding="0" cellspacing="0" >'												
												+'<tr>'
													+'<td align="center" >'
														+'<div>'
															+'<img src="images/edit_dark.png" width="20px;" />'
														+'</div>'
													+'</td>'
												+'</tr>'
											+'</table>'												
										+'</td>'                              
									+'</tr>'
								+'</table>'
							+'</td>'
						+'</tr>';
						listWithEntryKeys.push(selectedDayTransactions[i]['transactionKey']);
				}
			}
			html = html + '</table>';
			html = html + '<div style="padding:12px 10px 12px 10px; margin-top:1px;  background-color: #FFFACE;" >'+
								'<table style="font-size:16px;color: #30475e;" cellpadding="0" cellspacing="0" width="100%">'+
									'<tr>'+
										'<td align="left">'+translate('trDayBalance')+'</td>'+
										'<td align="right">'+G_currencyList[G_SelectedCurrency]['shortcode']+' '+(parseFloat(G_FullEntryList[entryDay]['dayBalance'])).formatMoney(2)+'</td>'+
									'</tr>'+
								'</table>'+
			'</div>';
			//console.log(html);
			
		}else{
			//no transactions for the day
		}
	}else{
		//no entry for the day = no transactions for the day
	}
	$('#transactionList').html(html);
	enableGallery();
	
	G_SelectedListOfImages = '';
	for (var j = 0; j<listWithEntryKeys.length; j++){
		for (var i = 0; i<G_FullImageListDiary.length; i++){
				if (G_FullImageListDiary[i]['entryKey'] == listWithEntryKeys[j]){
					G_SelectedListOfImages = G_SelectedListOfImages + G_FullImageListDiary[i]['imageName']+',';
				}
		}
	}


	
	if (G_SelectedListOfImages != ''){
		getThumbnail3(0);  
	}
	
	
	$('.editButtonTransaction').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); editTransactionWithTransactionKey(parseInt(((this.id).replace('transactionKey',''))))});
	
	//end of logic for filling in the day transactions
	
	//console.log(nextDay + ' - ' +  prevDay);
}

function doSelectCalendarDay(id){

	//if (G_currentMonthDays[id]['monthOfYear'] == G_chosenMonth){	
		doShowDay(parseInt(G_currentMonthDays[id]['calendarID']))	
		showViewEntryContainers();
		Screen.gotoPage('entryscreen');
		//console.log(G_currentMonthDays[id]);
		G_EntryScreenFromLocation = 'dayDetails';
		G_EntryTransactionStep = 'focus';
	//}
}

function datePickerdoSelectCalendarDay(id){
	
	if (G_currentMonthDays[id]['monthOfYear'] == G_chosenMonth){	
		G_SelectedDay = G_currentMonthDays[id]['calendarID'];
		var selDate = intToDate(G_SelectedDay);
		$('#entryCurrentMonthAndDay').html(selDate.getFullDayName()+', '+selDate.getMonthShortName()+' '+ selDate.getDate());
		$('#entryCurrentYear').html(selDate.getFullYear());
		Screen.gotoPage('entryscreen');
		
	}
}

function addExpense(selectedDay){
	//doShowDay(selectedDay);
	var d = new Date();
	G_GENERALEntryKey = d.getTime();
	G_SelectedDay = selectedDay;
	showViewEntryAddTransaction('expense');
	G_TransactionType = 'expense';
	G_EntryTransactionStep = 'focus';
	Screen.gotoPage('entryscreen');
	G_TransactionAmountString = '0';
}

function addIncome(selectedDay){
	//doShowDay(selectedDay);
	G_SelectedDay = selectedDay;
	var d = new Date();
	G_GENERALEntryKey = d.getTime();
	showViewEntryAddTransaction('income');
	G_TransactionType = 'income';
	G_EntryTransactionStep = 'focus';
	Screen.gotoPage('entryscreen');
	G_TransactionAmountString = '0';
}

function editTransactionAmount(){
	G_EntryTransactionStep = 'edit';
	closeDeleteTransaction();
	closeDeleteImageConfirmation();
	closeImagePickerConfirmation();
	$('#entryTransactionDelete').hide();
	$('#imageListEditEntry').hide();
	
	showViewEntryAddAmount();
}

function transactionChooseCategory(selectedElementCode){
	//prepare list of expenses

	
	closeDeleteTransaction();
	closeDeleteImageConfirmation();
	closeImagePickerConfirmation();
	
	var html = '';
	var usedIcon = 'images/empty_check_icon.png';
	var backGroundColor = 'style="background-color:none;"';
	if (G_TransactionType == 'expense'){
		for (var i = 0; i<G_selectedExpenseList.length; i++){
			if (G_SelectedTransactionCategory == i ){		
				usedIcon = 'images/full_check_icon.png';
				backGroundColor = 'style="background-color: #FFEFBC;"';
			}else{
				usedIcon = 'images/empty_check_icon.png';
				backGroundColor = 'style="background-color: none;"';
			}
			
			html = html 
				+'<tr><td><table cellpadding="0" cellspacing="0" width="100%" class="chooseCategory" id="categorySelected'+i+'" '+backGroundColor+'><tr>'				
					+'<td align="left" valign="middle" width="55px" style="padding-left:7px"><div class="roundAroundIcons '+G_selectedExpenseList[i]['color']+'"><img src="images/categories/'+G_selectedExpenseList[i]['img']+'" width="25"/><div></td>'
					+'<td valign="middle"><span>'+translate(G_selectedExpenseList[i]['name'])+'</span></td>'
					+'<td valign="middle" align="center" width="55px">'
					   +' <div class="firstDayDiv">'
							+'<img src="'+usedIcon+'" id="categorySelectedIcon'+i+'" width="25px" align="absmiddle">'
						+'</div>'
					+'</td></tr></table>'				
				+'</tr>';
		}
	}else if (G_TransactionType == 'income'){
		for (var i = 0; i < G_selectedIncomeList.length; i++){
			if (G_SelectedTransactionCategory == i ){		
				usedIcon = 'images/full_check_icon.png';
				backGroundColor = 'style="background-color: #FFEFBC;"';
			}else{
				usedIcon = 'images/empty_check_icon.png';
				backGroundColor = 'style="background-color: none;"';
			}
			
			html = html 
				+'<tr><td><table cellpadding="0" cellspacing="0" width="100%" class="chooseCategory" id="categorySelected'+i+'" '+backGroundColor+'><tr>'	
					+'<td align="left" valign="middle" width="55px" style="padding-left:7px"><div class="roundAroundIcons '+G_selectedIncomeList[i]['color']+'"><img src="images/categories/'+G_selectedIncomeList[i]['img']+'" width="25"/></div></td>'
					+'<td valign="middle"><span>'+translate(G_selectedIncomeList[i]['name'])+'</span></td>'
					+'<td valign="middle" align="center" width="55px">'
					   +' <div class="firstDayDiv">'
							+'<img src="'+usedIcon+'" id="categorySelectedIcon'+i+'" width="25px" align="absmiddle">'
						+'</div>'
					+'</td></tr></table>'				
				+'</tr>';
		}
	}
	
	//fill list of incomes
	$('#tableListOfCategories').html(html);	
	$('.chooseCategory').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseCategoryOnTransaction(parseInt(((this.id).replace('categorySelected',''))))});
	Screen.gotoPage('chooseexpensecategories');
}

function chooseCategoryOnTransaction(id){
	if (G_SelectedTransactionCategory > -1 ){		
		$('#categorySelectedIcon'+G_SelectedTransactionCategory).attr('src','images/empty_check_icon.png');
	}
	$('#categorySelectedIcon'+id).attr('src','images/full_check_icon.png');
	G_SelectedTransactionCategory = id;
	if (G_TransactionType == 'expense'){
		var html = '<table cellpadding="0" cellspacing="0" width="100%" class="entrySelectedCategory" id="categorySelected'+i+'">'
					+'<tr>'										
						+'<td align="center" valign="middle" width="45px" style="padding-right:5px;"><div class="roundAroundIcons '+G_selectedExpenseList[G_SelectedTransactionCategory]['color']+'"><img src="images/categories/'+G_selectedExpenseList[G_SelectedTransactionCategory]['img']+'" width="25"/></div></td>'
						+'<td valign="middle"><span>'+translate(G_selectedExpenseList[G_SelectedTransactionCategory]['name'])+'</span></td>'
					+'</tr>'
				   +'</table>';
	}else if (G_TransactionType == 'income'){
		var html = '<table cellpadding="0" cellspacing="0" width="100%" class="entrySelectedCategory" id="categorySelected'+i+'">'
					+'<tr>'
						+'<td align="center" valign="middle" width="45px" style="padding-right:5px;"><div class="roundAroundIcons '+G_selectedIncomeList[G_SelectedTransactionCategory]['color']+'"><img src="images/categories/'+G_selectedIncomeList[G_SelectedTransactionCategory]['img']+'" width="25"/></div></td>'
						+'<td valign="middle"><span>'+translate(G_selectedIncomeList[G_SelectedTransactionCategory]['name'])+'</span></td>'
					+'</tr>'
				   +'</table>';
	}
	$('#transactionCategoryName').html(html);
	$('#transactionCategoryAddEditIcon').html('<img src="images/edit_orange.png" width="30px;">');
	
	Screen.gotoPage('entryscreen');
	
}

function transactionDetailsAddNote(){
	closeDeleteTransaction();
	closeDeleteImageConfirmation();
	closeImagePickerConfirmation();
	if (G_NoteFirstView == 1){
		if (typeof G_SelectedTransaction['transactionKey'] != "undefined"){		
			$('#noteTextArea').val(G_SelectedTransaction['transactionNote']);				
		}else{
			$('#noteTextArea').val('');			
		}
		G_NoteFirstView = 0;
	}else {
	}
	
	
	
	Screen.gotoPage('addnotescreen');
}
function closeTransactionNote(){
	Screen.gotoPage('entryscreen');
}

function saveTransactionNote(){
	G_SelectedTransactionNote = $('#noteTextArea').val();
	if (G_SelectedTransactionNote != ''){
		$('#transactionNote').html(translate('trNote'));
		$('#transactionNoteContainer').show();
		$('#transactionNoteText').html(G_SelectedTransactionNote);
	}
	Screen.gotoPage('entryscreen');
}

function editTransactionWithTransactionKey(key){
	//console.log(key);
	
	showViewEntryEditTransaction(key);
}

function entryTransactionDelete(){
	$('#confirmTransactionDelete').show();
	closeDeleteImageConfirmation();
	closeImagePickerConfirmation();
	G_DeleteEntryConfirmation = 1;
}

function closeDeleteTransaction(){
	$('#confirmTransactionDelete').hide();
	G_DeleteEntryConfirmation = 0;
}

function yesDeleteTransaction(){
	
	
	$('#confirmTransactionDelete').hide();
	G_DeleteEntryConfirmation = 0;
	
	//update data for removal 
	//update day balance
	if(G_SelectedTransaction['transactionType'] == 'expense'){
		G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance'] = parseFloat((parseFloat(G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance']) + G_SelectedTransaction['transactionAmount'])).toFixed(2);
	}else if(G_SelectedTransaction['transactionType'] == 'income'){
		G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance'] = parseFloat((parseFloat(G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance']) - G_SelectedTransaction['transactionAmount'])).toFixed(2);
	}
	
	
	if(G_SelectedTransaction['transactionType'] == 'expense'){
		G_FullEntryList[G_SelectedDayEntryArrayID]['nrExpenseTransaction'] = G_FullEntryList[G_SelectedDayEntryArrayID]['nrExpenseTransaction']-1;
	}else if(G_SelectedTransaction['transactionType'] == 'income'){
		G_FullEntryList[G_SelectedDayEntryArrayID]['nrIncomeTransaction'] = G_FullEntryList[G_SelectedDayEntryArrayID]['nrIncomeTransaction']-1;
	}	

	
	G_FullEntryList[G_SelectedDayEntryArrayID]['transactionList'].splice(G_SelectedTransactionArrayID,1);
	
	saveFullEntryListToLocalStorageWithoutMessage();
	showSuccessMessage(translate('trRemoved'),2500);
	//go back
	doShowDay(G_SelectedDay);
	showViewEntryContainers();
}
////////////////////////////////////////////////////
// Save Transaction Logic
////////////////////////////////////////////////////



function saveDayTransaction(){
	var type = 'new';
	
	if (typeof G_SelectedTransaction['transactionKey'] != "undefined"){
		type = 'edit';
	}
	
	var blankTransaction = {
		"transactionKey" : 0,
		"transactionAmount": 0,
		"transactionType": '',
		"transactionCategoryCode" : '',				
		"transactionNote" : '',
		"repeatCode": -1
	};
	
	var blankDayEntry ={
		"dateKey" : 0,
		"monthNr" : 0,
		"yearNr" : 0,
		"weekNr" : 0,
		"nrExpenseTransaction" : 0,
		"nrIncomeTransaction" : 0,
		"dayBalance" : 0,
		"transactionList" : []		
	}
	
	if (type == 'new'){
		//check if all mandatory fields are filled in
		
		if (G_TransactionAmount > 0){
			if (G_SelectedTransactionCategory != -1){
				var d = new Date();
				var transactionKey = G_GENERALEntryKey;
				
				
				
				//settup transaction details
				blankTransaction['transactionKey'] = transactionKey;
				blankTransaction['transactionAmount'] = G_TransactionAmount;
				blankTransaction['transactionType'] = G_TransactionType;		
				if(G_TransactionType == 'expense'){
					blankTransaction['transactionCategoryCode'] = G_selectedExpenseList[G_SelectedTransactionCategory]['code'];
				}else if(G_TransactionType == 'income'){
					blankTransaction['transactionCategoryCode'] = G_selectedIncomeList[G_SelectedTransactionCategory]['code'];
				}
				blankTransaction['transactionNote'] = G_SelectedTransactionNote;
				blankTransaction['repeatCode'] = G_SelectedTransactionRepeatCode;
				
				
				//verify if day exists
				var entryDay = -1;
				for (var i=0; i< G_FullEntryList.length; i++){
					if (G_FullEntryList[i]['dateKey'] == G_SelectedDay){
						blankDayEntry = G_FullEntryList[i];
						entryDay = i;
					}
				}
				
				//updated if exists or create if new
				if (entryDay != -1){
					if(G_TransactionType == 'expense'){
						blankDayEntry['nrExpenseTransaction'] = G_FullEntryList[entryDay]['nrExpenseTransaction'] + 1;
						blankDayEntry['dayBalance'] = parseFloat((parseFloat(G_FullEntryList[entryDay]['dayBalance']) - G_TransactionAmount)).toFixed(2);
					}else if(G_TransactionType == 'income'){
						blankDayEntry['nrIncomeTransaction'] = G_FullEntryList[entryDay]['nrIncomeTransaction'] + 1;
						blankDayEntry['dayBalance'] = parseFloat((parseFloat(G_FullEntryList[entryDay]['dayBalance']) + G_TransactionAmount)).toFixed(2);
					}
					blankDayEntry['transactionList'].push(blankTransaction);
					G_FullEntryList[entryDay] = blankDayEntry;
				}else{
					if(G_TransactionType == 'expense'){
						blankDayEntry['nrExpenseTransaction'] = 1;
						blankDayEntry['dayBalance'] = parseFloat((parseFloat(blankDayEntry['dayBalance']) - G_TransactionAmount)).toFixed(2);
					}else if(G_TransactionType == 'income'){
						blankDayEntry['nrIncomeTransaction'] = 1;
						blankDayEntry['dayBalance'] = parseFloat((parseFloat(blankDayEntry['dayBalance']) + G_TransactionAmount)).toFixed(2);
					}
					blankDayEntry['dateKey'] = G_SelectedDay;
					blankDayEntry['weekNr'] = (intToDate(G_SelectedDay)).getWeekNumber();
					blankDayEntry['yearNr'] = (intToDate(G_SelectedDay)).getFullYear();
					blankDayEntry['monthNr'] = (intToDate(G_SelectedDay)).getMonth() + 1;
					
					
					
					blankDayEntry['transactionList'].push(blankTransaction);
					G_FullEntryList.push(blankDayEntry);
				}
				saveFullEntryListToLocalStorage();
				//console.log(G_EntryScreenFromLocation);
				if (G_EntryScreenFromLocation == 'dayDetails'){
					doShowDay(G_SelectedDay);
					showViewEntryContainers();
				}else if (G_EntryScreenFromLocation == 'fromMain'){
					prepareAndShowMainScreen();
				}

			}else{
				showFailMessage(translate('trChooseCategory'), 2500);
			}
		}else{
			showFailMessage(translate('trFillPositiveAmount'), 3000);
		}		
	}else if (type == 'edit'){
		//check if all mandatory fields are filled in
		
		if (G_TransactionAmount > 0){
			if (G_SelectedTransactionCategory != -1){				
				var blankTransaction = {
					"transactionKey" : 0,
					"transactionAmount": 0,
					"transactionType": '',
					"transactionCategoryCode" : '',				
					"transactionNote" : '',
					"repeatCode": -1
				};				
				
				//settup transaction details
				blankTransaction['transactionKey'] = G_SelectedTransaction['transactionKey'];
				blankTransaction['transactionAmount'] = G_TransactionAmount;
				blankTransaction['transactionType'] = G_SelectedTransaction['transactionType'];		
				if(G_SelectedTransaction['transactionType'] == 'expense'){
					blankTransaction['transactionCategoryCode'] = G_selectedExpenseList[G_SelectedTransactionCategory]['code'];
				}else if(G_SelectedTransaction['transactionType'] == 'income'){
					blankTransaction['transactionCategoryCode'] = G_selectedIncomeList[G_SelectedTransactionCategory]['code'];
				}
				blankTransaction['transactionNote'] = G_SelectedTransactionNote;
				blankTransaction['repeatCode'] = G_SelectedTransactionRepeatCode;
				
				
				//update day balance
				if(G_SelectedTransaction['transactionType'] == 'expense'){
					G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance'] = parseFloat((parseFloat(G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance']) + G_SelectedTransaction['transactionAmount'] - G_TransactionAmount)).toFixed(2);
				}else if(G_SelectedTransaction['transactionType'] == 'income'){
					
					G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance'] = parseFloat((parseFloat(G_FullEntryList[G_SelectedDayEntryArrayID]['dayBalance']) - G_SelectedTransaction['transactionAmount'] + G_TransactionAmount)).toFixed(2);
				}
				 
				G_FullEntryList[G_SelectedDayEntryArrayID]['transactionList'][G_SelectedTransactionArrayID] = blankTransaction;
				
				//console.log(G_FullEntryList);
				
				
				saveFullEntryListToLocalStorage();
				//console.log(G_EntryScreenFromLocation);
				
				//go back
				doShowDay(G_SelectedDay);
				showViewEntryContainers();
				
				

			}else{
				showFailMessage(translate('trChooseCategory'), 2500);
			}
		}else{
			showFailMessage(translate('trFillPositiveAmount'), 3000);
		}		
	} 	
}

function closeDayTransaction(){
	resetEntryUsedVariables();
	if (G_EntryScreenFromLocation == 'fromMain'){
		prepareAndShowMainScreen();
	}else if (G_EntryScreenFromLocation == 'dayDetails'){
		doShowDay(G_SelectedDay);
		showViewEntryContainers();
	}
}

function saveFullEntryListToLocalStorage(){
	var tempFullEntryListJSON = "";
	tempFullEntryListJSON = JSON.stringify({G_FullEntryList: G_FullEntryList});	
	localStorage.setItem("G_FullEntryList",CryptoJS.AES.encrypt(tempFullEntryListJSON,G_K));
	writeLocalStorageToFile();
	
	showSuccessMessage(translate('trSuccessfullySave'), 2000);
	
	//reset variables that are used during edit
	resetEntryUsedVariables();
}

function saveFullEntryListToLocalStorageWithoutMessage(){
	var tempFullEntryListJSON = "";
	tempFullEntryListJSON = JSON.stringify({G_FullEntryList: G_FullEntryList});	
	
	localStorage.setItem("G_FullEntryList",CryptoJS.AES.encrypt(tempFullEntryListJSON,G_K));
	writeLocalStorageToFile();
	
	//reset variables that are used during edit
	resetEntryUsedVariables();
}

function resetEntryUsedVariables(){
	//reset variables that are used during edit
	G_SelectedDayEntry = [];
	G_SelectedTransaction = [];
	G_SelectedTransactionArrayID = -1;
	G_SelectedDayEntryArrayID = -1;
	
	//reset entry used values
	G_SelectedTransactionCategory = '-1';
	G_SelectedTransactionNote = '';
	G_SelectedTransactionRepeatCode = -1;
	G_TransactionAmount = 0;
	G_TransactionAmountString = '0';
	G_CurrentAmountOperation = '';
	G_TransactionType = '';
}

////////////////////////////////////////////////////
// Calculator Logic
////////////////////////////////////////////////////
function registerKeyForTransactionAmount(keyValue){
	//console.log(eval('2+3+4*2'));
	if(G_TransactionAmountString.length < 15){	
		if (G_CurrentAmountOperation == 'Dot' && G_TransactionAmountString.indexOf('.') == -1){
			//console.log(G_TransactionAmountString+'.'+keyValue.toString());
			G_TransactionAmountString = G_TransactionAmountString+'.'+keyValue.toString();
			G_CurrentAmountOperation = '';
			//console.log(G_TransactionAmountString);
		}else{			
		
			if (G_CurrentAmountOperation == 'Divide' || G_CurrentAmountOperation == 'Multiply' || G_CurrentAmountOperation == 'Minus' || G_CurrentAmountOperation == 'Plus'){	
				//showFailMessage('Cannot divide by zero',2500);
				G_TransactionAmountString = '0';
				G_CurrentAmountOperation = '';
			}
			
			
			if (G_TransactionAmountString == '0'){		
				G_TransactionAmountString = keyValue.toString(); 
			}else{
				
				G_TransactionAmountString = G_TransactionAmountString+keyValue.toString();
			}
		}
		
		if (G_TransactionType == 'expense'){
			$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
		}else{
			$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
		}
		
		//console.log(keyValue);
	}
}

function registerOperationKeyForTransactionAmount(keyValue){
	
	
	var transactionAmountCalculation = $('#transactionAmountCalculation').html();
	
	
	//remove last dot character if exists	
	if (G_TransactionAmountString.substring((G_TransactionAmountString.length - 1),G_TransactionAmountString.length) == '.'){	
		G_TransactionAmountString = G_TransactionAmountString.substring(0,(G_TransactionAmountString.length - 1))
	}
	
	var temp_TransactionAmountString = (parseFloat(G_TransactionAmountString).toFixed(2)).toString();	
	
	
	if (temp_TransactionAmountString == parseInt(temp_TransactionAmountString, 10)){		
		temp_TransactionAmountString = (parseInt(temp_TransactionAmountString, 10)).toString();
	}
	
	if (keyValue == 'Divide'){		
		
		if (G_CurrentAmountOperation == '' || G_CurrentAmountOperation=='Dot'){
			$('#transactionAmountCalculation').html('('+transactionAmountCalculation + temp_TransactionAmountString + ') / ');	
		}else{
			$('#transactionAmountCalculation').html(transactionAmountCalculation.substring(0,(transactionAmountCalculation.length - 3))+' / ')				
		}
		$('#transactionAmountCalculation').show();			
		evaluateTotalAmount();			
		G_CurrentAmountOperation = 'Divide';
	}else if (keyValue == 'Multiply'){
		if (G_CurrentAmountOperation == '' || G_CurrentAmountOperation=='Dot'){
			$('#transactionAmountCalculation').html('('+transactionAmountCalculation + temp_TransactionAmountString + ') * ');
		}else{
			$('#transactionAmountCalculation').html(transactionAmountCalculation.substring(0,(transactionAmountCalculation.length - 3))+' * ')				
		}
		$('#transactionAmountCalculation').show();			
		evaluateTotalAmount();	
		G_CurrentAmountOperation = 'Multiply';		
	}else if (keyValue == 'Minus'){
		if (G_CurrentAmountOperation == '' || G_CurrentAmountOperation=='Dot'){
			$('#transactionAmountCalculation').html('('+transactionAmountCalculation + temp_TransactionAmountString + ') - ');
		}else{
			$('#transactionAmountCalculation').html(transactionAmountCalculation.substring(0,(transactionAmountCalculation.length - 3))+' - ')				
		}
		$('#transactionAmountCalculation').show();			
		evaluateTotalAmount();			
		G_CurrentAmountOperation = 'Minus';		
	}else if (keyValue == 'Plus'){		
		if (G_CurrentAmountOperation == '' || G_CurrentAmountOperation=='Dot'){
			$('#transactionAmountCalculation').html('('+transactionAmountCalculation + temp_TransactionAmountString + ') + ');	
			
		}else{			
			$('#transactionAmountCalculation').html(transactionAmountCalculation.substring(0,(transactionAmountCalculation.length - 3))+' + ')				
		}
		$('#transactionAmountCalculation').show();
		evaluateTotalAmount();
		G_CurrentAmountOperation = 'Plus';
	}else if (keyValue == 'Equal'){
		$('#transactionAmountCalculation').html('('+transactionAmountCalculation + temp_TransactionAmountString + ')   ');
		G_CurrentAmountOperation = 'Equal';
		evaluateTotalAmount();
		$('#transactionAmountCalculation').html('');
		
	}else if (keyValue == 'Dot' && G_TransactionAmountString.indexOf('.') == -1){
		G_CurrentAmountOperation = 'Dot';
		
		if (G_TransactionType == 'expense'){
			$('#transactionAmountValue').html(G_TransactionAmountString+'. <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
		}else{
			$('#transactionAmountValue').html(G_TransactionAmountString+'. <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
		}
		
		
	}
	
}

function evaluateTotalAmount(){
	G_TransactionAmount = Math.round((eval(($('#transactionAmountCalculation').html()).substring(0,(($('#transactionAmountCalculation').html()).length - 2)))) * 100) / 100;
	if (G_TransactionAmount.toString() == 'Infinity'){
		resetCalculation();
		showFailMessage(translate('trDivisionByZero'), 2500);
	}else{
		if (G_TransactionAmount.toString() != 'NaN'){
			
			if (G_TransactionType == 'expense'){
				$('#transactionAmountValue').html(G_TransactionAmount.toString()+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
			}else{
				$('#transactionAmountValue').html(G_TransactionAmount.toString()+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
			}
			
			if (G_CurrentAmountOperation == 'Equal'){
				G_TransactionAmountString = G_TransactionAmount.toString();
				G_CurrentAmountOperation = '';
			}
		}else{			
			resetCalculation();
		}
	}
}

function resetCalculation(){
	G_TransactionAmount = 0;
	G_TransactionAmountString = '0';
	G_CurrentAmountOperation = '';
	if (G_TransactionType == 'expense'){
		$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}else{
		$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}
	
	$('#transactionAmountCalculation').html('');
}

function pressBackSpaceKey(){
	if ( G_CurrentAmountOperation != 'Multiply' && G_CurrentAmountOperation != 'Divide' && G_CurrentAmountOperation != 'Plus' && G_CurrentAmountOperation != 'Minus'){
		if (G_TransactionAmountString.length == 1 && G_TransactionAmountString != '0'){
			G_TransactionAmountString = '0';
			if (G_TransactionType == 'expense'){
				$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
			}else{
				$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
			}
			
		}else if (G_TransactionAmountString.length == 1 && G_TransactionAmountString == '0'){
			G_TransactionAmountString = '0';
			resetCalculation();
		}else if (G_TransactionAmountString.length > 0){
			G_TransactionAmountString = G_TransactionAmountString.substring(0, (G_TransactionAmountString.length -1));
			if (G_TransactionType == 'expense'){
				$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
			}else{
				$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
			}
			
		}
	}else{
		registerOperationKeyForTransactionAmount('Equal');
		//pressBackSpaceKey();
	}
}

function closeAddTransaction(){
	if (typeof G_SelectedTransaction['transactionKey'] != "undefined"){	
		$('#entryTransactionDelete').show();
		$('#doAddPhoto').show();
	}else{
		$('#entryPickDifferentDate').show();
		$('#doAddPhoto').show();
	}
	closeDeleteImageConfirmation();
	closeDeleteTransaction();
	closeImagePickerConfirmation();
	
	$('#imageListEditEntry').show();
	
	if (typeof G_SelectedTransaction['transactionKey'] != "undefined"){
		//console.log(G_SelectedTransaction);
		
		if (G_TransactionType == 'expense'){
			$('#transactionAmountValue').html(G_SelectedTransaction['transactionAmount']+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');		
		}else{
			$('#transactionAmountValue').html(G_SelectedTransaction['transactionAmount']+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');		
		}
		
		$('#transactionAmountCalculation').html('');
		G_TransactionAmount = G_SelectedTransaction['transactionAmount'];
		G_TransactionAmountString = G_SelectedTransaction['transactionAmount'].toString();
		G_CurrentAmountOperation = '';
	}else{
		resetCalculation();
		if (G_TransactionType == 'expense'){
			$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
		}else{
			$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
		}
		
		$('#transactionAmountCalculation').html('');
	}
	//showViewEntryEditTransaction(G_TransactionType);
	
	$('#transactionChooseCategory').show();
	$('#transactionDetailsNote').show();
	if (G_NumberOfAppStarts > G_MessageOccurances){
		$('#repetitiveTransactionNote').hide();				
	}else{
		$('#repetitiveTransactionNote').show();
	}
	$('#transactionKeyBoardContainer').hide();
	$('#prevOrNextDayContainer').hide();
	$('#saveOrCloseTransactionContainer').show();
	$('#transactionAmmountInput').show();
	$('#transactionList').hide();
	
	G_EntryTransactionStep = 'focus';
}

function doneAddTransaction(){
	
	
	
	if (typeof G_SelectedTransaction['transactionKey'] != "undefined"){	
		$('#entryTransactionDelete').show();
		$('#doAddPhoto').show();
	}else{
		$('#entryPickDifferentDate').show();
		$('#doAddPhoto').show();
	}
	$('#imageListEditEntry').show();
	closeDeleteImageConfirmation();
	closeDeleteTransaction();
	closeImagePickerConfirmation();

	
	registerOperationKeyForTransactionAmount('Equal');
	if (G_TransactionType == 'expense'){
		$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#ff0000; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}else{
		$('#transactionAmountValue').html(G_TransactionAmountString+' <span style="color:#00c108; font-size:16px;">'+G_currencyList[G_SelectedCurrency]['code']+'</span>');
	}
	
	$('#transactionAmountCalculation').html('');
	
	//show or hide containers
	$('#transactionChooseCategory').show();
	$('#transactionDetailsNote').show();
	if (G_NumberOfAppStarts > G_MessageOccurances){
		$('#repetitiveTransactionNote').hide();				
	}else{
		$('#repetitiveTransactionNote').show();
	}
	$('#transactionKeyBoardContainer').hide();
	$('#prevOrNextDayContainer').hide();
	$('#saveOrCloseTransactionContainer').show();
	$('#transactionAmmountInput').show();
	$('#transactionList').hide();
	G_EntryTransactionStep = 'focus';	
}

////////////////////////////////////////////////////
// END Calculator Logic
////////////////////////////////////////////////////


//////////////////////////////////////////////////
// TRANSLATE RELATED
/////////////////////////////////////////////////
function translateToCODE(langCode,showChangeMessage){
	
	if (langCode == 'EN'){
		G_Translations = G_TRANSLATE_EN;
	}else if (langCode == 'RO'){
		G_Translations = G_TRANSLATE_RO;
	}else if (langCode == 'ES'){
		G_Translations = G_TRANSLATE_ES;
	}else if (langCode == 'PT'){
		G_Translations = G_TRANSLATE_PT;
	}else if (langCode == 'FR'){
		G_Translations = G_TRANSLATE_FR;
	}else if (langCode == 'RU'){
		G_Translations = G_TRANSLATE_RU;
	}else if (langCode == 'TH'){
		G_Translations = G_TRANSLATE_TH;
	}else if (langCode == 'DE'){
		G_Translations = G_TRANSLATE_DE;
	}else if (langCode == 'EL'){
		G_Translations = G_TRANSLATE_EL;
	}else if (langCode == 'IT'){
		G_Translations = G_TRANSLATE_IT;
	}else if (langCode == 'JA'){
		G_Translations = G_TRANSLATE_JA;
	}else if (langCode == 'HI'){
		G_Translations = G_TRANSLATE_HI;
	}else if (langCode == 'MS'){
		G_Translations = G_TRANSLATE_MS;
	}else if (langCode == 'ID'){
		G_Translations = G_TRANSLATE_ID;
	}else if (langCode == 'TR'){
		G_Translations = G_TRANSLATE_TR;
	}else if (langCode == 'UK'){
		G_Translations = G_TRANSLATE_UK;
	}else if (langCode == 'NL'){
		G_Translations = G_TRANSLATE_NL;
	}else if (langCode == 'KO'){
		G_Translations = G_TRANSLATE_KO;
	}else if (langCode == 'PL'){
		G_Translations = G_TRANSLATE_PL;
	}else if (langCode == 'ZH'){
		G_Translations = G_TRANSLATE_ZH;
	}else if (langCode == 'VI'){
		G_Translations = G_TRANSLATE_VI;
	}else if (langCode == 'BG'){
		G_Translations = G_TRANSLATE_BG;
	}else if (langCode == 'HU'){
		G_Translations = G_TRANSLATE_HU;
	}else{
		G_Translations = G_TRANSLATE_EN;
	}
	
	localStorage.setItem("G_CurrentLanguage",langCode);
	//writeLocalStorageToFile();
	
	G_CurrentLanguage = langCode;
	translateStrings();
	updateCalendarNavigationMenu();
	if (showChangeMessage == 1){
		showSuccessMessage(translate('trLanguageChanged'),2500);
	}
}

function translate(stringCode){
	var translated = G_Translations[stringCode];	
	if  (translated !== undefined && translated != null){
	}else{
		translated = stringCode;
	}
	return translated;
}

function translateStrings(){
	//change place holder translation
	$('#passwordRecoveryEmail').attr("placeholder", translate('trRecoveryEmail'));
	$('#loginRecoveryEmail').attr("placeholder", translate('trEmailAddress'));
	$('#reminderName').attr("placeholder", translate('trReminderTitle'));
	
	$('#newExpenseCategoryName').attr("placeholder", translate('trCategoryName'));
	$('#newIncomeCategoryName').attr("placeholder",  translate('trCategoryName'));
	$('#noteTextArea').attr("placeholder",  translate('trAddNote'));	
	
	
	//translate static content
	$('.tranDiagReviewQuestion').html(G_Translations.tranDiagReviewQuestion);
	$('.tranDiagReviewMessage').html(G_Translations.tranDiagReviewMessage);
	$('.tranDiagReviewButton').html(G_Translations.tranDiagReviewButton);
	$('.tranSaveButton').html(G_Translations.tranSaveButton);
	$('.tranDoneButton').html(G_Translations.tranDoneButton);
	$('.tranDeleteButton').html(G_Translations.tranDeleteButton);
	$('.tranCloseButton').html(G_Translations.tranCloseButton);
	$('.tranDiagReviewThankYou').html(G_Translations.tranDiagReviewThankYou);
	$('.tranDiagExitQuestion').html(G_Translations.tranDiagExitQuestion);
	$('.tranDiagExitNo').html(G_Translations.tranDiagExitNo);
	$('.tranDiagExitYes').html(G_Translations.tranDiagExitYes);
	$('.tranTitleInitialSetup').html(G_Translations.tranTitleInitialSetup);
	$('.tranInitialSetupPreferredCurrency').html(G_Translations.tranInitialSetupPreferredCurrency);
	$('.tranInitialSetupPreferredCurrencyFormat').html(G_Translations.tranInitialSetupPreferredCurrencyFormat);
	$('.tranInitialSetupFirstDayOfWeek').html(G_Translations.tranInitialSetupFirstDayOfWeek);
	$('.tranInitialSetupFirstDaySunday').html(G_Translations.tranInitialSetupFirstDaySunday);
	$('.tranInitialSetupFirstDayMonday').html(G_Translations.tranInitialSetupFirstDayMonday);
	$('.tranContinueButton').html(G_Translations.tranContinueButton);
	$('.tranLoginResetLoginTitle').html(G_Translations.tranLoginResetLoginTitle);
	$('.tranLoginInfoMessage').html(G_Translations.tranLoginInfoMessage);
	$('.tranForgotLabelPassword').html(G_Translations.tranForgotLabelPassword);
	$('.tranLoginLabel').html(G_Translations.tranLoginLabel);
	$('.tranClearButton').html(G_Translations.tranClearButton);
	$('.tranLoginResetPassword').html(G_Translations.tranLoginResetPassword);
	$('.tranIncomeLabel').html(G_Translations.tranIncomeLabel);
	$('.tranBalanceLabel').html(G_Translations.tranBalanceLabel);
	$('.tranExpenseLabel').html(G_Translations.tranExpenseLabel);
	$('.tranNoExpenseTransactionsOnMonth').html(G_Translations.tranNoExpenseTransactionsOnMonth);
	$('.tranNoIncomeTransactionsOnMonth').html(G_Translations.tranNoIncomeTransactionsOnMonth);
	$('.tranAddIncome').html(G_Translations.tranAddIncome);
	$('.tranAddExpense').html(G_Translations.tranAddExpense);
	$('.tranLegendDayWithIncome').html(G_Translations.tranLegendDayWithIncome);
	$('.tranTodayLabel').html(G_Translations.tranTodayLabel);
	$('.tranLegendDayWithExpense').html(G_Translations.tranLegendDayWithExpense);
	$('.tranTitleTodaysTransactions').html(G_Translations.tranTitleTodaysTransactions);
	$('.tranEntryAddIncome').html(G_Translations.tranEntryAddIncome);
	$('.tranEntryAddExpense').html(G_Translations.tranEntryAddExpense);
	$('.tranTitleTransactions').html(G_Translations.tranTitleTransactions);
	$('.tranMessageRepeatingTransactions').html(G_Translations.tranMessageRepeatingTransactions);
	$('.tranConfirmDeleteTransaction').html(G_Translations.tranConfirmDeleteTransaction);
	$('.tranChooseExpenseCategories').html(G_Translations.tranChooseExpenseCategories);
	$('.tranMessageWantMoreCategories').html(G_Translations.tranMessageWantMoreCategories);
	$('.tranPickADateTitle').html(G_Translations.tranPickADateTitle);
	$('.tranSelectedDayLegend').html(G_Translations.tranSelectedDayLegend);
	$('.tranTimeInterval').html(G_Translations.tranTimeInterval);
	$('.tranWeekLabel').html(G_Translations.tranWeekLabel);
	$('.tranChartsTitle').html(G_Translations.tranChartsTitle);
	$('.tranNoDataAvailableForTheCharts').html(G_Translations.tranNoDataAvailableForTheCharts);
	$('.tranNumberOfTransactions').html(G_Translations.tranNumberOfTransactions);
	$('.tranTotalNrOfTransactions').html(G_Translations.tranTotalNrOfTransactions);
	$('.tranWeeklyRange').html(G_Translations.tranWeeklyRange);
	$('.tranMonthlyRange').html(G_Translations.tranMonthlyRange);
	$('.tranYearlyRange').html(G_Translations.tranYearlyRange);
	$('.tranCustomTimeFrame').html(G_Translations.tranCustomTimeFrame);
	$('.tranChooseTimeFrame').html(G_Translations.tranChooseTimeFrame);
	$('.tranStartDateTimeFrame').html(G_Translations.tranStartDateTimeFrame);
	$('.tranEndDateTimeFrame').html(G_Translations.tranEndDateTimeFrame);
	$('.tranNoteTitle').html(G_Translations.tranNoteTitle);
	$('.tranRemindersTitle').html(G_Translations.tranRemindersTitle);
	$('.tranDailyReminder').html(G_Translations.tranDailyReminder);
	$('.tranDailyReminderDetails').html(G_Translations.tranDailyReminderDetails);
	$('.tranGeneralReminders').html(G_Translations.tranGeneralReminders);
	$('.tranOtherReminders').html(G_Translations.tranOtherReminders);
	$('.tranNoOtherRemindersMessage').html(G_Translations.tranNoOtherRemindersMessage);
	$('.tranAddNewReminder').html(G_Translations.tranAddNewReminder);
	$('.tranRepeatsEvery').html(G_Translations.tranRepeatsEvery);
	$('.tranRepeatsDay').html(G_Translations.tranRepeatsDay);
	$('.tranRepeatsWeek').html(G_Translations.tranRepeatsWeek);
	$('.tranRepeatsMonth').html(G_Translations.tranRepeatsMonth);
	$('.tranRepeatsAt').html(G_Translations.tranRepeatsAt);
	$('.tranStartingFrom').html(G_Translations.tranStartingFrom);
	$('.tranConfirmDeleteReminder').html(G_Translations.tranConfirmDeleteReminder);
	$('.tranTapToChange').html(G_Translations.tranTapToChange);
	$('.tranChangePassword').html(G_Translations.tranChangePassword);
	$('.tranDisableButton').html(G_Translations.tranDisableButton);	
	$('.tranContinueButton').html(G_Translations.tranContinueButton);	
	$('.tranExpenseCategoriesTitle').html(G_Translations.tranExpenseCategoriesTitle);
	$('.tranAddNewExpenseCategorie').html(G_Translations.tranAddNewExpenseCategorie);
	$('.tranChooseColor').html(G_Translations.tranChooseColor);
	$('.tranChooseCategoryIcon').html(G_Translations.tranChooseCategoryIcon);
	$('.tranConfirmDeteleCategoryMessage').html(G_Translations.tranConfirmDeteleCategoryMessage);
	$('.tranIncomeCategoriesTitle').html(G_Translations.tranIncomeCategoriesTitle);
	$('.tranAddNewIncomeCategory').html(G_Translations.tranAddNewIncomeCategory);
	$('.tranCurrencyTitle').html(G_Translations.tranCurrencyTitle);
	$('.tranCurrencyFormat').html(G_Translations.tranCurrencyFormat);
	$('.tranFirstDayOfWeek').html(G_Translations.tranFirstDayOfWeek);
	$('.tranLanguage').html(G_Translations.tranLanguage);
	$('.tranPassword').html(G_Translations.tranPassword);
	$('.tranChangePassword').html(G_Translations.tranChangePassword);
	$('.tranRemovePassword').html(G_Translations.tranRemovePassword);
	$('.tranPasswordRecoveryEmail').html(G_Translations.tranPasswordRecoveryEmail);
	$('.tranPasswordRecoveryEmailDetails').html(G_Translations.tranPasswordRecoveryEmailDetails);
	$('.tranTypePassword').html(G_Translations.tranTypePassword);
	$('.tranTypePasswordDetails').html(G_Translations.tranTypePasswordDetails);
	$('.tranSettingsTitle').html(G_Translations.tranSettingsTitle);
	$('.tranGeneralSettingsSection').html(G_Translations.tranGeneralSettingsSection);
	$('.tranSettingsExpenseCategories').html(G_Translations.tranSettingsExpenseCategories);
	$('.tranAddOrEditExpenseCat').html(G_Translations.tranAddOrEditExpenseCat);
	$('.tranSettingsIncomeCategories').html(G_Translations.tranSettingsIncomeCategories);
	$('.tranAddOrEditIncomeCat').html(G_Translations.tranAddOrEditIncomeCat);
	$('.tranSettingsReminders').html(G_Translations.tranSettingsReminders);
	$('.tranRemindersDetails').html(G_Translations.tranRemindersDetails);
	$('.tranSettingsCurrency').html(G_Translations.tranSettingsCurrency);
	$('.tranSettingsCurrencyDetails').html(G_Translations.tranSettingsCurrencyDetails);
	$('.tranSettingsCurrencyFormat').html(G_Translations.tranSettingsCurrencyFormat);
	$('.tranSettingsCurrencyFormatDetails').html(G_Translations.tranSettingsCurrencyFormatDetails);
	$('.tranSettingsFirstDay').html(G_Translations.tranSettingsFirstDay);
	$('.tranSettingsFirstDayDetails').html(G_Translations.tranSettingsFirstDayDetails);
	$('.tranSettingsChangeLanguage').html(G_Translations.tranSettingsChangeLanguage);
	$('.tranSettingsChangeLanguageDetails').html(G_Translations.tranSettingsChangeLanguageDetails);
	$('.tranSettingsPassword').html(G_Translations.tranSettingsPassword);
	$('.tranSettingsPasswordDetails').html(G_Translations.tranSettingsPasswordDetails);
	$('.tranSettingsResetAppData').html(G_Translations.tranSettingsResetAppData);
	$('.tranSettingsResetAppDataDetails').html(G_Translations.tranSettingsResetAppDataDetails);
	$('.tranAppResetDataConfirmationMessage').html(G_Translations.tranAppResetDataConfirmationMessage);
	$('.tranYesResetAppData').html(G_Translations.tranYesResetAppData);
	$('.tranSettingsSectionApreciate').html(G_Translations.tranSettingsSectionApreciate);
	$('.tranSettingsRateApp').html(G_Translations.tranSettingsRateApp);
	$('.tranSettingsRateAppDetails').html(G_Translations.tranSettingsRateAppDetails);
	
	$('.tranSureDeleteImage').html(G_Translations.tranSureDeleteImage);
	$('.tranChooseGallery').html(G_Translations.tranChooseGallery);
	$('.tranChooseCamera').html(G_Translations.tranChooseCamera);
	$('.tranChooseImageSource').html(G_Translations.tranChooseImageSource);
	
	
	
	
	//PRIVACY POLICY RELATED
	$('.tranPrivacyPolicyAcceptanceTitle').html(G_Translations.tranPrivacyPolicyAcceptanceTitle);
	$('.tranPrivacyPolicyAcceptanceMessage').html(G_Translations.tranPrivacyPolicyAcceptanceMessage);
	$('.tranPrivacyPolicyWEBLINK').html(G_Translations.tranPrivacyPolicyWEBLINK);
	$('.tranPrivacyPolicyAcceptanceButtonMessage').html(G_Translations.tranPrivacyPolicyAcceptanceButtonMessage);
}



/* ----------------------------------------------------------------------------------------------------------------
--------------------------------------------- PHOTO RELATED FUNCTIONALITY------------------------------------------
 ---------------------------------------------------------------------------------------------------------------- */
 
 
 
function showImagesInEditEntryScreen(){
	var html = '';
	html = getAllImagesForEntryKeyEdit(G_GENERALEntryKey);
	//console.log('generalKey'+G_GENERALEntryKey);
	//console.log(html);
	if (html != '' && html !== undefined){		
		
		$('#imageListEditEntry').html(html);
		
		G_SelectedListOfImages = '';	
		for (var i = 0; i<G_FullImageListDiary.length; i++){
				if (G_FullImageListDiary[i]['entryKey'] == G_GENERALEntryKey){
					G_SelectedListOfImages = G_SelectedListOfImages + G_FullImageListDiary[i]['imageName']+',';
				}
		}
		
		if (G_SelectedListOfImages != ''){
			//loadingImages
			getThumbnail3Edit(0);
		}
		
		$('.removeImage').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showConfirmRemoveImage(parseInt((this.id).replace('removeImgID',''))) });
		
		enableGallery();
	
		
		
		
	}else{
		$('#imageListEditEntry').hide();
		$('#loadingImages').hide();
	}
	
	
		
}
 
 
function showConfirmRemoveImage(imageName){
	$('#confirmDeleteImage').show();
	G_DeleteImageConfirmation = 1;
	closeDeleteTransaction();
	closeImagePickerConfirmation();
	
	G_SelectedImageToRemove = imageName;
	
	//console.log('G_DeleteImageConfirmation:'+G_DeleteImageConfirmation);
}

function closeDeleteImageConfirmation(){
	G_SelectedImageToRemove = '';
	$('#confirmDeleteImage').hide();
	G_DeleteImageConfirmation = 0;
}
 
 
function doAddPhoto(){
	$('#confirmImageSource').show();
	closeDeleteTransaction();
	closeDeleteImageConfirmation();
	G_ChooseImageConfirmation = 1;
}

function closeImagePickerConfirmation(){
	$('#confirmImageSource').hide();
	G_ChooseImageConfirmation = 0;
}






function saveImageInList(entryKey,imageName,imageExtension, width,height){
	var blankEntry = {
		"entryKey" : 0,
		"imageName" : '',	
		"imageExtension" : '',			
		"width" : 0,
		"height" : 0
	};
	//console.log(entryKey + ' | ' + imageName + ' | '+ width + ' | '+ height + ' | ')
	if (
		entryKey != '' && entryKey !== undefined && entryKey != null && 
		imageName != '' && imageName !== undefined && imageName != null && 
		imageExtension != '' && imageExtension !== undefined && imageExtension != null && 
		width != '' && width !== undefined && width != null && width != 0 && 
		height != '' && height !== undefined && height != null && height != 0
		){
			
		blankEntry["entryKey"] = entryKey;
		blankEntry["imageName"] = imageName;
		blankEntry["imageExtension"] = imageExtension;
		blankEntry["width"] = width;
		blankEntry["height"] = height;
	
		G_FullImageListDiary.push(blankEntry);
		var tempFullImageListJSON = "";
		tempFullImageListJSON = JSON.stringify({G_FullImageListDiary: G_FullImageListDiary});	
		localStorage.setItem("G_FullImageListDiary",tempFullImageListJSON);
		writeLocalStorageToFile();
		
	}
}

function deleteImageFromList(imageName){
	var position = -1;
	for (var i = 0; i<G_FullImageListDiary.length; i++){
		if (G_FullImageListDiary[i]['imageName'] == imageName){
			position = i;
		}
	} 
	
	G_FullImageListDiary.splice(position,1);
	
	var tempFullImageListJSON = "";
	tempFullImageListJSON = JSON.stringify({G_FullImageListDiary: G_FullImageListDiary});	
	localStorage.setItem("G_FullImageListDiary",tempFullImageListJSON);
	writeLocalStorageToFile();
	
	closeDeleteImageConfirmation();
	$('#imageListEditEntry').hide();
	$('#loadingImages').show();
	showImagesInEditEntryScreen();
	
	
}

function getAllImagesForEntryKeyView(entryKey){
	if (G_IsDebugging == 0){
		var html = '';
		var imageLocation = '';
		G_FolderPath = cordova.file.dataDirectory;	
		var imageFolderPath = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/';
		
		for (var i = 0; i<G_FullImageListDiary.length; i++){
			if (G_FullImageListDiary[i]['entryKey'] == entryKey){
				//console.log('Image Location Generated'+imageFolderPath+G_FullImageListDiary[i]['imageName']+'.jpg');
				
				html= html + 
						'<a href="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" data-med="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-med-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" class="demo-gallery__img--main" >'+
							'<img src="images/photoplacer.png" width="60px;" id="thumb'+G_FullImageListDiary[i]['imageName']+'">'
						'</a>';
			}
		} 
		var result = '';
		if(html !=''){
			result = '<tr>'+
					   '<td colspan="3" style="background-color:#FFF; border-top:1px solid #EFEFEF" align="left">'+
						   '<div class="imagesForOneEntry">'+
								'<div class="row" style="padding:14px 10px; ">'+
									'<div id="demo-test-gallery" class="demo-gallery" data-pswp-uid="1" >'+
									html +
									'</div>'+
								'</div>'+
							'</div>  '+                      	
						'</td>'+
					'</tr>';
		}
		
		return result;
	}	
}

function getAllImagesForEntryKeyViewMainScreen(entryKey){
	if (G_IsDebugging == 0){
		var html = '';
		var imageLocation = '';
		G_FolderPath = cordova.file.dataDirectory;	
		var imageFolderPath = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/';
		
		for (var i = 0; i<G_FullImageListDiary.length; i++){
			if (G_FullImageListDiary[i]['entryKey'] == entryKey){
				//console.log('Image Location Generated'+imageFolderPath+G_FullImageListDiary[i]['imageName']+'.jpg');
				
				html= html + 
						'<a href="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" data-med="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-med-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" class="demo-gallery__img--main" >'+
							'<img src="images/photoplacer.png" width="60px;" id="thumbMain'+G_FullImageListDiary[i]['imageName']+'">'
						'</a>';
			}
		} 
		var result = '';
		if(html !=''){
			result = '<tr>'+
					   '<td colspan="3" style="background-color:#FFF; border-top:1px solid #EFEFEF" align="left">'+
						   '<div class="imagesForOneEntry">'+
								'<div class="row" style="padding:14px 10px; ">'+
									'<div id="demo-test-gallery" class="demo-gallery" data-pswp-uid="1" >'+
									html +
									'</div>'+
								'</div>'+
							'</div>  '+                      	
						'</td>'+
					'</tr>';
		}
		
		return result;
	}	
}

function getAllImagesForEntryKeyViewTimeLine(entryKey){
	if (G_IsDebugging == 0){
		var html = '';
		var imageLocation = '';
		G_FolderPath = cordova.file.dataDirectory;	
		var imageFolderPath = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/';
		
		for (var i = 0; i<G_FullImageListDiary.length; i++){
			if (G_FullImageListDiary[i]['entryKey'] == entryKey){
				//console.log('Image Location Generated'+imageFolderPath+G_FullImageListDiary[i]['imageName']+'.jpg');
				
				html= html + 
						'<a href="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" data-med="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-med-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" class="demo-gallery__img--main" >'+
							'<img src="images/photoplacer.png" width="60px;" id="thumbTimeLine'+G_FullImageListDiary[i]['imageName']+'">'
						'</a>';
			}
		} 
		var result = '';
		if(html !=''){
			result = '<tr>'+
					   '<td  style="background-color:#FFF; border-top:1px solid #EFEFEF" align="left">'+
						   '<div class="imagesForOneEntry">'+
								'<div class="row" style="padding:14px 10px; ">'+
									'<div id="demo-test-gallery" class="demo-gallery" data-pswp-uid="1" >'+
									html +
									'</div>'+
								'</div>'+
							'</div>  '+                      	
						'</td>'+
					'</tr>';
		}
		
		return result;
	}	
}

function getAllImagesForEntryKeyEdit(entryKey){
	if (G_IsDebugging == 0){
		$('#imageListEditEntry').hide();
		$('#loadingImages').show();
		var html = '';
		var imageLocation = '';
		G_FolderPath = cordova.file.dataDirectory;	
		var imageFolderPath = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/';
		
		for (var i = 0; i<G_FullImageListDiary.length; i++){
			if (G_FullImageListDiary[i]['entryKey'] == entryKey){
				
				html= html + 
				
						'<div style="float:left; margin: 6px; position:relative;">'+
							'<a href="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" data-med="'+imageFolderPath+G_FullImageListDiary[i]['imageName']+G_FullImageListDiary[i]['imageExtension']+'" data-med-size="'+G_FullImageListDiary[i]['width']+'x'+G_FullImageListDiary[i]['height']+'" class="demo-gallery__img--main" >'+
								'<img src="images/photoplacer.png" width="58px;" id="thumbEdit'+G_FullImageListDiary[i]['imageName']+'" />'+
							'</a>'+
							'<img src="images/minus.png" width="26px;" data-size="99999x99999" style="position:absolute;top:0; right:0; margin-top:-8px;margin-right:-8px;" class="removeImage" id="removeImgID'+G_FullImageListDiary[i]['imageName']+'"/>'+
						'</div>';					
			}
		} 
		var result = '';
		if(html !=''){
			result = '<tr>'+
					   '<td style="background-color:#FFF; border-top:1px solid #EFEFEF" align="center">'+
						   '<div class="imagesForOneEntry">'+
								'<div class="row" style="padding:0px; padding-top:14px; ">'+
									'<div id="demo-test-gallery" class="demo-gallery" data-pswp-uid="1" >'+
										html +
										'<div style="clear:both"></div>'+
									'</div>'+
								'</div>'+
							'</div>  '+                      	
						'</td>'+
					'</tr>';
		}
		
		return result;
	}
}

function takeCameraPicture(){	
	defaultOptions = {
		quality: 100,
		destinationType: Camera.DestinationType.FILE_URI,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 1000,
		targetHeight: 1000,
		correctOrientation: true
	};
	defaultOptions["sourceType"] = Camera.PictureSourceType.CAMERA;
	defaultOptions["saveToPhotoAlbum"] = false;

	diagnostic.requestRuntimePermission(function(status){
    	    if(status === diagnostic.permissionStatus.DENIED_ALWAYS){
                cameraDeniedAlwaysAtLeastOnce = true;
            }

            //console.log("Camera status 0  is: " + status);
            diagnostic.getPermissionAuthorizationStatus(function(status){

                // If running on Android 11+ and status is DENIED_ALWAYS, assume it can still be requested (i.e. user selected "Only once" in previous app session)
                if(deviceOS.apiLevel >= 30 && status === diagnostic.permissionStatus.DENIED_ALWAYS && !cameraDeniedAlwaysAtLeastOnce){
                    status = diagnostic.permissionStatus.DENIED_ONCE;
                }

                if (status == 'GRANTED'){

                    navigator.camera.getPicture(function cameraSuccess(imageURL) {
                        //console.log('getPicture place : '+imageURL);
                        saveCameraImage(imageURL);
                    }, function cameraError(err) {
                          if (err.indexOf("Permission Denial") >= 0) {
                            alert('You appeared to have rejected the permission for this application to access your Camera. Please go into your phone settings and enable permissions to access the Camera for this application.');
                          } else {
                            if (err != "no image selected" && err != "Camera cancelled.") {
                                alert('We had a problem taking a photo from your Camera. Please try again.');
                            }
                         }
                    }, defaultOptions);


                }else {
                    alert('You appeared to have rejected the permission for this application to access your Camera. Please go into your phone settings and enable permissions to access the Camera for this application.');
                }


            }, console.error, diagnostic.permission.CAMERA)
    	}, console.error, diagnostic.permission.CAMERA);
}

function saveCameraImage(fileUri){
	
	closeImagePickerConfirmation();
	$('#imageListEditEntry').hide();
	$('#loadingImages').show();
	
	G_FolderPath = cordova.file.dataDirectory;	
	var imageFolderPath = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName;
	var fileExt = "." + fileUri.split('.').pop();
	var d = new Date();
	var fName = d.getTime();
	
	var newFileName = String(fName) + fileExt;
	


	
	//window.resolveLocalFileSystemURL(('file://'+fileUri), moveOnSucces, resOnError);
	console.log('camera-img-url'+fileUri);
	window.resolveLocalFileSystemURL(fileUri, function (fileEntry) {		
		 window.resolveLocalFileSystemURL(imageFolderPath,
                        function(dirEntry) {
                            fileEntry.moveTo(dirEntry, newFileName, function(){
								var copiedImage = new Image();
								var width = 0;
								var height = 0;
								
								copiedImage.onload = function() {
									width = this.width;
									height = this.height;										
									prepareThumbnail((imageFolderPath+'/' + newFileName),fName,fileExt,width,height,500); 
								}
								copiedImage.src = (imageFolderPath+'/' + newFileName);
								
								
								//console.log('CopyWithSuccess! | '+ imageFolderPath+'/' + newFileName);
							}, errorCallback);
                        },
                        errorCallback2);
          },
          errorCallback1);		
}

function successCallback(){
		
}

function prepareThumbnail(location, fName, fileExt, originalWidth, originalHeight,thumbSize){
	var canvas = document.getElementById('myCanvas');
	canvas.width = thumbSize;
    canvas.height = thumbSize;
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	
	imageObj.onload = function(){		
		if (imageObj.width == imageObj.height) {
        	canvas.getContext("2d").drawImage(imageObj, 0, 0, thumbSize, thumbSize);
        } else {
        	minVal = Math.min(imageObj.width, imageObj.height);
          	if (imageObj.width > imageObj.height) {
            	canvas.getContext("2d").drawImage(imageObj, (imageObj.width - minVal) / 2, 0, minVal, minVal, 0, 0, thumbSize, thumbSize);
          	} else {
            	canvas.getContext("2d").drawImage(imageObj, 0, (imageObj.height - minVal) / 2, minVal, minVal, 0, 0, thumbSize, thumbSize);
          	}
        }			
		canvas = downScaleCanvas(canvas, 0.2);
		saveImage(fName,fileExt,canvas.toDataURL("image/jpeg", 1.0),originalWidth,originalHeight);
	};
	imageObj.src = location;
	
}

function saveImage(fileName,fileExt, data, originalWidth, originalHeight){
	G_FolderPath = cordova.file.dataDirectory;	
	var imageFolderPath = G_FolderPath+'/'+G_DiaryFolderName+'/'+G_DataFolderName;
	
	window.resolveLocalFileSystemURL(imageFolderPath, function (directoryEntry) {
		directoryEntry.getFile((fileName+'.dat'), { create: true }, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
				fileWriter.onwriteend = function (e) {
					saveImageInList(G_GENERALEntryKey, fileName, fileExt, originalWidth, originalHeight);
					
					//refresh image list in entry for edit
					showImagesInEditEntryScreen();
					
				};

				fileWriter.onerror = function (e) {
					//console.log('Write failed: ' + e.toString());
				};

				fileWriter.write(data);
			}, errorHandler.bind(null, fileName+'.dat'));
		}, errorHandler.bind(null, fileName+'.dat'));
	}, errorHandler.bind(null, fileName+'.dat'));
}



function writeLocalStorageToFile(){
    //alert(localStorage.getItem("G_InitialScreenPassed"));
    //ORDER IN WHICH ELEMENTS ARE WRITEN IS VERY IMPORTANT AS THIS IS THE SAME ORDER IN WHICH THEY ARE TAKEN


    var stringToWrite = '';
    if (G_Content != '' && G_Content != 'undefined' && G_Content !== undefined && G_Content != null && G_Content != 'null'){

        var C_ks = G_Content.split(/\r?\n/);

        //console.log('++++++++++++++++++++++'+G_Content+'++++++++++++++++++++++');

        var vax0  = (localStorage.getItem("G_selectedExpenseList") !== undefined && localStorage.getItem("G_selectedExpenseList") != null) ? localStorage.getItem("G_selectedExpenseList") : C_ks[0];
        var vax1  = (localStorage.getItem("G_selectedIncomeList") !== undefined && localStorage.getItem("G_selectedIncomeList") != null) ? localStorage.getItem("G_selectedIncomeList") : C_ks[1];
        var vax2  = (localStorage.getItem("G_NumberOfAppStarts") !== undefined && localStorage.getItem("G_NumberOfAppStarts") != null) ? localStorage.getItem("G_NumberOfAppStarts") : C_ks[2];
        var vax3  = (localStorage.getItem("G_SelectedPassword") !== undefined && localStorage.getItem("G_SelectedPassword") != null) ? localStorage.getItem("G_SelectedPassword") : C_ks[3];
        var vax4  = (localStorage.getItem("G_SelectedCurrency") !== undefined && localStorage.getItem("G_SelectedCurrency") != null) ? localStorage.getItem("G_SelectedCurrency") : C_ks[4];
        var vax5  = (localStorage.getItem("G_selectedCurrencyFormat") !== undefined && localStorage.getItem("G_selectedCurrencyFormat") != null) ? localStorage.getItem("G_selectedCurrencyFormat") : C_ks[5];
        var vax6  = (localStorage.getItem("G_SelectedFirstDayOfWeek") !== undefined && localStorage.getItem("G_SelectedFirstDayOfWeek") != null) ? localStorage.getItem("G_SelectedFirstDayOfWeek") : C_ks[6];
        var vax7  = (localStorage.getItem("G_InitialScreenPassed") !== undefined && localStorage.getItem("G_InitialScreenPassed") != null) ? localStorage.getItem("G_InitialScreenPassed") : C_ks[7];
        var vax8  = (localStorage.getItem("G_EveryDayReminderHour") !== undefined && localStorage.getItem("G_EveryDayReminderHour") != null) ? localStorage.getItem("G_EveryDayReminderHour") : C_ks[8];
        var vax9  = (localStorage.getItem("G_EveryDayReminderEnabled") !== undefined && localStorage.getItem("G_EveryDayReminderEnabled") != null) ? localStorage.getItem("G_EveryDayReminderEnabled") : C_ks[9];
        var vax10 = (localStorage.getItem("G_RemindersList") !== undefined && localStorage.getItem("G_RemindersList") != null) ? localStorage.getItem("G_RemindersList") : C_ks[10];
        var vax11 = (localStorage.getItem("G_PasswordRecoveryEmail") !== undefined && localStorage.getItem("G_PasswordRecoveryEmail") != null) ? localStorage.getItem("G_PasswordRecoveryEmail") : C_ks[11];
        var vax12 = (localStorage.getItem("G_FullEntryList") !== undefined && localStorage.getItem("G_FullEntryList") != null) ? localStorage.getItem("G_FullEntryList") : C_ks[12];
        var vax13 = (localStorage.getItem("G_CurrentLanguage") !== undefined && localStorage.getItem("G_CurrentLanguage") != null) ? localStorage.getItem("G_CurrentLanguage") : C_ks[13];
        var vax14 = (localStorage.getItem("G_FullImageListDiary") !== undefined && localStorage.getItem("G_FullImageListDiary") != null) ? localStorage.getItem("G_FullImageListDiary") : C_ks[14];
        var vax15 = (localStorage.getItem("PRIVACYPOLICYSCREEN") !== undefined && localStorage.getItem("PRIVACYPOLICYSCREEN") != null) ? localStorage.getItem("PRIVACYPOLICYSCREEN") : C_ks[15];

        stringToWrite = vax0 +'\n'+
                        vax1 +'\n'+
                        vax2 +'\n'+
                        vax3 +'\n'+
                        vax4 +'\n'+
                        vax5 +'\n'+
                        vax6 +'\n'+
                        vax7 +'\n'+
                        vax8 +'\n'+
                        vax9 +'\n'+
                        vax10+'\n'+
                        vax11+'\n'+
                        vax12+'\n'+
                        vax13+'\n'+
                        vax14+'\n'+
                        vax15+'\n';

    }else{
        //alert('aici2');
        stringToWrite = localStorage.getItem("G_selectedExpenseList")+'\n'+
                        localStorage.getItem("G_selectedIncomeList")+'\n'+
                        localStorage.getItem("G_NumberOfAppStarts")+'\n'+
                        localStorage.getItem("G_SelectedPassword")+'\n'+
                        localStorage.getItem("G_SelectedCurrency")+'\n'+
                        localStorage.getItem("G_selectedCurrencyFormat")+'\n'+
                        localStorage.getItem("G_SelectedFirstDayOfWeek")+'\n'+
                        localStorage.getItem("G_InitialScreenPassed")+'\n'+
                        localStorage.getItem("G_EveryDayReminderHour")+'\n'+
                        localStorage.getItem("G_EveryDayReminderEnabled")+'\n'+
                        localStorage.getItem("G_RemindersList")+'\n'+
                        localStorage.getItem("G_PasswordRecoveryEmail")+'\n'+
                        localStorage.getItem("G_FullEntryList")+'\n'+
                        localStorage.getItem("G_CurrentLanguage")+'\n'+
                        localStorage.getItem("G_FullImageListDiary")+'\n'+
                        localStorage.getItem("PRIVACYPOLICYSCREEN")+'\n';
        G_Content = stringToWrite;
    }

    G_FolderPath = cordova.file.dataDirectory;
    var imageFolderPath = G_FolderPath+'/'+G_DiaryFolderName+'/'+G_DataFolderName;

    window.resolveLocalFileSystemURL(imageFolderPath, function (directoryEntry) {
        directoryEntry.getFile(('exdata.data'), { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                    //alert('File Writed');

                };

                fileWriter.onerror = function (e) {
                    //alert('Write failed: ' + e.toString());
                };
                //alert('stringToWrite: ' + stringToWrite);
                fileWriter.write(stringToWrite);
            }, errorHandler.bind(null, 'exdata.data'));
        }, errorHandler.bind(null, 'exdata.data'));
    }, errorHandler.bind(null, 'exdata.data'));


}



function writeLocalStorageToFileWhenAllDataIsErased(){
    //alert(localStorage.getItem("G_InitialScreenPassed"));
    //ORDER IN WHICH ELEMENTS ARE WRITEN IS VERY IMPORTANT AS THIS IS THE SAME ORDER IN WHICH THEY ARE TAKEN
    //alert('aici3');
    stringToWrite = localStorage.getItem("G_selectedExpenseList")+'\n'+
                            localStorage.getItem("G_selectedIncomeList")+'\n'+
                            localStorage.getItem("G_NumberOfAppStarts")+'\n'+
                            localStorage.getItem("G_SelectedPassword")+'\n'+
                            localStorage.getItem("G_SelectedCurrency")+'\n'+
                            localStorage.getItem("G_selectedCurrencyFormat")+'\n'+
                            localStorage.getItem("G_SelectedFirstDayOfWeek")+'\n'+
                            localStorage.getItem("G_InitialScreenPassed")+'\n'+
                            localStorage.getItem("G_EveryDayReminderHour")+'\n'+
                            localStorage.getItem("G_EveryDayReminderEnabled")+'\n'+
                            localStorage.getItem("G_RemindersList")+'\n'+
                            localStorage.getItem("G_PasswordRecoveryEmail")+'\n'+
                            localStorage.getItem("G_FullEntryList")+'\n'+
                            localStorage.getItem("G_CurrentLanguage")+'\n'+
                            localStorage.getItem("G_FullImageListDiary")+'\n'+
                            localStorage.getItem("PRIVACYPOLICYSCREEN")+'\n';

    G_FolderPath = cordova.file.dataDirectory;
    var imageFolderPath = G_FolderPath+'/'+G_DiaryFolderName+'/'+G_DataFolderName;

    window.resolveLocalFileSystemURL(imageFolderPath, function (directoryEntry) {
        directoryEntry.getFile(('exdata.data'), { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                    //alert('File Writed');

                };

                fileWriter.onerror = function (e) {
                    //alert('Write failed: ' + e.toString());
                };
                //alert('stringToWrite: ' + stringToWrite);
                fileWriter.write(stringToWrite);
            }, errorHandler.bind(null, 'exdata.data'));
        }, errorHandler.bind(null, 'exdata.data'));
    }, errorHandler.bind(null, 'exdata.data'));


}


function writeDataToFile(fileName, data){
	
	G_FolderPath = cordova.file.dataDirectory;	
	var imageFolderPath = G_FolderPath+'/'+G_DiaryFolderName+'/'+G_DataFolderName;
	
	window.resolveLocalFileSystemURL(imageFolderPath, function (directoryEntry) {
		directoryEntry.getFile((fileName+'.data'), { create: true }, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
				fileWriter.onwriteend = function (e) {
					console.log('File Writed');
					
				};

				fileWriter.onerror = function (e) {
					console.log('Write failed: ' + e.toString());
				};

				fileWriter.write(data);
			}, errorHandler.bind(null, fileName+'.data'));
		}, errorHandler.bind(null, fileName+'.data'));
	}, errorHandler.bind(null, fileName+'.data'));
	
}






function takeLibraryPicture(){
	var devVersion = device.version;
	
	if  (devVersion.substring(0, 3) =='4.1'){
		//console.log('lowerV - '+devVersion);	
		defaultOptions = {
			
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI ,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 780,
			correctOrientation: true
		};
	}else{
		//console.log('greaterV - '+devVersion);
		defaultOptions = {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI ,
			encodingType: Camera.EncodingType.JPEG,
			correctOrientation: true,
			targetWidth: 1000,
			targetHeight: 1000,
			allowEdit: false
		};
	}

	// library
	
	defaultOptions["sourceType"] = Camera.PictureSourceType.PHOTOLIBRARY;

	diagnostic.requestRuntimePermission(function(status){
            if(status === diagnostic.permissionStatus.DENIED_ALWAYS){
                cameraDeniedAlwaysAtLeastOnce = true;
            }

            //console.log("Camera status 0  is: " + status);
            diagnostic.getPermissionAuthorizationStatus(function(status){

                // If running on Android 11+ and status is DENIED_ALWAYS, assume it can still be requested (i.e. user selected "Only once" in previous app session)
                if(deviceOS.apiLevel >= 30 && status === diagnostic.permissionStatus.DENIED_ALWAYS && !cameraDeniedAlwaysAtLeastOnce){
                    status = diagnostic.permissionStatus.DENIED_ONCE;
                }

                //console.log("Camera status 1  is: " + status);



                if (status == 'GRANTED'){

                        navigator.camera.getPicture(function cameraSuccess(imageURL) {
                            //console.log('imageURL|| '+imageURL);
                            //handlePhoto(imageURL);
                            saveLibraryImage(imageURL);

                        }, function(err) {
                            //console.log("PHOTO ERR");
                              //console.log('eroare la incarcare imagini din librarie : '+ err);
                              if (err.indexOf("Permission Denial") >= 0) {
                                alert('You appeared to have rejected the permission for this application to access your Gallery. Please go into your phone settings and enable permissions to access the Gallery for this application.');
                              } else {
                                if (err != "no image selected" && err != "Selection cancelled.") {
                                    alert('We had a problem taking a photo from your Photo Library. Please try again.');
                                }
                             }
                        }, defaultOptions);
                } else {
                     alert('You appeared to have rejected the permission for this application to access your Gallery. Please go into your phone settings and enable permissions to access the Gallery for this application.');
                }
        }, console.error, diagnostic.permission.CAMERA)
    }, console.error, diagnostic.permission.CAMERA);
}

function saveLibraryImage(fileUri){
	closeImagePickerConfirmation();	
	$('#imageListEditEntry').hide();
	$('#loadingImages').show();
		
	
	G_FolderPath = cordova.file.dataDirectory;	
	var imageFolderPath = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName;
	
	var fileExt = "." + fileUri.split('.').pop();
		
	var d = new Date();
	var fName = d.getTime();
	
	var newFileName = String(fName) + fileExt;
	
	//console.log(newFileName);
	
	//window.resolveLocalFileSystemURL(('file://'+fileUri), moveOnSucces, resOnError);
	
	var fileModifiedPath = fileUri;
	
	if (fileModifiedPath.substring(0,7) == 'file://'){
		fileModifiedPath = fileModifiedPath;
	}else{
		fileModifiedPath = 'file://'+ fileModifiedPath;
	}
	console.log('success - ' + fileModifiedPath);
	window.resolveLocalFileSystemURL(fileModifiedPath, function (fileEntry) {		
	//console.log('success2');
		 window.resolveLocalFileSystemURL(imageFolderPath,
                        function(dirEntry) {
                            // move the file to a new directory and rename it

							fileEntry.copyTo(dirEntry, newFileName, function(){
								var copiedImage = new Image();
								var width = 0;
								var height = 0;
								
								copiedImage.onload = function() {
									width = this.width;
									height = this.height;	
																		
									prepareThumbnail((imageFolderPath+'/' + newFileName),fName,fileExt,width,height,500); 
								}
								copiedImage.src = (imageFolderPath+'/' + newFileName);
								
								
								//console.log('CopyWithSuccess! | '+ imageFolderPath+'/' + newFileName);
							}, errorCallback);
							
                        },
                        errorCallback2);
          },
          errorCallback1);
		
}



function createFolders(){	
	G_FolderPath = cordova.file.dataDirectory;
	window.resolveLocalFileSystemURL(G_FolderPath, function (directoryEntry) {
		directoryEntry.getDirectory(G_DiaryFolderName, { create: true }, function (dirEntry) {                
			//console.log('Created folder -> '+ G_FolderPath+'\'' + G_DiaryFolderName);
			
			dirEntry.getDirectory(G_BackupFolderName, { create: true }, function (backupDirEntry) {                
				//console.log('Created folder -> '+ G_FolderPath+'\'' + G_BackupFolderName);
			},  errorHandler.bind(null, G_BackupFolderName));
			
			dirEntry.getDirectory(G_DataFolderName, { create: true }, function (dataDirEntry) {                
				//console.log('Created folder -> '+ G_FolderPath+'\'' + G_DataFolderName);
			},  errorHandler.bind(null, G_DataFolderName));
			
			
    	},  errorHandler.bind(null, G_DiaryFolderName));
	},  errorHandler.bind(null, 'ResolveFileSystemStep'));
}


function getThumbnail3(iteration){
	
	var imageList = [];
	imageList = G_SelectedListOfImages.split(',');
	G_FolderPath = cordova.file.dataDirectory;
	
	
	
	var pathToFile = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/'+ imageList[iteration]+'.dat';
	
	window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
		fileEntry.file(function (file) {
			var reader = new FileReader();

			reader.onloadend = function (e) {				
				$('#thumb'+imageList[iteration]).attr('src' ,  this.result);				
				if (iteration<imageList.length-2){
					getThumbnail3(iteration + 1);
				}				
			};

			reader.readAsText(file);
		}, errorHandler.bind(null, G_SelectedListOfImages));
	}, errorHandler.bind(null, G_SelectedListOfImages));
}

function getThumbnail3MainScreen(iteration){
	
	var imageList = [];
	imageList = G_SelectedListOfImages.split(',');
	G_FolderPath = cordova.file.dataDirectory;
	
	
	
	var pathToFile = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/'+ imageList[iteration]+'.dat';
	
	window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
		fileEntry.file(function (file) {
			var reader = new FileReader();

			reader.onloadend = function (e) {				
				$('#thumbMain'+imageList[iteration]).attr('src' ,  this.result);				
				if (iteration<imageList.length-2){
					getThumbnail3MainScreen(iteration + 1);
				}				
			};

			reader.readAsText(file);
		}, errorHandler.bind(null, G_SelectedListOfImages));
	}, errorHandler.bind(null, G_SelectedListOfImages));
}

function getThumbnail3Edit(iteration){
	
	var imageList = [];
	imageList = G_SelectedListOfImages.split(',');
	G_FolderPath = cordova.file.dataDirectory;
	
	
	
	var pathToFile = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/'+ imageList[iteration]+'.dat';
	
	window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
		fileEntry.file(function (file) {
			var reader = new FileReader();

			reader.onloadend = function (e) {				
				$('#thumbEdit'+imageList[iteration]).attr('src' ,  this.result);				
				if (iteration<imageList.length-2){
					getThumbnail3Edit(iteration + 1);
				}else{
					$('#imageListEditEntry').show();
					$('#loadingImages').hide();
				}
			};

			reader.readAsText(file);
		}, errorHandler.bind(null, G_SelectedListOfImages));
	}, errorHandler.bind(null, G_SelectedListOfImages));
}

function getThumbnail3TimeLine(iteration){
	
	var imageList = [];
	imageList = G_SelectedListOfImages.split(',');
	G_FolderPath = cordova.file.dataDirectory;
	
	
	
	var pathToFile = G_FolderPath+G_DiaryFolderName+'/'+G_DataFolderName+'/'+ imageList[iteration]+'.dat';
	
	window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
		fileEntry.file(function (file) {
			var reader = new FileReader();

			reader.onloadend = function (e) {				
				$('#thumbTimeLine'+imageList[iteration]).attr('src' ,  this.result);				
				if (iteration<imageList.length-2){
					getThumbnail3TimeLine(iteration + 1);
				}				
			};

			reader.readAsText(file);
		}, errorHandler.bind(null, G_SelectedListOfImages));
	}, errorHandler.bind(null, G_SelectedListOfImages));
}





function moveOnSucces(fileEntry){
	//console.log('resOnError'+JSON.stringify(fileEntry));
}

function resOnError(error){
	console.log('resOnError'+JSON.stringify(fileEntry));
}

function errorCallback(fileEntry){	
	console.log('callback0__'+JSON.stringify(fileEntry));
}
function errorCallback1(fileEntry){	
	console.log('callback1__'+JSON.stringify(fileEntry));
}
function errorCallback2(fileEntry){	
	console.log('callback2__'+JSON.stringify(fileEntry));
}





var errorHandler = function (fileName, e) {  
	//console.log('errorHandler');
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

   // console.log('Error (' + fileName + '): ' + msg);
}



/* ----------------------------------------------------------------------------------------------------------------
--------------------------------------------- Prototypeing and other Usefull functions-----------------------------
 ---------------------------------------------------------------------------------------------------------------- */



/* ----------------------------------------------------------------------------------------------------------------
--------------------------------------------- Prototypeing and other Usefull functions-----------------------------
 ---------------------------------------------------------------------------------------------------------------- */

function scrollTop(){
	window.scrollTo(0,0);
}


function getCategoryID(type,code){
	var catID = -1;
	if (type == 'expense'){
		for (var i = 0; i<G_selectedExpenseList.length; i++){
			if (G_selectedExpenseList[i]['code'] == code){
				catID = i;
			}
		}
	}else if (type == 'income'){
		for (var i = 0; i<G_selectedIncomeList.length; i++){
			if (G_selectedIncomeList[i]['code'] == code){
				catID = i;
			}
		}
	}
	
	return catID
} 

 
var DataGrouper = (function() {
    var has = function(obj, target) {
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    var keys = function(data, names) {
        return _.reduce(data, function(memo, item) {
            var key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    var group = function(data, names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            return {
                key: stem,
                vals:_.map(_.where(data, stem), function(item) {
                    return _.omit(item, names);
                })
            };
        });
    };

    group.register = function(name, converter) {
        return group[name] = function(data, names) {
            return _.map(group(data, names), converter);
        };
    };

    return group;
}());

DataGrouper.register("sum", function(item) {
    return _.extend({}, item.key, {transactionAmount: _.reduce(item.vals, function(memo, node) {
        return memo + Number(node.transactionAmount);
    }, 0)});
});
 
 
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



Number.prototype.formatMoney = function(c){
	
	var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = G_d, 
    t = G_t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	//months
    Date.prototype.getMonthFullName = function() {
        return translate(G_monthFullNames[this.getMonth()]);
    };
	Date.prototype.getMonthShortName = function() {
        return translate(G_monthShortNames[this.getMonth()]);
    };
	
	//days of week
    Date.prototype.getFullDayName = function() {
        return translate(G_dayFullNames[this.getDay() ]);
    };
	Date.prototype.getShortDayName = function() {
        return translate(G_dayShortNames[this.getDay() ]);
    };
	Date.prototype.increaseTime = function(hours) {
        this.setTime(this.getTime() + (hours*60*60*1000)); 
   		return this; 
    };
	Date.prototype.getWeekNumber = function(){
		var d = new Date(+this);
		d.setHours(0,0,0);
		
		if (G_SelectedFirstDayOfWeek == 1){
			d.setDate(d.getDate()+4-(d.getDay()||6));	
		}else{
			d.setDate(d.getDate()+4-(d.getDay()||7));	
		}
		return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
	};
})();


function showSuccessMessage(message,duration){
		$('#successMessage').html(message);		
		$('#successMessageBox').show();	
		setTimeout(function(){$('#successMessageBox').fadeOut(450);},duration);		
}

function showFailMessage(message,duration){
		$('#failMessage').html(message);		
		$('#failMessageBox').show();	
		setTimeout(function(){$('#failMessageBox').fadeOut(450);},duration);		
}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function dateToInt(date){
	var dayOfMonth = '';
	var monthOfYear = '';
	var year = '';
		
	//get day of month
	dayOfMonth = pad(date.getDate(),2);
	
	//get month of year
	monthOfYear = pad((date.getMonth()+1),2);
		
	//get year		
	year = date.getFullYear();
	
	return parseInt(year.toString()+monthOfYear + dayOfMonth);
}

function intToDate(intDate){
	var date = intDate.toString();
	return new Date(parseInt(date.substring(0,4)), parseInt(date.substring(4,6),10)-1, parseInt(date.substring(6,8),10));	
	
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function utf8_encode(argString) {
  //  discuss at: http://phpjs.org/functions/utf8_encode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: sowberry
  // improved by: Jack
  // improved by: Yves Sucaet
  // improved by: kirilloid
  // bugfixed by: Onno Marsman
  // bugfixed by: Onno Marsman
  // bugfixed by: Ulrich
  // bugfixed by: Rafal Kukawski
  // bugfixed by: kirilloid
  //   example 1: utf8_encode('Kevin van Zonneveld');
  //   returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') {
    return '';
  }

  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var utftext = '',
    start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
        (c1 >> 6) | 192, (c1 & 63) | 128
      );
    } else if ((c1 & 0xF800) != 0xD800) {
      enc = String.fromCharCode(
        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    } else { // surrogate pairs
      if ((c1 & 0xFC00) != 0xD800) {
        throw new RangeError('Unmatched trail surrogate at ' + n);
      }
      var c2 = string.charCodeAt(++n);
      if ((c2 & 0xFC00) != 0xDC00) {
        throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
      }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
      enc = String.fromCharCode(
        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
}

function md5(str) {
  //  discuss at: http://phpjs.org/functions/md5/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: utf8_encode
  //   example 1: md5('Kevin van Zonneveld');
  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

  var xl;

  var rotateLeft = function(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };

  var addUnsigned = function(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };

  var _F = function(x, y, z) {
    return (x & y) | ((~x) & z);
  };
  var _G = function(x, y, z) {
    return (x & z) | (y & (~z));
  };
  var _H = function(x, y, z) {
    return (x ^ y ^ z);
  };
  var _I = function(x, y, z) {
    return (y ^ (x | (~z)));
  };

  var _FF = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _GG = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _HH = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _II = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var convertToWordArray = function(str) {
    var lWordCount;
    var lMessageLength = str.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = new Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  var wordToHex = function(lValue) {
    var wordToHexValue = '',
      wordToHexValue_temp = '',
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  };

  var x = [],
    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22,
    S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20,
    S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23,
    S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  str = this.utf8_encode(str);
  x = convertToWordArray(str);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  xl = x.length;
  for (k = 0; k < xl; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

  return temp.toLowerCase();
}

function utf8_encode(argString) {
  //  discuss at: http://phpjs.org/functions/utf8_encode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: sowberry
  // improved by: Jack
  // improved by: Yves Sucaet
  // improved by: kirilloid
  // bugfixed by: Onno Marsman
  // bugfixed by: Onno Marsman
  // bugfixed by: Ulrich
  // bugfixed by: Rafal Kukawski
  // bugfixed by: kirilloid
  //   example 1: utf8_encode('Kevin van Zonneveld');
  //   returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') {
    return '';
  }

  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var utftext = '',
    start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
        (c1 >> 6) | 192, (c1 & 63) | 128
      );
    } else if ((c1 & 0xF800) != 0xD800) {
      enc = String.fromCharCode(
        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    } else { // surrogate pairs
      if ((c1 & 0xFC00) != 0xD800) {
        throw new RangeError('Unmatched trail surrogate at ' + n);
      }
      var c2 = string.charCodeAt(++n);
      if ((c2 & 0xFC00) != 0xDC00) {
        throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
      }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
      enc = String.fromCharCode(
        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
}



function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 



























