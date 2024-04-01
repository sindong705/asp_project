package org.prj.controller;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;
import org.prj.domain.MemberVO;
import org.prj.domain.PageDTO;
import org.prj.service.InquiryService;
import org.prj.service.MemberService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/inquiry_board/*")
public class InquiryController {
	
	@Autowired
	private InquiryService service;
	
	@Autowired
	private MemberService mservice;
	
	// 1:1 문의 화면 
	@GetMapping("/Inquirylist")
	public String list(Model model, Criteria cri) {		// 1:1문의 게시판 페이지 처리
		log.info("list...");
		
		// 현재 사용자 회원번호 가져오기
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    log.info("userDetails..." + username);
	    
	    int memberIdx = mservice.findMidx(username);
	    log.info("memberIdx..." + memberIdx);
	    
	    cri.setM_idx(memberIdx);
		
		if(cri.getPageNum() == 0 && cri.getAmount() == 0) {
			cri.setPageNum(1);	// 한개 페이지
			cri.setAmount(10);	// 한 페이지에 10개가 나오게
		}
		
		model.addAttribute("list", service.getList(cri));	// model.addAllAttributes 파일은 담아서 보내는 것
		
		// 1. 게시글 전체 개수를 가지고 온다.
		int total = service.getTotal();
		log.info("total..." + total);
		// 2. pageDTO 객체 list 화면으로 전달
		model.addAttribute("pageMaker", new PageDTO(cri, total));
		
		return "/inquiry_board/Inquirylist";
	}
	
	// 1:1문의 게시글 등록 화면으로 이동
	@GetMapping("/Inquiryregister") 
	public String moveRegister() {
		return "/inquiry_board/Inquiryregister";
	}
	
	// 1:1문의 게시글 작성 
	@PostMapping("/Inquiryregister")
	public String register(InquiryVO vo, RedirectAttributes rttr) {
		log.info("register..." + vo);
		
		if (vo.getAttachList() != null) {
			vo.getAttachList().forEach(attach -> log.info(attach));
		}
		
		service.register(vo);
		rttr.addFlashAttribute("result", "success");
		return "redirect:/inquiry_board/Inquirylist";
	}
	
	// 1:1문의 게시글을 누르고 들어가면 세부사항이 나오는 화면
	@GetMapping("/Inquiryget")
	public String get(Model model, @RequestParam("i_idx") int i_idx) {
		log.info("get..." + i_idx);
		model.addAttribute("vo", service.get(i_idx));
		return "/inquiry_board/Inquiryget";
	}
	
	// 1:1문의 수정 : 페이지 이동 + 화면
	@GetMapping("/Inquirymodify")
	public String moveModify(Model model, @RequestParam("i_idx") int i_idx) {
		log.info("get..." + i_idx);
		model.addAttribute("vo", service.get(i_idx));
		return "/inquiry_board/Inquirymodify";
	}
	
	// 1:1문의 수정 
	@PostMapping("/Inquirymodify")
	public String modify(InquiryVO vo, RedirectAttributes rttr) {
		log.info("modify..." + vo);
		
		List<FileInfoVO> attachList = service.getAttachList(vo.getI_idx());
		if (service.modify(vo)){
			deleteFiles(attachList);
		}
		
		return "redirect:/inquiry_board/Inquirylist";
	}
	
	// 1:1문의 게시글 삭제
	@PostMapping("/Inquiryremove")
	public String remove(@RequestParam("i_idx") int i_idx, RedirectAttributes rttr) {
		log.info("remove...." + i_idx);
		
		List<FileInfoVO> attachList = service.getAttachList(i_idx);
		
		if(service.remove(i_idx)) {
			deleteFiles(attachList);
			rttr.addFlashAttribute("result", "success");
		}; 
		
		return "redirect:/inquiry_board/Inquirylist";
	}
	
	// 파일 업로드 불러오기 위해 사용
	@ResponseBody
	@GetMapping(value = "/getAttachList/{i_idx}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
	public ResponseEntity<List<FileInfoVO>> getAttachList(
		@PathVariable("i_idx") int i_idx
		){
		log.info("getAttachList..." + i_idx);
		
		return new ResponseEntity<List<FileInfoVO>>(service.getAttachList(i_idx), HttpStatus.OK);
	}
	
	// 파일 삭제 메소드 
	public void deleteFiles(List<FileInfoVO> attachList) {
		if(attachList == null || attachList.size() == 0) {
			return;}
		log.info(attachList);
		
		attachList.forEach(attach ->{
			try{
				File file = null;
				String fileName = attach.getUploadPath() + "\\" + attach.getUuid() + "_" + attach.getFileName();
				file = new File("C:\\upload\\", URLDecoder.decode(fileName, "utf-8"));
				file.delete();
			} catch(Exception e) {
				e.printStackTrace();
			}
		});
	}
	
	
}
