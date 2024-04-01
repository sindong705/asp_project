package org.prj.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PageDTO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.PointVO;
import org.prj.security.CustomUserDetailService;
import org.prj.security.domain.CustomUser;
import org.prj.service.MemberService;
import org.prj.service.PartyBoardService;
import org.prj.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping(value = "/member/*")
public class MemberController {

	@Autowired
	private MemberService memberservice;
	@Autowired
	private PasswordEncoder pwencoder;
	@Autowired
    private CustomUserDetailService customUserDetailService;
	@Autowired 
	private PointService poService;	
	@Autowired 
	private PartyBoardService pService;

	// 개인정보 동의 페이지 이동
	@RequestMapping(value = "joinAgree", method = RequestMethod.GET)
	public void joinAgreeGET(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();	// 세션 삭제
	}

	// 회원가입 페이지 이동
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public void join1GET() throws Exception {}
	
	//본인인증
	@PostMapping(value="/doCertify", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<HashMap<String, String>> doCertify(@RequestBody String impuid) throws Exception{
		log.info("doCertify..." + impuid);
		HashMap<String, String> map = memberservice.getAuthInfo(impuid);
		
		String name = map.get("name");
		String phone = map.get("phone");
		
		int result = memberservice.joinCheck(name, phone);
		map.put("result", result + "");
		return ResponseEntity.ok().body(map);
	}

	// 회원가입
	@RequestMapping(value = "/join", method = RequestMethod.POST)
	public String joinPOST(MemberVO member, Model model, HttpSession session, PointVO point) throws Exception {
		// log.info("join 진입");
		member.setPassword(pwencoder.encode(member.getPassword()));
		
		MemberVO memVo =  (MemberVO)session.getAttribute("joinMemVo");
		if(memVo != null) {
			member.setKakaoid(memVo.getKakaoid());
			member.setNaverid(memVo.getNaverid());
			member.setToken(memVo.getToken());
		}
		// 회원가입 서비스 실행
		int mIdx = memberservice.memberJoin(member);
		
		point.setM_idx(member.getM_idx());
		point.setId(member.getId());
		point.setName(member.getName());
		point.setContent("join");
		point.setBefore_point(0);
		point.setAfter_point(500);
		point.setUpdate_point(500);
		poService.pointInsert(point);
		
		
		model.addAttribute("setText", "회원가입을 축하드립니다! 다시 로그인 해주세요!");
		model.addAttribute("PopCheck", 4);
    	return "/member/registerAlert";
	}

	// 아이디 비밀번호 찾기 페이지 이동
	@RequestMapping(value = "/find", method = RequestMethod.GET)
	public void find_idGET() {}

	// 아이디 중복 검사
	@RequestMapping(value = "/memberIdChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberIdChkGET(@RequestParam("id") String id) throws Exception {

		int result = memberservice.idCheck(id);

		if (result != 0) {
			return "1"; // 중복 아이디가 존재
		} else {
			return "0"; // 중복 아이디 X
		}
	} // memberIdChkPOST() 종료

	// 닉네임 중복 검사
	@RequestMapping(value = "/memberNickChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberNickChkGET(@RequestParam("nickname") String nickname) throws Exception {

		int result = memberservice.nicknameCheck(nickname);

		if (result != 0) {
			return "1"; // 중복 닉네임 존재
		} else {
			return "0"; // 중복 닉네임 X
		}
	} // memberNickChkGET() 종료

	// 이메일 중복 검사
	@RequestMapping(value = "/memberEmailChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberEmailChkGET(@RequestParam("email") String email) throws Exception {


		int result = memberservice.emailCheck(email);

		if (result != 0) {
			return "1"; // 중복 이메일 존재
		} else {
			return "0"; // 중복 이메일 X
		}
	} // memberEmailChkGET() 종료

	// security 로그인 로그아웃
	@GetMapping("/accessError")
	public String accessDenied(Authentication auth, Model model) {
		// log.info("Access Denied : " + auth);
		model.addAttribute("msg", "Access Denied");
		return "/accessError";
	}

	@GetMapping("/login")
	public String loginInput(String error, String logout, Model model) {

		if (error != null) {
			model.addAttribute("error", "0");
		}

		if (logout != null) {
			model.addAttribute("logout", "Logout!!!");
		}

		return "/member/login";
	}

	@GetMapping("/logout")
	public String logoutGet() {

		return "/member/logout";
	}

	@ResponseBody
	@GetMapping("/api/currentUser")
	public Authentication getCurrentUser() {
		// 현재 사용자 정보
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    
        if (username != "anonymousUser") {
	        // 사용자 정보 업데이트 후 새로운 UserDetails 객체를 로드
	        UserDetails updatedUserDetails = customUserDetailService.loadUserByUsername(username);
	        // 현재 사용자의 인증 정보를 업데이트된 UserDetails 객체로 교체
	        Authentication newAuthentication = new UsernamePasswordAuthenticationToken(updatedUserDetails, authentication.getCredentials(), updatedUserDetails.getAuthorities());
	        SecurityContextHolder.getContext().setAuthentication(newAuthentication);
	    }
	    
		return authentication;
	}

	// 아이디 찾기
	@RequestMapping(value = "find_id2", method = RequestMethod.POST)
	public String find_id(@RequestParam("name") String name, @RequestParam("email") String email, Model model)
			throws Exception {

		String result = memberservice.findId(name, email);

		if (result != null && !"".equals(result)) {
			model.addAttribute("result", "1");
			model.addAttribute("resultId", result.replaceAll("(?<=.{3}).", "*"));
		} else {
			model.addAttribute("result", "0");
		}

		return "/member/find";
	}

	// 비밀번호 찾기 (이메일 인증번호 발송)
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
    private SpringTemplateEngine templateEngine;

	@RequestMapping(value = "/find_pw", method = RequestMethod.POST)
	public String find_pw(HttpServletRequest request, @RequestParam("email") String email,
			@RequestParam("id") String id, Model model) throws Exception {

		MemberVO vo = memberservice.findPw(email, id);
		
		if (vo != null) {
			Random r = new Random();
			int num = r.nextInt(999999); // 랜덤난수설정
			
			HttpSession session = request.getSession();
			session.setAttribute("findMemberVo", vo);

			String setfrom = "wjddms49693@naver.com"; // 보내는 사람
			String tomail = "wjddms49693@naver.com"; // 받는 사람
			String title = "[모여라] 비밀번호변경 인증 이메일 입니다";

			try {
				MimeMessage message = mailSender.createMimeMessage();
				MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "utf-8");

 
 
				messageHelper.setFrom(setfrom);
				messageHelper.setTo(tomail);
				messageHelper.setSubject(title);
				
				//템플릿에 전달할 데이터 설정
		        Context context = new Context();
		 		context.setVariable("num", num);
		 		
		        //메일 내용 설정 : 템플릿 프로세스
		        String html = templateEngine.process("emailSend", context);
		 
				messageHelper.setText(html, true);

				mailSender.send(message);

			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
			model.addAttribute("num", num);
			model.addAttribute("result1", "1");
			return "/member/find_auth";
		} else {
			model.addAttribute("result1", "0");
			return "/member/find";
		}

	}

	// 비밀번호 변경 (비밀번호 찾기)
	@Autowired
	private PasswordEncoder newPwencoder;
	
	@RequestMapping(value = "/updatePw", method = RequestMethod.POST)
	public String updatePw(HttpSession session, @RequestParam("newPassword") String password) throws Exception {
		MemberVO vo1 = (MemberVO) session.getAttribute("findMemberVo");
		vo1.setPassword(newPwencoder.encode(password));
		memberservice.updatePw(vo1);

		return "/member/login";
	}
	
	
	// 회원정보확인 페이지
	@GetMapping("/mypage")
	public String moveMypage() {
		log.info("moveMypage...");
		return "/member/mypage";
	}
	
	// 회원정보확인 로그인 페이지
	@PostMapping("/mypageLogin")
	public String moveMypageLogin() {
		log.info("moveMypageLogin...");
		return "/member/mypageLogin";
	}
	
	// 회원 수정 페이지
	@PostMapping("/modifyForm")
	public String move(@RequestParam("password") String password, Authentication authentication, Model model, @RequestParam("deletechk") String deletechk) {
		log.info("moveModifyForm...");
		CustomUser customVo = (CustomUser)authentication.getPrincipal();
		MemberVO memberVo = customVo.getMember();
		
		boolean isPasswordMatch = newPwencoder.matches(password, memberVo.getPassword());

		
		log.info("isPasswordMatch : [" + isPasswordMatch + "]");
		if(isPasswordMatch) {
			if("Y".equals(deletechk)) {
				int result = memberservice.doLockAccount(memberVo);
				if( result > 0 ) {
					model.addAttribute("setText", "정상적으로 탈퇴처리가 되었습니다. 감사합니다.");
					model.addAttribute("PopCheck", 6);
					return "/member/registerAlert";
				}
			}
			return "/member/modifyForm";
		}else {
			model.addAttribute("isPasswordMatch", isPasswordMatch);
			return "/member/mypageLogin";
		}
	}
		
	//내정보 수정
	@RequestMapping(value = "/updateForm", method = RequestMethod.POST)
	public String modifyForm(MemberVO member) throws Exception {

		member.setPassword(pwencoder.encode(member.getPassword()));
		memberservice.updateMypage(member);
		
		return "redirect:/member/logout";
	}

	// 파트너 신청
	@RequestMapping(value = "/partnerApp", method = RequestMethod.POST)
	public String partnerApp(MemberVO vo) {
		log.info("partnerApp..." + vo);
		memberservice.partnerApp(vo);
		return "/partner/manage";
	}
	
	// 파트너 정보수정
	@RequestMapping(value = "/partnerModify", method = RequestMethod.POST)
	public String partnerModify(MemberVO vo) {
		log.info("partnerModify..." + vo);
		memberservice.partnerModify(vo);
		
		return "/partner/partnerinfo";
	}
	
	// SNS 로그인 팝업창
	@RequestMapping(value = "/member/registerAlert", method = RequestMethod.GET)
    public void kakao_call(Model model,@RequestParam(value ="type", required=false) String type) throws IOException {
		model.addAttribute("type",type);
    	log.warn("SNS 로그인 popup");
    }
	
	public void updatePrincipal() {
		//현재 사용자 정보
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
    	// 사용자 정보 업데이트 후 새로운 UserDetails 객체를 로드
        UserDetails updatedUserDetails = customUserDetailService.loadUserByUsername(username);
        // 현재 사용자의 인증 정보를 업데이트된 UserDetails 객체로 교체
        Authentication newAuthentication = new UsernamePasswordAuthenticationToken(updatedUserDetails, authentication.getCredentials(), updatedUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuthentication);
	}
	
	//마이포인트 페이지 이동
	@GetMapping("/myPoint")
	public void movemyPoint() {
		log.info("movemyPoint...");
	}
	
	
	// 탈퇴
	@ResponseBody
	@PostMapping(value="/deleteMemberCheck", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String deleteMemberCheck( Authentication authentication) {
		log.info("deleteMemberCheck...");
		String result = ""; // A,B 탈퇴 가능 / C 탈퇴 불가능
		CustomUser customVo = (CustomUser)authentication.getPrincipal();
		MemberVO memberVo = customVo.getMember();
		
		if("B".equals(memberVo.getLevel())) { //파티장
			int partyCnt = pService.getMyPartyTotal(memberVo.getM_idx());
			if(partyCnt > 0) {
				result = "C"; //파티장이면서 내가만든 파티가 있는 경우 
				return result;
			}
		}
		
		//파티장이든, 파티원이든 판단
		List<PartyBoardVO> partyList = pService.getParticipating(memberVo.getId());
		if(partyList.size() > 0) {
			result = "A"; //참여중인 파티가 존재
		}else {
			result = "B"; // 참여중인 파티가 미존재
		}
		
		
		return result;
	}
	
	//포인트 리스트
	@ResponseBody
	@PostMapping(value="/myPointList", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getMyPointList(@RequestBody Criteria cri, Authentication authentication) {
		
		CustomUser customVo = (CustomUser)authentication.getPrincipal();
		MemberVO memberVo = customVo.getMember();
		cri.setM_idx(memberVo.getM_idx());
		int total = memberservice.getPointTotal(cri);
		List<PointVO> list = memberservice.getPointList(cri);
		PageDTO pageMaker = new PageDTO(cri, total, list);
		return pageMaker;
	}	
}
