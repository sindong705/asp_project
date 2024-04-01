package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PartyBoardVO;
import org.prj.mapper.PartyBoardMapper;
import org.prj.mapper.PartyReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class PartyBoardServiceImpl implements PartyBoardService{
	
	@Autowired
	private PartyBoardMapper pMapper;
	
	@Autowired
	private PartyReplyMapper prMapper;
	
	@Override
	public void registerParty(PartyBoardVO vo) {
		pMapper.registerParty(vo);
	}

	@Override
	public int getManageSearchTotal(Criteria cri) {
		return pMapper.getManageSearchTotal(cri);
	}

	@Override
	public List<PartyBoardVO> getManageSearchList(Criteria cri) {
		return pMapper.getManageSearchList(cri);
	}

	@Override
	public PartyBoardVO getParty(int p_idx) {
		return pMapper.getParty(p_idx);
	}

	@Override
	public void updateParty(PartyBoardVO vo) {
		pMapper.updateParty(vo);
	}

	@Override
	public List<PartyBoardVO> getListbycategory(Criteria cri) {
		return pMapper.getListbycategory(cri);
	}
	
	@Override
	public List<PartyBoardVO> getListbycategory2(Criteria cri) {
		return pMapper.getListbycategory2(cri);
	}

	@Override
	public PartyBoardVO getDetailParty(int p_idx) {
		return pMapper.getDetailParty(p_idx);
	}

	@Override
	public void updateCurrNum(int p_idx) {
		pMapper.updateCurrNum(p_idx);
	}

	@Override
	public void cancleUpdateCurrNum(int p_idx) {
		pMapper.cancleUpdateCurrNum(p_idx);
	}

	@Override
	public List<MemberVO> getPaymentMemberList(int p_idx) {
		return pMapper.getPaymentMemberList(p_idx);
	}

	@Override
	public List<PartyBoardVO> getParticipating(String id) {
		return pMapper.getParticipating(id);
	}

	@Override
	public int partyStatusUpdate() {
		return pMapper.partyStatusUpdate();
	}

	@Override
	public int getMyPartyTotal(int m_idx) {
		return pMapper.getMyPartyTotal(m_idx);
	}
	
	
	@Override
	public String idSearch(int p_idx) {
		log.info("idSearch..." + p_idx);
		return pMapper.idSearch(p_idx);
	}
	
	@Override
	public List<PartyBoardVO> mainAllParty() {
		return pMapper.mainAllParty();
	}

	@Override
	public int getAdminPartyTotal(Criteria cri) {
		return pMapper.getAdminPartyTotal(cri);
	}

	@Override
	public List<PartyBoardVO> getAdminPartyList(Criteria cri) {
		return pMapper.getAdminPartyList(cri);
	}

	@Override
	public void doAdminUpdateParty(PartyBoardVO vo) {
		pMapper.doAdminUpdateParty(vo);
	}

	@Override
	public int doPartyclose(int p_idx) {
		return pMapper.doPartyclose(p_idx);
	}

	@Override
	public int doPartyOpen(int p_idx) {
		return pMapper.doPartyOpen(p_idx);
	}

	@Override
	public List<PartyBoardVO> getPartyRatio() {
		return pMapper.getPartyRatio();
	}

	@Override
	public PartyBoardVO getCurrentPartyInfo(int p_idx) {
		return pMapper.getCurrentPartyInfo(p_idx);
	}

	@Transactional
	@Override
	public void deleteParty(int p_idx) {
		//댓글 삭제
		prMapper.deleteParty(p_idx);
		//게시글 삭제
		pMapper.deleteParty(p_idx);
	}

	@Override
	public String getPartnerId(int p_idx) {
		return pMapper.getPartnerId(p_idx);
	}
}
