package org.prj.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.prj.domain.MemberVO;
import org.prj.security.CustomUserDetailService;
import org.prj.security.domain.CustomUser;
import org.prj.service.MemberService;
import org.prj.service.NaverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
public class NaverController {
	// 네이버 API 예제 - 회원프로필 조회
    private NaverService naverService;
    private MemberService memberService;	
       
    @Autowired
    private CustomUserDetailService customUserDetailService;

    @RequestMapping(value = "/naver_callback", method = RequestMethod.GET)
    public String redirectnaver(Model model, @RequestParam String code, HttpSession session, @RequestParam String state) throws IOException {
        System.out.println("code:: " + code);

        // 접속토큰 get
        String naverToken = naverService.getReturnAccessToken(code, state);

        // 접속자 정보 get
        Map<String, Object> result = naverService.getUserInfo(naverToken);
        log.info("result:: " + result);
        String naverid = (String) result.get("id");
        
        // 일치하는 snsId 없을 시 회원가입
        if (memberService.naverIdck(naverid) == 0) {
        	MemberVO memVo = new MemberVO();
        	memVo.setNaverid(naverid);
        	memVo.setToken(naverToken);
        	session.setAttribute("joinMemVo", memVo);
            log.warn("네이버로 회원가입");
            model.addAttribute("PopCheck", 1);
            return "/member/registerAlert";
        }else {
        	model.addAttribute("setText", "이미 존재하는 SNS 계정입니다.");
        	model.addAttribute("PopCheck", 3);
        	return "/member/registerAlert";
        }

    }
    @RequestMapping(value = "/naver_login", method = RequestMethod.GET)
    public String donaverLogin(Model model, @RequestParam String code, HttpSession session, @RequestParam String state) throws IOException {
        System.out.println("code:: " + code);
        
        // 접속토큰 get
        String naverToken = naverService.getReturnAccessToken(code, state);

        // 접속자 정보 get
        Map<String, Object> result = naverService.getUserInfo(naverToken);
        log.info("result:: " + result);
        String naverid = (String) result.get("id");
        
        MemberVO membervo = memberService.naverRead(naverid);
		System.out.println(membervo);
		
		if (membervo == null){ 
//			model.addAttribute("setText", "SNS계정이 존재하지 않습니다. 다시 확인해주세요.");
//			return "/member/registerAlert";
			MemberVO memVo = new MemberVO();
        	memVo.setNaverid(naverid);
        	memVo.setToken(naverToken);
        	session.setAttribute("joinMemVo", memVo);
            log.warn("네이버로 회원가입");
			model.addAttribute("PopCheck", 1);
			return "/member/registerAlert";
			
		}else{
			UserDetails userDetails = customUserDetailService.loadUserByUsername(membervo.getId()); 
			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
			
			// SecurityContextHolder에 Authentication 객체를 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			session.setAttribute("loginType", "naver");
			session.setAttribute("naverid", naverid);
			model.addAttribute("PopCheck", 2);
			return "/member/registerAlert"; 
		}
    }
    // 네이버 계정 연결
    @RequestMapping(value = "/naver_update", method = RequestMethod.GET)
    public String doNaverStateUpdate(Model model, @RequestParam String code, HttpSession session, @RequestParam String state) throws IOException {
        System.out.println("code:: " + code);
        
        // 접속토큰 get
        String naverToken = naverService.getReturnAccessToken(code, state);

        // 접속자 정보 get
        Map<String, Object> result = naverService.getUserInfo(naverToken);
        log.info("result:: " + result);
        String naverid = (String) result.get("id");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = (CustomUser)authentication.getPrincipal();
        MemberVO memberVo = customUser.getMember();
        memberVo.setNaverid(naverid);
        
        memberService.naver_update(memberVo);
        
        model.addAttribute("PopCheck", 5);
		return "/member/registerAlert"; 
    }
     
    // 네이버 계정 연결 끊기
    @RequestMapping(value = "/naver_delete", method = RequestMethod.GET)
    public String doNaverStateDelete(Model model, HttpSession session) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = (CustomUser)authentication.getPrincipal();
        MemberVO memberVo = customUser.getMember();
        memberVo.setNaverid("");
        
        memberService.naver_update(memberVo);
        
		return "/member/registerAlert"; 
    }
    
    // 로그아웃
    @RequestMapping(value = "/naver_logout", method = RequestMethod.GET)
    public String doNaverLogout(Model model, HttpSession session) throws IOException {
        log.info("로그아웃");
        
        return "redirect:/";
    }    
    
    
}