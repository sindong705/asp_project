package org.prj.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InquiryVO {
	private int i_idx, m_idx;
	private String inquiry_type, writer, title, content, filename, status; 
	private Date reg_date, update_date;
	
	private List<FileInfoVO> attachList;
	
}
