package org.prj.service;

import java.util.List;

import org.prj.domain.InquiryCommentVO;
import org.prj.mapper.InquiryMapper;
import org.prj.mapper.InquiryReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class InquiryReplyServiceImpl implements InquiryReplyService {
	
	@Autowired
	private InquiryReplyMapper mapper;
	
	@Autowired
	private InquiryMapper inquiryMapper;

	// 1. 댓글 등록
	@Transactional
	@Override
	public int register(InquiryCommentVO vo) {
		log.info("register : " + vo);	
		return mapper.insert(vo);
	}
	
	// 2. 댓글 목록
	@Override
	public List<InquiryCommentVO> getList(int i_idx) {
		log.info("getList..." + i_idx);
		return mapper.getList(i_idx);
	}

	// 3. 댓글 읽기(조회)
	@Override
	public InquiryCommentVO get(int c_idx) {
		log.info("get..." + c_idx);
		return mapper.read(c_idx);
	}

	// 4. 댓글 수정
	@Override
	public int modify(InquiryCommentVO vo) {
		log.info("modify..." + vo);
		return mapper.update(vo);
	}

	// 5. 댓글 삭제
	@Override
	public int remove(int c_idx) {
		log.info("remove..." + c_idx);
		
		InquiryCommentVO vo = mapper.read(c_idx);
		
		return mapper.delete(c_idx);
	}
	
	
	
	
}
