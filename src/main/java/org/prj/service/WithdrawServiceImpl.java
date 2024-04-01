package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;
import org.prj.mapper.WithdrawMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class WithdrawServiceImpl implements WithdrawService {
	
	@Autowired
	private WithdrawMapper mapper;

	// 1. 출금 신청 리스트
	@Override
	public List<WithdrawVO> getWithList(int m_idx) {
		log.info("getWithList..." + m_idx);	
		return mapper.getList(m_idx);
	}
	
	// 2. 출금신청
	@Override
	public int register(WithdrawVO vo) {
		log.info("register..." + vo);
		
		return mapper.insert(vo);
	}

	// 3. p_idx를 가지고와서 판매총액을 만드는 과정	
	@Override
	public int getp_idx(String username) {
		log.info("getp_idx..." + username);
		return mapper.getp_idx(username);
	}

	// 4. 지급 요청 금액
	@Override
	public Integer withamount(String username) {
		log.info("withamount..." + username);
		Integer result = mapper.withamount(username);
	    return result == null ? 0 : result;
	}

	// 5. 지금 금액
	@Override
	public Integer currentamount(String username) {
		log.info("currentamount...");
		return mapper.currentamount(username);
	}
	
	// 6. 미발생 금액 리스트
	@Override
	public int unsaleslist(String username) {
		log.info("unsaleslist...");
		return mapper.unsaleslist(username);
	}
	
	
	// 7. 미발생 판매금 업데이트
	@Override
	public int unsales(String username) {
		log.info("unsales...");
		return mapper.unsales(username);
	}
	
	// * 관리자 화면에서 출금관리 페이지 처리를 위해 리스트 나오는 갯수
	@Override
	public int getWithdrawTotal(Criteria cri) {
		
		return mapper.getWithdrawTotal(cri);
	}

	// * 관리자 화면에서 출금관리 페이지 처리를 위해 리스트 불러오기 
	@Override
	public List<WithdrawVO> withdrawList(Criteria cri) {

		return mapper.withdrawList(cri);
	}

	// * 관리자 화면에서 승인 버튼 누를 경우 with_status B로 변경
	@Override
	public boolean modifyWithdraw(int w_idx) {
		log.info("modifyWithdraw..." + w_idx);
		
		int result = mapper.modifyWithdraw(w_idx);
		
		return result == 1 ? true : false;
	}

	// * 관리자 화면에서 승인 버튼 누를 경우 with_status C로 변경
	@Override
	public boolean modifyWithdraw2(int w_idx) {
		log.info("modifyWithdraw..." + w_idx);
		
		int result = mapper.modifyWithdraw2(w_idx);
		
		return result == 1 ? true : false;
	}

	@Override
	public int getNewWithdraw() {
		return mapper.getNewWithdraw();
	}
	
}
