var Matrix = function(rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.myarray = new Array(this.rows);
	for (var i = 0; i < this.columns; i += 1) {
		this.myarray[i] = new Array(this.rows)
	}
	return this.myarray;
}

function showContent() {
	var items = new Matrix(10, 10);

	var rows = $('#dataTable tr');
	for (var i = 1; i < rows.length; i++) {
		var item = rows[i];

		var inputs = $('input', item);
		for (var j = 0; j < inputs.length; j++) {
			items[i][j] = inputs[j].value;
		}
	}

	return items;

}

var i = 2;

function addRow() {
	i = i + 1;

	$('#dataTable tr:last').after(
			'<tr id = ' + i + '> <td align="center">' + i + '</td>'
					+ '<td><input type="Text"></td>'
					+ '<td><input type="Text"></td>'
					+ '<td><input type="Text"></td>'
					+ '<td><input type="Text" readonly></td>'
					+ '<td><input type="Text" readonly></td>'
					+ '<td><input type="Text" readonly></td>' + '</tr>');
}

function deleteRow() {
	
	//var tid = "";
	//tid = $('#dataTable tr.highlight');
	var highlitedRows = $('.highlight');
	highlitedRows.remove();
	
}
