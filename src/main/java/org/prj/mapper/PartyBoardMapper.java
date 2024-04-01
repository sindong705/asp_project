package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.RefundVO;

public interface PartyBoardMapper {
	public void registerParty(PartyBoardVO vo);
	public int getManageSearchTotal(Criteria cri);
	public List<PartyBoardVO> getManageSearchList(Criteria cri);
	public PartyBoardVO getParty(int p_idx);
	public void updateParty(PartyBoardVO vo);
	public List<PartyBoardVO> getListbycategory(Criteria cri);
	public List<PartyBoardVO> getListbycategory2(Criteria cri);
	public PartyBoardVO getDetailParty(int p_idx);
	public void updateCurrNum(int p_idx);
	public void cancleUpdateCurrNum(int p_idx);
	public List<MemberVO> getPaymentMemberList(int p_idx);
	public List<PartyBoardVO> getParticipating(String id);
	public int partyStatusUpdate();
	public int getMyPartyTotal(int m_idx);
	public String idSearch(int p_idx);
	public List<PartyBoardVO> mainAllParty();
	public int getAdminPartyTotal(Criteria cri);
	public List<PartyBoardVO> getAdminPartyList(Criteria cri);
	public void doAdminUpdateParty(PartyBoardVO vo);
	public int doPartyclose(int p_idx);
	public int doPartyOpen(int p_idx);
	public List<PartyBoardVO> getPartyRatio();
	public void updateMyinfo(MemberVO vo);
	public PartyBoardVO getCurrentPartyInfo(int p_idx);
	public void deleteParty(int p_idx);
	public String getPartnerId(int p_idx);
}
