package org.prj.service;

import java.io.IOException;
import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.VideoVO;

public interface VideoService {
	//영상 불러와서 저장하기
	public int videoSave(VideoVO vo) throws IOException;
	
	//영상 불러와서 저장하기
	public int videoDelete(String channel) throws IOException;
	
	//추천영상 불러오기
	public List<VideoVO> getAllVideos(Criteria cri);
	
	//메인 추천영상
	public List<VideoVO> mainAllVideos();
	
	//2차 카테고리 추천영상
	public List<VideoVO> shopListVideos(int codetwo);
}
