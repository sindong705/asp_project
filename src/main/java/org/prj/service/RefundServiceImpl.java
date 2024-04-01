package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.RefundVO;
import org.prj.mapper.MemberMapper;
import org.prj.mapper.PartyBoardMapper;
import org.prj.mapper.PaymentMapper;
import org.prj.mapper.PointMapper;
import org.prj.mapper.RefundMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class RefundServiceImpl implements RefundService{
	@Autowired
	private RefundMapper rMapper;
	
	@Autowired
	private PaymentMapper payMapper;
	
	@Autowired
	private PointMapper poMapper;
	
	@Autowired
	private MemberMapper mMapper;
	
	@Autowired
	private PartyBoardMapper pMapper;
	

	@Transactional
	@Override
	public int doRefundRegister(RefundVO vo) {
		//결제 테이블 상태 변경
		payMapper.doPayStatus(vo.getOrder_no());
		
		return rMapper.doRefundRegister(vo);
	}

	@Override
	public int getNewRefund() {
		return rMapper.getNewRefund();
	}

	@Override
	public int getRefundTotal(Criteria cri) {
		return rMapper.getRefundTotal(cri);
	}

	@Override
	public List<RefundVO> getRefundList(Criteria cri) {
		return rMapper.getRefundList(cri);
	}

	@Transactional
	@Override
	public int doRefundApproval(RefundVO vo) {
		//payment - pay_status, refund_amount
		payMapper.doRefundApproval(vo);
		
		//point - insert
		poMapper.doRefundApproval(vo);
		
		//member - point
		mMapper.doRefundApproval(vo);
		
		//party_board - curr_party-1 update
		pMapper.cancleUpdateCurrNum(vo.getP_idx());
		
		//refund - re_status, refund_date
		return rMapper.doRefundApproval(vo);
	}

	@Transactional
	@Override
	public int doRefundReturn(RefundVO vo) {
		//payment - pay_status, note
		payMapper.doRefundReturn(vo);
		
		//refund - re_status, refund_date, rejection
		return rMapper.doRefundReturn(vo);
	}
}
