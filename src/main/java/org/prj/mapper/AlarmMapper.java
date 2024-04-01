package org.prj.mapper;

import java.util.List;

import org.prj.domain.AlarmVO;
import org.prj.domain.Criteria;

public interface AlarmMapper {
	public int doSaveNotify(AlarmVO vo);
	public List<AlarmVO> getMyNotify(Criteria cri);
	public int doChangeStatus(int a_idx);
	public int getMyNotifyNum(String id);
	public int doCheckAlarm(List<Integer> idxList);
	public int doDeleteAlarm(List<Integer> idxList);
}
