package org.prj.service;

import java.util.List;

import org.prj.domain.CategoryVO;
import org.prj.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryMapper cMapper;
	
	@Override
	public List<CategoryVO> getSecondCategory(int codeone) {
		return cMapper.getSecondCategory(codeone);
	}

	@Override
	public List<CategoryVO> getAllCategory() {
		return cMapper.getAllCategory();
	}

	@Override
	public int checkCategory(CategoryVO vo) {
		return cMapper.checkCategory(vo);
	}

	@Override
	public int addCategory(CategoryVO vo) {
		return cMapper.addCategory(vo);
	}

	@Override
	public int changeCategoryStatus(CategoryVO vo) {
		return cMapper.changeCategoryStatus(vo);
	}

	@Override
	public List<CategoryVO> getAllSecondCategory(int codeone) {
		return cMapper.getAllSecondCategory(codeone);
	}
	
	
}
