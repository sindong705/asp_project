package org.prj.domain;

import java.sql.Date;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PointVO {
	private String id, name, content, contentDetail;
	private int p_idx, m_idx, update_point, before_point, after_point, point;
	private Date reg_date;
}
