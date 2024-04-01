package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RefundVO {
	private int  m_idx, p_idx, r_idx, amount, re_amount;
	private String id, name, re_status, reason, rejection, order_no;
	private String reg_date, refund_date;
	
	//select key 사용을 위한 가상 컬럼
	private int before_point;
}
