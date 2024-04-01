package org.prj.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.prj.domain.Criteria;
import org.prj.domain.InquiryVO;

public interface InquiryMapper {
	
	// 1. 1:1문의 게시판 전체 리스트를 가지고 온다.
	public List<InquiryVO> getList(Criteria cri);
	
	// 2. 하단부 페이지 번호
	public int getTotal();
	
	// 3. 게시글 등록
	public void insert(InquiryVO vo);
	
	// 4. 데이터 조회
	public InquiryVO read(int i_idx);
	
	// 5. 게시글 수정
	public int update(InquiryVO vo);
	
	// 6. 게시글 삭제
	public int delete(int i_idx);
	
	// 마지막 idx 값	// 추가되는 내용 파일 업로드 부분에서 필요한 내용 idx을 가지고오기 위해서
	public int getIdx();
	
	// 8. 리스트 나오는 갯수
	public int getInquiryBoardTotal(Criteria cri);
	
	// 9. 관리자 1:1문의 불러 오는 내용
	public List<InquiryVO> inquiryboardList(Criteria cri);
	
	// 10. 관리자 1:1문의 댓글(모달창) 가지고 오기
	public InquiryVO getReply(int i_idx);
	
	// 11. 관리자 1:1 문의 상태 변경
	public void statusUpdate(InquiryVO vo);	
	
	// 12. 관리자 1:1문의 게시글 가지고 오기
	public InquiryVO getInquiry(int i_idx);
	
	// 13. 관리자 1:1문의 게시글 수정
	public int AdminInquiryUpdate(InquiryVO vo);
	
	public int getNewInquiry();
	
}
