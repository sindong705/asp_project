package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.RefundVO;

public interface RefundService {
	//환불 신청
	public int doRefundRegister(RefundVO vo);
	
	//환불 신청 건수
	public int getNewRefund();
	
	//환불 관리 글 개수
	public int getRefundTotal(Criteria cri);
	
	//환불 관리 리스트
	public List<RefundVO> getRefundList(Criteria cri);
	
	//환불 승인
	public int doRefundApproval(RefundVO vo);
	
	//환불 반려
	public int doRefundReturn(RefundVO vo);
}
