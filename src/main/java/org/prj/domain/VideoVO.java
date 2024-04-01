package org.prj.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoVO {
	private int idx;
	private String title, description, videoid, thumbnailurl, channelid, channel;
	private Date reg_date;
	
	//가상컬럼
	private int codeone, codetwo; 
}
