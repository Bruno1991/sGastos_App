//Register Buttons and add actions
$('#phoneBack').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); navigateBack();});

$("#showMainScreenAddButtons").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showMainScreenAddButtons(); });
$("#hideMainScreenAddButtons").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); hideMainScreenAddButtons(); });

$("#showEntryScreen").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); Screen.gotoPage('entryscreen'); });
$("#showMainScreen").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); Screen.gotoPage('mainscreen'); });


/* Calendar Related Buttons */
$("#showNextMonth").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setCurrentPrevAndNextDates(1); });
$("#showPrevMonth").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setCurrentPrevAndNextDates(-1); });

$('#transactionDay0').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(0); });
$('#transactionDay1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(1); });
$('#transactionDay2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(2); });
$('#transactionDay3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(3); });
$('#transactionDay4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(4); });
$('#transactionDay5').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(5); });
$('#transactionDay6').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(6); });
$('#transactionDay7').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(7); });
$('#transactionDay8').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(8); });
$('#transactionDay9').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(9); });
$('#transactionDay10').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(10); });
$('#transactionDay11').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(11); });
$('#transactionDay12').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(12); });
$('#transactionDay13').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(13); });
$('#transactionDay14').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(14); });
$('#transactionDay15').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(15); });
$('#transactionDay16').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(16); });
$('#transactionDay17').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(17); });
$('#transactionDay18').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(18); });
$('#transactionDay19').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(19); });
$('#transactionDay20').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(20); });
$('#transactionDay21').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(21); });
$('#transactionDay22').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(22); });
$('#transactionDay23').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(23); });
$('#transactionDay24').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(24); });
$('#transactionDay25').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(25); });
$('#transactionDay26').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(26); });
$('#transactionDay27').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(27); });
$('#transactionDay28').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(28); });
$('#transactionDay29').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(29); });
$('#transactionDay30').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(30); });
$('#transactionDay31').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(31); });
$('#transactionDay32').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(32); });
$('#transactionDay33').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(33); });
$('#transactionDay34').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(34); });
$('#transactionDay35').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(35); });
$('#transactionDay36').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(36); });
$('#transactionDay37').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(37); });
$('#transactionDay38').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(38); });
$('#transactionDay39').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(39); });
$('#transactionDay40').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(40); });
$('#transactionDay41').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectCalendarDay(41); });


/* summary charts buttons */
$("#showExpenseChartTab").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showSummaryChartTab('expense'); });
$("#showIncomeChartTab").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showSummaryChartTab('income'); });
$("#showBalanceChartTab").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showSummaryChartTab('balance'); });

/*other buttons */
$("#showSettingsScreen").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); Screen.gotoPage('settingsscreen'); });
$(".navigateBack").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); navigateBack(); });


/*SETTINGS BUTTONS */
$("#showIncomeCategories").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showIncomeCategories(); });
$("#showExpenseCategories").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showExpenseCategories(); });
$("#showReminders").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showReminders(); });
$("#showCurrency").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showCurrency(); });
$("#showCurrencyFormat").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showCurrencyFormat(); });
$("#showFirstDayOfWeek").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showFirstDayOfWeek(); });
$("#showLanguage").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showLanguage(); });
$("#showBackupAndRestore").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showBackupAndRestore(); });
$("#showPassword").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showPassword(); });

$("#privacyfrombackup").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); Screen.gotoPage('privacypolicy'); });


//$("#showPrivacyPolicy").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); Screen.gotoPage('privacypolicy'); });

$('#showPrivacyPolicy').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); 
	//showPrivacyPolicy(); 
	window.open('https://smartexpenditure.com/privacy-policy.html', '_system');
});

//////////////////////////////
//PRIVACY ACCEPTANCE and VIEW
//////////////////////////////
$('#acceptPrivacyPolicyButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); 
	$('#confPrivacyPolicy').hide(); 
	localStorage.setItem("PRIVACYPOLICYSCREEN",'ACCEPTED');
	writeLocalStorageToFile();
});

$('.tranPrivacyPolicyWEBLINK').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); window.open('https://smartexpenditure.com/privacy-policy.html', '_system'); });

/////////////////////////////////////
//END OF PRIVACY ACCEPTANCE and VIEW
/////////////////////////////////////

$("#showResetAllData").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showResetAllData(); });

$('#addNewExpenseCategory').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); addNewExpenseCategory(); });
$('#closeNewExpense').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeNewExpense(); });
$('#saveNewExpense').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveNewExpense(); });
$('#newExpenseChangeColor').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  Screen.gotoPage('colorpickerscreen'); });
$('#newExpenseChangeIcon').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  Screen.gotoPage('iconpickerscreen'); });


$('#addNewIncomeCategory').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); addNewIncomeCategory(); });
$('#closeNewIncome').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeNewIncome(); });
$('#saveNewIncome').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveNewIncome(); });
$('#newIncomeChangeColor').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  Screen.gotoPage('colorpickerscreen'); });
$('#newIncomeChangeIcon').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  Screen.gotoPage('iconpickerscreen'); });

$('#deleteIncomeCategoryIcon').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  showDeleteIncomeCategory(); });
$('#deleteExpenseCategoryIcon').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  showDeleteExpenseCategory(); });

$('#yesDeleteExpenseCategory').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  doDeleteExpenseCategory(); });
$('#yesDeleteIncomeCategory').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  doDeleteIncomeCategory(); });




///////////////////
//COLOR PICKER
///////////////////
$('#selColorchartRed1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartRed1'); });
$('#selColorchartRed2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartRed2'); });
$('#selColorchartRed3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartRed3'); });
$('#selColorchartRed4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartRed4'); });
$('#selColorchartRed5').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartRed5'); });
$('#selColorchartPurple1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartPurple1'); });
$('#selColorchartPurple2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartPurple2'); });
$('#selColorchartPurple3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartPurple3'); });
$('#selColorchartPurple4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartPurple4'); });
$('#selColorchartPurple5').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartPurple5'); });
$('#selColorchartGray1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGray1'); });
$('#selColorchartGray2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGray2'); });
$('#selColorchartGray3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGray3'); });
$('#selColorchartBlue7').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue7'); });
$('#selColorchartBlue1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue1'); });
$('#selColorchartBlue2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue2'); });
$('#selColorchartBlue3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue3'); });
$('#selColorchartBlue4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue4'); });
$('#selColorchartBlue5').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue5'); });
$('#selColorchartBlue6').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue6'); });
$('#selColorchartBlue8').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBlue8'); });
$('#selColorchartGreen1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGreen1'); });
$('#selColorchartGreen2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGreen2'); });
$('#selColorchartGreen3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGreen3'); });
$('#selColorchartGreen4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGreen4'); });
$('#selColorchartGreen5').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGreen5'); });
$('#selColorchartGreen6').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartGreen6'); });
$('#selColorchartOrange1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartOrange1'); });
$('#selColorchartOrange2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartOrange2'); });
$('#selColorchartYellow1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartYellow1'); });
$('#selColorchartOrange3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartOrange3'); });
$('#selColorchartOrange4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartOrange4'); });
$('#selColorchartBrown1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickColor('chartBrown1'); });


///////////////////
//COLOR PICKER
///////////////////
$('#selIcon01').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('01'); });
$('#selIcon010').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('010'); });
$('#selIcon02').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('02'); });
$('#selIcon03').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('03'); });
$('#selIcon04').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('04'); });
$('#selIcon05').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('05'); });
$('#selIcon06').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('06'); });
$('#selIcon07').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('07'); });
$('#selIcon08').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('08'); });
$('#selIcon09').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('09'); });
$('#selIcon1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('1'); });
$('#selIcon10').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('10'); });
$('#selIcon11').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('11'); });
$('#selIcon2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('2'); });
$('#selIcon3').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('3'); });
$('#selIcon4').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('4'); });
$('#selIcon5').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('5'); });
$('#selIcon6').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('6'); });
$('#selIcon7').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('7'); });
$('#selIcon8').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('8'); });
$('#selIcon9').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('9'); });
$('#selIconauto').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('auto'); });
$('#selIconbills').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('bills'); });
$('#selIconclothes').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('clothes'); });
$('#selIconcommunication').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('communication'); });
$('#selIcondeposit').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('deposit'); });
$('#selIconeatingout').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('eatingout'); });
$('#selIconentertainment').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('entertainment'); });
$('#selIconfood').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('food'); });
$('#selIconfuel').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('fuel'); });
$('#selIcongeneral').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('general'); });
$('#selIcongifts').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('gifts'); });
$('#selIconhealth').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('health'); });
$('#selIconholidays').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('holidays'); });
$('#selIconhome').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('home'); });
$('#selIconkids').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('kids'); });
$('#selIconloan').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('loan'); });
$('#selIconothers').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('others'); });
$('#selIconpets').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('pets'); });
$('#selIconsalary').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('salary'); });
$('#selIconsavings').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('savings'); });
$('#selIconshopping').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('shopping'); });
$('#selIconsports').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('sports'); });
$('#selIcontaxi').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('taxi'); });
$('#selIcontoiletry').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('toiletry'); });
$('#selIcontransport').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); pickIcon('transport'); });


//////////////////////////
//CURRENCY FORMAT BUTTONS
//////////////////////////
$('#currencyFormatChoose1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseCurrencyFormat(1); });
$('#currencyFormatChoose2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseCurrencyFormat(2); });

//////////////////////////
//FIRST DAY OF WEEK BUTTONS
//////////////////////////
$('#firstDayOfWeekChooseSunday').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseFirstDayOfWeek(1); });
$('#firstDayOfWeekChooseMonday').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseFirstDayOfWeek(2); });

//////////////////////////
//PASSWORD BUTTONS
//////////////////////////
$('#chooseUsePassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); prepareSetPassword(); });
$('#closeSetPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeSetPassword(); });
$('.passKeyboard').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); typeSetPassword((this.id).replace('keyboard','')) });
$('#keyboardClear').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setPasswordKeyboardClear(); });
$('#saveSetPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveNewPassword(); });
$('#changePassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changePassword(); });
$('#removePassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); removePassword(); });
$('#closeConfirmPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeConfirmPassword(); });
$('.confirmKeyboard').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); typeConfirmPassword((this.id).replace('confirmkeyboard','')) });
$('#confirmkeyboardClear').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); confirmPasswordKeyboardClear(); });


////////////////////////
//ENTRY BUTTONS
////////////////////////
$('#transactionActionContainerStep0').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); entryScreenShowAddBar(); });
$('#transactionNextDay').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doShowDay(G_NextDay); });
$('#transactionPrevDay').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doShowDay(G_PrevDay); });
$("#showAddIncomeScreen").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); hideMainScreenAddButtons(); addIncome(dateToInt(G_today)); G_EntryScreenFromLocation = 'fromMain'; });
$("#showAddExpenseScreen").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); hideMainScreenAddButtons(); addExpense(dateToInt(G_today)); G_EntryScreenFromLocation = 'fromMain';});
$("#entryAddExpense").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeEntryScreenAddButtons(); addExpense(G_SelectedDay); G_EntryScreenFromLocation = 'dayDetails'; });
$("#entryAddIncome").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeEntryScreenAddButtons(); addIncome(G_SelectedDay); G_EntryScreenFromLocation = 'dayDetails'; });
$("#transactionActionContainerClose").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeEntryScreenAddButtons(); });


$("#transactionAmountValue").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); if(G_EntryTransactionStep == 'focus'){editTransactionAmount()}; });
$("#transactionAmountBackspace").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); if(G_EntryTransactionStep == 'focus'){editTransactionAmount()}else{pressBackSpaceKey()}; });
$('.transactionNumpadElements').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); registerKeyForTransactionAmount(parseInt((this.id).replace('transactionKey',''))) });

$('.transactionNumpadElementsOperation').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); registerOperationKeyForTransactionAmount(((this.id).replace('keyboard',''))) });

$("#closeAddTransaction").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeAddTransaction(); });
$("#doneAddTransaction").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doneAddTransaction(); });

$("#closeTransactionNote").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeTransactionNote(); });
$("#saveTransactionNote").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveTransactionNote(); });

$('#transactionChooseCategory').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); transactionChooseCategory(''); });
$('#transactionDetailsNote').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); transactionDetailsAddNote(); });
$('#saveDayTransaction').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveDayTransaction(); });
$('#closeDayTransaction').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeDayTransaction(); });

$('#entryTransactionDelete').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); entryTransactionDelete(); });
$('#closeDeleteTransaction').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeDeleteTransaction(); });
$('#yesDeleteTransaction').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); yesDeleteTransaction(); });

$('#entryPickDifferentDate').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); prepareAndShowDatePicker(); });

//calendar picker buttons
$('.datePicker').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); datePickerdoSelectCalendarDay(parseInt((this.id).replace('pickertransactionDay',''))) });
$("#pickershowNextMonth").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setCurrentPrevAndNextDates(1); });
$("#pickershowPrevMonth").fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setCurrentPrevAndNextDates(-1); });

////////////////////////
//CHART RELATED BUTTONS
////////////////////////
$('#viewMoreExpense').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewExpenseChart(); });
$('#viewMoreIncome').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewIncomeChart(); });


$('#expenseMainChartRightColumn').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewExpenseChart(); });
$('#incomeMainChartRightColumn').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewIncomeChart(); });

$('#showExpenseDetailsChartTab').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewExpenseChart(); });
$('#showIncomeDetailsChartTab').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewIncomeChart(); });
$('#showBalanceDetailsChartTab').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewBalanceChart(); });

$('#changeGranularityLevel').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showTimeFramePicker(); });
$('#chooseWeekTimeFrame').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseChartTimeFrame('weekly'); });
$('#chooseMonthTimeFrame').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseChartTimeFrame('monthly'); });
$('#chooseYearTimeFrame').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseChartTimeFrame('yearly'); });
$('#chooseCustomTimeFrame').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chooseChartTimeFrame('custom'); });

$('#saveChooseTimeFrame').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  doChooseTimeFrame(); });



$('#chartNext').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chartNavigateInTime(1); });
$('#chartPrev').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); chartNavigateInTime(-1); });


//time frame picker  - buttons
$('#startDateMonthUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeStartDate('month',1);});
$('#startDateDayUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeStartDate('day',1);});
$('#startDateYearUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeStartDate('year',1);});
$('#startDateMonthDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeStartDate('month',-1);});
$('#startDateDayDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeStartDate('day',-1);});
$('#startDateYearDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeStartDate('year',-1);});

$('#endDateMonthUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeEndDate('month',1);});
$('#endDateDayUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeEndDate('day',1);});
$('#endDateYearUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeEndDate('year',1);});
$('#endDateMonthDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeEndDate('month',-1);});
$('#endDateDayDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeEndDate('day',-1);});
$('#endDateYearDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeEndDate('year',-1);});


//REMINDER RELATED 
$('#addNewReminder').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); addNewReminder();});
$('#repeatsEveryDayButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectRepeatsEveryPeriod('day');});
$('#repeatsEveryWeekButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectRepeatsEveryPeriod('week');});
$('#repeatsEveryMonthButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doSelectRepeatsEveryPeriod('month');});

$('#reminderstartDateMonthUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderStartDate('month',1);});
$('#reminderstartDateDayUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderStartDate('day',1);});
$('#reminderstartDateYearUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderStartDate('year',1);});
$('#reminderstartDateMonthDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderStartDate('month',-1);});
$('#reminderstartDateDayDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderStartDate('day',-1);});
$('#reminderstartDateYearDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderStartDate('year',-1);});

$('#repeatEveryUpButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderRepeatNumber(1);});
$('#repeatEveryDownButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderRepeatNumber(-1);});

$('#reminderTimeUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderTimeOfTheDay(1);});
$('#reminderTimeDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeReminderTimeOfTheDay(-1);});

$('#saveNewReminder').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveNewReminder();});
$('#saveExistingReminder').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); saveExistingReminder();});

$('#deleteReminderIcon').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showConfirmDeleteReminder();});
$('#closeDeleteReminder').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeConfirmDeleteReminder();});
$('#yesDeleteReminder').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); deleteReminder();});

$('#dailyReminder').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showHideDailyReminder();});
$('#dailyReminderHourUp').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeTimeOfTheDayForDailyReminder(1);});
$('#dailyReminderHourDown').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); changeTimeOfTheDayForDailyReminder(-1);});


//BACKUP AND RESTORE RELATED
$('#backupViewDetailsButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewBackupDetails();});
$('#restoreViewDetailsButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); viewRestoreDetails();});
$('#continueToNextStep').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); continueToNextBackupStep();});

$('#disableBackup').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showConfirmationDisableBackup();});
$('#yesDisableBackup').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); disableBackup();});
$('#changeBackupPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showConfirmationChangeBackupPassword();});
$('#continueChangePassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); continueWithBackupPasswordChange();});
$('#resetBackupPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showConfirmationResetBackupPassword();});
$('#yesResetBackupPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doResetBackupPassword();});

$('#restoreDataButton').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doRestoreData();});

$('#restoreresetBackupPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); showConfirmationResetBackupPasswordOnRestore();});
$('#yesResetBackupPasswordOnRestore').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doResetBackupPasswordOnRestore();});


//LOGIN RELATED
$('.loginkeyboard').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); loginPressKey(parseInt((this.id).replace('loginkey',''))) });
$('#loginClearKey').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); clearLoginPass(); });
$('#forgotPasswordLabel').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); goToForgotPassword(); });
$('#closeResetLoginPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeForgotPassword(); });
$('#doResetLoginPassword').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doResetLoginPassword(); });





//EXIT APP RELATED
$('#dontExitApplication').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault();  closeConfirmExitApp(); });
$('#yesExitApplication').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); quitApp(); });


//INITIAL SETUP BUTTONS
$('#initialSetupChooseCurrency').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); G_CurrentDetailsScreenFromInit = 'choosecurrencyfrominit'; showCurrency(); });
$('#setupcurrencyFormatChoose1').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setupchooseCurrencyFormat(1); });
$('#setupcurrencyFormatChoose2').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setupchooseCurrencyFormat(2); });
$('#setupfirstDayOfWeekChooseSunday').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setupchooseFirstDayOfWeek(1); });
$('#setupfirstDayOfWeekChooseMonday').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); setupchooseFirstDayOfWeek(2); });
$('#continueFromInitialSetupScreen').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); continueAfterInitialScreen(); });

//RESET APP DATA RELATED
$('#yesDeleteAllAppData').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); yesResetApplicationData(); });


//LANGUAGE RELATED
$('#selectLanguageEN').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('EN'); });
$('#selectLanguageRO').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('RO'); });
$('#selectLanguageES').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('ES'); });
$('#selectLanguagePT').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('PT'); });
$('#selectLanguageFR').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('FR'); });
$('#selectLanguageRU').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('RU'); });
$('#selectLanguageDE').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('DE'); });
$('#selectLanguageEL').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('EL'); });
$('#selectLanguageIT').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('IT'); });
$('#selectLanguageUK').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('UK'); });
$('#selectLanguageJA').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('JA'); });
$('#selectLanguageHI').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('HI'); });

$('#selectLanguageBG').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('BG'); });
$('#selectLanguageNL').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('NL'); });
$('#selectLanguageHU').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('HU'); });
$('#selectLanguageTH').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('TH'); });
$('#selectLanguageMS').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('MS'); });
$('#selectLanguageID').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('ID'); });
$('#selectLanguageKO').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('KO'); });
$('#selectLanguagePL').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('PL'); });
$('#selectLanguageTR').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('TR'); });
$('#selectLanguageZH').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('ZH'); });
$('#selectLanguageVI').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); choosePreferredLanguage('VI'); });


//photo related
$('#doAddPhoto').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); doAddPhoto(); });
$('#closeImageSourcePicker').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeImagePickerConfirmation(); });
$('#getImageFromCamera').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); takeCameraPicture(); });
$('#getImageFromImageGallery').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); takeLibraryPicture(); });
$('#yesDeleteImage').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); deleteImageFromList(G_SelectedImageToRemove); });
$('#closeDeleteImage').fastClick(function(event){event.stopImmediatePropagation(); event.preventDefault(); closeDeleteImageConfirmation();});































