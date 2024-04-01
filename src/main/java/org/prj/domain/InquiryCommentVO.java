package org.prj.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InquiryCommentVO {
	private int c_idx, i_idx;
	private String content, status, writer;
	private Date reg_date, update_date;
	
}
