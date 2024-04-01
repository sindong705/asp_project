package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.PointVO;
import org.prj.domain.RefundVO;

public interface PointMapper {

	//포인트
	public int pointInsert(PointVO point);
	//포인트 리스트
	public List<PointVO> getPointList(Criteria cri);
	//게시글 전체 개수
	public int getPointTotal(Criteria cri);
	//최종 포인트 조회
	public PointVO pointSearch(String id);
	//환불 승인
	public void doRefundApproval(RefundVO vo);
	//내 정보 변경
	public void updateMyinfo(MemberVO vo);
	//결제 시 포인트 등록
	public void updatePoint(PaymentVO vo);
	//결제 취소 시 포인트 등록
	public void pointCancel(PaymentVO vo);
	
}
