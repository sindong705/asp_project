package org.prj.service;

import java.util.List;

import org.prj.domain.InquiryCommentVO;


public interface InquiryReplyService {
	// 1. 댓글 등록
	public int register(InquiryCommentVO vo);
	
	// 2. 댓글 목록
	public List<InquiryCommentVO> getList(int i_idx);
	
	// 3. 댓글 읽기(조회)
	public InquiryCommentVO get(int c_idx);
	
	// 4. 댓글 수정
	public int modify(InquiryCommentVO vo);
	
	// 5. 댓글 삭제
	public int remove(int c_idx);

}
