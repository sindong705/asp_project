package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PartyCommentVO;

public interface PartyReplyService {
	public int register(PartyCommentVO vo);
	public List<PartyCommentVO> getList(int p_idx);
	public int remove(int c_idx);
	public List<PartyCommentVO> getReplyList(Criteria cri);
	public PartyCommentVO getReply(int c_idx);
	public int getMyPartyReplyTotal(String comment_to);
}
