package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PartyCommentVO;
import org.prj.mapper.PartyReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartyReplyServiceImpl implements PartyReplyService{
	
	@Autowired
	private PartyReplyMapper prmapper;
	
	@Override
	public int register(PartyCommentVO vo) {
		return prmapper.insert(vo);
	}

	@Override
	public List<PartyCommentVO> getList(int p_idx) {
		return prmapper.getList(p_idx);
	}

	@Override
	public int remove(int c_idx) {
		return prmapper.delete(c_idx);
	}

	@Override
	public List<PartyCommentVO> getReplyList(Criteria cri) {
		return prmapper.getReplyList(cri);
	}

	@Override
	public PartyCommentVO getReply(int c_idx) {
		return prmapper.getReply(c_idx);
	}

	@Override
	public int getMyPartyReplyTotal(String comment_to) {
		return prmapper.getMyPartyReplyTotal(comment_to);
	}
	
	
}
