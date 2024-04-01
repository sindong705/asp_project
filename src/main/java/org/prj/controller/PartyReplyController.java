package org.prj.controller;

import java.util.List;

import org.prj.domain.PartyCommentVO;
import org.prj.service.PartyReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/partyreply/*")
public class PartyReplyController {
	@Autowired
	private PartyReplyService prservice;
	
	//댓글 등록
	@PostMapping(value="/new", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public String create(@RequestBody PartyCommentVO vo) {
										//JSON을 자바 객체로 바꿔주는 어노테이션
		int insertCount = prservice.register(vo);
		
		log.info("reply insertCount : " + insertCount);
		
		return insertCount == 1 ? "insert success" : "insert fail";
	}
	
	//댓글 목록
	@GetMapping(value = "/pages/{p_idx}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PartyCommentVO> getList(@PathVariable("p_idx") int p_idx){
		log.info("getReplyList..." + p_idx);
		
		return prservice.getList(p_idx);
	}
	
	//댓글 삭제
	@DeleteMapping(value = "/{c_idx}", produces = MediaType.TEXT_PLAIN_VALUE)
	public String remove(@PathVariable int c_idx){
		log.info("ReplyRemove..." + c_idx);
		
		return prservice.remove(c_idx) == 1 ? "remove success" : "remove fail";
	}
}
