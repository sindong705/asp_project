package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FaqVO;
import org.prj.domain.PartyBoardVO;

public interface FaqService {
	// faq 등록
	public void register(FaqVO vo);
	// faq 사용자 목록
	public List<FaqVO> userList(String faq_type);
	// faq 개수
	public int getAdminFaqTotal(Criteria cri);
	// faq 관리자 목록
	public List<FaqVO> getAdminFaqList(Criteria cri);
	// faq 수정페이지
	public FaqVO getFaq(int f_idx);
	// faq 수정
	public void doAdminUpdateFaq(FaqVO vo);
	// faq 삭제
	public void doAdminRemoveFaq(int f_idx);
}
