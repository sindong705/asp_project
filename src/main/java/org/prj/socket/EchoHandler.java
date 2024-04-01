package org.prj.socket;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.log4j.Log4j;

@Log4j
public class EchoHandler extends TextWebSocketHandler{
	
	private Map<String, WebSocketSession> users = new ConcurrentHashMap<String, WebSocketSession>();
	private Map<WebSocketSession, String> sessions = new ConcurrentHashMap<>();
	
	// 클라이언트가 서버로 연결시
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String userId = getMemberId(session); 
		
		//로그인 되었을 때 유저 정보 저장
		if(userId!=null) {
			users.put(userId, session);
			sessions.put(session, userId);
		}
	}
	
	// 인증된(로그인한) 사용자 id 얻는 메소드 
	private String getMemberId(WebSocketSession session) {
		SecurityContext securityContext = (SecurityContext) session.getAttributes().get("SPRING_SECURITY_CONTEXT");
	    if (securityContext != null) {
	        Authentication authentication = securityContext.getAuthentication();
	        if (authentication != null && authentication.isAuthenticated()) {
	            return authentication.getName();
	        }
	    }
	    return null;
	}
	
	// 클라이언트가 Data 전송 시
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// 특정 유저에게 보내기
		String msg = message.getPayload();
		
		if(msg != null) {
			String[] strs = msg.split(",");
			log.info(strs.toString());
			if(strs != null && strs.length == 4) {
				String to_id = strs[0];
				String from_id = strs[1];
				String content = strs[2];
				String url = strs[3];
				WebSocketSession targetSession = users.get(to_id);  // 메시지를 받을 세션 조회
				
				// 실시간 접속 시
				if(targetSession!=null) {
					// 메시지
					TextMessage tmpMsg = new TextMessage("<a target='_blank' href='" + url + "'>[<b>" + from_id + "</b>] " + content + "</a>");
					targetSession.sendMessage(tmpMsg);
				}
			}
		}
	}
	
	// 연결 해제될 때
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		String senderId = getMemberId(session);
		if(senderId!=null) {	// 로그인 값이 있는 경우만
			users.remove(senderId);
			sessions.remove(session);
		}
	}
	
	// 에러 발생시
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		log(session.getId() + " 익셉션 발생: " + exception.getMessage());

	}
	
	// 로그 메시지
	private void log(String logmsg) {
		System.out.println(new Date() + " : " + logmsg);
	}
	
}
