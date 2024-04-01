package org.prj.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.prj.controller.AdminController;
import org.prj.domain.CategoryVO;
import org.prj.domain.Criteria;
import org.prj.domain.FaqVO;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;
import org.prj.domain.MemberVO;
import org.prj.domain.PageDTO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PointVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.RefundVO;
import org.prj.domain.VideoVO;
import org.prj.service.CategoryService;
import org.prj.service.FaqService;
import org.prj.service.InquiryService;
import org.prj.service.MemberService;
import org.prj.service.PartyBoardService;
import org.prj.service.PointService;
import org.prj.service.PaymentService;
import org.prj.service.RefundService;
import org.prj.service.VideoService;
import org.prj.domain.WithdrawVO;
import org.prj.service.WithdrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/admin/*")
public class AdminController {
	
	@Autowired
	private FaqService fService;
	
	@Autowired
	private VideoService vService;
	
	@Autowired
	private CategoryService cService;
	
	@Autowired 
	private PartyBoardService pService;
 
	// 출금 관리
	@Autowired
	private WithdrawService wService;
	
	// 1:1문의
	@Autowired
	private InquiryService iService;

	@Autowired 
	private PointService poService;

	@Autowired
	private PaymentService payService;
	
	@Autowired
	private MemberService mService;
	
	@Autowired
	private RefundService rService;
	
	//관리자홈
	@GetMapping("/home")
	public String moveHome() {
		log.info("moveHome...");
		return "/admin/home";
	}
	
	//FAQ 등록
	@GetMapping("/faq/register")
	public String moveFaqregister() {
		log.info("movefaqregister...");
		return "/faq/register";
	}
	
	@PostMapping("/faq/register")
	public String register(FaqVO vo, RedirectAttributes rttr) {
		log.info("register..." + vo);
		fService.register(vo);
		return "redirect:/admin/faq/faqlist";
	}
	
	//FAQ 리스트
	@GetMapping("/faq/faqlist")
	public String moveFaqList() {
		log.info("moveFaqlist...");
		return "/faq/faqlist";
	}
	
	@ResponseBody
	@PostMapping(value="/faq/faqlist", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getFaqList(@RequestBody Criteria cri) {
		int total = fService.getAdminFaqTotal(cri);
		List<FaqVO> list = fService.getAdminFaqList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//FAQ 수정
	@GetMapping("/faq/modify")
	public String moveFaqModify(@RequestParam("fn") int f_idx, Model model){
		log.info("moveFaqModify..." + f_idx);
		model.addAttribute("vo", fService.getFaq(f_idx));
		return "/faq/modify";
	}
	
	@PostMapping("/faq/modify")
	public String doAdminModifyFaq(FaqVO vo) {
		log.info("doAdminModifyFaq..." + vo);
		fService.doAdminUpdateFaq(vo);
		return "redirect:/admin/faq/faqlist";
	}
	
	//FAQ 삭제
	@GetMapping("/faq/remove")
	public String doAdminRemoveFaq(@RequestParam("fn") int f_idx) {
		log.info("doAdminRemoveFaq..." + f_idx);
		fService.doAdminRemoveFaq(f_idx);
		return "redirect:/admin/faq/faqlist";
	}
	
	//추천영상
	@GetMapping("/videoList")
	public String moveVideoList() {
		log.info("moveVideoList...");
		return "/admin/videoList";
	}
	
	//추천영상 불러오기
	@ResponseBody
	@GetMapping(value = "/videoListload", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<VideoVO> videoListload( @RequestParam("page") int page) {
		log.info("videoListload...");
		Criteria cri = new Criteria();
		List<VideoVO> list = null;
		
		cri.setPageNum(page);
		list = vService.getAllVideos(cri);
		return list;
	}
	
	//추천영상 등록
	@ResponseBody
	@GetMapping(value = "/videoSave/{channelId}/{channel}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int videoSave(@PathVariable("channelId") String channelId, @PathVariable("channel") String channel) throws IOException {
		log.info("videoSave...");
		log.info("channelId..." + channelId);
		log.info("channel..." + channel);
		VideoVO vo = new VideoVO();
		vo.setChannel(channel);
		vo.setChannelid(channelId);
		log.info("vo..." + vo);
		return vService.videoSave(vo);
	}
	
	//추천영상 삭제
	@ResponseBody
	@GetMapping(value = "/videoDelete/{channel}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int videoDelete(@PathVariable("channel") String channel) throws IOException {
		log.info("videoDelete...");
		log.info("channel..." + channel);
		return vService.videoDelete(channel);
	}

	// 환불 관리
	@GetMapping("/refund")
	public String moveRefund() {
		log.info("moveRefund...");
		return "/admin/refund";
	}
	
	//환불 관리
	@ResponseBody
	@PostMapping(value="/refund", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getRefundList(@RequestBody Criteria cri) {
		int total = rService.getRefundTotal(cri);
		List<RefundVO> list = rService.getRefundList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//환불 승인
	@ResponseBody
	@PostMapping(value="/refundapproval", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doRefundApproval(@RequestBody RefundVO vo) {
		int result = rService.doRefundApproval(vo);
		return result > 0 ? "success" : "fail";
	}
	
	//환불 반려
	@ResponseBody
	@PostMapping(value="/refundreturn", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doRefundReturn(@RequestBody RefundVO vo) {
		int result = rService.doRefundReturn(vo);
		return result > 0 ? "success" : "fail";
	}
	
	// 출금 관리(화면 이동)
	@GetMapping("/withdraw")
	public String moveWithdraw() {
		log.info("Withdraw...");
		return "/admin/withdraw";
	}
	
	// 출금관리 리스트
	@ResponseBody
	@PostMapping(value="/withdrawList", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO withdrawList(@RequestBody Criteria cri) {
		log.info("withdrawList...");
		log.info("cri..." + cri);
		
		int total = wService.getWithdrawTotal(cri);
		List<WithdrawVO> list = wService.withdrawList(cri);
		
		PageDTO pageMaker = new PageDTO(cri, total, list);
		return pageMaker;
	} 
	
	// 출금관리 승인, DB with_status A(신청) -> B(승인)으로 변경
	@ResponseBody
	@PostMapping(value = "/modifyWithdraw", produces = MediaType.TEXT_PLAIN_VALUE)
	public String modifyWithdraw(@RequestBody int w_idx) {
	    log.info("modifyWithdraw... :" + w_idx);

	    if (wService.modifyWithdraw(w_idx)) {
	        return "success";
	    }else {
	    	return "fail";
	    }
	}
	
	// 출금관리 반려, DB with_status A -> C(반려)로 변경(불확실한 상황의 경우 반려 할 수 있다.)
	@ResponseBody
	@PostMapping(value = "/modifyWithdraw2", produces = MediaType.TEXT_PLAIN_VALUE)
	public String modifyWithdraw2(@RequestBody int w_idx) {
	    log.info("modifyWithdraw... :" + w_idx);

	    if (wService.modifyWithdraw2(w_idx)) {
	        return "success";
	    }else {
	    	return "fail";
	    }
	}

	//파티 관리
	@GetMapping("/party")
	public void moveParty() {
		log.info("party...");
	}
	
	//카테고리 리스트 - admin select box
	@ResponseBody
	@GetMapping(value="/allcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getAllCategory(){
		return cService.getAllCategory();
	}
	
	//파티관리 리스트
	@ResponseBody
	@PostMapping(value="/party", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getPartyList(@RequestBody Criteria cri) {
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
		
		int total = pService.getAdminPartyTotal(cri);
		List<PartyBoardVO> list = pService.getAdminPartyList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//파티 수정
	//파티수정 페이지
	@GetMapping("/partymodify")
	public void movePartyModify(@RequestParam("pn") int p_idx, Model model){
		log.info("movePartyModify..." + p_idx);
		model.addAttribute("vo", pService.getParty(p_idx));
	}
	
	//파티수정 페이지의 2차 카테고리
	@ResponseBody
	@PostMapping(value = "/category", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getCategory(@RequestBody int codeone) {
		return cService.getSecondCategory(codeone);
	}
	
	//파티 수정
	@PostMapping("/partymodify")
	public String doAdminModifyParty(PartyBoardVO vo) {
		log.info("doAdminModifyParty..." + vo);
		pService.doAdminUpdateParty(vo);
		return "redirect:/admin/party";
	}
	
	//파티 삭제
	@GetMapping("/removeparty")
	public String removeParty(@RequestParam("pn") int p_idx) {
		pService.deleteParty(p_idx);
		return "/admin/party";
	}
	
	//파티 마감
	@ResponseBody
	@GetMapping(value="/partyclose", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doPartyclose(@RequestParam("pn") int p_idx){
		log.info("doPartyclose..." + p_idx);
		if(pService.doPartyclose(p_idx) > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	//파티 재오픈
	@ResponseBody
	@GetMapping(value="/partyopen", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doPartyOpen(@RequestParam("pn") int p_idx){
		log.info("doPartyOpen..." + p_idx);
		if(pService.doPartyOpen(p_idx) > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	//카테고리 관리
	@GetMapping("/category")
	public void moveCategory() {
		log.info("moveCategory...");
	}
	
	//카테고리 관리 - 리스트 
	@ResponseBody
	@PostMapping(value="/allsecondcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getAdminCategory(@RequestBody int codeone){
		return cService.getAllSecondCategory(codeone);
	}
	
	//카테고리 중복 확인
	@ResponseBody
	@PostMapping(value="/checkcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int checkCategory(@RequestBody CategoryVO vo) {
		return cService.checkCategory(vo);
	}
	
	//카테고리 추가
	@ResponseBody
	@PostMapping(value="/addcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int addCategory(@RequestBody CategoryVO vo) {
		return cService.addCategory(vo);
	}
	
	//카테고리 활성화, 비활성화
	@ResponseBody
	@PostMapping(value="/categorystatus", produces = MediaType.TEXT_PLAIN_VALUE)
	public String changeCategoryStatus(@RequestBody CategoryVO vo) {
		return cService.changeCategoryStatus(vo) > 0 ? "success" : "fail";
	}
	
	// 1:1문의 = 관리자 화면에서 1:1문으로 이동 
	@GetMapping("/admin_inquiry_board")
	public String admin_inquiry_board() {
		log.info("admin_inquiry_board...");
		return "/admin/admin_inquiry_board";
	}
	
	// 1:1문의 리스트 = 리스트를 불러온다.
	@ResponseBody
	@PostMapping(value="/inquiryboardList", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO inquiryboardList(@RequestBody Criteria cri) {
		log.info("inquiryboardList...");
		log.info("cri..." + cri);
		
		int total = iService.getInquiryBoardTotal(cri);
		List<InquiryVO> list = iService.inquiryboardList(cri);
		
		PageDTO pageMaker = new PageDTO(cri, total, list);
		return pageMaker;
	}
	
	// 관리자 측면에서 1:1 문의 댓글(모달창) 으로 내용을 가지고 오고 댓글을 달아 줄수 있게 준비
	@ResponseBody
	@GetMapping(value = "/page/{i_idx}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public InquiryVO getReply(@PathVariable("i_idx") int i_idx) {
		log.info("getReply..." + i_idx);
		
		return iService.getReply(i_idx);
	}
	
	// 1:1 문의 게시글 삭제
	@ResponseBody
	@PostMapping(value="/Inquiryremove", produces = MediaType.TEXT_PLAIN_VALUE)
	public String remove(@RequestBody int i_idx) {
	    log.info("remove...." + i_idx);
	    
	    boolean result = iService.remove(i_idx);
	    
    	List<FileInfoVO> attachList = iService.getAttachList(i_idx);
	    
		if(result) {
			deleteFiles(attachList);
		}; 
	    
	    return result ? "success" : "fail";
	}
	
	// 1:1 문의 파일 삭제 메소드
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
	
	
	
	// 1:1 문의 게시글 수정 페이지로 이동
	@GetMapping("/inquirymodify")
	public void inquiryModify(@RequestParam("pn") int i_idx, Model model){
		log.info("inquiryModify..." + i_idx);
		model.addAttribute("vo", iService.getInquiry(i_idx));
	}
	
	// 1:1 문의 게시글 수정
	@PostMapping("/admininquirymodify")
	public String AdminInquiryModify(InquiryVO vo) {
		log.info("AdminInquiryModify..." + vo);
		iService.AdminInquiryUpdate(vo);
		return "redirect:/admin/admin_inquiry_board";
	}
	
	//포인트 관리 페이지 이동
	@GetMapping("/point")
	public void movePoint() {
		log.info("movePoint...");
	}
	
	//포인트 적립
	@ResponseBody
	@Transactional
	@PostMapping(value="/pointInsert", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int setpointInsert(@RequestBody PointVO pointvo) {
		
		int result = poService.pointInsert(pointvo);
		
		//member table update 
		if(result == 1) {
			result= mService.updateMyPoint(pointvo);
		}
		
		return result;
	}	
	//포인트 리스트
	@ResponseBody
	@PostMapping(value="/pointList", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getpointList(@RequestBody Criteria cri) {
		
		int total = poService.getPointTotal(cri);
		List<PointVO> list = poService.getPointList(cri);
		
		PageDTO pageMaker = new PageDTO(cri, total, list);
		return pageMaker;
	}	
	//최종 포인트 조회
	@ResponseBody
	@PostMapping(value="/pointSearch", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PointVO getpointDetail(@RequestBody String id) {
		
		PointVO result = poService.pointSearch(id);

		return result;
	}	
	//포인트 관리 이동
	@GetMapping("/pointSetting")
	public void movepointSetting() {
		log.info("movepointSetting...");
	}

	//회원관리
	@GetMapping("/member")
	public void moveMember() {
		log.info("moveMember...");
	}
	
	//회원관리 리스트
	@ResponseBody
	@PostMapping(value="/member", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getMemberList(@RequestBody Criteria cri) {
		int total = mService.getMemberTotal(cri);
		List<MemberVO> list = mService.getAdminMemberList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//회원 수정
	//회원수정 페이지
	@GetMapping("/membermodify")
	public void moveMemberModify(@RequestParam("mn") int m_idx, Model model){
		log.info("moveMemberModify..." + m_idx);
		model.addAttribute("vo", mService.getMember(m_idx));
	}
	
	//회원 수정
	@PostMapping("/membermodify")
	public void doMemberModify(MemberVO mvo, Model model) {
		System.out.println("mvo : " + mvo);
		mService.doMemberModify(mvo);
		moveMemberModify(mvo.getM_idx(), model);
	}
	
	//계정 활성화 비활성화
	@ResponseBody
	@PostMapping(value="/lockaccount", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String doLockAccount(@RequestBody MemberVO vo) {
		return mService.doLockAccount(vo) > 0 ? "success" : "fail";
	}
	
	//sns 연동 해지
	//네이버 해지
	@ResponseBody
	@PostMapping(value="/naverdelete", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String doNaveridDelete(@RequestBody int m_idx) {
		int result = mService.doNaveridDelete(m_idx);
		return result > 0 ? "success" : "fail";
	}
	
	//카카오 해지
	@ResponseBody
	@PostMapping(value="/kakaodelete", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String doKakaoidDelete(@RequestBody int m_idx) {
		int result = mService.doKakaoidDelete(m_idx);
		return result > 0 ? "success" : "fail";
	}
	
	//파티 생성 비율
	@ResponseBody
	@GetMapping(value="/partyratio", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PartyBoardVO> getPartyRatio(){
		return pService.getPartyRatio();
	}
	
	//월별 이용자 결제 총액
	@ResponseBody
	@GetMapping(value="/totalpayment", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PaymentVO> getTotalPayment(){
		return payService.getTotalPayment();
	}
	
	//총 회원 수
	@ResponseBody
	@GetMapping(value="/totaluser", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getTotalUser(){
		return mService.getTotalUser();
	}
	
	//연간 결제 총액
	@ResponseBody
	@GetMapping(value="/totalearning", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getTotalEarning(){
		return payService.getTotalEarning();
	}
	
	//새 환불신청 수
	@ResponseBody
	@GetMapping(value="/newrefund", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getNewRefund(){
		return rService.getNewRefund();
	}
	
	//새 출금신청 수
	@ResponseBody
	@GetMapping(value="/newwithdraw", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getNewWithdraw(){
		return wService.getNewWithdraw();
	}
	
	//새 문의글 수
	@ResponseBody
	@GetMapping(value="/newinquiry", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getNewInquiry(){
		return iService.getNewInquiry();
	}
	
	//결제관리
	@GetMapping("/paymentdetail")
	public void movePaymentDetail() {
		log.info("movePaymentDetail...");
	}
	
	//결제관리 리스트
	@ResponseBody
	@PostMapping(value="/paymentdetail", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getPaymentList(@RequestBody Criteria cri) {
		log.info("getPaymentList..." + cri);
		
		int total = payService.getAdminPaymentTotal(cri);
		List<PaymentVO> list = payService.getAdminPaymentList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//관리자 결제 상세 내역
	@GetMapping("/paymentview")
	public void movePaymentview(String order_no, Model model) {
		log.info("movePaymentview...");
		log.info("get..." + order_no);
		model.addAttribute("vo", payService.orderGet(order_no));
	}
	
	//유저 닉네임 조회
	@ResponseBody
	@PostMapping(value = "/usernickname", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String getUserNick(@RequestBody String id) {
		return mService.getUserNick(id);
	}
	
	//유저 아이디 조회
	@ResponseBody
	@PostMapping(value = "/inquiryuserid", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String getUserID(@RequestBody String nickname) {
		return mService.getUserID(nickname);
	}
}
