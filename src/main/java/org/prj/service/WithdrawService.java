package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;

public interface WithdrawService {

	// 1. 출금 신청 리스트
	public List<WithdrawVO> getWithList(int m_idx);
	
	// 2. 출금 신청
	public int register(WithdrawVO vo);
	
	// 3. 판매총액을 만드는 과정
	public int getp_idx(String username);
	
	// 4. 지급 요청 금액
	public Integer withamount(String username);
	
	// 5. 지급 금액
	public Integer currentamount(String username);
	
	// 6. 미발생 판매금 업데이트
	public int unsales(String username);
	
	// 7. 미발생 판매금 불러오는 것 
	public int unsaleslist(String username);
	
	// * 관리자 화면에서 출금관리 페이지 처리를 위해 리스트 나오는 갯수
	public int getWithdrawTotal(Criteria cri);
	
	// * 관리자 화면에서 출금관리 페이지 처리를 위해 리스트 불러오기 
	public List<WithdrawVO> withdrawList(Criteria cri);
	
	// * 관리자 화면에서 승인 버튼 누를 경우 with_status B로 변경
	public boolean modifyWithdraw(int w_idx);
	
	// * 관리자 화면에서 승인 버튼 누를 경우 with_status C로 변경
	public boolean modifyWithdraw2(int w_idx);
	
	// * 새 출금 신청 수
	public int getNewWithdraw();

}
