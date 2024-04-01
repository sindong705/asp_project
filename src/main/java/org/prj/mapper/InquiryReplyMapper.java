package org.prj.mapper;

import java.util.List;

import org.prj.domain.InquiryCommentVO;

public interface InquiryReplyMapper {
	
	// 1.댓글 등록
	public int insert(InquiryCommentVO vo);
	
	// 2.댓글 목록
	public List<InquiryCommentVO> getList(int i_idx);
	
	// 3. 댓글 읽기(조회)
	public InquiryCommentVO read(int c_idx);
	
	// 4. 댓글 삭제
	public int delete(int c_idx);
	
	// 5. 댓글 수정
	public int update(InquiryCommentVO vo);
	
	// 6. 관리자에서 댓글 삭제
	public int allDelete(int i_idx);
	
}
