package calculation;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Calculator {

	private List<List<String>> dataList = new ArrayList<List<String>>();
	private List<List<String>> resultList = new ArrayList<List<String>>();
	private String formula1;
	private String formula2;
	private String formula3;
	private int Data1 = 0;
	private int Data2 = 1;
	private int Data3 = 2;
	private int Data4 = 3;

	public Calculator() {

	}

	public Calculator(List<List<String>> ls, String... formula) {
		dataList = ls;

		formula1 = formula[0];
		formula2 = formula[1];
		formula3 = formula[2];
	}

	private String replaceFormulaWithValues(String formula, List<String> inner) {
		formula = formula.replace("Data2", inner.get(Data2));
		formula = formula.replace("Data3", inner.get(Data3));
		formula = formula.replace("Data4", Double.toString((Double.parseDouble(inner.get(Data4)) / 100)));

		return formula;
	}

	public List<List<String>> calculateResult() throws ScriptException {
		Number result1 = 0.0;
		Number result2 = 0.0;
		Number result3 = 0.0;

		for (int i = 0; i < dataList.size(); i++) {
			List<String> inner = dataList.get(i);

			ScriptEngineManager factory = new ScriptEngineManager();
			ScriptEngine engine = factory.getEngineByName("JavaScript");

			if (!formula1.equals("")) {
				String newFormula1 = formula1;
				newFormula1 = replaceFormulaWithValues(newFormula1, inner);
				result1 = (Number) engine.eval(newFormula1);
			}
			
			if (!formula2.equals("")) {
				String newFormula2 = formula2;
				newFormula2 = replaceFormulaWithValues(newFormula2, inner);
				result2 = (Number) engine.eval(newFormula2);
			}

			if (!formula3.equals("")) {
				String newFormula3 = formula3;
				newFormula3 = replaceFormulaWithValues(newFormula3, inner);
				result3 = (Number) engine.eval(newFormula3);
			}

			List<String> resultInner = new ArrayList<String>();

			Locale currentLocale = Locale.getDefault();
			DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(currentLocale);
			otherSymbols.setDecimalSeparator('.');
			DecimalFormat df = new DecimalFormat("##########.##", otherSymbols);

			if ((Double)result1 != 0.0)
				resultInner.add(df.format(result1));
			if ((Double)result2 != 0.0)
			resultInner.add(df.format(result2));
			if ((Double)result3 != 0.0)
			resultInner.add(df.format(result3));

			resultList.add(resultInner);

		}

		resultList.forEach(element -> {
			element.forEach(inner -> System.out.println(inner));
		});

		return resultList;
	}

	public static void main(String[] args) throws ScriptException {
		String d = "5";
		System.out.println(Double.parseDouble(d));
	}
}
