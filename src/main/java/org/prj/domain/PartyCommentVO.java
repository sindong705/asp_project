package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PartyCommentVO {
	private int c_idx, p_idx;
	private String writer, comment_to, comment, private_chk, reg_date, update_date;
	
	//가상컬럼
	private int codeone, codetwo; 
	private String title, c_primary, c_secondary;
}
