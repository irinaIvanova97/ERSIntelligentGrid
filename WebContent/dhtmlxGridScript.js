data = {
	rows : [ {
		id : 1,
		data : [ 1, "Text11", "Text12", "Text13", "", "", "" ]
	}, {
		id : 2,
		data : [ 2, "Text21", "Text22", "Text23", "", "", "" ]
	}, {
		id : 3,
		data : [ 3, "Text31", "Text32", "Text33", "", "", "" ]
	} ]
};

var myGrid;
function doOnLoad() {
	myGrid = new dhtmlXGridObject('gridbox');
	myGrid.setImagePath("lib/codebase/imgs/");
	myGrid.setHeader("Column number, Data1, Data2, Data3, Result1, Result2, Result3");
	myGrid.setInitWidths("70,*,*,*,*,*,*");
	myGrid.setColAlign("left,left,left,left,left,left,left");
	myGrid.setColTypes("ro,ed,ed,ed,ro,ro,ro");
	myGrid.setColSorting("int,str,str,str,str,str,str");
	myGrid.init();
	myGrid.enableAlterCss("even", "uneven");
	myGrid.enableMultiselect(true);
	myGrid.setColumnColor("#CCE2FE");

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

function onCalculate() {
	var items = [];
	
	for (var i = 0; i < myGrid.getRowsNum(); i++) {
		items[i] = [];
		for (var j = 1; j < myGrid.getColumnsNum() - 3; j++) {
			items[i][j-1] = myGrid.cellByIndex(i, j).getValue();
		}
	}
	
	var obj = {
			'json':items
	}
	var json = JSON.stringify(obj);
	$.ajax({
	    url:"/IntelligentGrid/grid",
	    type:"POST",
	    dataType:'json',
	    data: json
	});
}
