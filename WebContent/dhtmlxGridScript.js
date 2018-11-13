data = {
	rows : [ {
		id : 1,
		data : [ 1, "Text", "1111", "2222.22", "50", "", "", "" ]
	}, {
		id : 2,
		data : [ 2, "Text", "3333.33", "4444.44", "10", "", "", "" ]
	}, {
		id : 3,
		data : [ 3, "Text", "5555.55", "6666.66", "20", "", "", "" ]
	} ]
};

dhtmlxValidation.isMax10 = function(data) {// data should include less than 10
											// symbols
	return data.length <= 10;
};

var myGrid;
function doOnLoad() {
	myGrid = new dhtmlXGridObject('gridbox');
	myGrid.setImagePath("lib/codebase/imgs/");
	myGrid.setHeader("Column number, Data1, Data2, Data3,Data4, Result1, Result2, Result3");
	myGrid.setInitWidths("70,*,*,*,*,*,*,*");
	myGrid.setColAlign("left,left,left,left,left,left,left,left");
	myGrid.setColTypes("ro,edtxt,edn,edn,edn,ro,ro,ro");
	myGrid.setColValidators([ null, "NotEmpty", "NotEmpty", "NotEmpty", "NotEmpty" ]);
	myGrid.setNumberFormat("0,000.00", 2, ".", ",");
	myGrid.setNumberFormat("0,000.00", 3, ".", ",");
	myGrid.setNumberFormat("00.00%", 4, ".", ",");
	myGrid.setColSorting("int,str,str,str,str,str,str");
	myGrid.init();
	myGrid.enableAlterCss("even", "uneven");
	myGrid.enableMultiselect(true);
	myGrid.setColumnColor("#CCE2FE");

	myGrid.enableValidation(true);
	
	myGrid.setColValidators("Min4,Max10"); 

	myGrid.parse(data, "json");
}

var rowID = 3;

function onAddRow() {
	rowID = rowID + 1;
	myGrid.addRow(rowID, [ rowID, '', '', '', '', '', '' ], myGrid
			.getRowIndex(myGrid.getSelectedId()))
}

function onDeleteRow() {
	myGrid.deleteSelectedItem();
}

function validate(i, j){
	var numbers = /^[0-9.]+$/;
	var text = /^[a-zA-Z]+$/;
	
	var cellValue = myGrid.cellByIndex(i, j).getValue();
	var valueLength = cellValue.length;
	
	switch(true)
	{
	case j==1:
		
		if(cellValue.match(text) && valueLength < 21)
			return true;
	
		alert("Wrong input");
		myGrid.selectCell(i, j);
		myGrid.cellByIndex(i, j).setValue("");

		return false;
		break;
	case (j==2 || j==3):
		
		if ((cellValue.match(numbers)) && valueLength < 14)
			return true;
	
		alert("Wrong input");
		myGrid.selectCell(i, j);
		myGrid.cellByIndex(i, j).setValue("");

		return false;
		break;
		
	case j==4:
		
		if ((cellValue.match(numbers)) && valueLength < 10)
			return true;
	
		alert("Wrong input");
		myGrid.selectCell(i, j);
		myGrid.cellByIndex(i, j).setValue("");

		return false;
		break;
	}
}

function onCalculate() {
	var items = [];

	for (var i = 0; i < myGrid.getRowsNum(); i++) {
		items[i] = [];
		for (var j = 1; j < myGrid.getColumnsNum() - 3; j++) {
			
			var cellValue = myGrid.cellByIndex(i, j).getValue();
			
			if (cellValue == "" ) {
				alert("Incorrect or empty value!");
				myGrid.selectCell(i, j);
				myGrid.editCell();
				return;
			}

			if (!validate(i, j)) {
				return;
			}

			items[i][j - 1] = myGrid.cellByIndex(i, j).getValue();
		}

	}

	var obj = {
		'json' : items
	}
	var json = JSON.stringify(obj);
	$.ajax({
		url : "/IntelligentGrid/grid",
		type : "POST",
		dataType : 'json',
		data : json
	});
}
