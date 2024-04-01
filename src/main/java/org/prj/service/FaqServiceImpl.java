package org.prj.service;


import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FaqVO;
import org.prj.mapper.FaqMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class FaqServiceImpl implements FaqService {
	
	@Autowired
	private FaqMapper mapper;
	
	@Override
	public void register(FaqVO vo) {
		log.info("register..." + vo);
		mapper.insert(vo);	
	}
	
	@Override
	public List<FaqVO> userList(String faq_type) {
		return mapper.userList(faq_type);
	}
	
	@Override
	public int getAdminFaqTotal(Criteria cri) {
		return mapper.getAdminFaqTotal(cri);
	}
	
	@Override
	public List<FaqVO> getAdminFaqList(Criteria cri) {
		return mapper.getAdminFaqList(cri);
	}
	
	@Override
	public FaqVO getFaq(int f_idx) {
		return mapper.getFaq(f_idx);
	}
	
	@Override
	public void doAdminUpdateFaq(FaqVO vo) {
		mapper.doAdminUpdateFaq(vo);
	}
	
	@Override
	public void doAdminRemoveFaq(int f_idx) {
		mapper.doAdminRemoveFaq(f_idx);
	}
}
