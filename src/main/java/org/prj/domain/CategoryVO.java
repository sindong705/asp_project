package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategoryVO {
	private int codeone, codetwo;
	private String c_primary, c_secondary;
	private char status;
}
