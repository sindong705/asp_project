package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;
import org.prj.mapper.InquiryAttachMapper;
import org.prj.mapper.InquiryMapper;
import org.prj.mapper.InquiryReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class InquiryServiceImpl implements InquiryService {

	@Autowired
	private InquiryMapper mapper;
	
	@Autowired 
	private InquiryReplyMapper imapper;
	
	@Autowired
	private InquiryAttachMapper AttachMapper;

	private long i_idx;
	
	// 1. 1:1문의 게시판 전체 리스트
	@Override
	public List<InquiryVO> getList(Criteria cri) {    
		log.info("getList..." + cri);     
		return mapper.getList(cri);       
	}

	// 2. 페이지를 가지고 온다. 
	@Override
	public int getTotal() {
		log.info("getTotal...");
		return mapper.getTotal();
	}
	
	// 3. 게시글 등록
	@Transactional
	@Override
	public void register(InquiryVO vo) {
		log.info("register..." + vo);
		
		// 3-1. 테이블 게시글 등록
		mapper.insert(vo);
		
		// 3-2. 1번에 등록된 게시글의 번호 가져오기
		int i_idx = mapper.getIdx();
				
		// 3-3. 파일 업로드
		if (vo.getAttachList() == null || vo.getAttachList().size() <= 0) {
			return;
		}
		vo.getAttachList().forEach(attach -> {
			attach.setI_idx(i_idx);
			AttachMapper.insert(attach);
		});
	}
	
	// 4. 게시글 가지고 오기!!
	@Override
	public InquiryVO get(int i_idx) {
		log.info("get...." + i_idx);
		return mapper.read(i_idx);
	}
	
	// 5. 게시글 수정
	@Transactional
	@Override
	public boolean modify(InquiryVO vo) {
		log.info("modify..." + vo);
		
		// 5-1. 수정하면서 파일이 삭제가 될 수 있게
		AttachMapper.deleteAll(vo.getI_idx());
		
		boolean modifyResult = mapper.update(vo) == 1;
		
		if(modifyResult && vo.getAttachList() != null && vo.getAttachList().size() > 0) {
			vo.getAttachList().forEach(attach -> {
				attach.setI_idx(vo.getI_idx());
				AttachMapper.insert(attach);	// 새로운 파일이 추가 될때
			});
		}		
		return modifyResult;
	}
	
	// 6. 게시글 삭제
	@Transactional
	@Override
	public boolean remove(int i_idx) {
		log.info("remove..." + i_idx);
		// 6-1. 댓글 전체를 삭제
		imapper.allDelete(i_idx);	// 게시글 삭제하면 댓글 부분도 삭제 추후 조치
		// 6-2. 파일 데이터 삭제
		AttachMapper.deleteAll(i_idx);
		// 6-3. 게시글 삭제
		int result = mapper.delete(i_idx);
		return result > 0 ? true : false ;
	}

	// 7. 첨부 파일 목록을 가지고 온다.
	@Override
	public List<FileInfoVO> getAttachList(int i_idx) {
		log.info("AttachList : " + i_idx);
		return AttachMapper.findByIdx(i_idx);
	}
	
	// + 추가 업로드한 파일을 수정 부분에서 삭제
	@Override
	public void delete(String uuid) {
		log.info("delete : " + uuid);
		
		AttachMapper.delete(uuid);
	}
		
	// 8. 리스트 나오는 갯수
	@Override
	public int getInquiryBoardTotal(Criteria cri) {
		
		return mapper.getInquiryBoardTotal(cri);
	}

	// 9. 관리자 1:1문의 불러 오는 내용
	@Override
	public List<InquiryVO> inquiryboardList(Criteria cri) {
		
		return mapper.inquiryboardList(cri);
	}

	// 10. 관리자 1:1문의 댓글 가지고 오기
	@Override
	public InquiryVO getReply(int i_idx) {
		
		return mapper.getReply(i_idx);
	}

	// 11. 관리자 1:1 문의 상태 변경
	@Override
	public void statusUpdate(InquiryVO vo) {
		log.info("statusUpdate..." + vo);
		mapper.statusUpdate(vo);
	}

	// 12. 관리자 1:1문의 게시글 가지고 오기
	@Override
	public InquiryVO getInquiry(int i_idx) {
		
		return mapper.getInquiry(i_idx);
	}

	// 13. 관리자 1:1문의 게시글 수정 (위에 5번과 상동)
	@Transactional
	@Override
	public boolean AdminInquiryUpdate(InquiryVO vo) {
		log.info("AdminInquiryUpdate..." + vo);
		
		AttachMapper.deleteAll(vo.getI_idx());
		
		boolean modifyResult = mapper.AdminInquiryUpdate(vo) == 1;
		
		if(modifyResult && vo.getAttachList() != null && vo.getAttachList().size() > 0) {
			vo.getAttachList().forEach(attach -> {
				attach.setI_idx(vo.getI_idx());
				AttachMapper.insert(attach);
			});
		}	
		return modifyResult;	
		
	}

	@Override
	public int getNewInquiry() {
		return mapper.getNewInquiry();
	}
}
