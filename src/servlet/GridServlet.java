package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.*;

@WebServlet("/GridServlet")
public class GridServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String body;

	public GridServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = null;

		try {
			InputStream inputStream = request.getInputStream();

			if (inputStream != null) {
				bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

				char[] charBuffer = new char[128];
				int bytesRead = -1;

				while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
					stringBuilder.append(charBuffer, 0, bytesRead);
				}
			} else {
				stringBuilder.append("");
			}
		} catch (IOException ex) {
			System.out.println(ex.getMessage());
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException ex) {
				}
			}
		}

		body = stringBuilder.toString();
		System.out.println(body);

		JSONArray arr;
		try {
			JSONObject obj = new JSONObject(body);
			arr = obj.getJSONArray("json");
			List<List<String>> list = new ArrayList<List<String>>();
			
			for (int i = 0; i < arr.length(); i++) {
				List<String> innerList = new ArrayList<>();
				for (int j = 0; j < arr.getJSONArray(i).length(); j++) {
					innerList.add(arr.getJSONArray(i).getString(j));
				}
				list.add(innerList);
			}
			
			list.forEach(element -> {
				element.forEach(inner -> System.out.println(inner));
			});
			
		} catch (JSONException e) {
			e.printStackTrace();
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
