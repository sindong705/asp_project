package org.prj.service;

import java.util.List;

import org.prj.domain.AlarmVO;
import org.prj.domain.Criteria;
import org.prj.mapper.AlarmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AlarmServiceImpl implements AlarmService {
	@Autowired
	private AlarmMapper aMapper;

	@Override
	public int doSaveNotify(AlarmVO vo) {
		return aMapper.doSaveNotify(vo);
	}

	@Override
	public List<AlarmVO> getMyNotify(Criteria cri) {
		return aMapper.getMyNotify(cri);
	}

	@Override
	public int doChangeStatus(int a_idx) {
		return aMapper.doChangeStatus(a_idx);
	}

	@Override
	public int getMyNotifyNum(String id) {
		return aMapper.getMyNotifyNum(id);
	}

	@Override
	public int doCheckAlarm(List<Integer> idxList) {
		return aMapper.doCheckAlarm(idxList);
	}

	@Override
	public int doDeleteAlarm(List<Integer> idxList) {
		return aMapper.doDeleteAlarm(idxList);
	}
}
