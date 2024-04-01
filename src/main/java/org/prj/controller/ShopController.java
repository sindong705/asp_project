package org.prj.controller;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.RefundVO;
import org.prj.service.PartyBoardService;
import org.prj.service.PaymentService;
import org.prj.service.RefundService;
import org.prj.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
@RequestMapping("/shop/*")
public class ShopController {
	@Autowired 
	private PartyBoardService pService;
	
	@Autowired
	private RefundService rService;
	
	@Autowired 
	private VideoService vService;
	
	@Autowired
	private PaymentService payService;
	
	//카테고리별 리스트
	@GetMapping("/list/{c1}")
	public String getList(Model model, @PathVariable("c1") int codeone) {
		log.info("getList..." + codeone);
		
		if(codeone == 10) {
			model.addAttribute("category", "영상");
		}else if(codeone == 20) {
			model.addAttribute("category", "도서/음악");
		}else if(codeone == 30) {
			model.addAttribute("category", "게임");
		}else {
			model.addAttribute("category", "기타");
		}
		model.addAttribute("codeone", codeone);
		
		//추천영상 조회
		model.addAttribute("video", vService.mainAllVideos());
		
		return "/shop/list";
	}
	
	//더보기
	@ResponseBody
	@GetMapping(value = "/items", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PartyBoardVO> getItems(@RequestParam("c1") int codeone, @RequestParam("c2") int codetwo, @RequestParam("page") int page) {
		Criteria cri = new Criteria();
		List<PartyBoardVO> list = null;
		
		cri.setCodeone(codeone);
		cri.setPageNum(page);
		
		if(codetwo == 0) {
			list = pService.getListbycategory(cri);
		}else {
			cri.setCodetwo(codetwo);
			list = pService.getListbycategory2(cri);
		}
		return list;
	}
	
	//2차 카테고리별 리스트
	@GetMapping("/list/{c1}/{c2}")
	public String getCategoryList(Model model, @PathVariable("c1") int codeone, @PathVariable("c2") int codetwo) {
		PartyBoardVO vo = new PartyBoardVO();
		vo.setCodeone(codeone);
		vo.setCodetwo(codetwo);
		
		log.info("getCategoryList..." + codeone + codetwo);
		
		if(codeone == 10) {
			model.addAttribute("category", "영상");
		}else if(codeone == 20) {
			model.addAttribute("category", "도서/음악");
		}else if(codeone == 30) {
			model.addAttribute("category", "게임");
		}else {
			model.addAttribute("category", "기타");
		}
		model.addAttribute("codeone", codeone);
		model.addAttribute("codetwo", codetwo);
		
		//추천영상 조회
		model.addAttribute("video", vService.shopListVideos(codetwo));
		
		return "/shop/list";
	}
	
	//게시글 상세정보
	@GetMapping("/get")
	public String get(Model model, @RequestParam("pn") int p_idx) {
		log.info("get..." + p_idx);
		model.addAttribute("vo", pService.getDetailParty(p_idx));
		
		//결제한 파티원 정보
		model.addAttribute("paymembers", getPayMemberList(p_idx));
		
		return "/shop/get";
	}
	
	//파티 결제한 파티원 닉네임 리스트
	@ResponseBody
	@PostMapping(value = "/paymemberlist", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<MemberVO> getPayMemberList(@RequestBody int p_idx) {
		log.info("getPayMemberList..." + p_idx);
		
		return pService.getPaymentMemberList(p_idx);
	}
	
	//참여중인 파티
	@GetMapping("/participating")
	public void getParticipating(Model model) {
		// 현재 사용자 아이디 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
		log.info("participating..." + username);
		model.addAttribute("list", pService.getParticipating(username));
	}
	
	//환불 금액 계산을 위해 일금액, 남은 기간 불러오기
	@ResponseBody
	@PostMapping(value="/reamount", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PartyBoardVO getCurrentPartyInfo(@RequestBody int p_idx) {
		return pService.getCurrentPartyInfo(p_idx);
	}
	
	//환불 신청
	@ResponseBody
	@PostMapping("/refundregister")
	public String doRefundRegister(@RequestBody RefundVO vo) {
		return rService.doRefundRegister(vo) > 0 ? "success" : "fail";
	}
	
	//파티 결제 회원 ID
	@ResponseBody
	@PostMapping(value = "/paymentusers", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PaymentVO> getPaymentUsers(@RequestBody int p_idx) {
		return payService.getPaymentUsers(p_idx);
	}
	
	//파티장 아이디
	@ResponseBody
	@PostMapping(value = "/partnerid", produces = MediaType.TEXT_PLAIN_VALUE)
	public String getPartnerId(@RequestBody int p_idx) {
		return pService.getPartnerId(p_idx);
	}
}

