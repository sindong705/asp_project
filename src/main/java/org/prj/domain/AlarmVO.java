package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AlarmVO {
	private int a_idx;
	private String to_id, from_id, content, url;
	private String checked;
	private String reg_date;
}
