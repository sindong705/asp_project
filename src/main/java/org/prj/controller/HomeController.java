package org.prj.controller;

import java.util.Locale;

import org.prj.service.PartyBoardService;
import org.prj.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class HomeController {
	
	@Autowired 
	private PartyBoardService pService;
	
	@Autowired 
	private VideoService vService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		//처음 실행 시 마감된 파티 status 변경
		int updatePartyNum = pService.partyStatusUpdate();
		log.info("updatePartyStatus..." + updatePartyNum);
		
		//추천영상 조회
		model.addAttribute("video", vService.mainAllVideos());
		
		//파티 조회
		model.addAttribute("party", pService.mainAllParty());
		return "index";
	}
}
