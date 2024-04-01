package org.prj.mapper;

import java.util.List;

import org.prj.domain.FileInfoVO;

public interface InquiryAttachMapper {
	// 1. 파일 추가
	public void insert(FileInfoVO vo);
	// 2. 파일 삭제
	public void delete(String uuid);
	// 3. 파일 불러오기
	public List<FileInfoVO> findByIdx(int i_idx);
	// 4. 실제 파일과 함께 삭제
	public void deleteAll(long i_idx);
}
