package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;

public interface InquiryService {

	// 1. 1:1문의 게시판 전체 리스트
	public List<InquiryVO> getList(Criteria cri);
	
	// 2. 하단부 페이지 번호
	public int getTotal();
	
	// 3. 게시글 등록
	public void register(InquiryVO vo);
	
	// 4. 데이터 조회
	public InquiryVO get(int i_idx);
	
	// 5. 게시글 수정
	public boolean modify(InquiryVO vo);
	
	// 6. 게시글 삭제
	public boolean remove(int i_idx);
	
	// 7. 첨부 파일 리스트를 가지고 오는 것
	public List<FileInfoVO> getAttachList(int i_idx);
	
	// 8. 리스트 나오는 갯수
	public int getInquiryBoardTotal(Criteria cri);
	
	// 9. 관리자 1:1문의 불러 오는 내용
	public List<InquiryVO> inquiryboardList(Criteria cri);
	
	// 10. 관리자 1:1문의 댓글 가지고 오기
	public InquiryVO getReply(int i_idx);
	
	// 11. 관리자 1:1문의 상태 변경
	public void statusUpdate(InquiryVO vo);
	
	// 12. 관리자 1:1문의 게시글 가지고 오기
	public InquiryVO getInquiry(int i_idx);
	
	// 13. 관리자 1:1문의 게시글 수정
	public boolean AdminInquiryUpdate(InquiryVO vo);
	
	// 14. 첨부파일 수정부분에서 삭제
	public void delete(String uuid);
	
	// 새 문의글 개수(status가 A인것)
	public int getNewInquiry();
}
