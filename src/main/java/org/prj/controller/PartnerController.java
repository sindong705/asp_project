package org.prj.controller;

import java.util.List;

import org.prj.controller.PartnerController;
import org.prj.domain.CategoryVO;
import org.prj.domain.Criteria;
import org.prj.domain.PageDTO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PartyCommentVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;
import org.prj.service.CategoryService;
import org.prj.service.MemberService;
import org.prj.service.PartyBoardService;
import org.prj.service.PartyReplyService;
import org.prj.service.PaymentService;
import org.prj.service.WithdrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/partner/*")
public class PartnerController {
	
	@Autowired
	private CategoryService cService;
	
	@Autowired 
	private PartyBoardService pService;
	
	@Autowired
	private PartyReplyService prService;

	@Autowired
	private PaymentService payservice;
	
	// 출금 관리
	@Autowired
	private WithdrawService wService;
	
	@Autowired
	private MemberService mService;
	
	//파티관리
	@GetMapping("/manage")
	public void moveManage() {
		log.info("moveManage...");
	}
	
	//다중검색 - 리스트
	@ResponseBody
	@PostMapping(value="/managesearch", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getManageSearchList(@RequestBody Criteria cri) {
		String codeone = cri.getCategory().substring(0,2);
		String codetwo = cri.getCategory().substring(2);

		if(cri.getCategory().length() > 2) {
			if(!cri.getCategory().equals("all")) {
				cri.setCodeone(Integer.valueOf(codeone));
				cri.setCodetwo(Integer.valueOf(codetwo));
			}
		}else if(cri.getCategory().length() == 2) {
			cri.setCodeone(Integer.valueOf(codeone));
		}
		
		int total = pService.getManageSearchTotal(cri);
		List<PartyBoardVO> list = pService.getManageSearchList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//카테고리 리스트 - manage select box
	@ResponseBody
	@GetMapping(value="/allcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getAllCategory(){
		return cService.getAllCategory();
	}
	
	//파티생성 페이지
	@GetMapping("/register")
	public void moveRegister() {
		log.info("moveRegister...");
	}
	
	//파티생성 페이지의 카테고리
	@ResponseBody
	@PostMapping(value = "/category", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getCategory(@RequestBody int codeone) {
		log.info("getSecondCategory..." + codeone);
		
		return cService.getSecondCategory(codeone);
	}
	
	//파티생성
	@PostMapping("/register")
	public String makeParty(PartyBoardVO vo) {
		log.info("makeParty..." + vo);
		
		pService.registerParty(vo);
		
		return "redirect:/partner/manage";
	}
	
	//파티수정 페이지
	@GetMapping("/modify")
	public void moveModify(@RequestParam("pn") int p_idx, Model model){
		log.info("moveModify..." + p_idx);
		model.addAttribute("vo", pService.getParty(p_idx));
	}
	
	//파티 수정
	@PostMapping("/modify")
	public String modifyParty(PartyBoardVO vo) {
		log.info("modifyParty..." + vo);
		pService.updateParty(vo);
		return "redirect:/partner/manage";
	}
	
	//파티 삭제
	@GetMapping("/removeparty")
	public String removeParty(@RequestParam("pn") int p_idx) {
		pService.deleteParty(p_idx);
		return "/partner/manage";
	}
	
	//댓글 보기
	@GetMapping("/replymanage")
	public void moveReplyManage() {
		log.info("moveReplyManage...");
	}
	
	//댓글보기 - 리스트
	@ResponseBody
	@PostMapping(value = "/replylist", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getReplyList(@RequestBody Criteria cri){
		log.info("getList..." + cri.getComment_to() + " / page : " + cri.getPageNum() + " / amount : " + cri.getAmount());
		
		//내 파티에 달린 댓글 개수
		int total = prService.getMyPartyReplyTotal(cri.getComment_to());
		List<PartyCommentVO> list = prService.getReplyList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//댓글 가져오기
	@ResponseBody
	@GetMapping(value = "/pages/{c_idx}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PartyCommentVO getReply(@PathVariable("c_idx") int c_idx){
		log.info("getReply..." + c_idx);
		
		return prService.getReply(c_idx);
	}
	
	
	//출금관리(출금 관리 해당되는 항목을 불러오느 위해 출금관리 화면이 시작되는 부분에 작성)
	@GetMapping("/withdraw")
	public void movewithdraw(Model model) {
		log.info("movewithdraw...");
		
		try {
			// 현재 사용자 아이디 가져오기
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();
			model.addAttribute("unsales", wService.unsales(username));
			model.addAttribute("unsaleslist", wService.unsaleslist(username));
			model.addAttribute("sumamount", wService.getp_idx(username));
			model.addAttribute("withamount", wService.withamount(username));
			model.addAttribute("currentamount", wService.currentamount(username));
		} catch(Exception e) {
			log.error("An error occurred in movewithdraw", e);
		}
	}
	
	//출금관리 리스트
	@ResponseBody
	@GetMapping(value="/withList/{m_idx}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<List<WithdrawVO>> withList(
			@PathVariable("m_idx") int m_idx
			) {
		
		List<WithdrawVO> withdrawList = wService.getWithList(m_idx);
		
		if(withdrawList == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
			
		return new ResponseEntity<List<WithdrawVO>>(wService.getWithList(m_idx), HttpStatus.OK);
	}
	
	//출금관리 - 출금신청
	@ResponseBody
	@PostMapping(value = "/withNew",
			consumes = "application/json", 
			produces = MediaType.TEXT_PLAIN_VALUE)
	public String makeWithdraw(@RequestBody WithdrawVO vo, Model model) {
		log.info("makeWithdraw..." + vo);
		
		int insertCount = wService.register(vo);
		
		log.info("insertCount : " + insertCount);
		
		return "redirect:/partner/withdraw";		
	}
	
	//정보수정
	@GetMapping("/partnerinfo")
	public void movePartnerinfo() {
		log.info("movePartnerinfo...");
	}
	
	//참여정보
	@GetMapping("/partyinfo")
	public void movePartyinfo() {
		log.info("movePartyinfo...");
	}
	
	//참여정보-리스트
	@ResponseBody
	@PostMapping(value = "/partyinfo", produces = MediaType.APPLICATION_JSON_UTF8_VALUE) 
	public PageDTO getPayMemberList(@RequestBody Criteria cri) { 
		log.info("getPayMemberList... " + cri); 
		  
		//게시글 전체 개수 
		int total = payservice.getPayPartyTotal(cri);
		List<PaymentVO> list = payservice.getPayMemberList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//취소내역
	@GetMapping("/partycancel")
	public void movePartycancel() {
		log.info("movePartycancel...");
	}
	
	//취소내역-리스트
	@ResponseBody
	@PostMapping(value = "/partycancel", produces = MediaType.APPLICATION_JSON_UTF8_VALUE) 
	public PageDTO getPartycancel(@RequestBody Criteria cri) { 
		log.info("getPayMemberList... " + cri); 
		  
		//게시글 전체 개수 
		int total = payservice.getPartyCancelTotal(cri);
		List<PaymentVO> list = payservice.getPartyCancelList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//유저 아이디 조회
	@ResponseBody
	@PostMapping(value = "/inquiryuserid", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String getUserID(@RequestBody String nickname) {
		return mService.getUserID(nickname);
	}
}
