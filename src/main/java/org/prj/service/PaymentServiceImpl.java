package org.prj.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PaymentVO;
import org.prj.mapper.PaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class PaymentServiceImpl implements PaymentService {
	
	@Autowired
	private PaymentMapper mapper;
	
    public static final String KEY = "7434567018535738";
    public static final String SECRET = "s7BglO3YEbQ9pIWbMQhWMIr3jXFbpaCe9wYi2xthBropAbqKw8Iw0JDoacXv0dvGQAfxeOO9hDVfLT1w";
	
	@Override
	public int order(PaymentVO vo) {
		log.info("order..." + vo);
		return mapper.order(vo);
	}
	
	@Override
	public List<PaymentVO> orderList(Criteria cri) {
		log.info("orderList..." + cri);
		return mapper.orderList(cri);
	}
	
	@ToString
	@Getter
	private class Response {
		private PaymentInfo response;
	}
	
	@ToString
	@Getter
	private class PaymentInfo {
		private int amount;
	}
	
	@Override
	public String getToken() throws IOException {

		HttpsURLConnection conn = null;

		URL url = new URL("https://api.iamport.kr/users/getToken");

		conn = (HttpsURLConnection) url.openConnection();

		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setDoOutput(true);
		JsonObject json = new JsonObject();

		json.addProperty("imp_key", KEY);
		json.addProperty("imp_secret", SECRET);
		
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		
		bw.write(json.toString());
		bw.flush();
		bw.close();

		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

		Gson gson = new Gson();

		String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
		
		System.out.println(response);

		String token = gson.fromJson(response, Map.class).get("access_token").toString();

		br.close();
		conn.disconnect();

		return token;
	}
	
	@Override
	public int paymentInfo(String imp_uid, String access_token) throws IOException {
	    HttpsURLConnection conn = null;
	    
	    URL url = new URL("https://api.iamport.kr/payments/" + imp_uid);
	    
	    conn = (HttpsURLConnection) url.openConnection();
	 
	    conn.setRequestMethod("GET");
	    conn.setRequestProperty("Authorization", access_token);
	    conn.setDoOutput(true);
	    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
	    Gson gson = new Gson();
	    
	    Response response = gson.fromJson(br.readLine(), Response.class);
	    
	    br.close();
	    conn.disconnect();
	    
	    return response.getResponse().getAmount();
	}
	
	@Override
	public void paymentCancel(String access_token, String imp_uid, int amount, String reason) throws IOException {
		System.out.println("결제 취소");
		
		HttpsURLConnection conn = null;
		URL url = new URL("https://api.iamport.kr/payments/cancel");
 
		conn = (HttpsURLConnection) url.openConnection();
 
		conn.setRequestMethod("POST");
 
		conn.setRequestProperty("Content-type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setRequestProperty("Authorization", access_token);
 
		conn.setDoOutput(true);
		
		JsonObject json = new JsonObject();
 
		json.addProperty("reason", reason);
		json.addProperty("imp_uid", imp_uid);
		json.addProperty("amount", amount);
		json.addProperty("checksum", amount);
 
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
 
		bw.write(json.toString());
		bw.flush();
		bw.close();
		
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
 
		br.close();
		conn.disconnect();
		
	}
	
	@Override
	public PaymentVO orderGet(String order_no) {
		log.warn("orderGet..." + order_no);
		return mapper.orderGet(order_no);
	}
	
	@Override
	public int cancelStatus(String order_no) {
		log.info("cancelStatus..." + order_no);
		return mapper.cancelStatus(order_no);
	}
	
	@Override
	public List<PaymentVO> getPayMemberList(Criteria cri) {
	return mapper.getPayMemberList(cri);
	}

	@Override
	public int getPayPartyTotal(Criteria cri) {
		return mapper.getPayPartyTotal(cri);
	}
	
	@Override
	public int orderTotal(int m_idx) {
		return mapper.orderTotal(m_idx);
	}
	
	@Override
	public List<PaymentVO> getTotalPayment() {
		return mapper.getTotalPayment();
	}

	@Override
	public int getTotalEarning() {
		return mapper.getTotalEarning();
	}
	
	@Override
	public int getAdminPaymentTotal(Criteria cri) {
		return mapper.getAdminPaymentTotal(cri);
	}
	
	@Override
	public List<PaymentVO> getAdminPaymentList(Criteria cri) {
		return mapper.getAdminPaymentList(cri);
	}
	
	@Override
	public int getPartyCancelTotal(Criteria cri) {
		return mapper.getPartyCancelTotal(cri);
	}
	
	@Override
	public List<PaymentVO> getPartyCancelList(Criteria cri) {
		return mapper.getPartyCancelList(cri);
	}

	@Override
	public List<PaymentVO> getPaymentUsers(int p_idx) {
		return mapper.getPaymentUsers(p_idx);
	}
	
	
}
