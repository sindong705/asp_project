package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FaqVO;

public interface FaqMapper {
	// faq 등록
	public void insert(FaqVO vo);
	// faq 목록
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
