package org.prj.domain;

import java.sql.Date;
import java.util.List;

import org.prj.domain.AuthVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MemberVO {
	private String id, password, name, email, phone, level, nickname, status, bank, bank_number;
	private int m_idx, point, with_amount;
	private Date reg_date, update_date;
	private List<AuthVO> authList;
	private String kakaoid, naverid, token;
	
	//가상컬럼
	private Date approved_at;
	private int serviceamount;
	private String certify;

}
