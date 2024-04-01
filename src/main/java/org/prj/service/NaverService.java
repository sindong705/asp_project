package org.prj.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class NaverService {
     public String getReturnAccessToken(String code, String state) throws UnsupportedEncodingException {

    	    String clientId = "KLaOm3GoJkeH8xTjLT9y";//애플리케이션 클라이언트 아이디값";
    	    String clientSecret = "xHpQctPFrh";//애플리케이션 클라이언트 시크릿값";
    	    String redirectURI = URLEncoder.encode("http://localhost:8081/naver_callback", "UTF-8");
    	    String apiURL;
    	    apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
    	    apiURL += "client_id=" + clientId;
    	    apiURL += "&client_secret=" + clientSecret;
    	    apiURL += "&redirect_uri=" + redirectURI;
    	    apiURL += "&code=" + code;
    	    apiURL += "&state=" + state;
    	    String access_token = "";
    	    String refresh_token = "";
    	    
    	    System.out.println("apiURL="+apiURL);
    	    
    	    try {
    	      URL url = new URL(apiURL);
    	      HttpURLConnection con = (HttpURLConnection)url.openConnection();
    	      con.setRequestMethod("GET");
    	      int responseCode = con.getResponseCode();
    	      BufferedReader br;
    	      System.out.print("responseCode="+responseCode);
    	      if(responseCode==200) { // 정상 호출
    	        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
    	      } else {  // 에러 발생
    	        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
    	      }
    	      String inputLine;
    	      StringBuffer res = new StringBuffer();
    	      while ((inputLine = br.readLine()) != null) {
    	        res.append(inputLine);
    	      }
    	      br.close();
    	      if(responseCode==200) {
    	        System.out.println(res.toString());
                JsonParser parser = new JsonParser();
                JsonElement element = parser.parse(res.toString());
                
                // 토큰 값 저장 및 리턴
                access_token = element.getAsJsonObject().get("access_token").getAsString();
                refresh_token = element.getAsJsonObject().get("refresh_token").getAsString();                
    	      }
    	    } catch (Exception e) {
    	      System.out.println(e);
    	    }
    	    return access_token;
     }

     public Map<String,Object> getUserInfo(String access_token) {
            Map<String,Object> resultMap =new HashMap<>();
            String reqURL = "https://openapi.naver.com/v1/nid/me";
             try {
                 URL url = new URL(reqURL);
                 HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                 conn.setRequestMethod("GET");

                //요청에 필요한 Header에 포함될 내용
                 conn.setRequestProperty("Authorization", "Bearer " + access_token);

                 int responseCode = conn.getResponseCode();
                 System.out.println("responseCode : " + responseCode);

                 BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

                 String br_line = "";
                 String result = "";

                 while ((br_line = br.readLine()) != null) {
                     result += br_line;
                 }
                System.out.println("response:" + result);


                 JsonParser parser = new JsonParser();
                 JsonElement element = parser.parse(result);

                 log.warn("element:: " + element);

                 log.warn("id:: "+element.getAsJsonObject().get("response").getAsJsonObject().get("id").getAsString());
                 String id = element.getAsJsonObject().get("response").getAsJsonObject().get("id").getAsString();

                 resultMap.put("id", id);

             } catch (IOException e) {
 
                 e.printStackTrace();
             }
             return resultMap;
         }
}