package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileInfoVO {
	private String uuid, uploadPath, fileName, fileType, boradname;
	private int i_idx;
}
