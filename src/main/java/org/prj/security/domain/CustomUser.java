package org.prj.security.domain;

import java.util.Collection;
import java.util.stream.Collectors;

import org.prj.domain.MemberVO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;

@Getter
public class CustomUser  extends User{

	private static final long serialVersionUID = 1L;
	
	private MemberVO member;
	private String logintype;
	
	public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}
	
	public CustomUser(MemberVO vo) {
		super(vo.getId(), vo.getPassword(), 
				vo.getAuthList().stream().map(auth -> 
					new SimpleGrantedAuthority(
							auth.getAuth())).collect(Collectors.toList()));
		
		this.member = vo;
	}

	
	
}
