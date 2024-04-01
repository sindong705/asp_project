package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.RefundVO;

public interface PaymentMapper {
	// 결제내역 등록
	public int order(PaymentVO vo);
	
	// 결제정보
	public List<PaymentVO> orderList(Criteria cri);
	
	// 결제조회
	public PaymentVO orderGet(String order_no);
	
	// 결제정보 개수
	public int orderTotal(int m_idx);
	
	// 결제취소 상태변경
	public int cancelStatus(String order_no);
	
	// 참여정보
	public List<PaymentVO> getPayMemberList(Criteria cri);
	
	//내 파티 참여자 수
	public int getPayPartyTotal(Criteria cri);
	
	// 취소내역
	public List<PaymentVO> getPartyCancelList(Criteria cri);
	
	// 취소 수
	public int getPartyCancelTotal(Criteria cri);
	
	//월별 결제 총액
	public List<PaymentVO> getTotalPayment();
	
	//연간 결제 총액
	public int getTotalEarning();
	
	//결제내역 개수
	public int getAdminPaymentTotal(Criteria cri);
	
	//결제관리
	public List<PaymentVO> getAdminPaymentList(Criteria cri);
	
	//환불신청 pay_status 값 변경
	public void doPayStatus(String order_no);
	
	//환불 승인
	public void doRefundApproval(RefundVO vo);
	
	//환불 반려
	public void doRefundReturn(RefundVO vo);
	
	//파티 참여 회원 아이디 리스트
	public List<PaymentVO> getPaymentUsers(int p_idx);
}
