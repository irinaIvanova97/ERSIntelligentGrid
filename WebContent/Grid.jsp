<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Title</title>

<style type="text/css">

.highlight {
    background: red;
}
.nonhighligh {
    background: white;
}
</style>

</head>
<body>
	<table border="1" id="dataTable">
		<tr>
			<td><Strong>Column number</Strong></td>
			<td><Strong>Data1</Strong></td>
			<td><Strong>Data2</Strong></td>
			<td><Strong>Data3</Strong></td>
			<td><Strong>Result1</Strong></td>
			<td><Strong>Result2</Strong></td>
			<td><Strong>Result3</Strong></td>
		</tr>
		<tr id = 1>
			<td align="center">1</td>
			<td><input type="Text"></td>
			<td><input type="Text"></td>
			<td><input type="Text"></td>
			<td><input type="Text" readonly></td>
			<td><input type="Text" readonly></td>
			<td><input type="Text" readonly></td>
		</tr>

		<tr id = 2>
			<td align="center" >2</td>
			<td><input type="Text"></td>
			<td><input type="Text"></td>
			<td><input type="Text"></td>
			<td><input type="Text" readonly></td>
			<td><input type="Text" readonly></td>
			<td><input type="Text" readonly></td>
		</tr>

	</table>
	<INPUT type="button" id="btnAdd" value="Add Row" onclick="addRow()" />
	<INPUT type="button" id="btnDelete" value="Delete Row" onclick="deleteRow()" />
	<INPUT type="button" id="btnShow" value="Show" onclick="showContent()" />
	<br />


	<script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>

	<script type="text/javascript" src="script.js"></script>

	<script type="text/javascript">
		
	$("#dataTable tr").click(function() {
		    var selected = $(this).hasClass("highlight");
		    $("#data tr").removeClass("highlight");
		    if(!selected)
		    	{
		            $(this).addClass("highlight");
		    	}
		    else
		    	$(this).removeClass("highlight");
		});
	
	/*$(document).ready(function() {
		  var tid = "";
		  $('#dataTable tr').click(function(event) {
		    tid = $(this).attr('id');
		  });
		  $("#btnRowClick").click(function() {
		    console.log(tid);
		    if ($('#' + tid).length) {
		      $('#' + tid).remove();
		    }
		  });
		});*/
		
	</script>

</body>
</html>