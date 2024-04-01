package org.prj.controller;

import java.util.List;

import org.prj.domain.AlarmVO;
import org.prj.domain.Criteria;
import org.prj.domain.PartyBoardVO;
import org.prj.service.AlarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/alarm/*")
public class AlarmController {
	@Autowired
	private AlarmService aService;
	
	@ResponseBody
	@PostMapping(value="/savenotify", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String saveNotify(@RequestBody AlarmVO vo) {
		int result = aService.doSaveNotify(vo);
		return result > 0 ? "success" : "fail";
	}
	
	//알림 페이지
	@GetMapping("/alarm")
	public String getAlarmPage(Model model) {
		log.info("alarm...");
		return "/shop/alarm";
	}
	
	//더보기
	@ResponseBody
	@GetMapping(value = "/items", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<AlarmVO> getItems(@RequestParam("id") String id, @RequestParam("page") int page) {
		Criteria cri = new Criteria();
		
		cri.setPageNum(page);
		cri.setId(id);
		
		return aService.getMyNotify(cri);
	}
	
	//알림 조회 상태 업데이트
	@ResponseBody
	@PostMapping(value="/changestatus", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doChangeStatus(@RequestBody int a_idx) {
		int result = aService.doChangeStatus(a_idx);
		return result > 0 ? "success" : "fail";
	}
	
	//내 알림 개수
	@ResponseBody
	@PostMapping(value="/alarmnumber", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getMyNotifyNum(@RequestBody String id) {
		return aService.getMyNotifyNum(id);
	}
	
	//선택 알림 확인
	@ResponseBody
	@PostMapping(value="/check", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doCheckAlarm(@RequestBody List<Integer> idxlist) {
		int result = aService.doCheckAlarm(idxlist);
		return result > 0 ? "success" : "fail";
	}
	
	//선택 알림 삭제
	@ResponseBody
	@PostMapping(value="/delete", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doDeleteAlarm(@RequestBody List<Integer> idxlist) {
		int result = aService.doDeleteAlarm(idxlist);
		return result > 0 ? "success" : "fail";
	}
}
