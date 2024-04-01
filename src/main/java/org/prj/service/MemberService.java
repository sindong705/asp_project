package org.prj.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.PointVO;

public interface MemberService {
	
	//회원가입
	public int memberJoin(MemberVO member) throws Exception;
	
	//아이디 중복 검사
	public int idCheck(String id) throws Exception;
	
	//닉네임 중복 검사
	public int nicknameCheck(String nickname) throws Exception;
	
	//이메일 중복 검사
	public int emailCheck(String email) throws Exception;
	
	//아이디 찾기
	public String findId(String name, String email) throws Exception;
	
	//비밀번호 찾기
	public MemberVO findPw(String email, String id) throws Exception;
	
	//비밀번호 변경
	public int updatePw(MemberVO member) throws Exception;
	
	// 인증된 사용자 정보(name, phone) 구하기
	public HashMap<String, String> getAuthInfo(String impuid) throws IOException;

	//내 정보 수정
	public int updateMypage(MemberVO member) throws Exception;
	
	//파트너 신청
	public int partnerApp(MemberVO member);
	
	//파트너 정보수정
	public int partnerModify(MemberVO member);
	
	//파트너 정보조회
	public MemberVO getPartnerinfo(int m_idx);
	
	//결재 후 member -> with_amount 금액이 증가
	public void updateWithamount(MemberVO vo);
	
	//결재 후 member -> point 변경
	public void updatePoint(PaymentVO vo);
	
	//결재 취소 member -> point 반환
	public void pointCancel(PaymentVO vo);

    //카카오 회원가입
	public int kakaoIdck(String kakaoid);
	
	//카카오 로그인
	public MemberVO kakaoRead(String kakaoid);
	
	//회원가입 중복확인
	public int joinCheck(String name, String phone);
	
	//회원번호 찾기
	public int findMidx(String id);

	//네이버 회원가입
	public int naverIdck(String naverid);
	
	//네이버 로그인
	public MemberVO naverRead(String naverid);
	
	//카카오 SNS 계정 연결
	public int kakao_update(MemberVO memeber);
	
	//네이버 SNS 계정 연결
	public int naver_update(MemberVO memeber);	

	//총 회원수
	public int getTotalUser();
	
	//회원관리 - 검색 - 회원 수
	public int getMemberTotal(Criteria cri);
	
	//회원 관리 - 검색 - 회원 리스트
	public List<MemberVO> getAdminMemberList(Criteria cri);
	
	//회원 관리 - 회원 수정
	public MemberVO getMember(int m_idx);
	
	//네이버 연동 해지
	public int doNaveridDelete(int m_idx);
	
	//카카오 연동 해지
	public int doKakaoidDelete(int m_idx);
	
	//회원 수정
	public void doMemberModify(MemberVO vo);
	
	//계정 활성화 비활성화
	public int doLockAccount(MemberVO vo);
	
	//업데이트 마이 포인트
	public int updateMyPoint(PointVO vo);
	
	// 포인트 리스트
	public List<PointVO> getPointList(Criteria cri);
	
	// 게시글 전체 개수
	public int getPointTotal(Criteria cri);
	
	//유저 닉네임
	public String getUserNick(String id);
	
	//유저 아이디
	public String getUserID(String nickname);
}
