package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WithdrawVO {
	private int m_idx, w_idx, with_amount, commission;
	private String id, name, phone, with_method, with_status, note, reg_date;
}
