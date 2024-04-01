package org.prj.service;

import java.util.List;

import org.prj.domain.CategoryVO;

public interface CategoryService {
	public List<CategoryVO> getSecondCategory(int codeone);
	
	//전체 카테고리 리스트
	public List<CategoryVO> getAllCategory();
	
	//카테고리 추가 전 중복 검사
	public int checkCategory(CategoryVO vo);
	
	//카테고리 추가
	public int addCategory(CategoryVO vo);
	
	//카테고리 상태 변경
	public int changeCategoryStatus(CategoryVO vo);
	
	//관리를 위한 전체 카테고리
	public List<CategoryVO> getAllSecondCategory(int codeone);
}
