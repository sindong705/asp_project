package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.PointVO;
import org.prj.mapper.MemberMapper;
import org.prj.mapper.PointMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class PointServiceImpl implements PointService{

	@Autowired
	PointMapper pointmapper;
	
	//포인트 삽입
	@Override
	public int pointInsert(PointVO point) {
		return pointmapper.pointInsert(point);
	}
	//포인트 리스트
	@Override
	public List<PointVO> getPointList(Criteria cri) {
		return pointmapper.getPointList(cri);
	}
	//게시글 전체 개수
	@Override
	public int getPointTotal(Criteria cri) {
		return pointmapper.getPointTotal(cri);
	}
	// 최종 포인트 조회
	@Override
	public PointVO pointSearch(String id) {
		return pointmapper.pointSearch(id);
	}
}
