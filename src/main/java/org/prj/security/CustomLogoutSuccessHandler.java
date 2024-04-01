package org.prj.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;


import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map; 

public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		HttpSession session = request.getSession();
		String loginType = (String) session.getAttribute("loginType");
		String kakaoid = (String) session.getAttribute("kakaoid");
		String logout = (String) session.getAttribute("logout");
		

		if (loginType != null){
			if (loginType.equals("kakao")) {
				doKakaoLogout(kakaoid);
			}
		} 
		
		session.invalidate();
		response.setStatus(HttpServletResponse.SC_OK);
		response.sendRedirect("/kakao_logout");

	}
	
    public Map<String,Object> doKakaoLogout(String kakaoid) {
        Map<String,Object> resultMap =new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v1/user/logout";
         try {
             URL url = new URL(reqURL);
             HttpURLConnection conn = (HttpURLConnection) url.openConnection();
             conn.setRequestMethod("POST");
             conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
             StringBuilder postData = new StringBuilder();
             conn.setDoOutput(true);

             
             postData.append("target_id_type").append("=").append("user_id");
             postData.append("&").append("target_id").append("=").append(kakaoid);
             byte[] postDataBytes = postData.toString().getBytes("UTF-8");
             
            //요청에 필요한 Header에 포함될 내용
             conn.setRequestProperty("Authorization", "KakaoAK eb3882e155d116ec4bd77fa873f429cf");

//             int responseCode = conn.getResponseCode();
//             System.out.println("responseCode : " + responseCode);
             conn.getOutputStream().write(postDataBytes);

             BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

             String br_line = "";
             String result = "";

             while ((br_line = br.readLine()) != null) {
                 result += br_line;
             }
            System.out.println("response:" + result);
            


         } catch (IOException e) {

             e.printStackTrace();
         }
         return resultMap;
     }

}	