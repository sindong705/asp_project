package org.prj.controller;

import java.util.List;

import org.prj.domain.InquiryCommentVO;
import org.prj.domain.InquiryVO;
import org.prj.service.InquiryReplyService;
import org.prj.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/reply")
@RestController
public class ReplyController {
	
	@Autowired
	private InquiryService iService; 
	
	@Autowired
	private InquiryReplyService service;
	
	// 1. 댓글 등록
	@Transactional
	@PostMapping(value = "/new",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE )
	public ResponseEntity<String> create(@RequestBody InquiryCommentVO vo) {
		log.info("InquiryCommentVO : " + vo);
		
		int insertCount = service.register(vo);
		log.info("insertCount : " + insertCount);
		
		InquiryVO ivo = new InquiryVO();
		ivo.setI_idx(vo.getI_idx());
		ivo.setStatus(vo.getStatus());
		log.info("statusUpdate : " + ivo);
		iService.statusUpdate(ivo);
		return insertCount == 1 ?
				new ResponseEntity<String>("success", HttpStatus.OK) :
					new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// 2. 댓글 목록
	@GetMapping(value = "/pages/{i_idx}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE
			})
	public ResponseEntity<List<InquiryCommentVO>> getList(
			@PathVariable("i_idx") int i_idx
			) {
			log.info("getList..." + i_idx);
		
		return new ResponseEntity<List<InquiryCommentVO>>(service.getList(i_idx), HttpStatus.OK);
	}
	
	// 3. 조회
	@GetMapping(value = "/{c_idx}",
			produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE,
			MediaType.APPLICATION_XML_VALUE		
			})
	public ResponseEntity<InquiryCommentVO> get(
			@PathVariable("c_idx") int c_idx
			) {
			log.info("get...." + c_idx);
			
		return new ResponseEntity<InquiryCommentVO>(service.get(c_idx), HttpStatus.OK);	
	}
	
	// 4. 삭제
	@DeleteMapping(value = "/{c_idx}",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> remove(
			@PathVariable("c_idx") int c_idx
			) {
		log.info("remove : " + c_idx);
		
		return service.remove(c_idx) == 1 ?
				new ResponseEntity<String>("success", HttpStatus.OK) :
					new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// 5. 수정
	@RequestMapping(method = RequestMethod.PUT,
			value="/{c_idx}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String modify(@RequestBody InquiryCommentVO vo) {
		log.info("modify : " + vo);
		// System.out.println("!!!!!!!!!!!!!" + vo.getC_idx());
		// System.out.println("!!!!!!!!!!!!!" + vo.getContent());
		
		return service.modify(vo) == 1 ? "success" : "fail";
	}
	
}
