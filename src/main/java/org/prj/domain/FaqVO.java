package org.prj.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FaqVO {
	private int f_idx;
	private String faq_type, writer, title, content;
	private Date reg_date, update_date;
}
