package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PointVO;


public interface PointService {
	// 포인트
	public int pointInsert(PointVO point);	
	// 포인트 리스트
	public List<PointVO> getPointList(Criteria cri);
	// 게시글 전체 개수
	public int getPointTotal(Criteria cri);
	//최종 포인트 조회
	public PointVO pointSearch(String id);
}
