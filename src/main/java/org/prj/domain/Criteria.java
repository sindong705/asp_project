package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Criteria {
	private int pageNum;
	private int amount;
	
	//카테고리
	private int codeone;
	private int codetwo;
	
	//페이징
	private int m_idx;
	private String comment_to;
	private String sort;
	
	//파티관리 검색
	private String category;
	private String searchcolumn;
	private String searchword;
	
	//파티 상태 & 회원 레벨
	private String status;
	
	//알림페이지 - 더보기
	private String id;
	
}