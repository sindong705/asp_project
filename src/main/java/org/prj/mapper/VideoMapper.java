package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.VideoVO;

public interface VideoMapper {
	//영상 저장하기
	public void add(VideoVO video);
	
	//영상  삭제
	public int remove(String channel);
		
	//영상 불러오기
	public List<VideoVO> getAllVideos(Criteria cri);
	
	//메인 추천영상
	public List<VideoVO> mainAllVideos();
	
	//2차 카테고리 추천영상
	public List<VideoVO> shopListVideos(int codetwo);
}
