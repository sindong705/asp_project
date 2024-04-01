package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PartyCommentVO;

public interface PartyReplyMapper {
	public int insert(PartyCommentVO vo);
	public List<PartyCommentVO> getList(int p_idx);
	public int delete(int c_idx);
	public List<PartyCommentVO> getReplyList(Criteria cri);
	public PartyCommentVO getReply(int c_idx);
	public int getMyPartyReplyTotal(String comment_to);
	public void deleteParty(int p_idx);
}
