package org.prj.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.prj.domain.MemberVO;
import org.prj.security.CustomUserDetailService;
import org.prj.security.domain.CustomUser;
import org.prj.service.KakaoService;
import org.prj.service.MemberService;

@Controller
@Log4j
@AllArgsConstructor
public class KakaoController {
    private KakaoService kakaoService;
    private MemberService memberService;
    
    @Autowired
    private CustomUserDetailService customUserDetailService;

    @RequestMapping(value = "/kakao_callback", method = RequestMethod.GET)
    public String redirectkakao(Model model, @RequestParam String code, HttpSession session) throws IOException {
        System.out.println("code:: " + code);

        // 접속토큰 get
        String kakaoToken = kakaoService.getReturnAccessToken(code);

        // 접속자 정보 get
        Map<String, Object> result = kakaoService.getUserInfo(kakaoToken);
        log.info("result:: " + result);
        String kakaoid = (String) result.get("id");
        
        // 일치하는 snsId 없을 시 회원가입
        if (memberService.kakaoIdck(kakaoid) == 0) {
        	MemberVO memVo = new MemberVO();
        	memVo.setKakaoid(kakaoid);
        	memVo.setToken(kakaoToken);
        	session.setAttribute("joinMemVo", memVo);
            log.warn("카카오로 회원가입");
            model.addAttribute("PopCheck", 1);
            return "/member/registerAlert";
        }else {
        	model.addAttribute("setText", "이미 존재하는 SNS 계정입니다.");
        	model.addAttribute("PopCheck", 3);
        	return "/member/registerAlert";
        }

    }
    @RequestMapping(value = "/kakao_login", method = RequestMethod.GET)
    public String doKakaoLogin(Model model, @RequestParam String code, HttpSession session) throws IOException {
        System.out.println("code:: " + code);
        
        // 접속토큰 get
        String kakaoToken = kakaoService.getReturnAccessToken(code);

        // 접속자 정보 get
        Map<String, Object> result = kakaoService.getUserInfo(kakaoToken);
        log.info("result:: " + result);
        String kakaoid = (String) result.get("id");
        
        MemberVO membervo = memberService.kakaoRead(kakaoid);
		System.out.println(membervo);
		
		if (membervo == null){ 
			MemberVO memVo = new MemberVO();
        	memVo.setKakaoid(kakaoid);
        	memVo.setToken(kakaoToken);
        	session.setAttribute("joinMemVo", memVo);
            log.warn("카카오로 회원가입");
			model.addAttribute("PopCheck", 1);
			return "/member/registerAlert";
			
		}else{
			UserDetails userDetails = customUserDetailService.loadUserByUsername(membervo.getId()); 
			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
			
			// SecurityContextHolder에 Authentication 객체를 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			session.setAttribute("loginType", "kakao");
			session.setAttribute("kakaoid", kakaoid);
			model.addAttribute("PopCheck", 2);
			return "/member/registerAlert"; 
		}
    }
    
    // 카카오 계정 연결
    @RequestMapping(value = "/kakao_update", method = RequestMethod.GET)
    public String doKakaoStateUpdate(Model model, @RequestParam String code, HttpSession session) throws IOException {
        System.out.println("code:: " + code);
        
        // 접속토큰 get
        String kakaoToken = kakaoService.getReturnAccessToken(code);

        // 접속자 정보 get
        Map<String, Object> result = kakaoService.getUserInfo(kakaoToken);
        log.info("result:: " + result);
        String kakaoid = (String) result.get("id");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = (CustomUser)authentication.getPrincipal();
        MemberVO memberVo = customUser.getMember();
        memberVo.setKakaoid(kakaoid);
        
        memberService.kakao_update(memberVo);
        
        model.addAttribute("PopCheck", 5);
		return "/member/registerAlert"; 
    }

    // 카카오 계정 연결끊기
    @RequestMapping(value = "/kakao_delete", method = RequestMethod.GET)
    public String doKakaoStateDelete(Model model, HttpSession session) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = (CustomUser)authentication.getPrincipal();
        MemberVO memberVo = customUser.getMember();
        memberVo.setKakaoid("");
        
        memberService.kakao_update(memberVo);
        
		return "/member/registerAlert"; 
    }
    // 로그아웃
    @RequestMapping(value = "/kakao_logout", method = RequestMethod.GET)
    public String doKakaoLogout(Model model, HttpSession session) throws IOException {
        log.info("로그아웃");
        
        return "redirect:/";
    }

}