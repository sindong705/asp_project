package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.RefundVO;

public interface RefundMapper {
	public int doRefundRegister(RefundVO vo);
	public int getNewRefund();
	public void updateMyinfo(MemberVO vo);
	public int getRefundTotal(Criteria cri);
	public List<RefundVO> getRefundList(Criteria cri);
	public int doRefundApproval(RefundVO vo);
	public int doRefundReturn(RefundVO vo);
}
