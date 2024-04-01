package org.prj.mapper;

import java.util.List;

import org.prj.domain.CategoryVO;

public interface CategoryMapper {
	public List<CategoryVO> getSecondCategory(int codeone);
	
	//전체 카테고리 리스트
	public List<CategoryVO> getAllCategory();
	
	public int checkCategory(CategoryVO vo);
	
	public int addCategory(CategoryVO vo);
	
	public int changeCategoryStatus(CategoryVO vo);
	
	public List<CategoryVO> getAllSecondCategory(int codeone);
}
