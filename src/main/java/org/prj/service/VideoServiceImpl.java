package org.prj.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.VideoVO;
import org.prj.mapper.VideoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class VideoServiceImpl implements VideoService {
    
    @Autowired
    private VideoMapper vMapper;
    
    private final YouTubeService youTubeService;

    @Autowired
    public VideoServiceImpl(YouTubeService youTubeService) {
        this.youTubeService = youTubeService;
    }
    
    @Override
    public int videoSave(VideoVO vo) throws IOException {
    	YouTube youtube = null;
		try {
			youtube = youTubeService.getYouTubeService();
		} catch (GeneralSecurityException e) {
			e.printStackTrace();
		}
        YouTube.Search.List search = youtube.search().list("id,snippet");
        // Replace "YOUR_API_KEY" with your actual API key
        search.setKey("AIzaSyALSLPiVdUCaSS0yRcWMzEaNkOeb3uaF4w");
        search.setChannelId(vo.getChannelid());
        search.setType("video");
        search.setMaxResults(4L); // 검색할 개수
        search.setOrder("date"); // 최신순으로 정렬
        search.setVideoDuration("medium"); // 4분 이상 20분 미만의 동영상이 검색

        SearchListResponse searchResponse = search.execute();
        List<SearchResult> searchResults = searchResponse.getItems();
        
        int addCount = 0;
        
        for (SearchResult searchResult : searchResults) {
            VideoVO video = new VideoVO();
            log.warn("searchResult..." + searchResult);
            
            video.setTitle(searchResult.getSnippet().getTitle());
            video.setDescription(searchResult.getSnippet().getDescription());
            video.setVideoid(searchResult.getId().getVideoId());
            video.setThumbnailurl(searchResult.getSnippet().getThumbnails().getDefault().getUrl());
            video.setChannelid(vo.getChannelid());
            video.setChannel(vo.getChannel());
            
            log.warn("video..." + video);
            vMapper.add(video);
            addCount++;
        }

        return addCount;
    }
    
    @Override
    public int videoDelete(String channel) throws IOException {
    	return vMapper.remove(channel);
    }
    
    @Override
    public List<VideoVO> getAllVideos(Criteria cri) {
    	return vMapper.getAllVideos(cri);
    }
    
    @Override
    public List<VideoVO> mainAllVideos() {
    	return vMapper.mainAllVideos();
    }
    
    @Override
    public List<VideoVO> shopListVideos(int codetwo) {
    	return vMapper.shopListVideos(codetwo);
    }
}